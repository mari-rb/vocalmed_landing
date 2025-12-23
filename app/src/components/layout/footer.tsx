import * as React from "react";
import Link from "next/link";
import { Logo } from "../ui/logo";
import { Instagram, Music, MapPin, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e5e7eb] bg-white pt-12 pb-6 text-sm text-[#5e5e5e] dark:border-[#2a2a2a] dark:bg-[#0a0a0a] dark:text-[#b3b3b3]">
      <div className="container max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid gap-8 lg:gap-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
          {/* Coluna 1: Logo e Informações - 5 colunas */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <Logo width={160} height={40} />
              <p className="mt-3 text-sm leading-relaxed text-[#6b7280] dark:text-[#919191] max-w-sm">
                Transforme sua voz em prontuários completos com IA.
              </p>
            </div>

            <div className="flex items-start gap-2.5 text-xs leading-relaxed">
              <MapPin className="w-4 h-4 text-[#00a89a] flex-shrink-0 mt-0.5" />
              <p className="text-[#6b7280] dark:text-[#919191] max-w-xs">
                Av. Brig Faria Lima – 1572 - sala 1022 – Jardim Paulistano – São
                Paulo/SP – CEP 01451-917
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-[#d1d5db] dark:border-[#374151] flex items-center justify-center text-[#6b7280] dark:text-[#9ca3af] hover:border-[#00a89a] hover:text-[#00a89a] transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="https://tiktok.com"
                target="_blank"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full border border-[#d1d5db] dark:border-[#374151] flex items-center justify-center text-[#6b7280] dark:text-[#9ca3af] hover:border-[#00a89a] hover:text-[#00a89a] transition-all duration-200"
              >
                <Music className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Coluna 2: Links Úteis - 3 colunas */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-[#111827] dark:text-[#f4f4f4]">
              Links Úteis
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="#sobre"
                  className="text-[#6b7280] dark:text-[#b3b3b3] hover:text-[#00a89a] dark:hover:text-[#00a89a] transition-colors"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="#recursos"
                  className="text-[#6b7280] dark:text-[#b3b3b3] hover:text-[#00a89a] dark:hover:text-[#00a89a] transition-colors"
                >
                  Recursos
                </Link>
              </li>
              <li>
                <Link
                  href="#nossa-ia"
                  className="text-[#6b7280] dark:text-[#b3b3b3] hover:text-[#00a89a] dark:hover:text-[#00a89a] transition-colors"
                >
                  Nossa IA
                </Link>
              </li>
              <li>
                <Link
                  href="#precos"
                  className="text-[#6b7280] dark:text-[#b3b3b3] hover:text-[#00a89a] dark:hover:text-[#00a89a] transition-colors"
                >
                  Preços
                </Link>
              </li>
              <li>
                <Link
                  href="#depoimentos"
                  className="text-[#6b7280] dark:text-[#b3b3b3] hover:text-[#00a89a] dark:hover:text-[#00a89a] transition-colors"
                >
                  Depoimentos
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Legal e Contato - 4 colunas */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-[#111827] dark:text-[#f4f4f4]">
              Legal e Contato
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="#termos"
                  className="text-[#6b7280] dark:text-[#b3b3b3] hover:text-[#00a89a] dark:hover:text-[#00a89a] transition-colors"
                >
                  Termos de uso
                </Link>
              </li>
              <li>
                <Link
                  href="#privacidade"
                  className="text-[#6b7280] dark:text-[#b3b3b3] hover:text-[#00a89a] dark:hover:text-[#00a89a] transition-colors"
                >
                  Política de privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="#contato"
                  className="text-[#6b7280] dark:text-[#b3b3b3] hover:text-[#00a89a] dark:hover:text-[#00a89a] transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha divisória e rodapé inferior */}
        <div className="mt-12 pt-6 border-t border-[#e5e7eb] dark:border-[#2a2a2a] space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#6b7280] dark:text-[#919191]">
              <span>Conheça o fundador</span>
              <Instagram className="w-3.5 h-3.5 text-[#00a89a]" />
              <Link
                href="https://instagram.com/presleymourao"
                target="_blank"
                className="text-[#00a89a] hover:underline font-medium"
              >
                @presleymourao
              </Link>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Mail className="w-3.5 h-3.5 text-[#00a89a]" />
              <a
                href="mailto:contato@vocalmed.com.br"
                className="text-[#6b7280] dark:text-[#919191] hover:text-[#00a89a] transition-colors"
              >
                contato@vocalmed.com.br
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-[#e5e7eb] dark:border-[#2a2a2a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#9ca3af]">
            <p>© {year} VocalMed. CNPJ: 62.507.018/0001-31</p>
            <div className="flex items-center gap-1.5">
              <span>Desenvolvido por</span>
              <Link
                href="https://nudigital.com.br"
                target="_blank"
                className="text-[#00a89a] hover:underline font-medium"
              >
                Nudigital Assessoria Comercial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
