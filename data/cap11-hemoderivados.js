// Capítulo 11 — Transfusão de Hemoderivados
// Fonte: Guia MedRoute, p. 62-65

export const hemoderivados = {
  id: "hemoderivados",
  num: 11,
  titulo: "Transfusão de Hemoderivados",
  intro: "Hemácias, plasma fresco congelado, plaquetas e crioprecipitado — indicações, doses e cuidados.",

  itens: [
    {
      id: "hemacias",
      nome: "Hemácias",
      indicacoes: [
        "Choque hemorrágico grau III e IV no trauma",
        "Pacientes adultos normovolêmicos com Hb < 7,0 g/dL",
        "Hb < 8,0 em paciente com doença cardíaca (ex.: IAM) ou pós-operatório",
        "Paciente com Hb < 7,5 e hemorragia gastrointestinal"
      ],
      atencao: "A indicação deve considerar não só Hb/Ht, mas idade, comorbidades, velocidade de instalação da anemia e volemia.",
      dose: [
        "Volume: 10 a 20 mL/kg",
        "1 concentrado de hemácias = 230 a 300 mL → ↑ Hb em 1 g/dL e Ht em 3%",
        "Tempo de infusão: 60 a 120 minutos"
      ],
      especiais: [
        { tipo: "Leucodepletadas", quando: "Reação febril não hemolítica recorrente" },
        { tipo: "Lavadas",        quando: "Reação anafilática a hemocomponentes e deficiência de IgA" },
        { tipo: "Irradiadas",     quando: "Paciente transplantado (órgão sólido, TMO)" }
      ]
    },
    {
      id: "plasma",
      nome: "Plasma Fresco Congelado",
      indicacoes: [
        "Como parte do protocolo de transfusão maciça",
        "Intoxicação por varfarina, quando complexo protrombínico não estiver disponível",
        "Como parte do tratamento de PTT ou neuromielite óptica (plasmaférese)",
        "Cirróticos antes de procedimentos com INR > 2,5 após vitamina K",
        "Sangramento cirúrgico com INR > 1,8",
        "Coagulação intravascular disseminada"
      ],
      dose: [
        "1 unidade = 200 a 250 mL",
        "Dose padrão: 15 a 20 mL/kg ou 4 unidades",
        "10–20 mL/kg de PFC ↑ 20–30% os níveis dos fatores de coagulação",
        "Tempo de infusão máximo: 1 hora"
      ]
    },
    {
      id: "plaquetas",
      nome: "Plaquetas",
      indicacoesProfilaticas: [
        "Pré-procedimento invasivo com contagem abaixo do recomendado",
        "Adulto com plaquetas < 10.000/mm³ (exceto PTI)",
        "Falência medular crônica e plaquetas < 5.000/mm³",
        "Plaquetas < 20.000/mm³ + fatores de risco (ex.: sepse)"
      ],
      indicacoesTerapeuticas: [
        "Plaquetas < 10.000/mm³ após quimioterapia",
        "Plaquetas < 20.000/mm³ associadas a distúrbio de coagulação",
        "Plaquetas < 100.000/mm³ em politrauma, sangramento SNC, neurocirurgia ou cirurgia oftalmológica",
        "Plaquetas < 20.000/mm³ em PTI com sangramento em área crítica",
        "Como parte do protocolo de transfusão maciça"
      ],
      dose: [
        "Concentrado: 1 U = 50 mL para cada 10 kg (contém leucócitos)",
        "Aférese: 200 mL — equivale a 6 U de concentrado; é leucodepletada",
        "1 aférese eleva as plaquetas em ~50.000/mm³"
      ],
      tabelaProcedimentos: {
        titulo: "Contagem plaquetária mínima para procedimentos invasivos",
        linhas: [
          { procedimento: "Extração dentária", minimo: "> 30.000" },
          { procedimento: "Cirurgias menores", minimo: "> 50.000" },
          { procedimento: "Cirurgias maiores", minimo: "> 80.000" },
          { procedimento: "Procedimentos endoscópicos", minimo: "> 50.000" },
          { procedimento: "Neurocirurgias / oftalmológicas", minimo: "> 100.000" },
          { procedimento: "Cateter Venoso Central", minimo: "> 20.000" },
          { procedimento: "Punção lombar", minimo: "> 50.000" },
          { procedimento: "Punção de medula óssea", minimo: "> 20.000" }
        ]
      }
    },
    {
      id: "crioprecipitado",
      nome: "Crioprecipitado",
      indicacoes: [
        "Sangramento maciço com fibrinogênio < 1,5–2,0 g/dL",
        "Fase aguda de leucemia promielocítica com fibrinogênio < 1 g/dL",
        "Doença de von Willebrand ou hemofilia A na ausência de concentrado industrial",
        "Distúrbios congênitos do fibrinogênio",
        "Sangramento intracraniano 2° fibrinolíticos com fibrinogênio < 2 g/dL"
      ],
      dose: [
        "1 unidade a cada 10 kg de peso",
        "1 U = 30–40 mL → contém fator VIII, fibrinogênio e Fator de von Willebrand",
        "Transfundir imediatamente após o descongelamento",
        "Cada U ↑ fibrinogênio em 5–10 mg/dL (nível hemostático: 70–100 mg/dL)"
      ]
    }
  ]
};
