// Capítulo 9 — VNI e Ventilação Mecânica
// Fonte: Guia MedRoute, p. 48-54

export const ventilacao = {
  id: "ventilacao",
  num: 9,
  titulo: "VNI e Ventilação Mecânica",
  intro: "Suporte ventilatório não invasivo (VNI), ajustes iniciais da ventilação mecânica e desmame.",

  vni: {
    titulo: "Ventilação Não Invasiva (VNI)",
    descricao: "Administração de suporte ventilatório mecânico assistido sem via aérea artificial.",

    indicacoes: [
      "Dispneia moderada a grave",
      "FR ≥ 25 irpm",
      "Uso de musculatura acessória ou respiração paradoxal",
      "Assincronia toracoabdominal",
      "pH < 7,35 com pCO₂ > 45 mmHg",
      "Relação P/F < 300"
    ],

    beneficios: [
      "Edema agudo de pulmão cardiogênico",
      "Exacerbação de DPOC",
      "Insuficiência respiratória hipoxêmica",
      "Pós-extubação"
    ],

    contraindicacoes: [
      "Parada respiratória franca ou iminente",
      "Instabilidade hemodinâmica",
      "Glasgow < 12",
      "Falha de proteção da via aérea (tosse e deglutição)",
      "Hemorragia digestiva alta ou excesso de secreções",
      "Agitação e não colaboração",
      "Trauma, queimadura ou cirurgia facial",
      "Alterações anatômicas na face",
      "Distensão abdominal e vômitos"
    ],

    modos: [
      {
        situacao: "DPOC",
        modo: "BIPAP",
        ajustes: [
          "IPAP (pressão inspiratória): iniciar 8–12 cmH₂O (máx 20)",
          "Objetivo de VC de 6–8 mL/kg ideal",
          "EPAP (PEEP): iniciar 5 cmH₂O",
          "FiO₂: ajustar para SatO₂ 88–92%"
        ]
      },
      {
        situacao: "Edema Agudo de Pulmão",
        modo: "CPAP (EPAP = IPAP)",
        ajustes: [
          "Iniciar com 10 cmH₂O",
          "Aumentar de 2 em 2 até melhora da congestão",
          "Objetivo de VC de 6–8 mL/kg ideal",
          "FiO₂: ajustar para SatO₂ 90–94%"
        ]
      }
    ]
  },

  ventilacaoMecanica: {
    titulo: "Ajustes Iniciais do Ventilador Mecânico",
    pcv: {
      titulo: "Modo PCV",
      ajustes: [
        "Pressão inspiratória: iniciar 10 cmH₂O (faixa 8–12)",
        "Objetivo: atingir VC de 6 mL/kg do peso ideal",
        "Tempo inspiratório: iniciar 1 s (faixa 0,8–1,2 s)",
        "Objetivo de relação I:E de 1:2"
      ]
    },
    vcv: {
      titulo: "Modo VCV",
      ajustes: [
        "Volume corrente: calcular 6 mL/kg IDEAL",
        "Fluxo inspiratório: 60 L/min",
        "Objetivo de relação I:E de 1:2"
      ]
    },
    comum: {
      titulo: "Ajustes iguais em ambos os modos",
      ajustes: [
        "PEEP entre 5 e 8 mmHg",
        "Trigger/Disparo: −1 a −3 cmH₂O",
        "Frequência respiratória: 16 a 20 irpm",
        "FiO₂: iniciar 100% e reduzir com objetivo SatO₂ 90–94% (88–92% se DPOC)"
      ]
    },
    protetora: {
      titulo: "Parâmetros da Ventilação Protetora",
      itens: [
        "Volume corrente: 6 a 8 mL/kg de peso IDEAL",
        "Pressão de platô: ≤ 30 cmH₂O",
        "Driving pressure: < 15 cmH₂O"
      ]
    }
  },

  pesoIdeal: {
    titulo: "Tabela de Peso Ideal e Volume Corrente (6 mL/kg)",
    aviso: "\"Pulmão não engorda\" — considerar o peso IDEAL, não o real.",
    formulas: {
      masculino: "50 + 0,91 × (Altura em cm − 152,4)",
      feminino:  "45,5 + 0,91 × (Altura em cm − 152,4)"
    },
    tabela: [
      { altura: 145, mascPeso: 43, mascVC: 260, femPeso: 38.7, femVC: 232 },
      { altura: 150, mascPeso: 48, mascVC: 287, femPeso: 43.3, femVC: 260 },
      { altura: 155, mascPeso: 52, mascVC: 314, femPeso: 47.8, femVC: 287 },
      { altura: 160, mascPeso: 57, mascVC: 341, femPeso: 52.4, femVC: 315 },
      { altura: 165, mascPeso: 62, mascVC: 369, femPeso: 57.0, femVC: 341 },
      { altura: 170, mascPeso: 66, mascVC: 396, femPeso: 61.0, femVC: 370 },
      { altura: 175, mascPeso: 70, mascVC: 423, femPeso: 66.0, femVC: 396 },
      { altura: 180, mascPeso: 75, mascVC: 450, femPeso: 70.0, femVC: 423 },
      { altura: 185, mascPeso: 80, mascVC: 480, femPeso: 75.0, femVC: 450 },
      { altura: 190, mascPeso: 84, mascVC: 505, femPeso: 79.0, femVC: 478 },
      { altura: 195, mascPeso: 88, mascVC: 532, femPeso: 84.0, femVC: 505 },
      { altura: 200, mascPeso: 94, mascVC: 560, femPeso: 88.0, femVC: 532 }
    ]
  },

  desmame: {
    titulo: "Desmame da Ventilação Mecânica e Extubação",
    etapas: [
      {
        titulo: "1ª etapa — Suspender a sedação",
        itens: ["Suspender a sedação, se houver."]
      },
      {
        titulo: "2ª etapa — Avaliar parâmetros obrigatórios para iniciar o desmame",
        itens: [
          "Fator causal resolvido ou sob controle",
          "Tosse presente e eficaz",
          "Drive respiratório presente",
          "Nível de consciência: desperta ao estímulo sonoro, sem agitação psicomotora",
          "Sinais de boa perfusão, sem aminas vasoativas ou dose em queda",
          "Ausência de febre",
          "Hb > 7 mg/dL e pH > 7,25",
          "Sem distúrbios hidroeletrolíticos; balanço hídrico corrigido",
          "Relação P/F > 150 | FiO₂ < 40% | PEEP < 8 mmHg"
        ]
      },
      {
        titulo: "3ª etapa — Teste de Respiração Espontânea (TRE)",
        itens: [
          "Colocar paciente em modo PSV com Pressão de Suporte 5–8 cmH₂O, PEEP 5 cmH₂O, FiO₂ < 40%",
          "Manter por 30–120 minutos e observar"
        ]
      }
    ],
    criteriosFalha: [
      "FR > 35 irpm",
      "SatO₂ < 90% (ou < 88% se hipoxêmico crônico/DPOC)",
      "FC > 140 (ou ↑ 20% após início)",
      "PAs > 180 mmHg ou < 90 mmHg",
      "Alteração do nível de consciência, agitação, sudorese ou uso de musculatura acessória"
    ],
    conclusao: "Sem critérios → proceder à extubação (sucesso = não reintubado nas próximas 48 h). Com critérios → não extubar; nova tentativa após identificação e correção dos fatores por > 24 h."
  }
};
