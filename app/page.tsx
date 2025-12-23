import { Navbar } from "././src/components/layout/navbar";
import { Hero } from "././src/components/sections/hero";
import { Section } from "././src/components/layout/section";
import { CtaSection } from "././src/components/sections/cta-section";
import { Testimonial } from "././src/components/ui/testimonial";
import { Footer } from "././src/components/layout/footer";
import { ScrollToTop } from "././src/components/ui/scroll-to-top";
import { PricingSection } from "././src/components/ui/pricing-section";
import Image from "next/image";
import {
  Stethoscope,
  ClipboardList,
  Brain,
  ShieldCheck,
  Activity,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar
        items={[
          { label: "Sobre", href: "#sobre" },
          { label: "Recursos", href: "#recursos" },
          { label: "Preços", href: "#precos" },
          { label: "Nossa IA", href: "#nossa-ia" },
          { label: "Depoimentos", href: "#depoimentos" },
        ]}
        ctaLabel="Começar Grátis"
        ctaHref="#precos"
      />
      <Hero />
      {/* Missão / bloco imagem + texto */}
      <section
        id="sobre"
        className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-[#00ccbd]/5 via-white to-[#00a89a]/5 dark:from-[#00ccbd]/10 dark:via-[#0f0f0f] dark:to-[#00a89a]/10"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-[#00ccbd]/10 blur-3xl" />
          <div className="absolute right-0 bottom-20 h-[500px] w-[500px] rounded-full bg-[#00a89a]/10 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#00a89a]">
                Nossa missão na Vocalmed
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3b3b3b] dark:text-[#f4f4f4] mb-4">
                Consultas mais humanas, registros mais inteligentes.
              </h2>
              <p className="text-base text-[#5e5e5e] dark:text-[#d1d1d1] max-w-3xl mx-auto">
                Vocalmed foi criada para que médicos possam olhar mais para o
                paciente e menos para a tela. Enquanto você conduz a conversa,
                nossa IA transforma a fala em registro clínico organizado.
              </p>
            </div>
            <div className="grid items-center gap-10 lg:gap-16 xl:gap-20 lg:grid-cols-2">
              <div className="relative order-2 overflow-hidden rounded-3xl bg-gradient-to-br from-[#00ccbd]/5 to-[#00a89a]/5 p-8 lg:order-1 border border-[#00ccbd]/10">
                <div className="relative space-y-6">
                  {/* Fluxo visual animado sequencial: Gravação → IA → Prontuário */}
                  <div className="flex items-start justify-center gap-0">
                    {/* Passo 1: Consulta Médica - SEMPRE ATIVO */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative">
                        {/* Glow permanente */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00ccbd] to-[#00a89a] rounded-2xl blur-lg opacity-60 animate-[glow_2s_ease-in-out_infinite]" />
                        {/* Ícone ativo */}
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00ccbd] to-[#00a89a] shadow-2xl shadow-[#00ccbd]/40 ring-2 ring-[#00ccbd]/30 ring-offset-2 ring-offset-white dark:ring-offset-[#0f0f0f]">
                          <Stethoscope className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-[#007c79] dark:text-[#00ccbd] text-center">
                        Consulta
                        <br />
                        Médica
                      </p>
                    </div>

                    {/* Animação de fluxo 1 - Linha que enche */}
                    <div className="flex items-center relative w-16 mt-8">
                      {/* Linha base (cinza) */}
                      <div className="h-0.5 w-full bg-[#e5e5e5] dark:bg-[#2a2a2a]" />
                      {/* Linha que enche (gradiente) */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-[#00ccbd] to-[#00a89a] animate-[fillLine_6s_ease-in-out_infinite]" />
                      </div>
                      {/* Ponto no final da linha */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-2.5 w-2.5 rounded-full bg-[#00a89a] shadow-lg shadow-[#00a89a]/50 opacity-0 animate-[showDot_6s_ease-in-out_infinite]" />
                    </div>

                    {/* Passo 2: IA Vital AI - Ativa quando linha 1 termina */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative">
                        {/* Glow que ativa depois */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00ccbd] to-[#00a89a] rounded-2xl blur-lg opacity-0 animate-[glowDelayed_6s_ease-in-out_infinite]" />
                        {/* Ícone inativo que ativa */}
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e5e5e5] dark:bg-[#2a2a2a] shadow-lg animate-[activateIcon_6s_ease-in-out_infinite]">
                          <Brain className="h-8 w-8 text-[#919191] dark:text-[#5e5e5e] animate-[activateIconColor_6s_ease-in-out_infinite]" />
                        </div>
                        {/* Badge de atividade */}
                        <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center opacity-0 animate-[showBadge_6s_ease-in-out_infinite]">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ccbd] opacity-75" />
                          <span className="relative inline-flex h-3 w-3 rounded-full bg-[#00ccbd]" />
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-[#919191] dark:text-[#5e5e5e] text-center animate-[activateText_6s_ease-in-out_infinite]">
                        IA
                        <br />
                        Vital AI
                      </p>
                    </div>

                    {/* Animação de fluxo 2 - Linha que enche depois */}
                    <div className="flex items-center relative w-16 mt-8">
                      {/* Linha base (cinza) */}
                      <div className="h-0.5 w-full bg-[#e5e5e5] dark:bg-[#2a2a2a]" />
                      {/* Linha que enche (gradiente) */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-[#00ccbd] to-[#00a89a] animate-[fillLine2_6s_ease-in-out_infinite]" />
                      </div>
                      {/* Ponto no final da linha */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-2.5 w-2.5 rounded-full bg-[#00a89a] shadow-lg shadow-[#00a89a]/50 opacity-0 animate-[showDot2_6s_ease-in-out_infinite]" />
                    </div>

                    {/* Passo 3: Prontuário Estruturado - Ativa quando linha 2 termina */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative">
                        {/* Glow que ativa depois */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00ccbd] to-[#00a89a] rounded-2xl blur-lg opacity-0 animate-[glowDelayed2_6s_ease-in-out_infinite]" />
                        {/* Ícone inativo que ativa */}
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e5e5e5] dark:bg-[#2a2a2a] shadow-lg animate-[activateIcon2_6s_ease-in-out_infinite]">
                          <ClipboardList className="h-8 w-8 text-[#919191] dark:text-[#5e5e5e] animate-[activateIconColor2_6s_ease-in-out_infinite]" />
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-[#919191] dark:text-[#5e5e5e] text-center animate-[activateText2_6s_ease-in-out_infinite]">
                        Prontuário
                        <br />
                        Estruturado
                      </p>
                    </div>
                  </div>

                  {/* Cards de benefícios visuais */}
                  <div className="grid grid-cols-2 gap-4 pt-6">
                    <div className="rounded-xl bg-white dark:bg-[#1a1a1a] p-4 shadow-sm border border-[#00ccbd]/10 animate-[fadeIn_0.6s_ease-in-out_0.8s_backwards] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-[#00a89a] animate-pulse" />
                        <p className="text-xs font-bold text-[#3b3b3b] dark:text-[#f4f4f4]">
                          Transcrição automática
                        </p>
                      </div>
                      <p className="text-xs text-[#5e5e5e] dark:text-[#d1d1d1]">
                        Áudio convertido em texto médico
                      </p>
                    </div>

                    <div className="rounded-xl bg-white dark:bg-[#1a1a1a] p-4 shadow-sm border border-[#00ccbd]/10 animate-[fadeIn_0.6s_ease-in-out_0.9s_backwards] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-[#00a89a] animate-pulse" />
                        <p className="text-xs font-bold text-[#3b3b3b] dark:text-[#f4f4f4]">
                          SOAP organizado
                        </p>
                      </div>
                      <p className="text-xs text-[#5e5e5e] dark:text-[#d1d1d1]">
                        Estrutura clínica pronta
                      </p>
                    </div>

                    <div className="rounded-xl bg-white dark:bg-[#1a1a1a] p-4 shadow-sm border border-[#00ccbd]/10 animate-[fadeIn_0.6s_ease-in-out_1s_backwards] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-[#00a89a] animate-pulse" />
                        <p className="text-xs font-bold text-[#3b3b3b] dark:text-[#f4f4f4]">
                          Documentos gerados
                        </p>
                      </div>
                      <p className="text-xs text-[#5e5e5e] dark:text-[#d1d1d1]">
                        Receitas e orientações
                      </p>
                    </div>

                    <div className="rounded-xl bg-white dark:bg-[#1a1a1a] p-4 shadow-sm border border-[#00ccbd]/10 animate-[fadeIn_0.6s_ease-in-out_1.1s_backwards] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-[#00a89a] animate-pulse" />
                        <p className="text-xs font-bold text-[#3b3b3b] dark:text-[#f4f4f4]">
                          Documentos gerados
                        </p>
                      </div>
                      <p className="text-xs text-[#5e5e5e] dark:text-[#d1d1d1]">
                        Receitas e orientações
                      </p>
                    </div>

                    <div className="rounded-xl bg-white dark:bg-[#1a1a1a] p-4 shadow-sm border border-[#00ccbd]/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-[#00a89a]" />
                        <p className="text-xs font-bold text-[#3b3b3b] dark:text-[#f4f4f4]">
                          100% revisável
                        </p>
                      </div>
                      <p className="text-xs text-[#5e5e5e] dark:text-[#d1d1d1]">
                        Você tem controle total
                      </p>
                    </div>
                  </div>

                  {/* Indicador de tempo */}
                  <div className="flex items-center justify-center gap-2 pt-4">
                    <Activity className="h-4 w-4 text-[#00a89a]" />
                    <p className="text-sm font-semibold text-[#00a89a]">
                      Processo completo em minutos
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 space-y-5 lg:space-y-6 lg:order-2">
                <h3 className="text-lg font-semibold text-[#3b3b3b] dark:text-[#f4f4f4] lg:text-xl">
                  Da gravação ao prontuário em minutos.
                </h3>
                <p className="text-sm text-[#5e5e5e]">
                  Em vez de digitar tudo ao final do dia, você ativa a Vocalmed,
                  realiza a consulta normalmente e recebe um resumo clínico
                  estruturado, pronto para revisão e envio ao prontuário
                  eletrônico.
                </p>
                <ul className="mt-2 grid gap-3 text-sm text-[#5e5e5e] dark:text-[#d1d1d1] sm:text-base">
                  <li>
                    • Menos tempo em papelada, mais tempo em decisões clínicas.
                  </li>
                  <li>
                    • Histórico organizado por consultas, queixas e evoluções.
                  </li>
                  <li>• Linguagem adaptada para médico e para paciente.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos / serviços principais */}
      <Section
        id="recursos"
        eyebrow="Recursos principais"
        title="Tudo o que você precisa para registrar consultas com IA."
        description="Da gravação segura à geração de documentos clínicos completos, a Vocalmed acompanha o fluxo de trabalho de consultórios e clínicas."
      >
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="group relative rounded-2xl bg-gradient-to-br from-[#00ccbd]/10 to-[#00a89a]/10 dark:from-[#00ccbd]/20 dark:to-[#00a89a]/20 p-6 border-2 border-[#00ccbd]/20 hover:border-[#00ccbd]/40 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00ccbd] to-[#00a89a] shadow-lg mb-4">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#3b3b3b] dark:text-[#f4f4f4] mb-2">
              Resumo clínico inteligente
            </h3>
            <p className="text-sm text-[#5e5e5e] dark:text-[#d1d1d1]">
              Queixa, história, exame físico e conduta organizados em blocos
              claros para revisão rápida.
            </p>
          </div>
          <div className="group relative rounded-2xl bg-gradient-to-br from-[#00a89a]/10 to-[#007c79]/10 dark:from-[#00a89a]/20 dark:to-[#007c79]/20 p-6 border-2 border-[#00a89a]/20 hover:border-[#00a89a]/40 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00a89a] to-[#007c79] shadow-lg mb-4">
              <ClipboardList className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#3b3b3b] dark:text-[#f4f4f4] mb-2">
              Documentos prontos
            </h3>
            <p className="text-sm text-[#5e5e5e] dark:text-[#d1d1d1]">
              Gere rascunhos de atestados, receitas e orientações ao paciente a
              partir da consulta gravada.
            </p>
          </div>
          <div className="group relative rounded-2xl bg-gradient-to-br from-[#00ccbd]/10 to-[#00a89a]/10 dark:from-[#00ccbd]/20 dark:to-[#00a89a]/20 p-6 border-2 border-[#00ccbd]/20 hover:border-[#00ccbd]/40 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00ccbd] to-[#00a89a] shadow-lg mb-4">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#3b3b3b] dark:text-[#f4f4f4] mb-2">
              IA treinada para saúde
            </h3>
            <p className="text-sm text-[#5e5e5e] dark:text-[#d1d1d1]">
              Modelos ajustados para linguagem médica em português, com foco em
              clareza e segurança.
            </p>
          </div>
          <div className="group relative rounded-2xl bg-gradient-to-br from-[#00a89a]/10 to-[#007c79]/10 dark:from-[#00a89a]/20 dark:to-[#007c79]/20 p-6 border-2 border-[#00a89a]/20 hover:border-[#00a89a]/40 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00a89a] to-[#007c79] shadow-lg mb-4">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#3b3b3b] dark:text-[#f4f4f4] mb-2">
              Segurança e LGPD
            </h3>
            <p className="text-sm text-[#5e5e5e] dark:text-[#d1d1d1]">
              Camadas de segurança e boas práticas de anonimização para proteger
              dados sensíveis.
            </p>
          </div>
        </div>
      </Section>

      {/* Seção de Planos */}
      <section
        id="precos"
        className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-[#00ccbd]/8 via-white to-[#00a89a]/8 dark:from-[#00ccbd]/15 dark:via-[#101010] dark:to-[#00a89a]/15"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#00ccbd]/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-[#00a89a]/10 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <PricingSection />

            {/* Nota sobre planos para equipes */}
            <div className="mt-12 text-center">
              <p className="text-sm text-[#5e5e5e] dark:text-[#d1d1d1] mb-2">
                <span className="font-semibold text-[#3b3b3b] dark:text-[#f4f4f4]">
                  Equipes e clínicas?
                </span>{" "}
                Fale conosco para planos personalizados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prontuário inteligente / bloco grande */}
      <Section
        id="prontuario"
        align="left"
        eyebrow="Prontuário inteligente"
        title="Sua memória clínica, organizada automaticamente."
        description="Veja em um único painel o que foi discutido, decidido e orientado em cada consulta, com campos estruturados para integrar ao seu prontuário eletrônico."
      >
        <div className="grid items-stretch gap-8 lg:gap-12 lg:grid-cols-[1.2fr_minmax(0,1fr)]">
          <div className="flex flex-col justify-between rounded-3xl bg-[#f4f4f4] dark:bg-[#1a1a1a] p-6 lg:p-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#919191]">
                  Consulta resumida
                </p>
                <p className="text-sm font-semibold text-[#3b3b3b] dark:text-[#f4f4f4]">
                  João Silva • Controle de hipertensão
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-white dark:bg-[#101010] px-3 py-1 text-[11px] font-medium text-[#007c79] dark:text-[#00ccbd] shadow-sm">
                <Activity className="mr-1 h-3 w-3" />
                Evolução
              </span>
            </div>
            <div className="space-y-3 rounded-2xl bg-white dark:bg-[#101010] p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-[#3b3b3b] dark:text-[#f4f4f4] dark:text-[#f4f4f4]">
                Resumo da consulta
              </h3>
              <ul className="space-y-1.5 text-xs text-[#5e5e5e] dark:text-[#d1d1d1]">
                <li>
                  • Queixa principal: acompanhamento de pressão arterial e
                  ajuste medicamentoso.
                </li>
                <li>
                  • História: controle irregular da PA em casa, uso intermitente
                  de medicação.
                </li>
                <li>
                  • Conduta: reforço de adesão, ajuste de dose e solicitação de
                  exames.
                </li>
              </ul>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white dark:bg-[#101010] p-3 text-xs text-[#5e5e5e] dark:text-[#d1d1d1] shadow-sm">
                <p className="mb-1 font-semibold text-[#3b3b3b] dark:text-[#f4f4f4]">
                  Medicamentos
                </p>
                <p>Lista automática com dose, frequência e observações.</p>
              </div>
              <div className="rounded-2xl bg-white dark:bg-[#101010] p-3 text-xs text-[#5e5e5e] dark:text-[#d1d1d1] shadow-sm">
                <p className="mb-1 font-semibold text-[#3b3b3b] dark:text-[#f4f4f4]">
                  Exames
                </p>
                <p>Solicitações agrupadas por tipo de exame e prioridade.</p>
              </div>
              <div className="rounded-2xl bg-white dark:bg-[#101010] p-3 text-xs text-[#5e5e5e] dark:text-[#d1d1d1] shadow-sm">
                <p className="mb-1 font-semibold text-[#3b3b3b] dark:text-[#f4f4f4]">
                  Orientações
                </p>
                <p>Texto pronto para enviar ao paciente por WhatsApp.</p>
              </div>
            </div>
          </div>
          <div className="space-y-6 rounded-3xl bg-[#ffffff] dark:bg-[#101010] p-6 lg:p-8 shadow-sm">
            <h3 className="text-base font-semibold text-[#3b3b3b] dark:text-[#f4f4f4] lg:text-lg">
              Planos pensados para consultórios e equipes.
            </h3>
            <p className="text-sm text-[#5e5e5e] dark:text-[#d1d1d1] sm:text-base">
              Comece com poucos profissionais e escale conforme a equipe cresce.
              Fale com nosso time para entender o melhor formato para sua
              realidade.
            </p>
            <div className="space-y-2 text-sm text-[#5e5e5e] dark:text-[#d1d1d1] sm:text-base">
              <p>• Licenças por profissional ou por sala de atendimento.</p>
              <p>• Suporte dedicado na adoção pelas equipes.</p>
              <p>• Condições especiais para redes e grupos de saúde.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA verde */}
      <CtaSection />

      {/* Seção Vital Med - Inspirada em Vital Brazil */}
      <section
        id="nossa-ia"
        className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-[#00ccbd]/8 via-[#00a89a]/5 to-white dark:from-[#00ccbd]/15 dark:via-[#00a89a]/10 dark:to-[#101010]"
      >
        {/* Efeitos de fundo sutis */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-[#00ccbd]/5 blur-3xl" />
          <div className="absolute right-1/4 bottom-20 h-[500px] w-[500px] rounded-full bg-[#00a89a]/5 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Header da seção */}
            <div className="text-center mb-16">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#00a89a]">
                Nossa IA
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#3b3b3b] dark:text-[#f4f4f4] mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ccbd] to-[#00a89a]">
                  Vital AI
                </span>{" "}
                — Inspirada em Vital Brazil
              </h2>
              <p className="text-base text-[#5e5e5e] dark:text-[#d1d1d1] max-w-2xl mx-auto">
                Nossa inteligência artificial homenageia um dos maiores
                cientistas brasileiros
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Coluna Esquerda: Foto do Vital Brazil */}
              <div className="relative group max-w-sm mx-auto lg:mx-0">
                <div className="absolute -inset-2 bg-gradient-to-br from-[#00ccbd]/20 to-[#00a89a]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative aspect-[3/4.5] rounded-2xl overflow-hidden shadow-2xl border border-[#00ccbd]/10">
                  <Image
                    src="/images/1-vital-brazil-que-morreu-ha-70-anos-combateu-doencas-misteriosas-correio-nogueirense.jpg"
                    alt="Vital Brazil Mineiro da Campanha"
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    quality={100}
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur-sm p-4 rounded-xl border border-[#00ccbd]/20 shadow-lg">
                  <p className="text-[#3b3b3b] dark:text-[#f4f4f4] font-bold text-lg mb-0.5">
                    Vital Brazil Mineiro da Campanha
                  </p>
                  <p className="text-[#5e5e5e] dark:text-[#d1d1d1] text-sm">
                    1865 - 1950
                  </p>
                </div>
              </div>

              {/* Coluna Direita: Conexão Vital Med ↔ Vital Brazil */}
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-[#00ccbd]/10 dark:bg-[#00ccbd]/20 px-4 py-2 rounded-full border border-[#00ccbd]/20">
                    <Brain className="h-4 w-4 text-[#00a89a]" />
                    <span className="text-sm font-semibold text-[#00a89a]">
                      Inteligência Artificial Médica
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-[#3b3b3b] dark:text-[#f4f4f4]">
                    A{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ccbd] to-[#00a89a]">
                      Vital AI
                    </span>{" "}
                    é inspirada no legado de Vital Brazil
                  </h3>

                  <p className="text-base text-[#5e5e5e] dark:text-[#d1d1d1] leading-relaxed">
                    Assim como o cientista revolucionou a medicina com inovação
                    e dedicação, nossa IA busca transformar o dia a dia dos
                    profissionais de saúde.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-2 w-2 rounded-full bg-[#00a89a]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#3b3b3b] dark:text-[#f4f4f4] mb-1.5">
                        Pioneiro da medicina tropical
                      </p>
                      <p className="text-sm text-[#5e5e5e] dark:text-[#d1d1d1] leading-relaxed">
                        Desenvolveu os primeiros soros antiofídicos e
                        antiescorpiônicos, salvando milhares de vidas no Brasil
                        e no mundo
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-2 w-2 rounded-full bg-[#00a89a]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#3b3b3b] dark:text-[#f4f4f4] mb-1.5">
                        Fundador do Instituto Butantan
                      </p>
                      <p className="text-sm text-[#5e5e5e] dark:text-[#d1d1d1] leading-relaxed">
                        Criou uma das maiores instituições de pesquisa
                        científica da América Latina, referência mundial em
                        soros e vacinas
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#00ccbd]/10">
                  <p className="text-xs font-semibold text-[#00a89a] uppercase tracking-wider mb-2">
                    Legado brasileiro
                  </p>
                  <p className="text-base text-[#3b3b3b] dark:text-[#f4f4f4] leading-relaxed italic">
                    `Homenageamos Vital Brazil ao nomear nossa IA, perpetuando
                    seu espírito de inovação científica que continua
                    transformando a medicina brasileira`
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos + logos */}
      <section
        id="depoimentos"
        className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-white via-[#00ccbd]/3 to-[#00a89a]/5 dark:from-[#101010] dark:via-[#00ccbd]/8 dark:to-[#00a89a]/10"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-20 h-[400px] w-[400px] rounded-full bg-[#00a89a]/10 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#00a89a]">
                Depoimentos
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#3b3b3b] dark:text-[#f4f4f4] mb-4">
                Médicos que já registram consultas com a Vocalmed.
              </h2>
              <p className="text-base text-[#5e5e5e] dark:text-[#d1d1d1] max-w-3xl mx-auto">
                Veja como diferentes especialidades estão usando a gravação de
                consulta com IA para reduzir horas extras e melhorar a
                comunicação com pacientes.
              </p>
            </div>

            <div className="grid gap-6 md:gap-8 md:grid-cols-3">
              <Testimonial
                name="Dra. Mariana Souza"
                role="Clínica geral — São Paulo/SP"
                content="Termino o dia com os prontuários em dia e sem aquela pilha de anotações para digitar depois. A IA organiza tudo de forma muito clara."
                avatarImage="/images/Gemini_Generated_Image_lq2u5slq2u5slq2u (2).png"
                avatarInitials="MS"
              />
              <Testimonial
                name="Dr. Ricardo Azevedo"
                role="Cardiologista — Belo Horizonte/MG"
                content="A Vocalmed virou parte natural do meu fluxo. Ganhei tempo de consulta e consigo explicar melhor o plano terapêutico ao paciente."
                avatarImage="/images/Gemini_Generated_Image_lq2u5slq2u5slq2u (1).png"
                avatarInitials="RA"
              />
              <Testimonial
                name="Dra. Ana Lima"
                role="Pediatra — Clínica de família"
                content="As orientações geradas para os responsáveis são muito didáticas. Isso reduz dúvidas por mensagens depois da consulta."
                avatarImage="/images/Gemini_Generated_Image_lq2u5slq2u5slq2u.png"
                avatarInitials="AL"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <Section
        eyebrow="Por que Vocalmed?"
        title="Pensada para a realidade do consultório."
        description="Não é apenas um gravador com IA genérica. A Vocalmed nasce dentro do dia a dia de quem atende pacientes e precisa documentar com responsabilidade."
      >
        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          <div className="group relative rounded-2xl bg-gradient-to-br from-[#00ccbd]/10 to-[#00a89a]/10 dark:from-[#00ccbd]/20 dark:to-[#00a89a]/20 p-6 border-2 border-[#00ccbd]/20 hover:border-[#00ccbd]/40 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00ccbd] to-[#00a89a] shadow-lg mb-4">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#3b3b3b] dark:text-[#f4f4f4] mb-2">
              IA focada em contexto clínico
            </h3>
            <p className="text-sm text-[#5e5e5e] dark:text-[#d1d1d1]">
              Modelos ajustados para termos médicos em português, com foco em
              precisão e clareza.
            </p>
          </div>
          <div className="group relative rounded-2xl bg-gradient-to-br from-[#00a89a]/10 to-[#007c79]/10 dark:from-[#00a89a]/20 dark:to-[#007c79]/20 p-6 border-2 border-[#00a89a]/20 hover:border-[#00a89a]/40 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00a89a] to-[#007c79] shadow-lg mb-4">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#3b3b3b] dark:text-[#f4f4f4] mb-2">
              Segurança em primeiro lugar
            </h3>
            <p className="text-sm text-[#5e5e5e] dark:text-[#d1d1d1]">
              Cuidados com LGPD, trilhas de auditoria e boas práticas de
              proteção de dados sensíveis.
            </p>
          </div>
          <div className="group relative rounded-2xl bg-gradient-to-br from-[#00ccbd]/10 to-[#00a89a]/10 dark:from-[#00ccbd]/20 dark:to-[#00a89a]/20 p-6 border-2 border-[#00ccbd]/20 hover:border-[#00ccbd]/40 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00ccbd] to-[#00a89a] shadow-lg mb-4">
              <ClipboardList className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#3b3b3b] dark:text-[#f4f4f4] mb-2">
              Adaptação ao seu prontuário
            </h3>
            <p className="text-sm text-[#5e5e5e] dark:text-[#d1d1d1]">
              Estrutura de saída flexível para se aproximar da forma como você
              já documenta hoje.
            </p>
          </div>
        </div>
      </Section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
