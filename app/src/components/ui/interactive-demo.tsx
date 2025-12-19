"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Loader2, FileText, CheckCircle2, RotateCcw, AlertCircle } from "lucide-react";
import { Button } from "./button";

type DemoState = "idle" | "requesting-permission" | "recording" | "processing" | "complete" | "error";

const MAX_RECORDING_TIME = 30; // 30 segundos máximo

interface MedicalRecord {
	summary: string;
	soap: {
		subjective: string;
		objective: string;
		assessment: string;
		plan: string;
	};
	documents: {
		prescription: string | null;
		certificate: string | null;
		instructions: string;
	};
	insights: string[];
}

interface ResumoClinico {
	queixaPrincipal: string;
	conduta: string;
	exames: string[];
	documentos: string[];
}

export function InteractiveDemo() {
	const [state, setState] = useState<DemoState>("idle");
	const [recordingTime, setRecordingTime] = useState(0);
	const [errorMessage, setErrorMessage] = useState("");
	const [resumo, setResumo] = useState<ResumoClinico | null>(null);
	const [transcricao, setTranscricao] = useState("");
	const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(null);
	
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);
	const streamRef = useRef<MediaStream | null>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	// Limpar recursos ao desmontar
	useEffect(() => {
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
			if (streamRef.current) {
				streamRef.current.getTracks().forEach(track => track.stop());
			}
		};
	}, []);

	// Timer de gravação
	useEffect(() => {
		if (state === "recording") {
			timerRef.current = setInterval(() => {
				setRecordingTime((prev) => {
					const newTime = prev + 1;
					// Auto-stop ao atingir tempo máximo
					if (newTime >= MAX_RECORDING_TIME) {
						handleStop();
					}
					return newTime;
				});
			}, 1000);
		} else {
			if (timerRef.current) {
				clearInterval(timerRef.current);
				timerRef.current = null;
			}
		}
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [state]);

	const handleStart = async () => {
		try {
			setState("requesting-permission");
			setErrorMessage("");
			audioChunksRef.current = [];
			setRecordingTime(0);

			// Solicitar permissão e acessar microfone com configurações otimizadas
			const stream = await navigator.mediaDevices.getUserMedia({ 
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					autoGainControl: true,
					channelCount: 1,
				} 
			});
			
			streamRef.current = stream;

			// Usar formato mais compatível (webm/opus ou webm)
			let mimeType = 'audio/webm';
			if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
				mimeType = 'audio/webm;codecs=opus';
			}
			
			console.log('[MediaRecorder] Usando mimeType:', mimeType);
			
			const mediaRecorder = new MediaRecorder(stream, {
				mimeType,
			});
			
			mediaRecorderRef.current = mediaRecorder;

			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					console.log('[MediaRecorder] Chunk recebido:', event.data.size, 'bytes');
					audioChunksRef.current.push(event.data);
				}
			};

			mediaRecorder.onstop = async () => {
				console.log('[MediaRecorder] Gravação parada. Total de chunks:', audioChunksRef.current.length);
				await processAudio();
			};

			// Iniciar gravação
			mediaRecorder.start();
			console.log('[MediaRecorder] Gravação iniciada');
			setState("recording");

		} catch (error) {
			console.error("Erro ao acessar microfone:", error);
			setState("error");
			
			const err = error as { name?: string; message?: string };
			
			if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
				setErrorMessage("Permissão negada. Por favor, permita o acesso ao microfone.");
			} else if (err.name === "NotFoundError") {
				setErrorMessage("Nenhum microfone encontrado no dispositivo.");
			} else {
				setErrorMessage("Erro ao acessar o microfone: " + (err.message || ""));
			}
		}
	};

	const handleStop = () => {
		if (mediaRecorderRef.current && state === "recording") {
			mediaRecorderRef.current.stop();
			
			// Parar todas as tracks do stream
			if (streamRef.current) {
				streamRef.current.getTracks().forEach(track => track.stop());
			}
		}
	};

	const processAudio = async () => {
		try {
			setState("processing");

			// Criar blob de áudio
			const mimeType = mediaRecorderRef.current?.mimeType || 'audio/webm';
			const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
			
			console.log('[processAudio] Blob criado:', {
				size: audioBlob.size,
				type: audioBlob.type,
				chunks: audioChunksRef.current.length
			});

			// Verificar se há áudio gravado
			if (audioBlob.size === 0) {
				throw new Error("Nenhum áudio foi gravado");
			}

			if (audioBlob.size < 1000) {
				throw new Error("Áudio muito curto. Grave por mais tempo e fale mais alto.");
			}

			// Enviar para API
			const formData = new FormData();
			formData.append("audio", audioBlob, "recording.webm");

			console.log('[processAudio] Enviando para API...');

			const response = await fetch("/api/transcribe", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				const error = await response.json();
				console.error('[processAudio] Erro da API:', error);
				throw new Error(error.error || "Erro ao processar áudio");
			}

			const data = await response.json();
			
			console.log('[processAudio] Resposta da API:', data);
			
			if (!data.text || data.text.trim() === "") {
				throw new Error("Transcrição vazia. Por favor, fale mais próximo do microfone e com mais clareza.");
			}

			setTranscricao(data.text || "");
			setMedicalRecord(data.medicalRecord || null);
			setState("complete");

		} catch (error) {
			console.error("Erro ao processar áudio:", error);
			setState("error");
			const err = error as { message?: string };
			setErrorMessage(err.message || "Erro ao processar o áudio gravado");
		}
	};

	const handleReset = () => {
		setState("idle");
		setRecordingTime(0);
		setErrorMessage("");
		setResumo(null);
		setTranscricao("");
		setMedicalRecord(null);
		audioChunksRef.current = [];
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	return (
		<div className="relative mx-auto w-full max-w-md">
			{/* Elemento decorativo */}
			<div className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rounded-3xl bg-[#00ccbd]/15 blur-2xl" />

			{/* Card principal */}
			<div className="relative rounded-3xl bg-gradient-to-br from-white to-[#f9f9f9] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.08)] dark:from-[#101010] dark:to-[#0a0a0a] dark:border dark:border-[#2a2a2a]">
				
				{/* Estado: Idle */}
				{state === "idle" && (
					<div className="space-y-4 text-center">
						<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#00ccbd]/10 dark:bg-[#00ccbd]/20">
							<Mic className="h-8 w-8 text-[#007c79] dark:text-[#00ccbd]" />
						</div>
						<div>
							<h3 className="mb-2 text-lg font-semibold text-[#3b3b3b] dark:text-[#f4f4f4]">
								Teste a Vocalmed com IA Real
							</h3>
							<p className="text-sm text-[#5e5e5e] dark:text-[#d1d1d1]">
								Grave sua voz agora e veja a IA transcrever e gerar um resumo clínico estruturado automaticamente.
							</p>
						</div>
						<Button
							onClick={handleStart}
							variant="primary"
							size="lg"
							className="w-full"
						>
							<Mic className="mr-2 h-5 w-5" />
							Permitir Acesso e Iniciar
						</Button>
						<p className="text-xs text-[#919191]">
							Será solicitada permissão para acessar seu microfone
						</p>
					</div>
				)}

				{/* Estado: Solicitando Permissão */}
				{state === "requesting-permission" && (
					<div className="space-y-6 text-center py-8">
						<Loader2 className="mx-auto h-12 w-12 animate-spin text-[#00a89a]" />
						<div>
							<h3 className="mb-2 text-lg font-semibold text-[#3b3b3b] dark:text-[#f4f4f4]">
								Solicitando permissão...
							</h3>
							<p className="text-sm text-[#5e5e5e] dark:text-[#d1d1d1]">
								Por favor, permita o acesso ao microfone no navegador
							</p>
						</div>
					</div>
				)}

				{/* Estado: Gravando */}
				{state === "recording" && (
					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs font-medium uppercase tracking-wide text-[#919191]">
									Gravando em tempo real
								</p>
								<p className="text-sm font-semibold text-[#3b3b3b] dark:text-[#f4f4f4]">
									Fale sobre uma consulta médica
								</p>
							</div>
							<span className="flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400">
								<span className="relative flex h-2 w-2">
									<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
									<span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
								</span>
								REC
							</span>
						</div>

						{/* Visualização de áudio */}
						<div className="flex h-32 items-center justify-center rounded-2xl bg-[#f4f4f4] dark:bg-[#1a1a1a] p-4">
							<div className="text-center">
								<Mic className="mx-auto mb-3 h-12 w-12 text-[#00a89a] animate-pulse" />
								<p className="text-sm text-[#5e5e5e] dark:text-[#d1d1d1]">
									Capturando áudio do microfone...
								</p>
							</div>
						</div>

						{/* Timer e botão de parar */}
						<div className="space-y-4">
							<div className="text-center">
								<p className="text-3xl font-semibold tabular-nums text-[#3b3b3b] dark:text-[#f4f4f4]">
									{formatTime(recordingTime)}
								</p>
								<p className="mt-1 text-xs text-[#919191]">
								{MAX_RECORDING_TIME - recordingTime}s restantes
								</p>
							</div>
							<Button
								onClick={handleStop}
								variant="outline"
								size="lg"
								className="w-full border-red-500 text-red-600 hover:bg-red-50 dark:border-red-500 dark:text-red-400 dark:hover:bg-red-950"
							>
								<MicOff className="mr-2 h-5 w-5" />
								Parar e Processar
							</Button>
						</div>
					</div>
				)}

				{/* Estado: Processando */}
				{state === "processing" && (
					<div className="space-y-6 py-8">
						<div className="text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
								<Loader2 className="h-16 w-16 animate-spin text-[#00a89a]" />
							</div>
							<h3 className="mb-2 text-lg font-semibold text-[#3b3b3b] dark:text-[#f4f4f4]">
								Processando com IA...
							</h3>
							<p className="text-sm text-[#5e5e5e] dark:text-[#d1d1d1]">
								Transcrevendo áudio e gerando resumo clínico estruturado
							</p>
						</div>
						<div className="space-y-2 text-xs text-[#919191] text-center">
							<p>✓ Transcrição com Whisper Large V3</p>
							<p>✓ Análise com Llama 3.3 70B</p>
							<p>✓ Estruturação do prontuário SOAP</p>
						</div>
					</div>
				)}

				{/* Estado: Erro */}
				{state === "error" && (
					<div className="space-y-6 text-center py-6">
						<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
							<AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
						</div>
						<div>
							<h3 className="mb-2 text-lg font-semibold text-[#3b3b3b] dark:text-[#f4f4f4]">
								Erro ao processar
							</h3>
							<p className="text-sm text-red-600 dark:text-red-400">
								{errorMessage}
							</p>
						</div>
						<Button
							onClick={handleReset}
							variant="outline"
							size="lg"
							className="w-full"
						>
							<RotateCcw className="mr-2 h-4 w-4" />
							Tentar novamente
						</Button>
					</div>
				)}

				{/* Estado: Completo */}
				{state === "complete" && (
					<div className="space-y-3 animate-in fade-in duration-500">
						{/* Header */}
						<div className="flex items-center justify-between pb-3 border-b-2 border-[#00ccbd]/20 dark:border-[#00ccbd]/30">
							<div className="flex items-center gap-2">
								<div className="relative">
									<div className="absolute inset-0 animate-ping rounded-full bg-[#00a89a]/20" />
									<CheckCircle2 className="relative h-5 w-5 text-[#00a89a]" />
								</div>
								<div>
									<h3 className="text-sm font-bold text-[#3b3b3b] dark:text-[#f4f4f4]">
										Prontuário Gerado
									</h3>
									<p className="text-[9px] text-[#919191]">Análise completa por IA médica</p>
								</div>
							</div>
							<div className="flex flex-col items-end gap-1">
								<span className="rounded-full bg-gradient-to-r from-[#00ccbd]/20 to-[#00a89a]/20 px-2.5 py-0.5 text-[9px] font-bold text-[#007c79] dark:text-[#00ccbd] border border-[#00ccbd]/30">
									✨ Whisper V3
								</span>
								<span className="text-[8px] text-[#919191]">{recordingTime}s gravados</span>
							</div>
						</div>

						{/* Resumo Principal */}
						{medicalRecord?.summary && (
							<div className="group relative rounded-xl bg-gradient-to-br from-[#00ccbd]/10 via-[#00ccbd]/5 to-transparent p-4 border-2 border-[#00ccbd]/30 dark:from-[#00ccbd]/20 dark:via-[#00ccbd]/10 hover:border-[#00ccbd]/50 transition-all duration-300 shadow-sm hover:shadow-md">
								<div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#00ccbd]/20">
									<FileText className="h-3 w-3 text-[#007c79] dark:text-[#00ccbd]" />
								</div>
								<h4 className="mb-2 text-[11px] font-bold text-[#007c79] dark:text-[#00ccbd] uppercase tracking-wide">
									📋 Resumo Clínico
								</h4>
								<p className="text-xs leading-relaxed text-[#3b3b3b] dark:text-[#f4f4f4] pr-8">
									{medicalRecord.summary}
								</p>
							</div>
						)}

						{/* SOAP Grid 2x2 */}
						{medicalRecord && (
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<div className="h-5 w-1 bg-gradient-to-b from-[#00ccbd] to-[#00a89a] rounded-full" />
									<h4 className="text-[11px] font-bold text-[#3b3b3b] dark:text-[#f4f4f4] uppercase tracking-wide">
										🏥 Prontuário SOAP
									</h4>
								</div>
								<div className="grid grid-cols-2 gap-2">
									{medicalRecord.soap.subjective && (
										<SOAPMiniSection title="S" content={medicalRecord.soap.subjective} />
									)}
									{medicalRecord.soap.objective && (
										<SOAPMiniSection title="O" content={medicalRecord.soap.objective} />
									)}
									{medicalRecord.soap.assessment && (
										<SOAPMiniSection title="A" content={medicalRecord.soap.assessment} />
									)}
									{medicalRecord.soap.plan && (
										<SOAPMiniSection title="P" content={medicalRecord.soap.plan} />
									)}
								</div>
							</div>
						)}

{/* Transcrição Sempre Visível */}
					{transcricao && (
						<div className="rounded-lg bg-gradient-to-r from-[#f4f4f4] to-white/60 dark:from-[#1a1a1a] dark:to-[#0f0f0f]/60 p-3 border border-[#f4f4f4] dark:border-[#2a2a2a]">
							<div className="flex items-center gap-2 mb-2">
								<div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5e5e5e]/10">
									<span className="text-xs">📝</span>
								</div>
								<span className="text-[10px] font-bold text-[#3b3b3b] dark:text-[#f4f4f4] uppercase tracking-wide">
									Transcrição Original
								</span>
							</div>
							<p className="text-[11px] leading-relaxed text-[#5e5e5e] dark:text-[#d1d1d1] italic">
								"{transcricao}"
							</p>
						</div>
						)}

{/* Documentos + Alertas */}
					<div className="space-y-2">
						{medicalRecord?.documents.prescription && (
							<div className="group relative rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-2.5 dark:from-blue-500/20 dark:to-blue-500/10 border-2 border-blue-500/30 hover:border-blue-500/50 transition-all duration-200 hover:shadow-md">
								<div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 border border-blue-500/30">
									<span className="text-[10px]">💊</span>
								</div>
								<h5 className="mb-1.5 text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
									Prescrição
								</h5>
								<p className="text-[10px] leading-snug text-[#5e5e5e] dark:text-[#d1d1d1]">
									{medicalRecord.documents.prescription}
								</p>
							</div>
						)}

						{medicalRecord?.documents.instructions && (
							<div className="group relative rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 p-2.5 dark:from-green-500/20 dark:to-green-500/10 border-2 border-green-500/30 hover:border-green-500/50 transition-all duration-200 hover:shadow-md">
								<div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20 border border-green-500/30">
									<span className="text-[10px]">ℹ️</span>
								</div>
								<h5 className="mb-1.5 text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-wide">
									Instruções ao Paciente
								</h5>
								<p className="text-[10px] leading-snug text-[#5e5e5e] dark:text-[#d1d1d1]">
									{medicalRecord.documents.instructions}
								</p>
							</div>
						)}

						{medicalRecord?.insights && medicalRecord.insights.length > 0 && (
							<div className="rounded-lg bg-gradient-to-br from-yellow-500/15 to-orange-500/10 p-3 dark:from-yellow-500/25 dark:to-orange-500/20 border-2 border-yellow-500/40 hover:border-yellow-500/60 transition-all duration-200 shadow-sm">
								<div className="flex items-center gap-2 mb-1.5">
									<div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500/30">
										<AlertCircle className="h-3 w-3 text-yellow-700 dark:text-yellow-400" />
									</div>
									<h5 className="text-[10px] font-bold text-yellow-700 dark:text-yellow-400 uppercase tracking-wide">
										⚠️ Alertas Clínicos
									</h5>
								</div>
								<ul className="space-y-1 text-[10px] text-yellow-800 dark:text-yellow-300">
									{medicalRecord.insights.slice(0, 2).map((insight, idx) => (
										<li key={idx} className="flex items-start gap-1.5">
												<span className="text-yellow-600 dark:text-yellow-500 mt-0.5">•</span>
												<span>{insight}</span>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>

						{resumo && (
							<>
								<ResumoSection
									title="Queixa Principal"
									content={resumo.queixaPrincipal}
								/>

								<ResumoSection
									title="Conduta"
									content={resumo.conduta}
								/>

								{resumo.exames && resumo.exames.length > 0 && (
									<div className="rounded-xl bg-white/60 p-3 dark:bg-[#0f0f0f]/60">
										<p className="mb-2 text-xs font-semibold text-[#3b3b3b] dark:text-[#f4f4f4]">
											Exames Solicitados
										</p>
										<div className="flex flex-wrap gap-1.5">
											{resumo.exames.map((exam, idx) => (
												<span
													key={idx}
													className="rounded-md bg-[#f4f4f4] px-2 py-1 text-[10px] font-medium text-[#5e5e5e] dark:bg-[#1a1a1a] dark:text-[#d1d1d1]"
												>
													{exam}
												</span>
											))}
										</div>
									</div>
								)}

								<div className="space-y-2.5 pt-3 border-t border-[#f4f4f4] dark:border-[#2a2a2a]">
									<p className="text-xs font-medium text-[#919191]">
										Documentos que podem ser gerados:
									</p>
									<div className="flex flex-wrap gap-2">
										{resumo.documentos?.map((doc, idx) => (
											<DocumentBadge key={idx} label={doc} icon={<FileText />} />
										))}
									</div>
								</div>
							</>
						)}

						<Button
							onClick={handleReset}
							variant="outline"
							size="default"
							className="w-full mt-2 group hover:bg-[#007c79] hover:text-white hover:border-[#007c79] transition-all duration-300"
						>
							<RotateCcw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
							Testar novamente
						</Button>
					</div>
				)}
			</div>

			{/* Indicador inferior */}
			{state !== "idle" && state !== "error" && (
				<div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#919191]">
					<span className="flex h-2 w-2">
						<span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#00ccbd] opacity-75"></span>
						<span className="relative inline-flex h-2 w-2 rounded-full bg-[#00a89a]"></span>
					</span>
					<span>IA Real • Whisper Large V3 (Groq)</span>
				</div>
			)}
		</div>
	);
}

interface ResumoSectionProps {
	title: string;
	content: string;
}

function ResumoSection({ title, content }: ResumoSectionProps) {
	return (
		<div className="rounded-xl bg-white/60 p-3 dark:bg-[#0f0f0f]/60">
			<h4 className="mb-1.5 text-xs font-semibold text-[#3b3b3b] dark:text-[#f4f4f4]">
				{title}
			</h4>
			<p className="text-xs leading-relaxed text-[#5e5e5e] dark:text-[#d1d1d1]">
				{content}
			</p>
		</div>
	);
}

interface SOAPSectionProps {
	title: string;
	content: string;
}

function SOAPSection({ title, content }: SOAPSectionProps) {
	return (
		<div className="rounded-lg bg-white/60 p-3 dark:bg-[#0f0f0f]/60 border border-[#f4f4f4] dark:border-[#2a2a2a]">
			<h5 className="mb-1.5 text-[10px] font-bold text-[#007c79] dark:text-[#00ccbd] uppercase tracking-wide">
				{title}
			</h5>
			<p className="text-xs leading-relaxed text-[#3b3b3b] dark:text-[#f4f4f4]">
				{content}
			</p>
		</div>
	);
}

interface SOAPMiniSectionProps {
	title: string;
	content: string;
}

function SOAPMiniSection({ title, content }: SOAPMiniSectionProps) {
	return (
		<div className="rounded-lg bg-white/60 p-2 dark:bg-[#0f0f0f]/60 border border-[#f4f4f4] dark:border-[#2a2a2a]">
			<h5 className="mb-1 text-[9px] font-bold text-[#007c79] dark:text-[#00ccbd] uppercase tracking-wide">
				{title}
			</h5>
			<p className="text-[10px] leading-snug text-[#3b3b3b] dark:text-[#f4f4f4] line-clamp-3">
				{content}
			</p>
		</div>
	);
}

interface DocumentCardProps {
	title: string;
	content: string;
	type: "prescription" | "certificate" | "instructions";
}

function DocumentCard({ title, content, type }: DocumentCardProps) {
	const bgColors = {
		prescription: "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/30",
		certificate: "bg-purple-500/10 dark:bg-purple-500/20 border-purple-500/30",
		instructions: "bg-green-500/10 dark:bg-green-500/20 border-green-500/30",
	};

	return (
		<div className={`rounded-lg p-3 border ${bgColors[type]}`}>
			<h5 className="mb-2 text-xs font-semibold text-[#3b3b3b] dark:text-[#f4f4f4]">
				{title}
			</h5>
			<p className="text-xs leading-relaxed text-[#5e5e5e] dark:text-[#d1d1d1] whitespace-pre-line">
				{content}
			</p>
		</div>
	);
}

interface DocumentBadgeProps {
	label: string;
	icon: React.ReactNode;
}

function DocumentBadge({ label, icon }: DocumentBadgeProps) {
	return (
		<span className="inline-flex items-center gap-1.5 rounded-lg bg-[#00ccbd]/5 px-3 py-1.5 text-[11px] font-medium text-[#007c79] dark:bg-[#00ccbd]/10 dark:text-[#00ccbd]">
			<span className="h-3.5 w-3.5">{icon}</span>
			{label}
		</span>
	);
}
