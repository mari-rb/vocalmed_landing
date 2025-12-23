"use client";

import type { ReactNode } from "react";
import { Mic, Sparkles, FileText, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";
import { InteractiveDemo } from "../ui/interactive-demo";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[var(--background)] py-8 sm:py-12 lg:py-16"
    >
      {/* Elementos decorativos de fundo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-[-80px] h-56 w-56 rounded-full bg-[#00ccbd]/10 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-80px] h-64 w-64 rounded-full bg-[#1fa093]/10 blur-3xl" />
      </div>

      <div className="container">
        <div className="grid items-center gap-6 lg:gap-10 xl:gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          {/* Coluna de texto */}
          <div className="space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-[#007c79] shadow-sm dark:bg-[#101010] dark:text-[#00ccbd]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00ccbd]/10 text-[#007c79] dark:bg-[#1fa093]/20 dark:text-[#00ccbd]">
                <Mic className="h-3 w-3" />
              </span>
              <span>Gravações seguras + IA para consultas médicas</span>
            </div>

            <div className="space-y-4 lg:space-y-5">
              <h1 className="text-3xl font-semibold leading-tight text-[#3b3b3b] dark:text-[#f4f4f4] sm:text-4xl lg:text-5xl xl:text-[3.25rem] lg:leading-[1.1]">
                Grave suas consultas.
                <span className="block text-[#007c79] dark:text-[#00ccbd]">
                  Deixe a Vocalmed escrever por você.
                </span>
              </h1>
              <p className="max-w-xl text-base text-[#5e5e5e] dark:text-[#d1d1d1] sm:text-lg">
                Vocalmed captura o áudio da consulta e gera automaticamente
                resumos clínicos estruturados, plano terapêutico e orientações
                para o paciente em poucos minutos.
              </p>
            </div>

            {/* CTA principal */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
              <Button
                variant="primary"
                size="lg"
                className="px-10 py-4 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="#precos">Ver planos e preços</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-10 py-4 text-base font-semibold border-2 border-[#00a89a] text-[#00a89a] hover:border-[#00a89a] hover:bg-[#00a89a] hover:text-white dark:border-[#00ccbd] dark:text-[#00ccbd] dark:hover:bg-[#00ccbd] dark:hover:border-[#00ccbd] dark:hover:text-[#0a0a0a] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                asChild
              >
                <a href="#prontuario">Ver exemplo de resumo</a>
              </Button>
            </div>
            <p className="text-sm text-[#919191]">
              Sem cartão de crédito • Ideal para médicos, clínicas e
              telemedicina.
            </p>

            {/* Lista de benefícios rápidos */}
            <div className="grid gap-4 sm:grid-cols-3">
              <FeatureChip
                icon={<Sparkles className="h-4 w-4" />}
                title="Resumos automáticos"
                description="Histórico, queixas e plano organizados pela IA."
              />
              <FeatureChip
                icon={<FileText className="h-4 w-4" />}
                title="Notas estruturadas"
                description="Campos prontos para prontuário eletrônico."
              />
              <FeatureChip
                icon={<ShieldCheck className="h-4 w-4" />}
                title="Privacidade em dia"
                description="Segurança pensada para LGPD na saúde."
              />
            </div>
          </div>

          {/* Coluna visual / demo interativa */}
          <div className="relative">
            <InteractiveDemo />
          </div>
        </div>
      </div>
    </section>
  );
}

interface FeatureChipProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function FeatureChip({ icon, title, description }: FeatureChipProps) {
  return (
    <div className="rounded-2xl bg-white/80 p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-[#101010]">
      <div className="mb-3 inline-flex items-center justify-center rounded-full bg-[#00ccbd]/10 p-2 text-[#007c79] dark:bg-[#00ccbd]/20 dark:text-[#00ccbd]">
        {icon}
      </div>
      <p className="mb-1 text-sm font-semibold text-[#3b3b3b] dark:text-[#f4f4f4]">
        {title}
      </p>
      <p className="text-xs text-[#919191] dark:text-[#b3b3b3] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
