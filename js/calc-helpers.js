// Handlers para calculadoras auxiliares (fórmulas, peso ideal, opioides, corticoides)

import { fmt } from "./calculator.js";

// Calculadora genérica de fórmulas (cap. 19)
export function bindFormulaCalcs(root) {
  root.querySelectorAll(".calc[data-formula]").forEach(box => {
    const id = box.dataset.formula;
    const compute = box.dataset.compute;
    const inputs = box.querySelectorAll("input, select");
    const valueEl = box.querySelector(".calc-output .value");
    const statusEl = box.querySelector(".calc-status");

    const update = () => {
      const ctx = {};
      let allFilled = true;
      inputs.forEach(inp => {
        const key = inp.id.replace(`${id}-`, "");
        const raw = inp.value;
        if (inp.tagName === "SELECT") {
          ctx[key] = raw;
        } else {
          const n = parseFloat(raw);
          if (isNaN(n)) allFilled = false;
          ctx[key] = n;
        }
      });
      if (!allFilled) {
        valueEl.textContent = "—";
        statusEl.textContent = "Preencha os campos.";
        return;
      }
      try {
        const fn = new Function(...Object.keys(ctx), `return ${compute};`);
        const result = fn(...Object.values(ctx));
        valueEl.textContent = isFinite(result) ? fmt(result, 2) : "—";
        statusEl.textContent = "";
      } catch {
        valueEl.textContent = "—";
        statusEl.textContent = "Erro no cálculo.";
      }
    };
    inputs.forEach(inp => inp.addEventListener("input", update));
    update();
  });
}

// Calculadora de peso ideal (cap. 9)
export function bindPesoIdeal(root) {
  const sexo = root.querySelector("#pi-sexo");
  const altura = root.querySelector("#pi-altura");
  const pesoOut = root.querySelector("#pi-peso");
  const vcOut = root.querySelector("#pi-vc");
  if (!sexo || !altura) return;

  const update = () => {
    const h = parseFloat(altura.value);
    if (isNaN(h)) { pesoOut.textContent = "—"; vcOut.textContent = "—"; return; }
    const base = sexo.value === "f" ? 45.5 : 50;
    const peso = base + 0.91 * (h - 152.4);
    pesoOut.textContent = fmt(peso, 1);
    vcOut.textContent = fmt(peso * 6, 0);
  };
  sexo.addEventListener("change", update);
  altura.addEventListener("input", update);
  update();
}

// Conversor de opioides (cap. 20)
export function bindOpioidConverter(root, tabela) {
  const from = root.querySelector("#op-from");
  const fromVia = root.querySelector("#op-from-via");
  const dose = root.querySelector("#op-dose");
  const to = root.querySelector("#op-to");
  const toVia = root.querySelector("#op-to-via");
  const result = root.querySelector("#op-result");
  if (!from) return;

  const find = name => tabela.find(d => d.droga === name);
  const getEq = (drug, via) => {
    const val = via === "ev" ? drug.ev : drug.oral;
    return typeof val === "number" ? val : null;
  };

  const update = () => {
    const f = find(from.value);
    const t = find(to.value);
    const d = parseFloat(dose.value);
    if (!f || !t || isNaN(d)) { result.textContent = "—"; return; }
    const eqFrom = getEq(f, fromVia.value);
    const eqTo = getEq(t, toVia.value);
    if (eqFrom == null || eqTo == null) { result.textContent = "Indisponível"; return; }
    const eqMorfina = (d / eqFrom) * 10; // converter tudo via morfina
    const out = (eqMorfina / 10) * eqTo;
    result.textContent = fmt(out, 2);
  };

  [from, fromVia, dose, to, toVia].forEach(el => el.addEventListener("input", update));
  update();
}

// Conversor de corticoides (cap. 21)
export function bindCorticoidConverter(root) {
  const from = root.querySelector("#ct-from");
  const dose = root.querySelector("#ct-dose");
  const to = root.querySelector("#ct-to");
  const result = root.querySelector("#ct-result");
  if (!from) return;

  const getEq = sel => parseFloat(sel.selectedOptions[0]?.dataset.eq);

  const update = () => {
    const eqFrom = getEq(from);
    const eqTo = getEq(to);
    const d = parseFloat(dose.value);
    if (isNaN(eqFrom) || isNaN(eqTo) || isNaN(d) || eqFrom <= 0) { result.textContent = "—"; return; }
    // dose em mg de hidrocortisona equivalente: d * (20 / eqFrom)
    // dose-alvo: (d_hidro / 20) * eqTo
    const dHidro = d * (20 / eqFrom);
    const out = (dHidro / 20) * eqTo;
    result.textContent = fmt(out, 2);
  };

  [from, dose, to].forEach(el => el.addEventListener("input", update));
  update();
}
