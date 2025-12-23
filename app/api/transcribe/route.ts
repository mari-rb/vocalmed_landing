import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const getMedicalPrompt = (transcription: string) => {
  const today = new Date().toLocaleDateString("pt-BR");

  return `# PERSONA
Você é o Vocalmed AI, um assistente de documentação clínica especializado em português brasileiro (pt-BR).
Sua função é analisar a transcrição de uma consulta médica e gerar documentação formal, precisa e estruturada seguindo os padrões brasileiros de saúde.

# CONTEXTO ATUAL
- Data: ${today}
- Tipo de Consulta: Demo (simulação)
- Idioma: Português Brasileiro (pt-BR)
- Normas: Padrões CFM, LGPD e terminologia médica brasileira

# DIRETRIZES DE SEGURANÇA (CRÍTICO)
1. **PRINCÍPIO DA VERACIDADE:** Jamais invente informações. Se não foi mencionado, não assuma.
2. **ALUCINAÇÃO ZERO:** Use [NÃO INFORMADO] quando não houver informação clara.
3. **NORMALIZAÇÃO DE LINGUAGEM (PT-BR):** 
   - Se encontrar palavras sem sentido ou claramente erradas na transcrição, CORRIJA para o termo médico correto brasileiro baseado no contexto
   - Exemplo: "paciente com dor no toraque" → normalize para "tórax"
   - Exemplo: "pressão arterial de cento e contenta por oventa" → normalize para "160/90"
   - Use terminologia médica brasileira (ex: "prontuário" ao invés de "registro médico")
   - Se não conseguir entender uma palavra mesmo com contexto, use [INAUDÍVEL] em vez de manter o erro
   - Mantenha coerência: se o contexto é cardiológico e aparece uma palavra estranha, substitua pelo termo médico provável
4. **TOM PROFISSIONAL:** Use terminologia médica adequada.
5. **COERÊNCIA CONTEXTUAL:** Mantenha consistência na narrativa. Se algo não faz sentido no contexto médico, omita ou corrija.

# FORMATO DE SAÍDA (JSON OBRIGATÓRIO)
Responda APENAS com um objeto JSON válido seguindo esta estrutura exata:

{
  "summary": "Resumo conciso de 1-2 linhas do caso clínico.",
  "soap": {
    "subjective": "Anamnese resumida: queixa principal e história relevante (máx 3 linhas).",
    "objective": "Achados principais do exame físico (máx 2 linhas).",
    "assessment": "Hipótese diagnóstica principal (máx 2 linhas).",
    "plan": "Conduta essencial: prescrições, exames e orientações (máx 3 linhas)."
  },
  "documents": {
    "prescription": "Medicamentos com posologia (se mencionados) ou null",
    "certificate": "Texto de atestado com período (se mencionado) ou null",
    "instructions": "Resumo em linguagem simples para o paciente (máx 3 linhas)"
  },
  "insights": [
    "Lista de alertas: alergias, fatores de risco, red flags (se mencionados)"
  ]
}

# TRANSCRIÇÃO DA CONSULTA
${transcription}

# INSTRUÇÕES FINAIS
- Normalize erros de transcrição usando contexto médico
- Se algo não foi mencionado, use [NÃO INFORMADO] ou null
- Seja conservador e factual
- Não invente dosagens ou diagnósticos
- Baseie-se APENAS na transcrição fornecida, mas corrija erros óbvios de linguagem`;
};

export async function POST(request: NextRequest) {
  try {
    // Validação de API Key
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          error: "Serviço não configurado",
          details: "GROQ_API_KEY não encontrada no .env.local",
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: "Nenhum arquivo de áudio enviado" },
        { status: 400 }
      );
    }

    console.log("[/api/transcribe] Iniciando transcrição...");

    // Transcrição com Whisper via Groq (GRÁTIS!)
    const transcription = await groq.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-large-v3",
      language: "pt",
      response_format: "verbose_json",
      prompt:
        "Transcrição de consulta médica em português brasileiro (pt-BR). Contexto clínico: anamnese, exame físico, hipóteses diagnósticas, prescrição médica. Termos médicos comuns no Brasil: paciente, sintomas, dor, febre, tosse, pressão arterial, diabetes, hipertensão, medicação, posologia, exames laboratoriais, eletrocardiograma, raio-x, ultrassom, retorno, atestado, receita médica, CID, prontuário eletrônico.",
      temperature: 0.0,
    });

    console.log(
      "[/api/transcribe] Transcrição concluída. Gerando prontuário..."
    );

    // Gerar prontuário estruturado com LLM
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "Você é um assistente médico especializado em documentação clínica. Responda APENAS com JSON válido, sem markdown ou explicações.",
        },
        {
          role: "user",
          content: getMedicalPrompt(transcription.text),
        },
      ],
      temperature: 0.1,
      response_format: { type: "json_object" },
    });

    const medicalRecord = JSON.parse(
      completion.choices[0].message.content || "{}"
    );

    console.log("[/api/transcribe] Prontuário gerado com sucesso!");

    return NextResponse.json({
      success: true,
      text: transcription.text,
      medicalRecord,
    });
  } catch (error) {
    console.error("[/api/transcribe]", error);

    return NextResponse.json(
      {
        error: "Erro ao processar transcrição",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
