// Capítulo 10 — Reposição de Eletrólitos
// Fonte: Guia MedRoute, p. 56-61

export const eletrolitos = {
  id: "eletrolitos",
  num: 10,
  titulo: "Reposição de Eletrólitos",
  intro: "Distúrbios hidroeletrolíticos comuns na UTI e seus esquemas de reposição.",

  itens: [
    {
      id: "potassio",
      nome: "Potássio (Hipocalemia)",
      faixas: [
        {
          gatilho: "K entre 3,0 e 3,4 mEq/L",
          condutas: [
            "Reposição por via oral.",
            "KCl xarope 6%: 15 mL contém 12 mEq de K — fazer 15 mL 3 a 4×/dia.",
            "KCl comprimido: cada comprimido contém 6 mEq de K — 1 a 2 cp, 3 a 4×/dia."
          ]
        },
        {
          gatilho: "K < 3,0 mEq/L",
          condutas: [
            "Acesso periférico:",
            "  KCl 10% 30 mL + SF 0,9% 470 mL EV em BI, correr em 4 horas",
            "  KCl 19,1% 20 mL + SF 0,9% 480 mL EV em BI, correr em 4 horas",
            "Acesso profundo:",
            "  KCl 10% 30 mL + SF 0,9% 470 mL EV em BI, correr em 2 horas",
            "  KCl 19,1% 40 mL + SF 0,9% 460 mL EV em BI, correr em 4 horas",
            "Associar reposição via oral à endovenosa."
          ],
          rxPronta: "KCl 19,1% 20 mL + SF 0,9% 480 mL EV em BI. Correr em 4 horas."
        }
      ],
      atencao: [
        "Concentração máxima em veia periférica: 10 mEq/h",
        "Concentração máxima em veia central: 40 mEq/h",
        "1 mL de KCl 19,1% = 2,5 mEq de K",
        "20 mEq de K aumentam em 0,25 mEq/L o potássio sérico",
        "Em cardiopatas, manter K mais elevado (~ 4,0 mEq/L)",
        "Avaliar Mg sérico — frequentemente associado à hipocalemia"
      ]
    },

    {
      id: "calcio",
      nome: "Cálcio (Hipocalcemia)",
      definicao: [
        "Cálcio total < 8,5 mg/dL OU",
        "Cálcio iônico < 4,4 mg/mL (1,1 mmol/L)"
      ],
      atencaoCorrecao: "Se usar o Cálcio Total, corrigir pela albumina:\nCT corrigido = CT medido + [(4 − albumina sérica) × 0,8]",
      sintomasFaixa: "Sintomas geralmente quando Cai < 0,7 mmol/L ou CT < 7 mg/dL: parestesias, tetania, convulsões, laringoespasmo, alargamento de QT (pode causar Torsade de Pointes).",
      condutas: [
        {
          gatilho: "Hipocalcemia sintomática",
          rx: "20 mL de Gluconato de Cálcio + 100 mL de SG 5% — correr em 20 minutos e repetir SN."
        },
        {
          gatilho: "Manutenção em hipocalcemia severa/persistente",
          rx: "110 mL de Gluconato de Cálcio + 890 mL de SG 5% em BIC — correr a 50 mL/h até normalização."
        }
      ],
      notas: [
        "1 ampola de Gluconato de Cálcio = 9 mg/mL de cálcio elementar",
        "1 ampola de Cloreto de Cálcio = 27 mg/mL de cálcio elementar (3× mais)"
      ]
    },

    {
      id: "magnesio",
      nome: "Magnésio (Hipomagnesemia)",
      definicao: "Mg < 1,6 mEq/L",
      sintomas: "Espasmo muscular, tetania, câimbra, convulsões, arritmias (TV).",
      condutas: [
        {
          gatilho: "Assintomático",
          rx: "20 mL de MgSO₄ 10% + 100 mL de SF 0,9%. Correr em 60 min."
        },
        {
          gatilho: "Sintomático ou Mg < 1,0",
          rx: "20 mL de MgSO₄ 10% + 100 mL de SF 0,9%. Correr em 15 min.\n\nManutenção:\n60 mL de MgSO₄ 10% + 300 mL de SF 0,9%. Correr em 24 horas."
        }
      ],
      atencao: [
        "MgSO₄ 10% = 0,1 g/mL de Mg",
        "Avaliar K e Ca séricos (frequentemente associados)",
        "Interromper terapias que espoliam magnésio (ex.: Omeprazol, laxativos), se possível"
      ]
    },

    {
      id: "fosforo",
      nome: "Fósforo (Hipofosfatemia)",
      definicao: "P < 1,5 mEq/L",
      condutas: [
        {
          gatilho: "Assintomático ou moderado (P 1,0–1,5)",
          rx: "Reposição com ajuste de dieta — maior fonte recomendada: leite desnatado."
        },
        {
          gatilho: "Grave (P < 1,0) ou sintomáticos",
          rx: "Reposição venosa: 1 a 2 ampolas de Fosfato de Potássio + 500 mL de SF 0,9% — correr em 6 h."
        }
      ],
      atencao: [
        "Respeitar concentração de 20–30 mEq/L na solução endovenosa",
        "Cada ampola de fosfato ácido contém 20 mEq de K — atenção ao risco de hipercalemia",
        "Dosar fosfato e potássio regularmente durante a reposição"
      ]
    },

    {
      id: "sodio",
      nome: "Sódio (Hiponatremia)",
      indicacoes: [
        "Hiponatremia aguda (< 48 h) + sintomas",
        "Hiponatremia crônica com sintomas graves ou patologias SNC (tumores, TCE, HIC)",
        "Sódio sérico < 120 mEq/L, mesmo assintomático"
      ],
      atencao: [
        "Objetivo: ↑ [Na] em 4 a 6 mEq/L",
        "Não ultrapassar 8 mEq/L em 24 h — risco de Síndrome de Desmielinização Osmótica"
      ],
      preparo: "Solução salina hipertônica (NaCl 3%):\n45 mL de NaCl 20% + 455 mL de SF 0,9% = 500 mL de NaCl 3%",
      condutas: [
        {
          gatilho: "AGUDA (< 48 h) + sintomas",
          rx: "NaCl 3% em bólus de 100 mL EV em 10 min.\nPode repetir mais 2× (20/20 min) até melhora dos sintomas.\nMonitorar [Na] 1/1 h. Aumentar 4–6 mEq/L em 24 h."
        },
        {
          gatilho: "CRÔNICA (> 48 h) — Na < 130 + sintomas graves ou patologia SNC",
          rx: "NaCl 3% em bólus de 100 mL EV em 10 min.\nPode repetir mais 2× (20/20 min) até melhora dos sintomas.\nMonitorar [Na] 1/1 h. Aumentar 4–6 mEq/L em 24 h."
        },
        {
          gatilho: "CRÔNICA — Na < 120 e ASSINTOMÁTICO",
          rx: "Tratar o paciente como sintomático.\nInvestigar e tratar causa base.\nNaCl 3% em BIC a 15–30 mL/h.\nDosar [Na] 2/2 h. Aumentar 4–6 mEq/L em 24 h."
        },
        {
          gatilho: "Na entre 120 ~ 135 e ASSINTOMÁTICO",
          rx: "Não tratar com salina 3%.\nInvestigar e tratar causa base.\nLimitar ingestão adicional de água (restrição hídrica); descontinuar infusões intravenosas hipotônicas (se hospitalizado)."
        }
      ]
    }
  ]
};
