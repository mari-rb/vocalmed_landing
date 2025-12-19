import { FileText, Clock, CheckCircle2 } from "lucide-react";

interface ConsultationDemoCardProps {
	className?: string;
}

export function ConsultationDemoCard({ className }: ConsultationDemoCardProps) {
	return (
		<div className={className}>
			{/* Elemento decorativo */}
			<div className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rounded-3xl bg-[#00ccbd]/15 blur-2xl" />

			{/* Card com o resultado - o resumo gerado */}
			<div className="relative mx-auto w-full max-w-md">
				<div className="rounded-3xl bg-gradient-to-br from-white to-[#f9f9f9] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.08)] dark:from-[#101010] dark:to-[#0a0a0a] dark:border dark:border-[#2a2a2a]">
					{/* Header */}
					<div className="mb-5 flex items-start justify-between gap-3">
						<div className="flex-1">
							<div className="mb-1 flex items-center gap-2">
								<FileText className="h-4 w-4 text-[#00a89a]" />
								<h3 className="text-sm font-semibold text-[#3b3b3b] dark:text-[#f4f4f4]">
									Resumo Clínico Gerado
								</h3>
							</div>
							<p className="text-xs text-[#919191]">
								Ana Paula Silva • Retorno Cardiologia
							</p>
						</div>
						<span className="flex items-center gap-1 rounded-full bg-[#00ccbd]/10 px-2.5 py-1 text-[10px] font-medium text-[#007c79] dark:bg-[#00ccbd]/20 dark:text-[#00ccbd]">
							<Clock className="h-3 w-3" />
							<span>45s</span>
						</span>
					</div>

					{/* Conteúdo do resumo */}
					<div className="space-y-4">
						<ResumoSection
							title="Queixa Principal"
							content="Paciente retorna para acompanhamento de hipertensão arterial. Relata adesão regular à medicação, com medições domiciliares entre 130-140/80-90 mmHg."
						/>

						<ResumoSection
							title="Conduta"
							content="Mantida prescrição atual (Losartana 50mg). Reforçada orientação sobre restrição de sódio e prática de atividade física. Retorno em 3 meses."
						/>

						<ResumoSection
							title="Exames Solicitados"
							content="Hemograma completo, Creatinina, Potássio, ECG"
							icon={<CheckCircle2 className="h-3.5 w-3.5 text-[#00a89a]" />}
						/>
					</div>

					{/* Footer com ações disponíveis */}
					<div className="mt-5 pt-4 border-t border-[#f4f4f4] dark:border-[#2a2a2a]">
						<p className="mb-2.5 text-xs font-medium text-[#919191]">
							Documentos disponíveis:
						</p>
						<div className="flex flex-wrap gap-2">
							<DocumentBadge label="Prontuário" />
							<DocumentBadge label="Receita" />
							<DocumentBadge label="Atestado" />
							<DocumentBadge label="Orientações ao paciente" />
						</div>
					</div>
				</div>

				{/* Indicador visual de "gerado por IA" */}
				<div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#919191]">
					<span className="flex h-2 w-2">
						<span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#00ccbd] opacity-75"></span>
						<span className="relative inline-flex h-2 w-2 rounded-full bg-[#00a89a]"></span>
					</span>
					<span>Gerado automaticamente pela IA em menos de 1 minuto</span>
				</div>
			</div>
		</div>
	);
}

interface ResumoSectionProps {
	title: string;
	content: string;
	icon?: React.ReactNode;
}

function ResumoSection({ title, content, icon }: ResumoSectionProps) {
	return (
		<div className="rounded-xl bg-white/60 p-3.5 dark:bg-[#0f0f0f]/60 backdrop-blur-sm">
			<div className="mb-1.5 flex items-center gap-1.5">
				{icon}
				<h4 className="text-xs font-semibold text-[#3b3b3b] dark:text-[#f4f4f4]">
					{title}
				</h4>
			</div>
			<p className="text-xs leading-relaxed text-[#5e5e5e] dark:text-[#d1d1d1]">
				{content}
			</p>
		</div>
	);
}

interface DocumentBadgeProps {
	label: string;
}

function DocumentBadge({ label }: DocumentBadgeProps) {
	return (
		<span className="inline-flex items-center rounded-md bg-[#f4f4f4] px-2.5 py-1 text-[10px] font-medium text-[#5e5e5e] dark:bg-[#1a1a1a] dark:text-[#d1d1d1]">
			{label}
		</span>
	);
}
