// Capítulos 18-21: Vancocinemia, Fórmulas, Opioides, Corticoides
// Fonte: Guia MedRoute, p. 107-114

export const vancocinemia = {
  id: "vancocinemia",
  num: 18,
  titulo: "Protocolo de Vancocinemia",
  intro: "A vancomicina tem baixo índice terapêutico — a vancocinemia permite ajustar doses, evitar intoxicação e garantir eficácia.",
  disclaimer: "Seguir SEMPRE o protocolo institucional do hospital.",

  contexto: "Níveis abaixo de 10 mg/L podem causar falha terapêutica e resistência bacteriana; níveis acima de 25 mg/L podem resultar em toxicidade.",

  medicao: "Medir vancocinemia antes da quarta dose ser administrada.",

  ajustes: [
    { faixa: "< 10 mg/dL",       conduta: "Aumentar dose diária em 50%" },
    { faixa: "10 a 14 mg/dL",    conduta: "Aumentar dose diária em 25%" },
    { faixa: "15 a 20 mg/dL",    conduta: "Manter a dose já prescrita (alvo)" },
    { faixa: "21 a 25 mg/dL",    conduta: "Reduzir dose diária em 25%" },
    { faixa: "> 25 mg/dL",       conduta: "Suspender dose imediata; colher vancocinemia 12 h após a última dose" }
  ],

  novaVancocinemia: [
    { gatilho: "Nova vancocinemia > 20", conduta: "Não realizar dose subsequente; nova coleta em 12 h" },
    { gatilho: "Nova vancocinemia < 20", conduta: "Reiniciar vancomicina com redução de 50% da dose diária" }
  ],

  apos2medidasAlvo: "Após duas medidas consecutivas de 15 a 20 mg/dL:\n• Se função renal estável + paciente hemodinamicamente estável → monitor 1× por semana\n• Se função renal instável ou instabilidade hemodinâmica → monitor a cada 48 h"
};

export const formulas = {
  id: "formulas",
  num: 19,
  titulo: "Fórmulas Utilizadas no CTI",
  intro: "Fórmulas e parâmetros úteis em terapia intensiva. Calculadoras interativas para algumas delas.",

  itens: [
    {
      id: "p-f",
      nome: "Relação P/F",
      formula: "P/F = PO₂ / FiO₂",
      observacao: "Parâmetro para extubação (não único): bom quando > 200.",
      calculadora: { campos: [{ key: "pao2", label: "PaO₂", unit: "mmHg" }, { key: "fio2", label: "FiO₂ (0,21–1,0)", unit: "" }], compute: "pao2 / fio2", unitOut: "" }
    },
    {
      id: "av-o2",
      nome: "Diferença Arteriovenosa de O₂",
      formula: "C(A−V)O₂ = 1,34 × Hb × (SaO₂ − SvO₂)",
      observacao: "Valores normais: 3 a 5."
    },
    {
      id: "gradiente-aa",
      nome: "Gradiente alvéolo-arterial",
      formula: "G(A−a) = 713 × FiO₂ − PaCO₂ − PaO₂",
      calculadora: { campos: [{ key: "fio2", label: "FiO₂ (0,21–1,0)", unit: "" }, { key: "paco2", label: "PaCO₂", unit: "mmHg" }, { key: "pao2", label: "PaO₂", unit: "mmHg" }], compute: "713 * fio2 - paco2 - pao2", unitOut: "mmHg" }
    },
    {
      id: "clcr",
      nome: "Clearance de Creatinina (Cockcroft-Gault)",
      formula: "ClCr = [(140 − idade) × peso] / (72 × creatinina)\n(Em mulheres, multiplicar por 0,85)",
      calculadora: {
        campos: [
          { key: "idade", label: "Idade", unit: "anos" },
          { key: "peso", label: "Peso", unit: "kg" },
          { key: "cr", label: "Creatinina sérica", unit: "mg/dL" },
          { key: "sexo", label: "Sexo", unit: "", options: [{ value: "m", label: "Masculino" }, { value: "f", label: "Feminino" }] }
        ],
        compute: "((140 - idade) * peso) / (72 * cr) * (sexo === 'f' ? 0.85 : 1)",
        unitOut: "mL/min"
      }
    },
    {
      id: "fena",
      nome: "Fração de Excreção de Na",
      formula: "FENa = [(NaU / NaP) / (CreatU / CreatP)] × 100",
      observacao: "Valores normais: < 2%\n• NTA: > 5% (em geral muito mais)\n• Glomerulite, hepatorrenal e pré-renal: < 1%\n• Nefropatia crônica pré-dialítica: > 20%",
      calculadora: {
        campos: [
          { key: "nau", label: "Na urinário", unit: "mEq/L" },
          { key: "nap", label: "Na plasmático", unit: "mEq/L" },
          { key: "cru", label: "Creat. urinária", unit: "mg/dL" },
          { key: "crp", label: "Creat. plasmática", unit: "mg/dL" }
        ],
        compute: "((nau / nap) / (cru / crp)) * 100",
        unitOut: "%"
      }
    },
    {
      id: "tobin",
      nome: "Índice de Tobin",
      formula: "Tobin = FR / VC",
      observacao: "Parâmetro para extubação quando < 105 em ventilação espontânea.",
      calculadora: { campos: [{ key: "fr", label: "FR", unit: "irpm" }, { key: "vc", label: "Volume corrente", unit: "L" }], compute: "fr / vc", unitOut: "" }
    },
    {
      id: "complacencia",
      nome: "Complacência dinâmica",
      formula: "Cdyn = VC / (Ppico − PEEP)",
      observacao: "Valores normais: 60 a 100."
    },
    {
      id: "resistencia-va",
      nome: "Resistência das Vias Aéreas",
      formula: "RVA = (Ppico − Pplatô) / Fluxo",
      observacao: "Valores normais: < 5 cmH₂O/L/s"
    },
    {
      id: "extracao-o2",
      nome: "Extração Periférica de O₂",
      formula: "EO₂ = [(CaO₂ − CvO₂) / CaO₂] × 100",
      observacao: "Valores normais: 25% ± 3"
    },
    {
      id: "anion-gap",
      nome: "Ânion Gap",
      formula: "AG = (Na + K) − (HCO₃ + Cl)",
      observacao: "Valores normais: 8 a 12 mEq",
      calculadora: {
        campos: [
          { key: "na", label: "Na", unit: "mEq/L" },
          { key: "k",  label: "K",  unit: "mEq/L" },
          { key: "hco3", label: "HCO₃", unit: "mEq/L" },
          { key: "cl", label: "Cl", unit: "mEq/L" }
        ],
        compute: "(na + k) - (hco3 + cl)",
        unitOut: "mEq/L"
      }
    },
    {
      id: "osmolaridade",
      nome: "Osmolaridade plasmática",
      formula: "Osm = [(Na + K) × 1,85] + (glic / 18)",
      observacao: "Valores normais: 295 ± 5",
      calculadora: {
        campos: [
          { key: "na", label: "Na", unit: "mEq/L" },
          { key: "k", label: "K", unit: "mEq/L" },
          { key: "glic", label: "Glicemia", unit: "mg/dL" }
        ],
        compute: "((na + k) * 1.85) + (glic / 18)",
        unitOut: "mOsm/L"
      }
    },
    {
      id: "ca-corrigido",
      nome: "Cálcio Corrigido pela Albumina",
      formula: "Ca corrigido = (Ca × 3,2) / Albumina",
      // NOTA: a fórmula original do guia é Ca corrigido = Ca + [(4 − albumina) × 0,8]. O guia também imprime "Ca c = (Ca × 3,2) / Albumina". Mantemos a tradicional.
      calculadora: {
        campos: [
          { key: "ca", label: "Cálcio total", unit: "mg/dL" },
          { key: "alb", label: "Albumina", unit: "g/dL" }
        ],
        compute: "ca + ((4 - alb) * 0.8)",
        unitOut: "mg/dL"
      }
    },
    {
      id: "mg-corrigido",
      nome: "Magnésio Corrigido pela Albumina",
      formula: "Mg corrigido = (Mg × 4) / Albumina",
      // REVISAR: fórmula incomum — manter conforme o guia
      observacao: "Conforme guia MedRoute."
    }
  ]
};

export const opioides = {
  id: "opioides",
  num: 20,
  titulo: "Doses e Equivalências de Opioides",
  intro: "Tabela de equianalgesia para conversão entre opioides. Valores em mg, exceto onde indicado.",
  disclaimer: "Use a tabela como referência inicial. A conversão entre opioides deve sempre considerar tolerância cruzada incompleta — reduzir a dose calculada em 25–50% ao trocar.",

  tabela: [
    { droga: "Morfina",      ev: 10,  oral: 30,   apresentacao: "Comprimidos e cápsulas | Solução oral | EV" },
    { droga: "Buprenorfina", ev: 0.3, oral: "0,4 (sublingual)", apresentacao: "Comprimidos sublinguais | EV | Transdérmica" },
    { droga: "Codeína",      ev: 100, oral: 200,  apresentacao: "Comprimidos | Solução oral" },
    { droga: "Fentanil",     ev: 0.1, oral: "—",  apresentacao: "Injetável | Transmucosa | Transdérmica" },
    { droga: "Hidrocodona",  ev: "—", oral: 30,   apresentacao: "Apenas em combinação com outros fármacos" },
    { droga: "Hidromorfona", ev: 1.5, oral: 7.5,  apresentacao: "Comprimidos | Solução oral | EV | Supositório" },
    { droga: "Metadona",     ev: 1,   oral: 3,    apresentacao: "Comprimidos | Solução oral" },
    { droga: "Oxicodona",    ev: 10,  oral: 20,   apresentacao: "Comprimidos e cápsulas | Solução oral" },
    { droga: "Oximorfona",   ev: 1,   oral: 10,   apresentacao: "Comprimidos e cápsulas | Solução oral | EV" },
    { droga: "Tramadol",     ev: 100, oral: 120,  apresentacao: "Comprimidos | EV" }
  ]
};

export const corticoides = {
  id: "corticoides",
  num: 21,
  titulo: "Doses e Equivalências de Corticoides",
  intro: "Tabela de potência relativa, dose equivalente e duração de ação para conversão entre corticoides.",

  tabela: [
    {
      droga: "Betametasona",
      potenciaAntiInflamatoria: 25,
      potenciaMineralocorticoide: 0,
      via: "Intralesional, intradérmica, intrabursal, intra-articular, intramuscular (Diprospan® 5/2 mL; Celestone Soluspan®)",
      duracao_h: "36 a 54",
      doseEquivalente_mg: "0,6 a 0,75"
    },
    {
      droga: "Dexametasona",
      potenciaAntiInflamatoria: "25 a 30",
      potenciaMineralocorticoide: 0,
      via: "Oral, Intramuscular, Intravenosa",
      duracao_h: "36 a 54",
      doseEquivalente_mg: "0,75"
    },
    {
      droga: "Fludrocortisona",
      potenciaAntiInflamatoria: 10,
      potenciaMineralocorticoide: 125,
      via: "Oral",
      duracao_h: "18 a 36",
      doseEquivalente_mg: 0
    },
    {
      droga: "Hidrocortisona",
      potenciaAntiInflamatoria: 1,
      potenciaMineralocorticoide: 2,
      via: "Intramuscular, Intravenosa",
      duracao_h: "8 a 12",
      doseEquivalente_mg: 20
    },
    {
      droga: "Metilprednisolona",
      potenciaAntiInflamatoria: 5,
      potenciaMineralocorticoide: 0,
      via: "Intramuscular, Intravenosa",
      duracao_h: "18 a 36",
      doseEquivalente_mg: 4
    },
    {
      droga: "Prednisolona",
      potenciaAntiInflamatoria: 4,
      potenciaMineralocorticoide: 1,
      via: "Oral",
      duracao_h: "18 a 36",
      doseEquivalente_mg: 5
    },
    {
      droga: "Prednisona",
      potenciaAntiInflamatoria: 4,
      potenciaMineralocorticoide: 1,
      via: "Oral",
      duracao_h: "18 a 36",
      doseEquivalente_mg: 5
    },
    {
      droga: "Triancinolona",
      potenciaAntiInflamatoria: 5,
      potenciaMineralocorticoide: 0,
      via: "Intra-articular",
      duracao_h: "18 a 36",
      doseEquivalente_mg: 4
    }
  ]
};
