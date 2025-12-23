"use client";

import { useState } from "react";
import { Check, Sparkles, Zap } from "lucide-react";

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  annualPrice?: number;
  description: string;
  features: string[];
  buttonText: string;
  buttonStyle: string;
  popular: boolean;
  hasAnnual?: boolean;
}

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans: PricingPlan[] = [
    {
      name: "Grátis",
      monthlyPrice: 0,
      description: "Para testar a plataforma",
      features: [
        "3 consultas para testar",
        "Acesso a todos os recursos",
        "Sem cartão de crédito",
      ],
      buttonText: "Começar grátis",
      buttonStyle:
        "bg-[#f4f4f4] dark:bg-[#1a1a1a] text-[#3b3b3b] dark:text-[#f4f4f4] hover:bg-[#e5e5e5] dark:hover:bg-[#2a2a2a]",
      popular: false,
    },
    {
      name: "Básico",
      monthlyPrice: 119.99,
      description: "Para profissionais iniciantes",
      features: ["30 consultas/mês", "Todos os recursos", "Suporte por email"],
      buttonText: "Assinar agora",
      buttonStyle:
        "bg-[#f4f4f4] dark:bg-[#1a1a1a] text-[#3b3b3b] dark:text-[#f4f4f4] hover:bg-[#e5e5e5] dark:hover:bg-[#2a2a2a]",
      popular: false,
    },
    {
      name: "Profissional",
      monthlyPrice: 199.99,
      description: "Para médicos ativos",
      features: [
        "50 consultas/mês",
        "Todos os recursos",
        "Suporte prioritário",
      ],
      buttonText: "Assinar agora",
      buttonStyle:
        "bg-gradient-to-r from-[#00ccbd] to-[#00a89a] text-white hover:shadow-xl",
      popular: true,
    },
    {
      name: "Ilimitado",
      monthlyPrice: 299.99,
      annualPrice: 239.99, // 20% de desconto
      description: "Para alta demanda",
      features: [
        "Consultas ilimitadas",
        "Todos os recursos",
        "Suporte prioritário 24/7",
      ],
      buttonText: "Assinar agora",
      buttonStyle:
        "bg-[#f4f4f4] dark:bg-[#1a1a1a] text-[#3b3b3b] dark:text-[#f4f4f4] hover:bg-[#e5e5e5] dark:hover:bg-[#2a2a2a]",
      popular: false,
      hasAnnual: true,
    },
  ];

  const getPrice = (plan: PricingPlan) => {
    if (plan.monthlyPrice === 0) return "R$ 0";
    if (plan.hasAnnual && isAnnual && plan.annualPrice) {
      return `R$ ${Math.floor(plan.annualPrice)}`;
    }
    return `R$ ${Math.floor(plan.monthlyPrice)}`;
  };

  const getCents = (plan: PricingPlan) => {
    if (plan.monthlyPrice === 0) return "";
    const price =
      plan.hasAnnual && isAnnual && plan.annualPrice
        ? plan.annualPrice
        : plan.monthlyPrice;
    const cents = (price % 1).toFixed(2).split(".")[1];
    return `,${cents}`;
  };

  const getSavings = () => {
    const monthly = 299.99;
    const annual = 239.99;
    const yearlyDiff = (monthly - annual) * 12;
    return yearlyDiff.toFixed(2).replace(".", ",");
  };

  return (
    <>
      <div className="text-center mb-12">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#00a89a]">
          Planos
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3b3b3b] dark:text-[#f4f4f4] mb-4">
          Escolha o melhor plano para sua prática médica
        </h2>
        <p className="text-lg text-[#5e5e5e] dark:text-[#d1d1d1] max-w-3xl mx-auto">
          Comece gratuitamente e escale conforme sua necessidade
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full max-w-[1400px] mx-auto mt-8 px-4 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col ${
              plan.popular
                ? "border-2 border-[#00a89a] bg-gradient-to-br from-white to-[#00ccbd]/5 dark:from-[#101010] dark:to-[#00a89a]/10 hover:border-[#00ccbd] ring-2 ring-[#00ccbd]/20"
                : plan.hasAnnual && isAnnual
                ? "border-2 border-[#00a89a] bg-gradient-to-br from-white to-[#00ccbd]/5 dark:from-[#101010] dark:to-[#00a89a]/10 ring-2 ring-[#00a89a]/30"
                : "border-2 border-[#e5e5e5] dark:border-[#2a2a2a] bg-white dark:bg-[#101010] hover:border-[#00ccbd]/30"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="bg-gradient-to-r from-[#00ccbd] to-[#00a89a] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  MAIS POPULAR
                </span>
              </div>
            )}

            {plan.hasAnnual && isAnnual && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="bg-gradient-to-r from-[#00ccbd] to-[#00a89a] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <Zap className="w-3 h-3" />
                  MELHOR OFERTA
                </span>
              </div>
            )}

            <div className="mb-6">
              <p className="text-sm font-bold text-[#00a89a] mb-3 uppercase tracking-wide">
                {plan.name}
              </p>
              <div className="flex items-baseline gap-0.5 mb-1">
                <span className="text-4xl font-extrabold text-[#3b3b3b] dark:text-[#f4f4f4] whitespace-nowrap">
                  {getPrice(plan)}
                </span>
                {plan.monthlyPrice > 0 && (
                  <>
                    <span className="text-xl text-[#5e5e5e] dark:text-[#d1d1d1] font-medium">
                      {getCents(plan)}
                    </span>
                    <span className="text-xs text-[#5e5e5e] dark:text-[#d1d1d1] ml-1 whitespace-nowrap">
                      /mês
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-[#5e5e5e] dark:text-[#d1d1d1] font-medium">
                {plan.description}
              </p>
            </div>

            {plan.hasAnnual && (
              <div className="mb-6 -mt-2">
                <div
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-2.5 transition-all duration-300 ${
                    isAnnual
                      ? "bg-gradient-to-r from-[#00ccbd] to-[#00a89a] border border-[#00ccbd] shadow-md"
                      : "bg-gradient-to-r from-[#00ccbd]/10 to-[#00a89a]/10 dark:from-[#00ccbd]/20 dark:to-[#00a89a]/20 border border-[#00a89a]/30 hover:border-[#00a89a]/50"
                  }`}
                >
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={isAnnual}
                      onChange={(e) => setIsAnnual(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div
                      className={`relative w-10 h-5 rounded-full transition-all ${
                        isAnnual
                          ? "bg-white/30"
                          : "bg-[#e5e5e5] dark:bg-[#2a2a2a]"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full shadow-sm transition-all duration-300 ${
                          isAnnual
                            ? "bg-white translate-x-5"
                            : "bg-white translate-x-0"
                        }`}
                      ></div>
                    </div>
                    <span
                      className={`text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        isAnnual ? "text-white" : "text-[#00a89a]"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Plano Anual
                      <span
                        className={`ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded transition-all ${
                          isAnnual
                            ? "bg-white text-[#00a89a]"
                            : "bg-gradient-to-r from-[#00ccbd] to-[#00a89a] text-white"
                        }`}
                      >
                        -20%
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            )}

            <div className="space-y-4 mb-8 flex-grow">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#00a89a] flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-[#5e5e5e] dark:text-[#d1d1d1]">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="https://app.vocalmed.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full rounded-xl py-3.5 px-4 text-sm font-bold transition-all hover:scale-105 mt-auto inline-block text-center ${plan.buttonStyle}`}
            >
              {plan.buttonText}
            </a>
          </div>
        ))}
      </div>

      {isAnnual && (
        <div className="mt-8 text-center animate-[fadeIn_0.3s_ease-in-out]">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00ccbd]/10 to-[#00a89a]/10 dark:from-[#00ccbd]/20 dark:to-[#00a89a]/20 border border-[#00a89a]/30 rounded-lg px-4 py-3">
            <Sparkles className="w-5 h-5 text-[#00a89a]" />
            <p className="text-sm text-[#5e5e5e] dark:text-[#d1d1d1]">
              Economize{" "}
              <span className="font-bold text-[#00a89a]">
                R$ {getSavings()}
              </span>{" "}
              por ano com o plano anual
            </p>
          </div>
        </div>
      )}
    </>
  );
}
