import * as React from "react";
import Link from "next/link";
import { Logo } from "../ui/logo";

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-[#f4f4f4] bg-[#ffffff] pt-10 pb-8 text-sm text-[#5e5e5e] dark:border-[#2a2a2a] dark:bg-[#0a0a0a]">
			<div className="container">
				<div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
					<div className="space-y-4">
						<Logo width={160} height={40} />
						<p className="max-w-sm text-xs text-[#919191] dark:text-[#919191]">
							Vocalmed ajuda equipes de saúde a registrar consultas com mais
							atenção ao paciente e menos tempo de digitação.
						</p>
					</div>

					<div className="grid gap-6 sm:grid-cols-3">
						<FooterColumn
							title="Produto"
							links={[
								{ label: "Como funciona", href: "#sobre" },
								{ label: "Recursos", href: "#recursos" },
								{ label: "Planos", href: "#precos" },
							]}
						/>
						<FooterColumn
							title="Soluções"
							links={[
								{ label: "Clínicas", href: "#" },
								{ label: "Hospitais", href: "#" },
								{ label: "Telemedicina", href: "#" },
							]}
						/>
						<FooterColumn
							title="Empresa"
							links={[
								{ label: "Contato", href: "#contato" },
								{ label: "Segurança e LGPD", href: "#" },
							]}
						/>
					</div>
				</div>

				<div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#f4f4f4] pt-4 text-xs text-[#919191] dark:border-[#2a2a2a] md:flex-row">
					<div className="flex flex-col items-center md:items-start gap-2">
						<p>© {year} Vocalmed. Todos os direitos reservados.</p>
						<div className="flex flex-col items-center md:items-start gap-1 text-[10px]">
							<p className="text-[#00a89a] font-semibold">Desenvolvido pela NuDigital</p>
							<p className="text-[#5e5e5e] dark:text-[#919191]">Destaque feito por Presley Mourão</p>
						</div>
					</div>
					<div className="flex flex-wrap items-center gap-4">
						<Link href="#" className="hover:text-[#007c79]">
							Termos de uso
						</Link>
						<Link href="#" className="hover:text-[#007c79]">
							Política de privacidade
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}

interface FooterColumnProps {
	title: string;
	links: { label: string; href: string }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
	return (
		<div className="space-y-3">
			<h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#3b3b3b] dark:text-[#f4f4f4]">
				{title}
			</h3>
			<ul className="space-y-2 text-xs text-[#5e5e5e] dark:text-[#b3b3b3]">
				{links.map((link) => (
					<li key={link.label}>
						<Link href={link.href} className="hover:text-[#007c79]">
							{link.label}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

