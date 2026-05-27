// Renderizadores de cada tipo de capítulo/conteúdo

import { renderCalculator, fmt } from "./calculator.js";
import { bindCopyButtons } from "./clipboard.js";

const esc = s => (s == null ? "" : String(s).replace(/[<>&"]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c])));
const nl = s => esc(s).replace(/\n/g, "<br>");

// ===== HOME =====
export function renderHome(capitulos) {
  const tiles = capitulos.map(c => `
    <a class="chapter-tile" href="#/${c.id}">
      <h3><span class="nav-num">${c.num}</span> ${esc(c.titulo)}</h3>
      <small>${esc((c.intro || "").slice(0, 90))}${(c.intro || "").length > 90 ? "…" : ""}</small>
    </a>
  `).join("");

  return `
    <div class="home-hero">
      <h1>SalleMED <span style="color:var(--accent)">– UTI</span></h1>
      <p>Guia prático de plantão para terapia intensiva: drogas, doses, fluxogramas, protocolos e prescrições prontas. Use a busca acima ou navegue pelos capítulos.</p>
    </div>
    <div class="chapter-grid">${tiles}</div>
    <div class="disclaimer">
      <strong>Aviso clínico.</strong> Conteúdo baseado no <em>Guia Prático de Plantão – Terapia Intensiva</em> (MedRoute, 1ª ed.), reorganizado em formato de aplicação para uso pessoal/estudo. Material para profissionais de saúde — protocolos podem mudar e a decisão final de dose/conduta é do médico assistente, considerando bula, contexto clínico e flora local.
    </div>
  `;
}

// ===== Capítulo 1: Evolução =====
export function renderEvolucao(cap) {
  const mn = cap.mnemonico;
  const linhas = mn.itens.map(it => `
    <tr>
      <td class="col-label"><span class="badge brand">${esc(it.letra)}</span></td>
      <td><strong>${esc(it.nome)}</strong></td>
      <td>${esc(it.desc)}</td>
    </tr>
  `).join("");

  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>

    <h2>${esc(mn.titulo)}</h2>
    <p>${esc(mn.descricao)}</p>
    <div class="table-wrap"><table class="data">
      <thead><tr><th></th><th>Item</th><th>Descrição</th></tr></thead>
      <tbody>${linhas}</tbody>
    </table></div>

    <h2>${esc(cap.modeloEvolucao.titulo)}</h2>
    <div class="rx-block" id="evol-template">${esc(cap.modeloEvolucao.template)}</div>
    <button class="btn btn-copy" data-copy-target="#evol-template">📋 Copiar modelo</button>
    ${disclaimer()}
  `;
}

// ===== Capítulo 2: Procedimentos =====
export function renderProcedimentos(cap) {
  const itens = cap.itens.map(p => `
    <section class="card" id="${p.id}">
      <div class="card-header"><h3 class="card-title">${esc(p.nome)}</h3></div>
      <p>${esc(p.descricao)}</p>

      ${p.indicacoes ? `<h4>Indicações</h4><ul>${p.indicacoes.map(i => `<li>${esc(i)}</li>`).join("")}</ul>` : ""}
      ${p.contraindicacoes ? `<h4>Contraindicações</h4><ul>${p.contraindicacoes.map(i => `<li>${esc(i)}</li>`).join("")}</ul>` : ""}
      ${p.contraindicacoesRelativas ? `<h4>Contraindicações relativas (dosar risco-benefício)</h4><ul>${p.contraindicacoesRelativas.map(i => `<li>${esc(i)}</li>`).join("")}</ul>` : ""}

      ${p.sitios ? renderSitios(p.sitios) : ""}

      ${p.passos ? renderPassos(p.passos) : ""}
      ${p.passos && !Array.isArray(p.passos) ? "" : ""}
      ${Array.isArray(p.passos) ? `<h4>Passo a passo</h4><ol>${p.passos.map(s => `<li>${esc(s)}</li>`).join("")}</ol>` : ""}
      ${p.alerta ? `<div class="callout warn"><div class="callout-body">${esc(p.alerta)}</div></div>` : ""}

      ${p.ondaQuadrada ? renderOndaQuadrada(p.ondaQuadrada) : ""}
    </section>
  `).join("");

  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>
    ${itens}
    ${disclaimer()}
  `;
}

function renderSitios(sitios) {
  return `
    <h4>Sítios de punção</h4>
    <div class="table-wrap"><table class="data">
      <thead><tr><th>Sítio</th><th>Vantagens</th><th>Desvantagens</th>${sitios[0].calibre ? "<th>Calibre</th>" : ""}</tr></thead>
      <tbody>
        ${sitios.map(s => `
          <tr>
            <td class="col-label">${esc(s.nome)}</td>
            <td>${esc(s.vantagens)}</td>
            <td>${esc(s.desvantagens)}</td>
            ${s.calibre ? `<td class="num">${esc(s.calibre)}</td>` : ""}
          </tr>
        `).join("")}
      </tbody>
    </table></div>
  `;
}

function renderPassos(passos) {
  if (Array.isArray(passos)) return "";
  return Object.entries(passos).map(([key, lista]) => `
    <details class="collapsible" open>
      <summary>Passo a passo — ${esc(key === "radial" ? "Artéria Radial" : key === "femoral" ? "Artéria Femoral" : key)}</summary>
      <div class="collapsible-body"><ol>${lista.map(s => `<li>${esc(s)}</li>`).join("")}</ol></div>
    </details>
  `).join("");
}

function renderOndaQuadrada(o) {
  return `
    <details class="collapsible">
      <summary>${esc(o.titulo)}</summary>
      <div class="collapsible-body">
        <p>${esc(o.descricao)}</p>
        <p><strong>Amortecida:</strong> ${esc(o.amortecida)}</p>
        <p><strong>Subamortecida:</strong> ${esc(o.subamortecida)}</p>
        <h5>Orientações gerais</h5>
        <ul>${o.orientacoes.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
        <h5>Como zerar a PAI</h5>
        <ol>${o.zerarPAI.map(i => `<li>${esc(i)}</li>`).join("")}</ol>
      </div>
    </details>
  `;
}

// ===== Capítulo 3: Profilaxias =====
export function renderProfilaxias(cap) {
  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>
    ${cap.itens.map(p => renderProfilaxia(p)).join("")}
    ${disclaimer()}
  `;
}

function renderProfilaxia(p) {
  let html = `<section class="card" id="${p.id}">
    <div class="card-header"><h3 class="card-title">${esc(p.nome)}</h3></div>
    <p>${esc(p.descricao)}</p>`;

  if (p.escorePadua) {
    html += `<h4>${esc(p.escorePadua.titulo)}</h4>
    <div class="table-wrap"><table class="data">
      <thead><tr><th>Fator de risco</th><th>Pontos</th></tr></thead>
      <tbody>${p.escorePadua.fatores.map(f => `
        <tr><td>${esc(f.fator)}</td><td class="num">${esc(f.pontos)}</td></tr>
      `).join("")}</tbody>
    </table></div>
    <p class="muted"><strong>Interpretação:</strong> ${esc(p.escorePadua.interpretacao)}</p>`;
  }

  if (p.farmacologica) {
    html += `<h4>Profilaxia farmacológica</h4>
    <div class="table-wrap"><table class="data">
      <thead><tr><th>Droga</th><th>Dose</th><th>Observações</th></tr></thead>
      <tbody>${p.farmacologica.map(d => `
        <tr><td class="col-label">${esc(d.droga)}</td><td>${nl(d.dose)}</td><td>${nl(d.obs || "")}</td></tr>
      `).join("")}</tbody>
    </table></div>`;
  }

  if (p.mecanica) {
    html += `<h4>Profilaxia mecânica</h4><ul>${p.mecanica.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
  }
  if (p.contraindicacoes) {
    html += `<h4>Contraindicações</h4><ul>${p.contraindicacoes.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
  }

  if (p.fluxograma) {
    html += `<h4>Fluxograma</h4>
      <div class="flow-branches">
        <div class="flow-branch yes"><h5>Iniciar sempre se</h5><ul>${p.fluxograma.gatilhoSempre.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>
        <div class="flow-branch yes"><h5>Fatores MAIORES</h5><ul>${p.fluxograma.fatoresMaiores.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>
        <div class="flow-branch"><h5>Fatores MENORES</h5><ul>${p.fluxograma.fatoresMenores.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>
      </div>
      <div class="callout info"><div class="callout-body">${esc(p.fluxograma.regra)}</div></div>`;
  }

  if (p.medicacoes) {
    html += `<h4>Profilaxia farmacológica</h4>
    <h5>IBPs (mais utilizados)</h5>
    ${tabelaDrogasEnEv(p.medicacoes.ibp)}
    <h5>Antagonistas H2</h5>
    ${tabelaDrogasEnEv(p.medicacoes.h2)}
    <h5>Outros</h5>
    ${tabelaDrogasEnEv(p.medicacoes.outros)}
    <div class="callout info"><div class="callout-body"><strong>Terapia complementar:</strong> ${esc(p.medicacoes.complementar)}</div></div>`;
  }

  if (p.escala) {
    html += `<h4>${esc(p.escala)}</h4>
    <div class="table-wrap"><table class="data"><tbody>${p.regras.map(r => `
      <tr><td class="col-label">${esc(r.escore)}</td><td>${esc(r.conduta)}</td></tr>`).join("")}</tbody></table></div>`;
  }
  if (p.medidas) {
    html += `<h4>Medidas de prevenção</h4><ul>${p.medidas.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
  }

  html += `</section>`;
  return html;
}

function tabelaDrogasEnEv(arr) {
  return `<div class="table-wrap"><table class="data">
    <thead><tr><th>Droga</th><th>Via enteral</th><th>Via endovenosa</th></tr></thead>
    <tbody>${arr.map(d => `<tr><td class="col-label">${esc(d.droga)}</td><td>${esc(d.enteral)}</td><td>${esc(d.ev)}</td></tr>`).join("")}</tbody>
  </table></div>`;
}

// ===== Caps 4-6: Drogas Molde A =====
export function renderDrogasMoldeA(cap) {
  // Listar grupos de variantes
  const items = cap.drogas.map(d => renderDrogaMoldeA(d)).join("");
  let prefixo = "";

  if (cap.rass) {
    prefixo += renderRass(cap.rass);
  }

  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>
    ${prefixo}
    ${items}
    ${disclaimer()}
  `;
}

function renderRass(rass) {
  return `<section class="card" id="rass">
    <div class="card-header"><h3 class="card-title">${esc(rass.titulo)}</h3></div>
    <p>${esc(rass.descricao)}</p>
    <div class="table-wrap"><table class="data">
      <thead><tr><th>Pontos</th><th>Classificação</th><th>Descrição</th></tr></thead>
      <tbody>${rass.linhas.map(l => `
        <tr>
          <td class="col-label num">${esc(l.pontos)}</td>
          <td>${esc(l.classe)}</td>
          <td>${esc(l.desc)}</td>
        </tr>
      `).join("")}</tbody>
    </table></div>
  </section>`;
}

function renderDrogaMoldeA(d) {
  const head = `<div class="card-header">
    <h3 class="card-title">${esc(d.nome)}${d.variante ? ` <span class="card-variant">— ${esc(d.variante)}</span>` : ""}</h3>
    ${d.observacaoUnidade ? `<span class="review-flag" title="${esc(d.observacaoUnidade)}">unidade corrigida</span>` : ""}
  </div>`;

  const props = `<dl class="prop-grid">
    <dt>Ampola</dt><dd>${esc(d.ampola)}</dd>
    <dt>Diluição</dt><dd>${nl(d.diluicao)}</dd>
    <dt>Concentração</dt><dd><span class="hl">${esc(d.concentracao)}</span></dd>
    <dt>Faixa terapêutica</dt><dd>${esc(d.faixa.min)} a <strong>${esc(d.faixa.max)}</strong> ${esc(d.faixa.unidade)}</dd>
    ${d.observacoes ? `<dt>Observações</dt><dd>${nl(d.observacoes)}</dd>` : ""}
  </dl>`;

  const tabela = d.tabela ? renderTabelaDose(d.tabela) : "";
  const tabelaExtra = d.tabelaExtra ? `<h4 style="margin-top:1rem">${esc(d.tabelaExtra.legenda || "Tabela alternativa")}</h4>${renderTabelaDose(d.tabelaExtra)}` : "";

  return `
    <section class="card" id="${d.id}">
      ${head}
      ${props}
      ${d.tabela?.legenda ? `<h4>${esc(d.tabela.legenda)}</h4>` : `<h4>Tabela prática (dose × peso → mL/h)</h4>`}
      ${tabela}
      ${tabelaExtra}
      <div class="calc-container" data-droga="${d.id}"></div>
    </section>
  `;
}

function renderTabelaDose(t) {
  // Formato dose-direta (vasopressina, nitroglicerina, etc.)
  if (t.formato === "dose-direta") {
    return `<div class="table-wrap"><table class="data">
      <thead><tr><th>Dose</th><th class="num">Velocidade</th></tr></thead>
      <tbody>${t.linhas.map((l, i) => `
        <tr class="${i === 0 ? "row-min" : i === t.linhas.length - 1 ? "row-max" : ""}">
          <td class="col-label">${esc(l.label)}</td>
          <td class="num">${esc(l.valor)} mL/h</td>
        </tr>
      `).join("")}</tbody>
    </table></div>`;
  }

  // Formato por peso
  return `<div class="table-wrap"><table class="data">
    <thead>
      <tr>
        <th>Dose</th>
        ${t.pesos.map(p => `<th class="num">${p} kg</th>`).join("")}
      </tr>
    </thead>
    <tbody>
      ${t.linhas.map((l, i) => `
        <tr class="${i === 0 ? "row-min" : "row-max"}">
          <td class="col-label">${esc(l.label)}</td>
          ${l.valores.map(v => `<td class="num">${fmt(v, 1)} mL/h</td>`).join("")}
        </tr>
      `).join("")}
    </tbody>
  </table></div>`;
}

// Após renderizar, anexa calculadora a cada container .calc-container
export function bindCalculatorsForDrogas(cap, root) {
  if (!cap.drogas) return;
  for (const d of cap.drogas) {
    const container = root.querySelector(`.calc-container[data-droga="${d.id}"]`);
    if (container) renderCalculator(d, container);
  }
}

// ===== Cap 7: Outras Infusões =====
export function renderOutrasInfusoes(cap) {
  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>
    ${cap.items.map(it => renderItemOutrasInfusoes(it)).join("")}
    ${disclaimer()}
  `;
}

function renderItemOutrasInfusoes(it) {
  let body = "";
  if (it.preparo) body += `<h4>Preparo</h4><ul>${it.preparo.map(p => `<li>${esc(p)}</li>`).join("")}</ul>`;
  if (it.concentracao) body += `<p><strong>Concentração:</strong> ${esc(it.concentracao)}</p>`;
  if (it.tempoInfusao) body += `<p><strong>Tempo de infusão:</strong> ${esc(it.tempoInfusao)}</p>`;
  if (it.doses) body += `<h4>Doses</h4><ul>${it.doses.map(p => `<li>${esc(p)}</li>`).join("")}</ul>`;
  if (it.indicacao) body += `<p><strong>Indicação:</strong> ${esc(it.indicacao)}</p>`;
  if (it.ampola) body += `<p><strong>Ampola:</strong> ${esc(it.ampola)}</p>`;
  if (it.atencao) body += `<div class="callout warn"><div class="callout-body"><strong>Atenção:</strong> ${esc(it.atencao)}</div></div>`;
  if (it.doseMaxima) body += `<p><strong>Dose máxima:</strong> ${esc(it.doseMaxima)}</p>`;
  if (it.objetivo) body += `<p><strong>Objetivo:</strong> ${esc(it.objetivo)}</p>`;
  if (it.esquemas) body += it.esquemas.map(e => `
    <h4>${esc(e.titulo)}</h4>
    <ul>${e.itens.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
  `).join("");
  if (it.variantes) body += it.variantes.map(v => `
    <h4>${esc(v.titulo)}</h4>
    <ul>${v.preparo.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
    <p><strong>Taxa:</strong> ${esc(v.taxa)}</p>
  `).join("");

  if (it.prescricaoPratica) {
    body += `<h4>Prescrição na prática</h4>
      <div class="rx-block" id="rx-${it.id}">${esc(it.prescricaoPratica)}</div>
      <button class="btn btn-copy small" data-copy-target="#rx-${it.id}">📋 Copiar</button>`;
  }

  return `<section class="card" id="${it.id}">
    <div class="card-header"><h3 class="card-title">${esc(it.nome)}</h3></div>
    ${body}
  </section>`;
}

// ===== Cap 8: SRI =====
export function renderSRI(cap) {
  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>

    <h2>Fluxograma da SRI</h2>
    ${cap.fluxograma.map((f, i) => `
      <div class="flow-step">
        <div class="flow-num">${i + 1}</div>
        <div class="flow-body">
          <h4>${esc(f.etapa)}</h4>
          <ul>${f.itens.map(it => `<li>${esc(it)}</li>`).join("")}</ul>
        </div>
      </div>
    `).join("")}

    <h2>Perfil das drogas</h2>
    <div class="table-wrap"><table class="data">
      <thead><tr><th>Droga</th><th>Categoria</th><th>Dose</th><th>Duração</th><th>Vantagens</th><th>Desvantagens</th></tr></thead>
      <tbody>${cap.drogas.map(d => `
        <tr>
          <td class="col-label">${esc(d.nome)}</td>
          <td><span class="badge">${esc(d.categoria)}</span></td>
          <td>${esc(d.dose)}</td>
          <td>${esc(d.duracao)}</td>
          <td>${esc(d.vantagens)}</td>
          <td>${esc(d.desvantagens)}</td>
        </tr>
      `).join("")}</tbody>
    </table></div>

    <h2>Cenários clínicos — droga de escolha</h2>
    <div class="table-wrap"><table class="data">
      <thead><tr><th>Perfil</th><th>Sugestão</th></tr></thead>
      <tbody>${cap.cenarios.map(c => `
        <tr><td class="col-label">${esc(c.perfil)}</td><td>${esc(c.sugestao)}</td></tr>
      `).join("")}</tbody>
    </table></div>
    <div class="callout warn"><div class="callout-body"><strong>Atenção:</strong> Sugestões práticas. Cada paciente deve ser individualizado conforme comorbidades e estado hemodinâmico.</div></div>

    <h2>Tabela Doses × Peso (mL conforme apresentação)</h2>
    ${[cap.tabelaDosesPeso.preMedicacao, cap.tabelaDosesPeso.sedacao, cap.tabelaDosesPeso.bloqueio].map(t => `
      <h4>${esc(t.titulo)}</h4>
      <div class="table-wrap"><table class="data">
        <thead><tr><th>Droga</th>${t.pesos.map(p => `<th class="num">${p} kg</th>`).join("")}</tr></thead>
        <tbody>${t.drogas.map(d => `
          <tr><td class="col-label">${esc(d.nome)}</td>${d.valores.map(v => `<td class="num">${esc(v)}</td>`).join("")}</tr>
        `).join("")}</tbody>
      </table></div>
    `).join("")}

    <h2>${esc(cap.dope.titulo)}</h2>
    <p>${esc(cap.dope.descricao)}</p>
    <div class="table-wrap"><table class="data">
      <thead><tr><th></th><th>Item</th><th>Descrição</th></tr></thead>
      <tbody>${cap.dope.itens.map(it => `
        <tr>
          <td class="col-label"><span class="badge danger">${esc(it.letra)}</span></td>
          <td><strong>${esc(it.nome)}</strong></td>
          <td>${esc(it.desc)}</td>
        </tr>
      `).join("")}</tbody>
    </table></div>

    ${disclaimer()}
  `;
}

// ===== Cap 9: Ventilação =====
export function renderVentilacao(cap) {
  const v = cap.vni;
  const m = cap.ventilacaoMecanica;
  const pi = cap.pesoIdeal;
  const d = cap.desmame;

  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>

    <section class="card" id="vni">
      <div class="card-header"><h3 class="card-title">${esc(v.titulo)}</h3></div>
      <p>${esc(v.descricao)}</p>

      <h4>Indicações</h4>
      <ul>${v.indicacoes.map(i => `<li>${esc(i)}</li>`).join("")}</ul>

      <h4>Situações com benefício</h4>
      <ul>${v.beneficios.map(i => `<li>${esc(i)}</li>`).join("")}</ul>

      <h4>Contraindicações</h4>
      <ul>${v.contraindicacoes.map(i => `<li>${esc(i)}</li>`).join("")}</ul>

      <h4>Escolha de modo conforme a doença base</h4>
      <div class="flow-branches">${v.modos.map(m => `
        <div class="flow-branch yes">
          <h5>${esc(m.situacao)} — ${esc(m.modo)}</h5>
          <ul>${m.ajustes.map(a => `<li>${esc(a)}</li>`).join("")}</ul>
        </div>
      `).join("")}</div>
    </section>

    <section class="card" id="vm">
      <div class="card-header"><h3 class="card-title">${esc(m.titulo)}</h3></div>
      <div class="flow-branches">
        <div class="flow-branch"><h5>${esc(m.pcv.titulo)}</h5><ul>${m.pcv.ajustes.map(a => `<li>${esc(a)}</li>`).join("")}</ul></div>
        <div class="flow-branch"><h5>${esc(m.vcv.titulo)}</h5><ul>${m.vcv.ajustes.map(a => `<li>${esc(a)}</li>`).join("")}</ul></div>
      </div>
      <h4>${esc(m.comum.titulo)}</h4>
      <ul>${m.comum.ajustes.map(a => `<li>${esc(a)}</li>`).join("")}</ul>
      <h4>${esc(m.protetora.titulo)}</h4>
      <ul>${m.protetora.itens.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
    </section>

    <section class="card" id="peso-ideal">
      <div class="card-header"><h3 class="card-title">${esc(pi.titulo)}</h3></div>
      <div class="callout info"><div class="callout-body">${esc(pi.aviso)}</div></div>
      <div class="table-wrap"><table class="data">
        <thead><tr><th>Altura (cm)</th><th class="num">♂ Peso ideal (kg)</th><th class="num">♂ VC 6mL/kg</th><th class="num">♀ Peso ideal (kg)</th><th class="num">♀ VC 6mL/kg</th></tr></thead>
        <tbody>${pi.tabela.map(r => `
          <tr><td class="num">${r.altura}</td><td class="num">${r.mascPeso}</td><td class="num">${r.mascVC}</td><td class="num">${r.femPeso}</td><td class="num">${r.femVC}</td></tr>
        `).join("")}</tbody>
      </table></div>
      <h4>Fórmulas de peso ideal</h4>
      <p><strong>Masculino:</strong> ${esc(pi.formulas.masculino)}<br><strong>Feminino:</strong> ${esc(pi.formulas.feminino)}</p>
      ${renderPesoIdealCalc()}
    </section>

    <section class="card" id="desmame">
      <div class="card-header"><h3 class="card-title">${esc(d.titulo)}</h3></div>
      ${d.etapas.map((e, i) => `
        <div class="flow-step">
          <div class="flow-num">${i + 1}</div>
          <div class="flow-body">
            <h4>${esc(e.titulo)}</h4>
            <ul>${e.itens.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
          </div>
        </div>
      `).join("")}
      <h4>Critérios de falha do TRE</h4>
      <ul>${d.criteriosFalha.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
      <div class="callout info"><div class="callout-body">${esc(d.conclusao)}</div></div>
    </section>

    ${disclaimer()}
  `;
}

function renderPesoIdealCalc() {
  return `<div class="calc">
    <h4 class="calc-title">Calculadora de peso ideal e VC (6 mL/kg)</h4>
    <div class="calc-grid">
      <div class="calc-field">
        <label>Sexo</label>
        <select id="pi-sexo"><option value="m">Masculino</option><option value="f">Feminino</option></select>
      </div>
      <div class="calc-field">
        <label>Altura</label>
        <div class="ctrl"><input type="number" id="pi-altura" min="100" max="220" step="1" value="170"><span class="unit">cm</span></div>
      </div>
    </div>
    <div class="calc-result">
      <div>
        <div class="calc-output"><span id="pi-peso">—</span><span class="unit"> kg peso ideal</span></div>
        <div class="calc-status">VC 6 mL/kg: <span id="pi-vc">—</span> mL</div>
      </div>
    </div>
  </div>`;
}

// ===== Cap 10: Eletrólitos =====
export function renderEletrolitos(cap) {
  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>
    ${cap.itens.map(e => renderEletrolito(e)).join("")}
    ${disclaimer()}
  `;
}

function renderEletrolito(e) {
  let body = "";
  if (e.definicao) {
    body += `<h4>Definição</h4>`;
    body += Array.isArray(e.definicao)
      ? `<ul>${e.definicao.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`
      : `<p>${esc(e.definicao)}</p>`;
  }
  if (e.atencaoCorrecao) body += `<div class="callout info"><div class="callout-body">${nl(e.atencaoCorrecao)}</div></div>`;
  if (e.sintomas) body += `<p><strong>Sintomas:</strong> ${esc(e.sintomas)}</p>`;
  if (e.sintomasFaixa) body += `<p>${esc(e.sintomasFaixa)}</p>`;
  if (e.indicacoes) body += `<h4>Indicações</h4><ul>${e.indicacoes.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
  if (e.preparo) body += `<h4>Preparo da solução</h4><div class="rx-block">${nl(e.preparo)}</div>`;

  if (e.faixas) {
    body += `<h4>Condutas por gravidade</h4>`;
    body += e.faixas.map((f, i) => `
      <details class="collapsible" ${i === 0 ? "open" : ""}>
        <summary>${esc(f.gatilho)}</summary>
        <div class="collapsible-body">
          ${f.condutas ? `<ul>${f.condutas.map(c => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}
          ${f.rxPronta ? `<div class="rx-block" id="rx-${e.id}-${i}">${esc(f.rxPronta)}</div><button class="btn btn-copy small" data-copy-target="#rx-${e.id}-${i}">📋 Copiar</button>` : ""}
        </div>
      </details>
    `).join("");
  }

  if (e.condutas) {
    body += `<h4>Condutas</h4>`;
    body += e.condutas.map((c, i) => `
      <details class="collapsible" ${i === 0 ? "open" : ""}>
        <summary>${esc(c.gatilho)}</summary>
        <div class="collapsible-body">
          <div class="rx-block" id="rx-${e.id}-${i}">${esc(c.rx)}</div>
          <button class="btn btn-copy small" data-copy-target="#rx-${e.id}-${i}">📋 Copiar</button>
        </div>
      </details>
    `).join("");
  }

  if (e.atencao) {
    const list = Array.isArray(e.atencao) ? e.atencao : [e.atencao];
    body += `<div class="callout warn"><div class="callout-body"><strong>Atenção</strong><ul>${list.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div></div>`;
  }
  if (e.notas) body += `<div class="callout info"><div class="callout-body"><strong>Notas</strong><ul>${e.notas.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div></div>`;

  return `<section class="card" id="${e.id}">
    <div class="card-header"><h3 class="card-title">${esc(e.nome)}</h3></div>
    ${body}
  </section>`;
}

// ===== Cap 11: Hemoderivados =====
export function renderHemoderivados(cap) {
  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>
    ${cap.itens.map(h => renderHemoderivado(h)).join("")}
    ${disclaimer()}
  `;
}

function renderHemoderivado(h) {
  let body = "";
  if (h.indicacoes) body += `<h4>Principais indicações</h4><ul>${h.indicacoes.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
  if (h.indicacoesProfilaticas) body += `<h4>Indicações profiláticas</h4><ul>${h.indicacoesProfilaticas.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
  if (h.indicacoesTerapeuticas) body += `<h4>Indicações terapêuticas</h4><ul>${h.indicacoesTerapeuticas.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
  if (h.atencao) body += `<div class="callout info"><div class="callout-body">${esc(h.atencao)}</div></div>`;
  if (h.dose) body += `<h4>Dose</h4><ul>${h.dose.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
  if (h.especiais) {
    body += `<h4>Tipos especiais</h4><div class="table-wrap"><table class="data">
      <thead><tr><th>Tipo</th><th>Quando</th></tr></thead>
      <tbody>${h.especiais.map(e => `<tr><td class="col-label">${esc(e.tipo)}</td><td>${esc(e.quando)}</td></tr>`).join("")}</tbody>
    </table></div>`;
  }
  if (h.tabelaProcedimentos) {
    body += `<h4>${esc(h.tabelaProcedimentos.titulo)}</h4>
    <div class="table-wrap"><table class="data">
      <thead><tr><th>Procedimento</th><th class="num">Plaquetas mínimas</th></tr></thead>
      <tbody>${h.tabelaProcedimentos.linhas.map(l => `<tr><td>${esc(l.procedimento)}</td><td class="num">${esc(l.minimo)}</td></tr>`).join("")}</tbody>
    </table></div>`;
  }
  return `<section class="card" id="${h.id}">
    <div class="card-header"><h3 class="card-title">${esc(h.nome)}</h3></div>
    ${body}
  </section>`;
}

// ===== Cap 12: Heparinização =====
export function renderHeparinizacao(cap) {
  const r = cap.reversao;
  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>

    <section class="card" id="hbpm">
      <div class="card-header"><h3 class="card-title">${esc(cap.hbpm.titulo)}</h3></div>
      ${cap.hbpm.esquemas.map(e => `
        <h4>${esc(e.cenario)}</h4>
        <div class="rx-block">${esc(e.esquema)}</div>
        ${e.ajustes ? `<ul>${e.ajustes.map(i => `<li>${esc(i)}</li>`).join("")}</ul>` : ""}
      `).join("")}
      <h4>Contraindicações</h4>
      <ul>${cap.hbpm.contraindicacoes.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
    </section>

    <section class="card" id="hnf">
      <div class="card-header"><h3 class="card-title">${esc(cap.hnf.titulo)}</h3></div>
      <h4>Preparo da solução</h4>
      <ul>
        <li><strong>Ampola:</strong> ${esc(cap.hnf.preparo.ampola)}</li>
        <li><strong>Solução:</strong> ${esc(cap.hnf.preparo.solucao)}</li>
      </ul>
      ${cap.hnf.esquemas.map(e => `
        <h4>${esc(e.cenario)}</h4>
        <ul>
          <li><strong>Bólus:</strong> ${esc(e.bolus)}</li>
          <li><strong>Manutenção:</strong> ${esc(e.manutencao)}</li>
        </ul>
      `).join("")}
      <p><strong>Monitorização:</strong> ${esc(cap.hnf.monitorizacao)}</p>
      <h4>Tabela de ajuste por PTTa</h4>
      <div class="table-wrap"><table class="data">
        <thead><tr><th>PTTa</th><th>Bólus</th><th>Interrupção</th><th>Mudança</th></tr></thead>
        <tbody>${cap.hnf.tabelaAjuste.map(l => `
          <tr><td class="col-label">${esc(l.ptta)}</td><td>${esc(l.bolus)}</td><td>${esc(l.interrupcao)}</td><td>${esc(l.mudanca)}</td></tr>
        `).join("")}</tbody>
      </table></div>
    </section>

    <section class="card" id="reversao">
      <div class="card-header"><h3 class="card-title">${esc(r.titulo)}</h3></div>
      <p><strong>Apresentação:</strong> ${esc(r.apresentacao)}</p>
      <h4>${esc(r.hnf.titulo)}</h4>
      <ul>${r.hnf.regras.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
      <h4>${esc(r.hbpm.titulo)}</h4>
      <ul>${r.hbpm.regras.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
      <div class="table-wrap"><table class="data">
        <thead><tr><th>Tempo desde a última dose</th><th>Dose de Protamina</th></tr></thead>
        <tbody>${r.hbpm.tempoDose.map(l => `<tr><td class="col-label">${esc(l.tempo)}</td><td>${esc(l.dose)}</td></tr>`).join("")}</tbody>
      </table></div>
    </section>

    ${disclaimer()}
  `;
}

// ===== Cap 13: Glicemia =====
export function renderGlicemia(cap) {
  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>

    <section class="card">
      <h4>Quando iniciar o protocolo</h4>
      <ul>${cap.inicioProtocolo.map(i => `<li>${esc(i)}</li>`).join("")}</ul>

      <h4>Preparo</h4>
      <div class="rx-block">${esc(cap.preparo)}</div>

      <div class="callout info"><div class="callout-body">${esc(cap.observacao)}</div></div>

      <h4>Início (sugestão)</h4>
      <div class="table-wrap"><table class="data">
        <thead><tr><th>Gatilho</th><th>Conduta</th></tr></thead>
        <tbody>${cap.inicio.map(l => `<tr><td class="col-label">${esc(l.gatilho)}</td><td>${esc(l.conduta)}</td></tr>`).join("")}</tbody>
      </table></div>

      <h4>Manutenção</h4>
      <p>${esc(cap.manutencao.descricao)}</p>
      <div class="table-wrap"><table class="data">
        <thead><tr><th>Dextro</th><th>Conduta</th></tr></thead>
        <tbody>${cap.manutencao.regras.map(l => `<tr><td class="col-label">${esc(l.dx)}</td><td>${esc(l.conduta)}</td></tr>`).join("")}</tbody>
      </table></div>

      <div class="callout warn"><div class="callout-body"><strong>Atenção:</strong> ${esc(cap.atencao)}</div></div>
      <div class="callout warn"><div class="callout-body"><strong>${esc(cap.disclaimer)}</strong></div></div>
    </section>

    ${disclaimer()}
  `;
}

// ===== Cap 14: Delirium =====
export function renderDelirium(cap) {
  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>

    <section class="card">
      <h4>Subtipos</h4>
      <div class="flow-branches">${cap.subtipos.map(s => `
        <div class="flow-branch"><h5>${esc(s.tipo)}</h5><p>${esc(s.desc)}</p></div>
      `).join("")}</div>
    </section>

    <section class="card" id="cam-icu">
      <div class="card-header"><h3 class="card-title">${esc(cap.camIcu.titulo)}</h3></div>
      <p>${esc(cap.camIcu.descricao)}</p>
      ${cap.camIcu.etapas.map((e, i) => `
        <div class="flow-step">
          <div class="flow-num">${i + 1}</div>
          <div class="flow-body">
            <h4>${esc(e.passo)}</h4>
            <p>${nl(e.pergunta)}</p>
            <p class="muted"><strong>Resultado:</strong> ${esc(e.resultado)}</p>
          </div>
        </div>
      `).join("")}
    </section>

    <section class="card">
      <h4>Prevenção (medidas não farmacológicas)</h4>
      <ul>${cap.prevencao.map(i => `<li>${esc(i)}</li>`).join("")}</ul>

      <h4>Medidas farmacológicas</h4>
      <div class="table-wrap"><table class="data">
        <thead><tr><th>Droga</th><th>Dose</th><th>Observações</th></tr></thead>
        <tbody>${cap.tratamento.map(t => `<tr><td class="col-label">${esc(t.droga)}</td><td>${esc(t.dose)}</td><td>${esc(t.obs)}</td></tr>`).join("")}</tbody>
      </table></div>

      <div class="callout info"><div class="callout-body">${esc(cap.observacao)}</div></div>
    </section>

    ${disclaimer()}
  `;
}

// ===== Cap 15: Morte Encefálica =====
export function renderME(cap) {
  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>

    <section class="card">
      <h4>Pré-requisitos (obrigatórios)</h4>
      <ul>${cap.preRequisitos.map(i => `<li>${esc(i)}</li>`).join("")}</ul>

      <h4>Tempo mínimo de observação</h4>
      <ul>${cap.tempoObservacao.map(i => `<li>${esc(i)}</li>`).join("")}</ul>

      <h4>Intervalo mínimo entre avaliações clínicas</h4>
      <ul>${cap.intervaloAvaliacoes.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
    </section>

    <section class="card">
      <h4>Passo a passo</h4>
      ${cap.passos.map((p, i) => `
        <div class="flow-step">
          <div class="flow-num">${i + 1}</div>
          <div class="flow-body">${esc(p)}</div>
        </div>
      `).join("")}
    </section>

    <section class="card">
      <h4>Teste de Apneia</h4>
      <ol>${cap.testeApneia.procedimento.map(i => `<li>${esc(i)}</li>`).join("")}</ol>
      <h5>Interpretação</h5>
      <div class="table-wrap"><table class="data">
        <thead><tr><th>Resultado</th><th>Critério</th></tr></thead>
        <tbody>${cap.testeApneia.interpretacao.map(l => `<tr><td class="col-label">${esc(l.resultado)}</td><td>${esc(l.criterio)}</td></tr>`).join("")}</tbody>
      </table></div>
      <div class="callout warn"><div class="callout-body"><strong>Quando interromper:</strong> ${esc(cap.testeApneia.quandoInterromper)}</div></div>
    </section>

    <section class="card">
      <h4>Reflexos do tronco encefálico</h4>
      <div class="table-wrap"><table class="data">
        <thead><tr><th>Reflexo</th><th>Teste</th><th>Ausência (negativo)</th></tr></thead>
        <tbody>${cap.reflexos.map(r => `<tr><td class="col-label">${esc(r.nome)}</td><td>${esc(r.teste)}</td><td>${esc(r.negativo)}</td></tr>`).join("")}</tbody>
      </table></div>
    </section>

    <section class="card">
      <h4>${esc(cap.meiasVidas.titulo)}</h4>
      <div class="callout warn"><div class="callout-body">${esc(cap.meiasVidas.aviso)}</div></div>
      <div class="table-wrap"><table class="data">
        <thead><tr><th>Medicação</th><th>Tempo mínimo</th><th>Meia-vida</th></tr></thead>
        <tbody>${cap.meiasVidas.drogas.map(d => `<tr><td class="col-label">${esc(d.droga)}</td><td>${esc(d.tempo)}</td><td>${esc(d.meiaVida)}</td></tr>`).join("")}</tbody>
      </table></div>
    </section>

    ${disclaimer()}
  `;
}

// ===== Cap 16: Antimicrobianos =====
export function renderAntimicrobianos(cap) {
  // Filtro por nome
  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>

    <div class="calc-field" style="max-width:380px;margin-bottom:1rem">
      <label for="atb-filter">Filtrar antimicrobianos</label>
      <div class="ctrl"><input type="search" id="atb-filter" placeholder="Nome, classe ou indicação"/></div>
    </div>

    <div id="atb-list">${cap.lista.map(a => renderATB(a)).join("")}</div>
    ${disclaimer()}
  `;
}

function renderATB(a) {
  const search = `${a.nome} ${a.classe} ${a.indicacoes}`.toLowerCase();
  return `<section class="card atb" id="${a.id}" data-search="${esc(search)}">
    <div class="card-header">
      <h3 class="card-title">${esc(a.nome)}</h3>
      <span class="badge brand">${esc(a.classe)}</span>
    </div>
    <dl class="prop-grid">
      <dt>Diluição</dt><dd>${nl(a.diluicao)}</dd>
      <dt>Dose</dt><dd>${nl(a.dose)}</dd>
      ${a.ajusteRenal ? `<dt>Ajuste renal</dt><dd><ul>${a.ajusteRenal.map(i => `<li>${esc(i)}</li>`).join("")}</ul></dd>` : ""}
      ${a.ajusteDialise ? `<dt>Diálise</dt><dd>${nl(a.ajusteDialise)}</dd>` : ""}
      ${a.ajusteHepatico ? `<dt>Hepático</dt><dd>${nl(a.ajusteHepatico)}</dd>` : ""}
      <dt>Via</dt><dd>${esc(a.via)}</dd>
      <dt>Indicações</dt><dd>${nl(a.indicacoes)}</dd>
    </dl>
    ${a.atencao ? `<div class="callout warn"><div class="callout-body">${esc(a.atencao)}</div></div>` : ""}
  </section>`;
}

export function bindATBFilter() {
  const input = document.getElementById("atb-filter");
  if (!input) return;
  const cards = document.querySelectorAll("#atb-list .atb");
  input.addEventListener("input", () => {
    const q = input.value.toLowerCase().trim();
    cards.forEach(c => {
      const match = !q || c.dataset.search.includes(q);
      c.style.display = match ? "" : "none";
    });
  });
}

// ===== Cap 17: Empírica =====
export function renderEmpirica(cap) {
  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>

    <div class="chip-row" id="emp-chips">
      <button class="chip active" data-filter="all">Todos</button>
      ${cap.sistemas.map(s => `<button class="chip" data-filter="${s.id}">${esc(s.nome)}</button>`).join("")}
    </div>

    <div id="emp-content">${cap.sistemas.map(s => `
      <section class="card emp-sys" id="${s.id}" data-sis="${s.id}">
        <div class="card-header"><h3 class="card-title">${esc(s.nome)}</h3></div>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Doença</th><th>Microrganismo provável</th><th>Esquema</th></tr></thead>
          <tbody>${s.casos.map((c, i) => `
            <tr>
              <td class="col-label">${esc(c.doenca)}</td>
              <td>${esc(c.microrganismo)}</td>
              <td>
                <div class="rx-block" id="emp-rx-${s.id}-${i}">${esc(c.esquema)}</div>
                <button class="btn btn-copy small" data-copy-target="#emp-rx-${s.id}-${i}">📋 Copiar</button>
              </td>
            </tr>
          `).join("")}</tbody>
        </table></div>
        ${s.nota ? `<div class="callout info"><div class="callout-body">${esc(s.nota)}</div></div>` : ""}
      </section>
    `).join("")}</div>

    ${disclaimer()}
  `;
}

export function bindEmpFilter() {
  const chips = document.querySelectorAll("#emp-chips .chip");
  const cards = document.querySelectorAll(".emp-sys");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const f = chip.dataset.filter;
      cards.forEach(card => {
        card.style.display = (f === "all" || card.dataset.sis === f) ? "" : "none";
      });
    });
  });
}

// ===== Cap 18: Vancocinemia =====
export function renderVancocinemia(cap) {
  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>
    <div class="callout warn"><div class="callout-body"><strong>${esc(cap.disclaimer)}</strong></div></div>

    <section class="card">
      <h4>Contexto</h4>
      <p>${esc(cap.contexto)}</p>
      <h4>Medição</h4>
      <p><strong>${esc(cap.medicao)}</strong></p>

      <h4>Ajustes por nível sérico</h4>
      <div class="table-wrap"><table class="data">
        <thead><tr><th>Faixa</th><th>Conduta</th></tr></thead>
        <tbody>${cap.ajustes.map(l => `<tr><td class="col-label">${esc(l.faixa)}</td><td>${esc(l.conduta)}</td></tr>`).join("")}</tbody>
      </table></div>

      <h4>Após suspensão (em níveis > 25)</h4>
      <div class="table-wrap"><table class="data">
        <thead><tr><th>Gatilho</th><th>Conduta</th></tr></thead>
        <tbody>${cap.novaVancocinemia.map(l => `<tr><td class="col-label">${esc(l.gatilho)}</td><td>${esc(l.conduta)}</td></tr>`).join("")}</tbody>
      </table></div>

      <div class="callout ok"><div class="callout-body">${nl(cap.apos2medidasAlvo)}</div></div>
    </section>
    ${disclaimer()}
  `;
}

// ===== Cap 19: Fórmulas =====
export function renderFormulas(cap) {
  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>
    ${cap.itens.map(f => renderFormulaItem(f)).join("")}
    ${disclaimer()}
  `;
}

function renderFormulaItem(f) {
  let body = `<dl class="prop-grid"><dt>Fórmula</dt><dd>${nl(f.formula)}</dd>`;
  if (f.observacao) body += `<dt>Observação</dt><dd>${nl(f.observacao)}</dd>`;
  body += `</dl>`;
  if (f.calculadora) body += renderFormulaCalc(f.id, f.calculadora);
  return `<section class="card" id="${f.id}">
    <div class="card-header"><h3 class="card-title">${esc(f.nome)}</h3></div>
    ${body}
  </section>`;
}

function renderFormulaCalc(id, c) {
  const fields = c.campos.map(field => {
    if (field.options) {
      return `<div class="calc-field">
        <label>${esc(field.label)}</label>
        <select id="${id}-${field.key}">${field.options.map(o => `<option value="${esc(o.value)}">${esc(o.label)}</option>`).join("")}</select>
      </div>`;
    }
    return `<div class="calc-field">
      <label>${esc(field.label)}</label>
      <div class="ctrl">
        <input type="number" id="${id}-${field.key}" step="0.01" inputmode="decimal" />
        ${field.unit ? `<span class="unit">${esc(field.unit)}</span>` : ""}
      </div>
    </div>`;
  }).join("");

  return `<div class="calc" data-formula="${id}" data-compute="${esc(c.compute)}" data-unit="${esc(c.unitOut)}">
    <h4 class="calc-title">Calculadora</h4>
    <div class="calc-grid">${fields}</div>
    <div class="calc-result"><div>
      <div class="calc-output"><span class="value">—</span><span class="unit"> ${esc(c.unitOut)}</span></div>
      <div class="calc-status">Preencha os campos.</div>
    </div></div>
  </div>`;
}

// ===== Cap 20: Opioides =====
export function renderOpioides(cap) {
  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>
    <div class="callout warn"><div class="callout-body">${esc(cap.disclaimer)}</div></div>

    <section class="card">
      <h4>Tabela de equianalgesia</h4>
      <div class="table-wrap"><table class="data">
        <thead><tr><th>Fármaco</th><th class="num">EV (mg)</th><th class="num">Oral (mg)</th><th>Apresentação</th></tr></thead>
        <tbody>${cap.tabela.map(d => `
          <tr><td class="col-label">${esc(d.droga)}</td><td class="num">${esc(d.ev)}</td><td class="num">${esc(d.oral)}</td><td>${esc(d.apresentacao)}</td></tr>
        `).join("")}</tbody>
      </table></div>

      <h4>Conversor interativo</h4>
      ${renderOpioidConverter(cap.tabela)}
    </section>
    ${disclaimer()}
  `;
}

function renderOpioidConverter(tabela) {
  const opts = tabela.filter(d => typeof d.ev === "number" || typeof d.oral === "number")
    .map(d => `<option value="${esc(d.droga)}">${esc(d.droga)}</option>`).join("");

  return `<div class="calc" id="opioid-conv">
    <div class="calc-grid">
      <div class="calc-field">
        <label>Droga atual</label>
        <select id="op-from">${opts}</select>
      </div>
      <div class="calc-field">
        <label>Via atual</label>
        <select id="op-from-via"><option value="ev">EV</option><option value="oral">Oral</option></select>
      </div>
      <div class="calc-field">
        <label>Dose atual</label>
        <div class="ctrl"><input type="number" id="op-dose" step="0.5" value="10"><span class="unit">mg</span></div>
      </div>
      <div class="calc-field">
        <label>Converter para</label>
        <select id="op-to">${opts}</select>
      </div>
      <div class="calc-field">
        <label>Via destino</label>
        <select id="op-to-via"><option value="ev">EV</option><option value="oral">Oral</option></select>
      </div>
    </div>
    <div class="calc-result">
      <div>
        <div class="calc-output"><span id="op-result">—</span><span class="unit"> mg equivalentes</span></div>
        <div class="calc-status muted">Considerar tolerância cruzada incompleta — reduzir a dose calculada em 25–50% na troca.</div>
      </div>
    </div>
  </div>`;
}

// ===== Cap 21: Corticoides =====
export function renderCorticoides(cap) {
  return `
    ${capHeader(cap)}
    <p>${esc(cap.intro)}</p>

    <section class="card">
      <h4>Tabela de equivalência</h4>
      <div class="table-wrap"><table class="data">
        <thead><tr>
          <th>Fármaco</th>
          <th class="num">Potência anti-inflamatória</th>
          <th class="num">Potência mineralocorticoide</th>
          <th>Via</th>
          <th>Duração (h)</th>
          <th class="num">Dose equivalente (mg)</th>
        </tr></thead>
        <tbody>${cap.tabela.map(d => `
          <tr>
            <td class="col-label">${esc(d.droga)}</td>
            <td class="num">${esc(d.potenciaAntiInflamatoria)}</td>
            <td class="num">${esc(d.potenciaMineralocorticoide)}</td>
            <td>${esc(d.via)}</td>
            <td>${esc(d.duracao_h)}</td>
            <td class="num">${esc(d.doseEquivalente_mg)}</td>
          </tr>
        `).join("")}</tbody>
      </table></div>

      <h4>Conversor interativo</h4>
      ${renderCorticoidConverter(cap.tabela)}
    </section>
    ${disclaimer()}
  `;
}

function renderCorticoidConverter(tabela) {
  const valid = tabela.filter(d => typeof d.doseEquivalente_mg === "number" && d.doseEquivalente_mg > 0);
  const opts = valid.map(d => `<option value="${esc(d.droga)}" data-eq="${d.doseEquivalente_mg}">${esc(d.droga)}</option>`).join("");

  return `<div class="calc" id="cortic-conv">
    <div class="calc-grid">
      <div class="calc-field">
        <label>Corticoide atual</label>
        <select id="ct-from">${opts}</select>
      </div>
      <div class="calc-field">
        <label>Dose atual</label>
        <div class="ctrl"><input type="number" id="ct-dose" step="0.5" value="20"><span class="unit">mg</span></div>
      </div>
      <div class="calc-field">
        <label>Converter para</label>
        <select id="ct-to">${opts}</select>
      </div>
    </div>
    <div class="calc-result">
      <div>
        <div class="calc-output"><span id="ct-result">—</span><span class="unit"> mg</span></div>
        <div class="calc-status muted">Conversões com base em dose equivalente anti-inflamatória.</div>
      </div>
    </div>
  </div>`;
}

// ===== Helpers =====
function capHeader(cap) {
  return `<h1><span class="nav-num" style="font-size:1.1rem;vertical-align:middle">${cap.num}</span> ${esc(cap.titulo)}</h1>`;
}
function disclaimer() {
  return `<div class="disclaimer">
    <strong>Confira sempre antes de prescrever.</strong> Conteúdo baseado no <em>Guia Prático de Plantão – Terapia Intensiva</em> (MedRoute, 1ª ed.). Material de apoio clínico — a decisão final de dose/conduta é do médico assistente, considerando bula, contexto clínico, flora local e protocolos institucionais.
  </div>`;
}
