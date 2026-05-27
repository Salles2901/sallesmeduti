// Motor da calculadora dose × peso → mL/h
// Trabalha com unidades normalizadas internamente.

// Converte qualquer unidade da faixa para mcg/kg/min para cálculo unificado
export function normalizeFaixaUnit(unit) {
  switch (unit) {
    case "mcg/kg/min": return { mult: 1, dim: "porKg" };
    case "mcg/kg/h":   return { mult: 1 / 60, dim: "porKg" };
    case "mg/kg/min":  return { mult: 1000, dim: "porKg" };
    case "mg/kg/h":    return { mult: 1000 / 60, dim: "porKg" };
    case "mcg/min":    return { mult: 1, dim: "absoluta" };
    case "U/min":      return { mult: 1, dim: "U_abs" };
    case "mL/h":       return { mult: 1, dim: "mL_h" };
    default:           return { mult: 1, dim: "porKg" };
  }
}

// Calcula mL/h dado uma droga, dose e peso
// droga: objeto do schema do Molde A
// dose: número (na unidade original da faixa)
// peso: kg
export function calcularMLh(droga, dose, peso) {
  if (!droga || dose == null || isNaN(dose)) return null;

  const unit = droga.faixa?.unidade;
  const conv = normalizeFaixaUnit(unit);

  // Vasopressina (U/min) ou Nitroglicerina (mcg/min) — dose absoluta, sem peso
  if (conv.dim === "absoluta" || conv.dim === "U_abs") {
    // mL/h = dose (mcg/min ou U/min) × 60 / concentração (mcg/mL ou U/mL)
    const conc = droga.concentracao_mcg_mL || droga.concentracao_U_mL;
    if (!conc) return null;
    return (dose * 60) / conc;
  }

  // mL/h direto (morfina dripping)
  if (conv.dim === "mL_h") {
    return dose;
  }

  // Por peso: tudo normalizado para mcg/kg/min × concentração em mcg/mL
  if (!peso || isNaN(peso) || peso <= 0) return null;
  const conc = droga.concentracao_mcg_mL;
  if (!conc) return null;
  const dose_mcg_kg_min = dose * conv.mult;
  return (dose_mcg_kg_min * peso * 60) / conc;
}

// Verifica se a dose está dentro da faixa terapêutica
export function statusFaixa(droga, dose) {
  if (!droga?.faixa) return "neutral";
  const { min, max } = droga.faixa;
  if (dose < min) return "below";
  if (dose > max) return "above";
  return "in";
}

// Formata número com vírgula brasileira
export function fmt(n, decimais = 1) {
  if (n == null || isNaN(n)) return "—";
  return n.toLocaleString("pt-BR", { minimumFractionDigits: decimais, maximumFractionDigits: decimais });
}

// Gera texto de prescrição preenchido com cálculo
export function prescricaoCalculada(droga, dose, peso, mLh) {
  if (!droga) return "";
  const base = droga.prescricaoPratica || "";
  // Se for por peso, anexar linha com cálculo
  const conv = normalizeFaixaUnit(droga.faixa?.unidade);
  const suffix = (conv.dim === "porKg" && peso > 0)
    ? `\n\n→ Para ${fmt(peso, 0)} kg @ ${fmt(dose, 3)} ${droga.faixa.unidade}: ${fmt(mLh, 2)} mL/h`
    : (mLh != null ? `\n\n→ Velocidade calculada: ${fmt(mLh, 2)} mL/h` : "");
  return base + suffix;
}

// Renderiza um bloco de calculadora dentro de um card de droga
export function renderCalculator(droga, container) {
  const isAbsolute = ["mcg/min", "U/min"].includes(droga.faixa?.unidade);
  const isMLh = droga.faixa?.unidade === "mL/h";
  if (isMLh) {
    container.innerHTML = `<div class="callout info"><div class="callout-body">Esquema fixo de dripping — sem cálculo dose × peso necessário.</div></div>`;
    return;
  }

  const unit = droga.faixa?.unidade || "—";
  const { min, max } = droga.faixa || {};
  const defaultDose = (min + max) / 2;
  const defaultPeso = 70;

  container.innerHTML = `
    <div class="calc">
      <h4 class="calc-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h2M8 18h2M14 14h2M14 18h2"/></svg>
        Calculadora dose × ${isAbsolute ? "" : "peso × "}concentração → mL/h
      </h4>
      <div class="calc-grid">
        ${isAbsolute ? "" : `
          <div class="calc-field">
            <label for="calc-peso-${droga.id}">Peso do paciente</label>
            <div class="ctrl">
              <input type="number" id="calc-peso-${droga.id}" min="1" max="300" step="1" value="${defaultPeso}" inputmode="numeric" />
              <span class="unit">kg</span>
            </div>
          </div>
        `}
        <div class="calc-field">
          <label for="calc-dose-${droga.id}">Dose desejada</label>
          <div class="ctrl">
            <input type="number" id="calc-dose-${droga.id}" min="0" step="${stepFor(unit)}" value="${defaultDose}" inputmode="decimal" />
            <span class="unit">${unit}</span>
          </div>
        </div>
      </div>
      <div class="calc-result" id="calc-result-${droga.id}">
        <div>
          <div class="calc-output"><span class="value">—</span><span class="unit">mL/h</span></div>
          <div class="calc-status">Insira os valores acima.</div>
        </div>
        <div>
          <button type="button" class="btn btn-copy small" data-copy-target="#rx-text-${droga.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            Copiar prescrição
          </button>
        </div>
      </div>
      <div class="calc-formula">
        ${isAbsolute
          ? `mL/h = dose (${unit}) × 60 / concentração (${droga.concentracao})`
          : `mL/h = dose (${unit}) × peso (kg) × 60 / concentração (${droga.concentracao})`}
      </div>
      <div class="rx-block" id="rx-text-${droga.id}">${escape(droga.prescricaoPratica || "")}</div>
    </div>
  `;

  const dInput = container.querySelector(`#calc-dose-${droga.id}`);
  const pInput = container.querySelector(`#calc-peso-${droga.id}`);
  const result = container.querySelector(`#calc-result-${droga.id}`);
  const valueEl = result.querySelector(".value");
  const statusEl = result.querySelector(".calc-status");
  const rxEl = container.querySelector(`#rx-text-${droga.id}`);

  function update() {
    const dose = parseFloat(dInput.value);
    const peso = pInput ? parseFloat(pInput.value) : 0;
    const mlh = calcularMLh(droga, dose, peso);
    valueEl.textContent = mlh == null ? "—" : fmt(mlh, 2);

    result.classList.remove("in-range", "warn", "danger");
    if (!isNaN(dose)) {
      const st = statusFaixa(droga, dose);
      if (st === "in") {
        result.classList.add("in-range");
        statusEl.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg> Dentro da faixa terapêutica (${fmt(min,3)} – ${fmt(max,3)} ${unit})`;
      } else if (st === "below") {
        result.classList.add("warn");
        statusEl.innerHTML = `⚠ Dose abaixo do mínimo (${fmt(min, 3)} ${unit})`;
      } else if (st === "above") {
        result.classList.add("danger");
        statusEl.innerHTML = `⚠ Dose acima do máximo (${fmt(max, 3)} ${unit}) — confira antes de prescrever.`;
      }
    } else {
      statusEl.textContent = "Insira os valores acima.";
    }

    // Atualiza texto de prescrição para refletir cálculo
    rxEl.textContent = prescricaoCalculada(droga, dose, peso, mlh);
  }

  dInput.addEventListener("input", update);
  if (pInput) pInput.addEventListener("input", update);
  update();
}

function stepFor(unit) {
  if (unit === "mcg/kg/min") return "0.01";
  if (unit === "mcg/kg/h") return "0.1";
  if (unit === "mg/kg/h") return "0.05";
  if (unit === "U/min") return "0.005";
  if (unit === "mcg/min") return "1";
  return "0.1";
}

function escape(s) {
  return (s || "").replace(/[<>&"]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));
}
