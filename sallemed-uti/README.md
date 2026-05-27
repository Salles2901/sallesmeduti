# SalleMED – UTI

Guia interativo de plantão para terapia intensiva, baseado no **Guia Prático de Plantão – Terapia Intensiva** (MedRoute, 1ª ed.). Funciona 100% offline, sem backend, hospedável em qualquer estático (GitHub Pages, Vercel, Netlify).

## Funcionalidades

- **21 capítulos** completos do guia: evolução, procedimentos, profilaxias, drogas vasoativas/sedoanalgesia/bloqueadores, outras infusões, SRI, ventilação, eletrólitos, hemoderivados, heparinização, glicemia, delirium, ME, antimicrobianos (37 fichas), prescrição empírica, vancocinemia, fórmulas, opioides e corticoides.
- **Calculadora dose × peso → mL/h** em cada droga em infusão contínua, com validação visual de faixa terapêutica (verde dentro / âmbar abaixo / vermelho acima).
- **Botão "Copiar prescrição"** em todas as receitas prontas — texto formatado para colar no prontuário.
- **Busca global** com atalho `/` e match parcial (droga, capítulo, antibiótico, microrganismo, fórmula).
- **Calculadoras auxiliares**: ClCr (Cockcroft-Gault), ânion gap, osmolaridade, cálcio corrigido, peso ideal, FENa, gradiente A-a, P/F.
- **Conversores interativos** de opioides e corticoides.
- **Modo claro/escuro** com persistência (`localStorage`).
- **Responsivo**: drawer lateral no mobile, tabelas com scroll horizontal, foco visível, navegação por teclado.

## Rodar localmente

Como é HTML/CSS/JS puro com ES Modules, você precisa de qualquer servidor estático (browsers bloqueiam módulos em `file://`).

```bash
# Opção 1: Python
cd sallemed-uti
python3 -m http.server 8000

# Opção 2: Node (npx serve, http-server, etc.)
npx serve sallemed-uti -p 8000
```

Abra `http://localhost:8000`.

## Deploy

### GitHub Pages
1. Crie um repositório com o conteúdo de `sallemed-uti/` na raiz.
2. Em **Settings → Pages**, aponte para a branch principal, pasta `/ (root)`.
3. O site fica em `https://<usuario>.github.io/<repo>/`.

### Vercel / Netlify
Arraste a pasta `sallemed-uti/` ou conecte o repositório — sem build step.

## Estrutura

```
sallemed-uti/
├── index.html
├── css/
│   ├── main.css        ← reset, tipografia, variáveis CSS
│   ├── layout.css      ← topbar, sidebar (drawer mobile), grid
│   ├── components.css  ← cards, calculadora, tabelas, callouts, botões
│   └── themes.css      ← :root light + [data-theme="dark"]
├── js/
│   ├── app.js          ← shell SPA + hash routing
│   ├── theme.js        ← toggle light/dark + persistência
│   ├── search.js       ← índice global + busca instantânea
│   ├── calculator.js   ← motor dose × peso → mL/h + validação de faixa
│   ├── calc-helpers.js ← fórmulas auxiliares + conversores
│   ├── clipboard.js    ← copiar prescrição com fallback
│   └── views.js        ← renderizadores de cada tipo de capítulo
└── data/
    ├── index.js               ← agregador de capítulos
    ├── cap01-evolucao.js      ← Evolução médica + mnemônico FASTED HUG CMME
    ├── cap02-procedimentos.js ← PAI, CVC
    ├── cap03-profilaxias.js   ← TVP, LAMG, LPP
    ├── cap04-vasoativas.js    ← 11 drogas (Molde A)
    ├── cap05-sedoanalgesia.js ← 6 drogas + RASS
    ├── cap06-bloqueadores.js  ← 4 drogas
    ├── cap07-outras-infusoes.js ← amiodarona, fenitoína, etc.
    ├── cap08-sri.js           ← Sequência Rápida de Intubação
    ├── cap09-ventilacao.js    ← VNI, VM, desmame
    ├── cap10-eletrolitos.js
    ├── cap11-hemoderivados.js
    ├── cap12-heparinizacao.js
    ├── cap13-15.js            ← Glicemia, Delirium, Morte Encefálica
    ├── cap16-antimicrobianos.js ← 37 fichas
    ├── cap17-empirica.js      ← Prescrição empírica por sistema
    └── cap18-21.js            ← Vancocinemia, Fórmulas, Opioides, Corticoides
```

## Schema dos dados (Molde A – drogas em infusão)

Todos os capítulos de drogas em infusão contínua compartilham este schema, que alimenta a calculadora:

```js
{
  id: "noradrenalina-128",
  nome: "Noradrenalina",
  variante: "mais concentrada",   // null se única
  ampola: "4 mg/4 mL (1 mg/mL)",
  diluicao: "8 ampolas (32 mL) + 218 mL de SG 5%",
  volumeTotal_mL: 250,
  concentracao: "128 mcg/mL",     // texto exibido
  concentracao_mcg_mL: 128,       // canônico p/ cálculo
  faixa: { min: 0.01, max: 1.5, unidade: "mcg/kg/min" },
  tabela: {
    pesos: [50, 60, 70, 80, 90, 100],
    linhas: [
      { dose: 0.01, label: "Mínima", valores: [0.2, 0.3, ...] },
      { dose: 1.5,  label: "Máxima", valores: [35.2, 40.8, ...] }
    ]
  },
  prescricaoPratica: "Noradrenalina (1mg/mL) 32 mL + 218 mL de SG 5% EV em BIC.\nIniciar a 5 mL/h e titular resposta."
}
```

**Fórmula da calculadora:**
```
mL/h = dose (mcg/kg/min) × peso (kg) × 60 / concentração (mcg/mL)
```

Unidades não-canônicas (`mcg/kg/h`, `mg/kg/h`, `U/min`, `mcg/min`, `mL/h` direto) são normalizadas em `calculator.js > normalizeFaixaUnit()`.

## Observações sobre extração do PDF

O PDF original imprime algumas faixas em `µg/kg/h` quando os cálculos das tabelas demonstram tratar-se de `mg/kg/h`. Estas drogas foram corrigidas (com comentário `// REVISAR` no código e o selo "unidade corrigida" no card):

- **Midazolam**, **Propofol**, **Cetamina** (sedoanalgesia)
- **Rocurônio**, **Pancurônio** (bloqueadores)

Demais drogas seguem fielmente o guia.

## Avisos clínicos

- **Material para profissionais de saúde.** Protocolos podem mudar; a decisão final de dose/conduta é do médico assistente, considerando bula e contexto do paciente.
- **Antimicrobianos:** sugestões empíricas — seguir flora local, culturas e CCIH.
- **Insulina e vancocinemia:** seguir o protocolo institucional.
- Conteúdo baseado no *Guia Prático de Plantão – Terapia Intensiva* (MedRoute, 1ª ed.), reorganizado em formato de aplicação. Para uso pessoal/estudo — não redistribuir.

## Licença

Software (HTML/CSS/JS) sob MIT. Conteúdo clínico © MedRoute — uso pessoal/estudo conforme o guia original.
