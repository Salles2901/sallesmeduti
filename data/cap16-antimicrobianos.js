// Capítulo 16 — Antimicrobianos no CTI (37 fichas)
// Fonte: Guia MedRoute, p. 79-98

export const antimicrobianos = {
  id: "antimicrobianos",
  num: 16,
  titulo: "Antimicrobianos no CTI",
  intro: "Fichas individuais com classe, diluição, doses, ajustes para insuficiência renal/diálise e indicações principais.",

  lista: [
    {
      id: "aciclovir", nome: "Aciclovir", classe: "Antiviral",
      diluicao: "100 mL de SF ou SG cada frasco-ampola. Administrar em 1 hora para evitar lesão renal.",
      dose: "5 a 10 mg/kg EV de 8/8 h.",
      ajusteRenal: [
        "ClCr 25–50 mL/min: 5–10 mg/kg ou 500 mg/m² EV 12/12 h",
        "ClCr 10–25 mL/min: 5–10 mg/kg ou 500 mg/m² EV 1×/dia",
        "ClCr < 10 mL/min: 2,5–5 mg/kg ou 250 mg/m² EV 1×/dia"
      ],
      ajusteDialise: "2,5–5 mg/kg ou 250 mg/m² EV 1×/dia após a diálise.",
      via: "EV ou VO",
      indicacoes: "Herpes simplex, zoster, varicela; profilaxia em imunocomprometidos; profilaxia de CMV em TMO; meningoencefalite herpética."
    },
    {
      id: "ampicilina", nome: "Ampicilina", classe: "Penicilina",
      diluicao: "50–100 mL de SF, SG 5% ou Ringer-Lactato. Direta: 125–500 mg em 3–5 min; 1–2 g em 10–15 min.",
      dose: "VO: 250–500 mg 6/6 h. EV/IM: 1–2 g 4–6 h ou 50–250 mg/kg/dia divididos 4–8 h.",
      ajusteRenal: [
        "ClCr > 50 mL/min: sem ajuste",
        "ClCr 10–50 mL/min: 6–12 h",
        "ClCr < 10 mL/min: 12–24 h"
      ],
      ajusteDialise: "Dialisável (20–50%); administrar após hemodiálise.",
      via: "EV, VO ou IM",
      indicacoes: "Infecções do trato urinário, respiratório, digestivo e biliar; endocardite; estreptococos, pneumococos, Listeria, meningococo, H. influenzae, Salmonella, Shigella, E. coli, Enterobacter, Klebsiella."
    },
    {
      id: "ampicilina-sulbactam", nome: "Ampicilina + Sulbactam", classe: "Penicilina + Inibidor de β-lactamase",
      diluicao: "20–50 mL de SF/SG 5%. Direta: 3 min. Infusão: 1,5 g em 15 min e 3 g em 30 min.",
      dose: "IM ou EV: 1,5–3 g 6–8 h.",
      ajusteRenal: [
        "ClCr 15–29 mL/min: 12/12 h",
        "ClCr 5–14 mL/min: 24/24 h"
      ],
      ajusteDialise: "1,5–3 g 12–24 h após diálise.",
      via: "EV ou IM",
      indicacoes: "TR superior/inferior, sinusite, otite, pneumonia, ITU, intra-abdominais, pele/partes moles, osso/articulações, gonorreia; cobertura para S. aureus, H. influenzae, E. coli, Klebsiella, Acinetobacter, Enterobacter e anaeróbios."
    },
    {
      id: "anfotericina-b", nome: "Anfotericina B Lipossomal", classe: "Antifúngico",
      diluicao: "SG 5% (concentração final 0,2 a 2 mg/mL). Infundir em 2 h (se bem tolerado: 1 h). Dose > 5 mg/kg/dia: manter 2 h.",
      atencao: "Retirar 20 mL de SG da bolsa para lavar o acesso antes e após a infusão — lipossoma incompatível com SF.",
      dose: "3–6 mg/kg 1×/dia.",
      ajusteRenal: ["Sem ajuste"],
      ajusteDialise: "Sem ajuste",
      via: "EV",
      indicacoes: "Neutropenia febril empírica; criptococose, blastomicose, candidíase disseminada, coccidioidomicose, aspergilose, histoplasmose, mucormicose, leishmaniose."
    },
    {
      id: "amicacina", nome: "Amicacina", classe: "Aminoglicosídeo",
      diluicao: "100–200 mL de SF, SG 5% ou RL. Administração em 30–60 min.",
      dose: "15 mg/kg/dia 24/24 h.",
      ajusteRenal: [
        "ClCr 50 mL/min: sem ajuste",
        "ClCr 10–50 mL/min: 7,5 mg 12/12 h",
        "ClCr < 10 mL/min: 7,5 mg 12/12 h"
      ],
      ajusteDialise: "Intermitente: 5–7,5 mg/kg 48–72 h após HD (acompanhar nível sérico). Contínua: ataque 10 mg/kg + manutenção 7,5 mg/kg 24–48 h.",
      via: "EV ou IM",
      indicacoes: "Gram-negativos sensíveis: Pseudomonas, E. coli, Proteus, Providencia, Klebsiella, Enterobacter, Serratia, Acinetobacter; também Staphylococcus."
    },
    {
      id: "amoxicilina-clavulanato", nome: "Amoxicilina + Clavulanato", classe: "Penicilina + Inibidor de β-lactamase",
      diluicao: "AD, SF, Ringer-Lactato 50–100 mL. Direta 3–4 min ou infusão 30–40 min.",
      dose: "VO: 250–875 mg 8–12 h. EV: 1–2 g 6–8 h.",
      ajusteRenal: [
        "ClCr > 30 mL/min: sem ajuste",
        "ClCr 10–29 mL/min: ataque 1–2 g → 500 mg 12/12 h",
        "ClCr < 10 mL/min: ataque 1–2 g → 500 mg 24/24 h"
      ],
      via: "EV ou VO",
      indicacoes: "Otite, sinusite, TR inferior, pele, ITU; produtores de β-lactamase, B. catarrhalis, H. influenzae, N. gonorrhoeae, S. aureus (não MRSA)."
    },
    {
      id: "andulafungina", nome: "Andulafungina", classe: "Antifúngico",
      diluicao: "SF 0,9% 100 mL (100 mg) em 90 min ou 200 mL (200 mg) em 180 min. Não infundir junto a outras drogas/eletrólitos.",
      dose: "Ataque 200 mg no D1, manutenção 100 mg/dia. Manter ao menos 14 dias após a última cultura positiva.",
      ajusteRenal: ["Sem ajuste"],
      ajusteDialise: "Sem ajuste",
      via: "EV",
      indicacoes: "Aspergilose invasiva (resgate ou associada a voriconazol); candidemia e outras infecções por Candida; empírico em neutropenia febril."
    },
    {
      id: "azitromicina", nome: "Azitromicina", classe: "Macrolídeo",
      diluicao: "Diluir em 250–500 mL de SF 0,9%/SG 5%/RL a 1–2 mg/mL. Infusão: 1 mg/mL em 3 h ou 2 mg/mL em 1 h.",
      dose: "EV: 500 mg/dia.",
      ajusteRenal: ["Sem ajuste"],
      ajusteDialise: "Sem ajuste",
      via: "EV ou VO",
      indicacoes: "Otite, faringite/amigdalite, infecções de pele, PAC, DPOC exacerbado, DST, DIP; H. influenzae, M. catarrhalis, S. pneumoniae, C. pneumoniae, M. pneumoniae."
    },
    {
      id: "caspofungina", nome: "Caspofungina", classe: "Antifúngico",
      diluicao: "SF 0,9% 250 mL (50 ou 70 mg) em 60 min.",
      dose: "Ataque 70 mg D1, manutenção 50 mg 24/24 h.",
      ajusteRenal: ["Sem ajuste"],
      ajusteDialise: "Sem ajuste",
      ajusteHepatico: "Moderada: 70 mg D1 + 35 mg 1×/dia.",
      via: "EV",
      indicacoes: "Aspergillus refratário/intolerante a outras terapias; candidemia, Candida intra-abdominal/peritoneal, candidíase esofágica; empírico em neutropenia febril."
    },
    {
      id: "cefepime", nome: "Cefepime", classe: "Cefalosporina 4ª geração",
      diluicao: "1 g em 50 mL ou 2 g em 100 mL de SF/SG 5%/RL. Infusão: 30 min.",
      dose: "IM ou EV: 1–2 g 8–12 h.",
      ajusteRenal: [
        "ClCr 30–60: 2 g 12/12 h",
        "ClCr 10–30: 2 g 24/24 h",
        "ClCr < 10: 1 g 24/24 h"
      ],
      via: "EV ou IM",
      indicacoes: "ITU complicada/pielonefrite; neutropenia febril; pele/partes moles; pneumonia moderada-grave; intra-abdominais (com metronidazol); cobertura para Pseudomonas, Klebsiella, Enterobacter, MSSA."
    },
    {
      id: "cefotaxima", nome: "Cefotaxima", classe: "Cefalosporina 3ª geração",
      diluicao: "SF 0,9% ou SG 5% 100 mL em 30 min.",
      dose: "IM ou EV: 1–2 g 4–12 h.",
      ajusteRenal: ["ClCr ≤ 20 mL/min: reduzir 50%"],
      ajusteDialise: "1–2 g 24/24 h",
      via: "EV ou IM",
      indicacoes: "TR inferior, pele, osso/articulação, ITU, intra-abdominal, ginecológica, septicemia, meningite. Ativo contra a maioria de Gram-negativos (exceto Pseudomonas) e cocos Gram+ (não Enterococcus)."
    },
    {
      id: "ceftazidima", nome: "Ceftazidima", classe: "Cefalosporina 3ª geração",
      diluicao: "10–50 mL de SF, SG 5%/10%, RL. Direta 3–5 min. Diluído 15–30 min.",
      dose: "1–2 g 8/8 h.",
      ajusteRenal: [
        "ClCr 31–50: 1 g 12/12 h",
        "ClCr 16–30: 1 g 24/24 h",
        "ClCr 6–15: 500 mg 24/24 h",
        "ClCr < 5: 500 mg 48/48 h"
      ],
      ajusteDialise: "Dialisável (50–100%); 0,5–1 g 24 h ou 1–2 g 48–72 h após diálise.",
      via: "EV ou IM",
      indicacoes: "Infecção por Pseudomonas aeruginosa; Gram-negativos aeróbios; empírico em neutropenia febril."
    },
    {
      id: "ceftazidima-avibactam", nome: "Ceftazidima + Avibactam", classe: "Cefalosporina 3ª geração",
      diluicao: "SF 0,9% ou SG 5% 100 mL em 120 min.",
      dose: "2,5 g (1 frasco) 8/8 h por 5 a 14 dias.",
      ajusteRenal: [
        "ClCr 50–31: 1250 mg 8/8 h",
        "ClCr 30–16: 940 mg 12/12 h",
        "ClCr 15–6: 940 mg 24/24 h",
        "ClCr < 6: 940 mg 48/48 h"
      ],
      ajusteDialise: "Dialisável — administrar após a diálise.",
      via: "EV",
      indicacoes: "Intra-abdominal complicada, ITU complicada (incluindo pielonefrite), pneumonia hospitalar (incluindo associada a VM)."
    },
    {
      id: "ceftalozane-tazobactam", nome: "Ceftolozane + Tazobactam", classe: "5ª geração das cefalosporinas",
      diluicao: "SF 0,9% ou SG 5% 100 mL em 180 min.",
      dose: "1,5 a 3 g 8/8 h, 4–14 dias.",
      ajusteRenal: [
        "ClCr 30–50: 750 mg 8/8 h",
        "ClCr 15–29: 375 mg 8/8 h"
      ],
      ajusteDialise: "Ataque 750 mg + 150 mg 8/8 h. Em dias de HD, administrar após a sessão.",
      via: "EV",
      indicacoes: "Intra-abdominal complicada (com metronidazol) — Enterobacter, E. coli, Klebsiella, Proteus, Pseudomonas, Bacteroides; ITU complicada/pielonefrite."
    },
    {
      id: "ceftriaxone", nome: "Ceftriaxone", classe: "Cefalosporina 3ª geração",
      diluicao: "Até 1 g pode ser administrado sem diluição. Infusão contínua: 40 mL de SF, SG 5% ou SG 10%. Direta 3–5 min; diluído > 30 min. Em pacientes críticos pode ser administrado em infusão prolongada (3 h).",
      dose: "IM ou EV: 1–2 g 12–24 h.",
      ajusteRenal: ["Sem ajuste"],
      ajusteDialise: "Sem ajuste",
      via: "EV ou IM",
      indicacoes: "TR, otite média aguda bacteriana, pele/partes moles, osso/articulação, ITU, intra-abdominal, DIP, gonorreia, septicemia, meningite, profilaxia cirúrgica."
    },
    {
      id: "claritromicina", nome: "Claritromicina", classe: "Macrolídeo",
      diluicao: "SF 0,9% ou SG 5% 250 mL em 60 min.",
      dose: "EV: 1 g/dia divididos 12/12 h.",
      ajusteRenal: [
        "ClCr > 30: sem ajuste",
        "ClCr < 30: reduzir 50%"
      ],
      ajusteDialise: "Administrar após diálise",
      via: "EV ou VO",
      indicacoes: "VAS/VAI, otite, pele/partes moles (S. aureus, S. pyogenes, S. pneumoniae, H. influenzae, M. catarrhalis); MAC, M. intracellulare, M. chelonae, M. fortuitum, M. kansasii; H. pylori; profilaxia de endocardite em alérgicos à penicilina."
    },
    {
      id: "ciprofloxacino", nome: "Ciprofloxacino", classe: "Quinolona",
      diluicao: "Não é necessária diluição. Infusão: 60 min.",
      dose: "VO: 250–750 mg 12/12 h. EV: 400–800 mg divididos 12/12 h, até 1200 mg divididos 8/8 h.",
      ajusteRenal: [
        "ClCr ≥ 30: sem ajuste",
        "ClCr 5–29: 200–400 mg 18–24 h"
      ],
      ajusteDialise: "200–400 mg 12–24 h",
      via: "EV ou VO",
      indicacoes: "ITU, prostatite, TR inferior, sinusite aguda, otite, pele/partes moles, osso/articulação, intra-abdominal (não complicada), febre tifoide, pneumonia nosocomial, neutropenia febril empírica."
    },
    {
      id: "clindamicina", nome: "Clindamicina", classe: "Lincosamida",
      diluicao: "SF 0,9% ou SG 5% 100 mL em 60 min.",
      dose: "VO: 600–1800 mg divididos 6, 8 ou 12 h. EV/IM: 1,2–2,7 g divididos em 2–4 doses/dia.",
      ajusteRenal: ["Sem ajuste"],
      ajusteDialise: "Sem ajuste",
      via: "EV, VO ou IM",
      indicacoes: "VAS/VAI, pele/partes moles, dentárias, pelve/genital feminino, osso/articulação. Anaeróbios sensíveis e cepas aeróbias Gram+ (Streptococcus, Pneumococcus, Staphylococcus)."
    },
    {
      id: "fluconazol", nome: "Fluconazol", classe: "Antifúngico (Azol)",
      diluicao: "Bolsa pronta em 60 min. EV: ↑ risco de QT longo — preferir 200 mg em 1 h e nunca exceder 10 mL/min.",
      dose: "Ataque: 400–800 mg. Manutenção: 100–400 mg 24/24 h.",
      ajusteRenal: [
        "ClCr > 50: sem ajuste",
        "ClCr < 50: reduzir 50%"
      ],
      via: "VO e EV",
      indicacoes: "VO: candidíase vaginal, dermatomicoses, infecções por Candida. EV: criptococose, candidíase sistêmica e de mucosa, prevenção de coinfecções fúngicas."
    },
    {
      id: "daptomicina", nome: "Daptomicina", classe: "Lipopeptídeo cíclico",
      diluicao: "50 mL de SF. Infusão: 30–60 min.",
      dose: "4–6 mg/kg/dia EV 1×/dia.",
      ajusteRenal: ["ClCr < 30: 48/48 h"],
      ajusteDialise: "48/48 h após hemodiálise",
      via: "EV",
      indicacoes: "Pele/partes moles complicadas por Gram+ aeróbias; bacteremia por S. aureus, incluindo endocardite por MRSA ou MSSA."
    },
    {
      id: "doxiciclina", nome: "Doxiciclina", classe: "Derivado de Tetraciclina",
      diluicao: "Tomar com água ou dissolver em 50 mL de água.",
      dose: "VO: 100–200 mg/dia divididos em 1–2 doses.",
      ajusteRenal: ["Sem ajuste"],
      ajusteDialise: "Sem ajuste",
      via: "VO",
      indicacoes: "Rickettsia, Chlamydia, Mycoplasma; profilaxia de malária; sífilis; gonorreia descomplicada; Listeria, Actinomyces; PAC; antraz; Borrelia, Vibrio, Yersinia, Brucella; doença de Lyme; amebíase; acne grave."
    },
    {
      id: "ertapenem", nome: "Ertapenem", classe: "Carbapenema",
      diluicao: "10 mL reconstituídos + 40 mL de SF 0,9%. Infusão > 30 min.",
      dose: "IM ou EV: 1 g/dia ou 15 mg/kg.",
      ajusteRenal: ["ClCr < 30: 500 mg/dia"],
      ajusteDialise: "Se dose nas últimas 6 h pré-HD, suplementar 150 mg pós-HD.",
      via: "EV ou IM",
      indicacoes: "Intra-abdominal complicada, pele/partes moles (inclui pé diabético sem osteomielite, mordeduras), ITU complicada (inclui pielonefrite), pélvicas (endomiometrite pós-parto, aborto séptico, ginecológicas pós-cirúrgicas), septicemia, PAC. Cobertura Gram+, Gram- e anaeróbios."
    },
    {
      id: "gentamicina", nome: "Gentamicina", classe: "Aminoglicosídeo",
      diluicao: "SF 0,9% e SG 5% 100 mL em 60 min.",
      dose: "5–7 mg/kg/dia 24/24 h.",
      ajusteRenal: [
        "ClCr > 60: sem ajuste",
        "ClCr 40–59: 36/36 h",
        "ClCr 20–39: 48/48 h",
        "ClCr < 20: dose íntegra e doses subsequentes conforme nível sérico"
      ],
      via: "EV",
      indicacoes: "Pseudomonas, Proteus, Serratia, Staphylococcus; osso, pele/partes moles, TR, ITU, intra-abdominal, endocardite, sepse. Terapia inalatória auxiliar em infecções pulmonares graves."
    },
    {
      id: "imipenem", nome: "Imipenem + Cilastatina", classe: "Carbapenema",
      diluicao: "SF 0,9% ou SG 5% 100 mL em 180 min.",
      dose: "250–1000 mg 6–8 h.",
      ajusteRenal: [
        "ClCr 60–90: 500 mg 6/6 h",
        "ClCr 30–60: 500 mg 8/8 h",
        "ClCr 20–30: 500 mg 12/12 h",
        "ClCr < 15: não recomendado"
      ],
      ajusteDialise: "Se dose nas últimas 6 h pré-HD, suplementar 150 mg pós-HD.",
      via: "EV",
      indicacoes: "TR inferior, ITU, intra-abdominal, ginecológica, osso/articulação, pele/partes moles, endocardite (S. aureus), septicemia."
    },
    {
      id: "levofloxacino", nome: "Levofloxacino", classe: "Quinolona",
      diluicao: "Bolsa pronta em 60 min.",
      dose: "500–750 mg EV 24/24 h.",
      ajusteRenal: [
        "Dose 750 mg/dia — ClCr 20–49: 750 mg 48/48 h; ClCr 10–19: 750 mg → 500 mg 48/48 h",
        "Dose 500 mg/dia — ClCr 20–49: 500 mg + 250 mg 24/24 h; ClCr 10–19: 500 mg + 250 mg 48/48 h"
      ],
      via: "EV ou VO",
      indicacoes: "TR superior/inferior, pele/subcutâneo, ITU, osteomielite."
    },
    {
      id: "linezolida", nome: "Linezolida", classe: "Oxazolidinona",
      diluicao: "Bolsa pronta em 30–120 min.",
      dose: "VO ou EV: 400–600 mg 12/12 h.",
      ajusteRenal: ["Sem ajuste"],
      ajusteDialise: "Sem ajuste",
      via: "EV ou VO",
      indicacoes: "VRE; pneumonia nosocomial por S. aureus (incluindo MRSA) ou S. pneumoniae (incluindo MDRSP); pele/partes moles (inclui pé diabético sem osteomielite); PAC por Gram+ sensíveis."
    },
    {
      id: "meropenem", nome: "Meropenem", classe: "Carbapenema",
      diluicao: "500 mg ou 1 g em SF 0,9%/SG 5% a 1–20 mg/mL. Infusão 15–30 min.",
      dose: "1–2 g 8/8 h.",
      ajusteRenal: [
        "ClCr > 50: sem ajuste",
        "ClCr 26–50: mesma dose 12/12 h",
        "ClCr 10–25: metade 12/12 h",
        "ClCr < 10: metade 24/24 h"
      ],
      ajusteDialise: "Intermitente: 500 mg 24/24 h após HD. CVVH: ataque 1 g + 500 mg 8/8 h.",
      via: "EV",
      indicacoes: "Intra-abdominal (peritonite, apendicite complicada), meningite bacteriana em ≥ 3 meses (S. pneumoniae, H. influenzae, N. meningitidis), pele/partes moles complicada."
    },
    {
      id: "metronidazol", nome: "Metronidazol", classe: "Antimicrobiano / Antiparasitário",
      diluicao: "Bolsa pronta em 30 minutos.",
      dose: "500 mg 6–8 h.",
      ajusteRenal: ["ClCr < 10 (não dialisado): considerar reduzir 50% 24/24 h"],
      ajusteDialise: "Sem ajuste",
      via: "EV e VO",
      indicacoes: "Profilaxia e tratamento de infecções por bactérias anaeróbicas."
    },
    {
      id: "micafungina", nome: "Micafungina", classe: "Antifúngico",
      diluicao: "SF 0,9% e SG 5% 100 mL em 60 min.",
      dose: "100 mg 24/24 h (se resposta inadequada, ↑ até 200 mg/dia em pacientes > 40 kg, ou 4 mg/kg/dia em < 40 kg).",
      ajusteRenal: ["Sem ajuste"],
      ajusteDialise: "Sem ajuste",
      via: "EV",
      indicacoes: "Candidíase invasiva e esofágica; profilaxia em transplante de células-tronco hematopoiéticas ou em neutropenia esperada."
    },
    {
      id: "moxifloxacino", nome: "Moxifloxacino", classe: "Quinolona",
      diluicao: "Bolsa pronta em 60 min.",
      dose: "400 mg 1×/dia.",
      ajusteRenal: ["Sem ajuste"],
      ajusteDialise: "Sem ajuste",
      via: "EV ou VO",
      indicacoes: "VAS/VAI, sinusite aguda, pele/partes moles não complicada, DIP não complicada, intra-abdominal complicada (inclui abscessos polimicrobianos)."
    },
    {
      id: "oxacilina", nome: "Oxacilina", classe: "Penicilina",
      diluicao: "EV direto 10 min ou EV 15–30 min. IM: aplicar em músculo grande (glúteo maior).",
      dose: "1–2 g 4–6 h.",
      ajusteRenal: ["Sem ajuste"],
      ajusteDialise: "Sem ajuste",
      via: "EV ou IM",
      indicacoes: "Osteomielite, endocardite, septicemia, SNC por Staphylococcus sensível."
    },
    {
      id: "pip-tazo", nome: "Piperacilina + Tazobactam", classe: "β-lactâmico + Inibidor de β-lactamase",
      diluicao: "2,25 g ou 4,5 g em 50–150 mL de SF/SG 5%/RL. Infusão 20–30 min.",
      dose: "4,5 g 6–8 h.",
      ajusteRenal: [
        "ClCr 20–40: 4,5 g 8/8 h ou 3,375 g 6/6 h",
        "ClCr < 20: 4,5 g 12/12 h ou 2,25 g 6/6 h"
      ],
      ajusteDialise: "2,25 g 12/12 h (8/8 h em pneumonia nosocomial). Suplementar 0,75 g pós-HD se a dose normal não estiver programada.",
      via: "EV",
      indicacoes: "Pele/partes moles, DIP, TR inferior, ITU."
    },
    {
      id: "polimixina-b", nome: "Polimixina B", classe: "Polipeptídeo",
      diluicao: "SG 5% 300 mL para cada 500.000 UI em 120 min.",
      dose: "Ataque: 25.000 UI/kg (2,5 mg/kg). Manutenção: 15.000–25.000 UI/kg/dia 12/12 h.",
      ajusteRenal: ["Sem ajuste"],
      ajusteDialise: "Sem ajuste",
      via: "EV",
      indicacoes: "Pseudomonas aeruginosa, H. influenzae (meninges), E. coli (ITU), Aerobacter aerogenes e Klebsiella pneumoniae (bacteremias)."
    },
    {
      id: "smt-tmp", nome: "Sulfametoxazol + Trimetoprima", classe: "Sulfonamida",
      diluicao: "SG 5%, SF 0,9% e RL. Cada ampola (5 mL) em 75–125 mL. Infundir em 60–90 min.",
      dose: "5–20 mg/kg 6–12 h. Máx: 20 mg/kg/dia.",
      ajusteRenal: [
        "ClCr > 30: sem ajuste",
        "ClCr 15–30: 50% da dose",
        "ClCr < 15: não recomendado"
      ],
      ajusteDialise: "Intermitente: administrar após diálise",
      via: "EV ou VO",
      indicacoes: "VO: fibrose cística, DPOC, ciclosporíase, granuloma inguinal, P. jirovecii (profilaxia e tratamento), toxoplasmose, shigelose, ITU. EV: meningite bacteriana, pneumocistose, toxoplasmose, shigelose, ITU por Gram-negativos (E. coli, Klebsiella, Enterobacter, M. morganii, Proteus)."
    },
    {
      id: "tigeciclina", nome: "Tigeciclina", classe: "Glicilciclina",
      diluicao: "100 mL de SF ou SG. Administrar em 30–60 min.",
      dose: "100 mg EV ataque, depois 50 mg 12/12 h.",
      ajusteRenal: ["Sem ajuste"],
      ajusteDialise: "Sem ajuste",
      via: "EV",
      indicacoes: "Pele/partes moles complicada (incluindo MRSA e sensíveis à vancomicina); intra-abdominal complicada; PAC."
    },
    {
      id: "teicoplanina", nome: "Teicoplanina", classe: "Glicopeptídeo",
      diluicao: "SF 0,9% e SG 5% 100 mL em 30 min.",
      dose: "Ataque: 3 doses de 400 mg EV 12/12 h. Manutenção: 400 mg EV ou IM 1×/dia (≈ 6 mg/kg).",
      ajusteRenal: [
        "Sem ajuste até o 4º dia de tratamento; após, ajustar para manter nível sérico ≥ 10 mg/L:",
        "ClCr 40–60: 50% da dose 24/24 h ou 100% a cada 2 dias",
        "ClCr < 40: 1/3 da dose ou 100% a cada 3 dias"
      ],
      via: "EV ou IM",
      indicacoes: "Gram+ sensíveis (incluindo MRSA/cefalosporinas): endocardite, septicemia, osteoarticulares, TR inferior, pele/partes moles, ITU, peritonite associada a DPAC; alérgicos à penicilina/cefalosporina; VO em diarreia associada a antibiótico, incluindo C. difficile; profilaxia em pacientes Gram+-suscetíveis."
    },
    {
      id: "vancomicina", nome: "Vancomicina", classe: "Glicopeptídeo",
      diluicao: "SF 0,9% 250 mL em 60 min.",
      dose: "EV (peso real): ataque 25–30 mg/kg + 15–20 mg/kg/dose 8/8 ou 12/12 h. VO: 500–2000 mg/dia divididos 6/6 h.",
      ajusteRenal: ["Guiada pela vancocinemia (ver protocolo)"],
      ajusteDialise: "Guiada pela vancocinemia",
      via: "EV ou VO",
      indicacoes: "EV: estafilococos e estreptococos. VO: diarreia por C. difficile e enterocolite por S. aureus (incluindo MRSA)."
    }
  ]
};
