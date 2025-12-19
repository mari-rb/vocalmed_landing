import { Button } from "../ui/button";
import { Section } from "../layout/section";

export function CtaSection() {
	return (
		<Section id="cta" className="bg-[#1fa093] dark:bg-[#007c79]">
			<div className="flex flex-col items-center gap-8 lg:gap-10 text-center text-white">
				<div className="space-y-4 max-w-2xl">
					<p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
						Pronto para começar?
					</p>
					<h2 className="text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
						Descubra um novo ritmo nas suas consultas.
					</h2>
					<p className="text-base sm:text-lg text-white/90">
						Reduza o tempo de digitação, aumente o olhar para o paciente e deixe a Vocalmed cuidar das notas clínicas e orientações.
					</p>
				</div>
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
					<Button
						variant="primary"
						size="lg"
						className="bg-white text-[#007c79] hover:bg-[#f4f4f4] hover:text-[#007c79]"
					>
						Agendar conversa com especialista
					</Button>
					<Button
						variant="outline"
						size="lg"
						className="border-white text-white hover:bg-[#00a89a] hover:text-white"
					>
						Ver planos para clínicas
					</Button>
				</div>
				<p className="text-xs text-white/80">
					Sem compromisso • Ideal para equipes médicas, telemedicina e clínicas.
				</p>
			</div>
		</Section>
	);
}

