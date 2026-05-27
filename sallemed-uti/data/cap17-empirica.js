// Capítulo 17 — Prescrição Empírica de Antimicrobianos
// Fonte: Guia MedRoute, p. 100-105

export const empirica = {
  id: "empirica",
  num: 17,
  titulo: "Prescrição Empírica de Antimicrobianos",
  intro: "Sugestões de terapia empírica por foco/sistema. Guie sempre sua prescrição pela flora local do seu hospital, resultados de cultura e, sempre que possível, pela CCIH.",

  sistemas: [
    {
      id: "snc",
      nome: "Sistema Nervoso Central",
      casos: [
        {
          doenca: "Abscesso no SNC",
          microrganismo: "S. aureus, Gram-negativos e anaeróbios",
          esquema: "Ceftriaxone 2 g EV 12/12 h\n+ Metronidazol 500 mg EV 6/6 h\n+ Vancomicina 15 a 20 mg/kg/dia EV 8/8 h"
        },
        {
          doenca: "Meningite no adulto",
          microrganismo: "Pneumococo, Meningococo",
          esquema: "Ceftriaxone 2 g EV 12/12 h\n\nSe > 50 anos ou imunossuprimido: associar Ampicilina 2 g IV 4/4 h"
        },
        {
          doenca: "Meningoencefalite Herpética",
          microrganismo: "Herpes Vírus",
          esquema: "Aciclovir 10 mg/kg/dose EV 8/8 h\nDuração: 14 a 21 dias"
        }
      ],
      nota: "Corticoide na meningite bacteriana: iniciar minutos antes ou junto ao ATB. Eficácia comprovada apenas em etiologia pneumocócica; manter por 4 dias (suspender se cultura negativa ou outro germe). Dexametasona 0,15 mg/kg/dose EV 6/6 h."
    },
    {
      id: "vias-aereas",
      nome: "Vias Aéreas",
      casos: [
        {
          doenca: "Pneumonia Comunitária (Domiciliar)",
          microrganismo: "Pneumococo, hemófilos, moraxella, germes atípicos",
          esquema: "Jovem sem comorbidade:\nAzitromicina 500 mg VO 1×/dia por 5 dias\n\nDemais pacientes:\nAmoxicilina + Clavulanato (500+125) VO 8/8 h por 7 dias\n+ Azitromicina 500 mg VO 1×/dia por 5 dias"
        },
        {
          doenca: "Pneumonia Comunitária Grave",
          microrganismo: "Pneumococo, hemófilos, moraxella, germes atípicos",
          esquema: "Amoxicilina + Clavulanato 1 g EV 12/12 h por 7 dias\nOU\nCeftriaxone 2 g EV 1×/dia\n+ Claritromicina 500 mg EV 12/12 h por 7 dias\n\nSe risco para MRSA:\nVancomicina 15 mg/kg/dia 12/12 h\n+ Claritromicina 500 mg EV 12/12 h\n\nSe risco para Pseudomonas:\nCefepime 2 g EV 8/8 h ou Pipe-Tazo 4,5 g EV 6/6 h\n+ Claritromicina 500 mg EV 12/12 h"
        }
      ]
    },
    {
      id: "coracao",
      nome: "Coração",
      casos: [
        {
          doenca: "Endocardite — tratamento empírico inicial (ajustar após culturas)",
          microrganismo: "Enterococo, Estafilococo, Estreptococo",
          esquema: "Valva nativa ou protética > 12 meses:\nOxacilina 2 g 4/4 h EV\n+ Ampicilina 2 g 4/4 h EV\n+ Gentamicina 1 mg/kg 8/8 h EV\n\nValva protética < 6 meses:\nDaptomicina 8 a 10 mg/kg EV\n+ Gentamicina 1 mg/kg 8/8 h EV\n+ Meropenem 1 g 8/8 h EV\n\nValva protética implantada entre 6 e 12 meses:\nDaptomicina 8 a 10 mg/kg EV\n+ Gentamicina 1 mg/kg 8/8 h EV"
        }
      ]
    },
    {
      id: "abdome",
      nome: "Abdome e Pelve",
      casos: [
        {
          doenca: "Foco Abdominal",
          microrganismo: "Enterobactérias, anaeróbios, Enterococo",
          esquema: "Ceftriaxone 1 g EV 12/12 h\n+ Metronidazol 500 mg EV 8/8 h\n\n*Associar Ampicilina 2 g IV 6/6 h se indicação."
        },
        {
          doenca: "Doença Inflamatória Pélvica (DIP)",
          microrganismo: "N. gonorrhoeae, C. trachomatis, Bacteroides, enterobactérias",
          esquema: "Ceftriaxone 1 g EV 24/24 h\n+ Doxiciclina 100 mg VO 12/12 h\n+ Metronidazol 500 mg EV 12/12 h\nPor 48 h\n\nSeguido de: Doxiciclina 100 mg VO 12/12 h + Metronidazol 500 mg VO 12/12 h"
        }
      ]
    },
    {
      id: "itu",
      nome: "Infecções do Trato Urinário",
      casos: [
        {
          doenca: "Infecção Urinária Baixa",
          microrganismo: "E. coli, Gram-negativos",
          esquema: "Gestante:\nNitrofurantoína 100 mg VO 6/6 h\nOU Cefalexina 500 mg 6/6 h\nOU Amoxicilina + Clavulanato (500/125 mg) 12/12 h\nOU Cefuroxima 250 mg 12/12 h\n\nNão gestante (além das opções acima):\nSulfametoxazol + Trimetoprima (800+160 mg) VO 12/12 h por 3 dias (mulher) a 7 dias (homem)"
        },
        {
          doenca: "Pielonefrite",
          microrganismo: "E. coli, Gram-negativos (avaliar risco de resistência)",
          esquema: "Amoxicilina + Clavulanato 500/125 mg 8/8 h VO ou EV por 14 dias\n\nSe alergia à penicilina: Ciprofloxacino 500 mg 12/12 h VO ou EV por 7 dias\nSe gestante: Ceftriaxone 2 g EV 24/24 h\nSe alérgico: Amicacina 15 mg/kg EV ou IM 1×/dia\n\nGram-negativos com risco de resistência:\nCefepime 2 g EV 8/8 h\nOU Piperacilina + Tazobactam 4,5 g 6/6 h\nOU Meropenem 1 g EV 8/8 h"
        }
      ]
    },
    {
      id: "pele",
      nome: "Pele e Partes Moles",
      casos: [
        {
          doenca: "Pele e Partes Moles",
          microrganismo: "S. aureus, S. pyogenes",
          esquema: "Oxacilina 2 g EV 4/4 h\nOU Cefazolina 1 g EV 8/8 h\n\nSe alérgico: Clindamicina 600–900 mg EV 8/8 h\nSe sem melhora: associar Sulfametoxazol + Trimetoprima 7,5 mg/kg/dia"
        },
        {
          doenca: "Celulite de face",
          microrganismo: "S. aureus",
          esquema: "Oxacilina 2 g EV 4/4 h\nOU Cefazolina 1 g EV 8/8 h\n\nSe alérgico ou sem resposta: Vancomicina 15 a 20 mg/kg EV 12/12 h"
        },
        {
          doenca: "Celulite Orbitária (pós-septal)",
          microrganismo: "S. aureus, S. pneumoniae, H. influenzae",
          esquema: "Vancomicina 15 a 20 mg/kg EV 12/12 h\n+ Ceftriaxone 2 g EV 24/24 h"
        },
        {
          doenca: "Fascite Necrosante",
          microrganismo: "S. pyogenes, S. aureus (varia com localização)",
          esquema: "Vancomicina 15 a 20 mg/kg EV 12/12 h\n+ Ceftriaxone 2 g EV 24/24 h\n+ Metronidazol 500 mg EV 8/8 h"
        },
        {
          doenca: "Pé Diabético",
          microrganismo: "Polimicrobiana (S. pyogenes, S. aureus)",
          esquema: "Infecção Leve:\nAmoxicilina + Clavulanato 500/125 VO 8/8 h\nSe alérgico: Clindamicina 300 mg VO 8/8 h + Ciprofloxacino 500 mg 12/12 h VO\n\nInfecção Moderada/Grave:\nCefepime 2 g EV 8/8 h\n+ Clindamicina 1200–1800 mg/dia EV 6/6 h\nOU\nPipe-Tazo 4,5 g EV 8/8 h\n+ Vancomicina 15 a 20 mg/kg 12/12 h"
        }
      ]
    },
    {
      id: "sepse",
      nome: "Sepse",
      casos: [
        {
          doenca: "Sepse Indeterminada",
          microrganismo: "—",
          esquema: "Ceftriaxone 2 g EV 24/24 h\n+ Vancomicina 15 a 20 mg/kg EV 12/12 h\n\nSe internação nos últimos 3 meses:\nCefepime 2 g EV 8/8 h\n+ Vancomicina 15 a 20 mg/kg EV 12/12 h\n\nSe alergia:\nGentamicina 5 mg/kg EV 24/24 h\n+ Vancomicina 15 a 20 mg/kg EV 12/12 h"
        },
        {
          doenca: "Sepse Abdominal",
          microrganismo: "—",
          esquema: "Ceftriaxone 2 g EV 24/24 h\n+ Metronidazol 500 mg EV 8/8 h\n\nSe internação nos últimos 3 meses:\nCefepime 2 g EV 8/8 h\n+ Metronidazol 500 mg EV 12/12 h\n\nSe alergia:\nCiprofloxacino 400 mg EV 12/12 h\n+ Metronidazol 500 mg EV 6/6 h"
        },
        {
          doenca: "Sepse Urinária",
          microrganismo: "—",
          esquema: "Amicacina 15 mg/kg EV 24/24 h\nOU\nCeftriaxone 1 g EV 12/12 h"
        },
        {
          doenca: "Sepse Pulmonar",
          microrganismo: "—",
          esquema: "Ceftriaxone 2 g EV 24/24 h\n+ Claritromicina 500 mg EV 12/12 h\n\nSe DPOC:\nCefepime 2 g EV 8/8 h\n+ Claritromicina 500 mg EV 12/12 h"
        }
      ]
    }
  ]
};
