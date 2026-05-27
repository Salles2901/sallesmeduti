// App shell: routing, navegação, busca, renderização

import { capitulos, capitulosById } from "../data/index.js";
import { initTheme } from "./theme.js";
import { bindCopyButtons } from "./clipboard.js";
import * as views from "./views.js";
import {
  bindFormulaCalcs,
  bindPesoIdeal,
  bindOpioidConverter,
  bindCorticoidConverter
} from "./calc-helpers.js";
import { search, highlight } from "./search.js";

// ===== Sidebar =====
function buildSidebar() {
  const nav = document.getElementById("chapterNav");
  if (!nav) return;
  nav.innerHTML = capitulos.map(c => `
    <div class="nav-group">
      <a class="nav-chapter" href="#/${c.id}" data-cap="${c.id}">
        <span class="nav-num">${c.num}</span>
        <span>${c.titulo}</span>
      </a>
    </div>
  `).join("");
}

function setActiveChapter(id) {
  document.querySelectorAll(".nav-chapter").forEach(a => {
    a.classList.toggle("active", a.dataset.cap === id);
  });
}

// ===== Mobile drawer =====
function bindMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  const close = () => { sidebar.classList.remove("open"); backdrop.hidden = true; toggle.setAttribute("aria-expanded", "false"); };
  const open = () => { sidebar.classList.add("open"); backdrop.hidden = false; toggle.setAttribute("aria-expanded", "true"); };
  toggle.addEventListener("click", () => sidebar.classList.contains("open") ? close() : open());
  backdrop.addEventListener("click", close);
  document.addEventListener("click", e => {
    if (e.target.closest(".nav-chapter")) close();
  });
}

// ===== Router =====
function parseHash() {
  const h = location.hash.slice(2) || ""; // remove "#/"
  const [route, anchor] = h.split("#");
  return { route: route || "", anchor };
}

function navigate() {
  const { route, anchor } = parseHash();
  const view = document.getElementById("view");
  const results = document.getElementById("searchResults");
  if (results) results.hidden = true;

  if (!route) {
    view.innerHTML = views.renderHome(capitulos);
    setActiveChapter(null);
    document.title = "SalleMED – UTI";
    scrollTo(0, 0);
    return;
  }

  const cap = capitulosById[route];
  if (!cap) {
    view.innerHTML = `<h1>Capítulo não encontrado</h1><p><a href="#/">← Voltar ao início</a></p>`;
    return;
  }

  view.innerHTML = renderCapitulo(cap);
  setActiveChapter(cap.id);
  document.title = `${cap.titulo} · SalleMED UTI`;

  // Bindings pós-render
  bindCopyButtons(view);

  // Calculadoras das drogas Molde A
  if (cap.drogas) views.bindCalculatorsForDrogas(cap, view);

  // Filtro de antibióticos
  if (cap.id === "antimicrobianos") views.bindATBFilter();

  // Filtro de prescrição empírica
  if (cap.id === "empirica") views.bindEmpFilter();

  // Calculadora de peso ideal (ventilação)
  if (cap.id === "ventilacao") bindPesoIdeal(view);

  // Calculadoras das fórmulas
  if (cap.id === "formulas") bindFormulaCalcs(view);

  // Conversor de opioides
  if (cap.id === "opioides") bindOpioidConverter(view, cap.tabela);

  // Conversor de corticoides
  if (cap.id === "corticoides") bindCorticoidConverter(view);

  // Bind copy de novo (após calculadoras gerarem botões)
  setTimeout(() => bindCopyButtons(view), 0);

  // Scroll para âncora se houver
  if (anchor) {
    setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  } else {
    scrollTo(0, 0);
  }
}

function renderCapitulo(cap) {
  switch (cap.id) {
    case "evolucao": return views.renderEvolucao(cap);
    case "procedimentos": return views.renderProcedimentos(cap);
    case "profilaxias": return views.renderProfilaxias(cap);
    case "vasoativas":
    case "sedoanalgesia":
    case "bloqueadores":
      return views.renderDrogasMoldeA(cap);
    case "outras-infusoes": return views.renderOutrasInfusoes(cap);
    case "sri": return views.renderSRI(cap);
    case "ventilacao": return views.renderVentilacao(cap);
    case "eletrolitos": return views.renderEletrolitos(cap);
    case "hemoderivados": return views.renderHemoderivados(cap);
    case "heparinizacao": return views.renderHeparinizacao(cap);
    case "glicemia": return views.renderGlicemia(cap);
    case "delirium": return views.renderDelirium(cap);
    case "morte-encefalica": return views.renderME(cap);
    case "antimicrobianos": return views.renderAntimicrobianos(cap);
    case "empirica": return views.renderEmpirica(cap);
    case "vancocinemia": return views.renderVancocinemia(cap);
    case "formulas": return views.renderFormulas(cap);
    case "opioides": return views.renderOpioides(cap);
    case "corticoides": return views.renderCorticoides(cap);
    default: return `<h1>${cap.titulo}</h1><p>Conteúdo em desenvolvimento.</p>`;
  }
}

// ===== Search =====
function bindSearch() {
  const input = document.getElementById("globalSearch");
  const results = document.getElementById("searchResults");
  const view = document.getElementById("view");

  let timer;
  input.addEventListener("input", () => {
    clearTimeout(timer);
    const q = input.value.trim();
    if (!q) {
      results.hidden = true;
      return;
    }
    timer = setTimeout(() => {
      const items = search(q);
      results.hidden = false;
      if (!items.length) {
        results.innerHTML = `<div class="search-empty">Nenhum resultado para "${escapeHTML(q)}".</div>`;
        return;
      }
      results.innerHTML = `
        <h3>${items.length} resultado(s) para "${escapeHTML(q)}"</h3>
        ${items.map(item => `
          <a class="search-result" href="${item.href}">
            <strong>${highlight(item.title, q)}</strong>
            <span class="search-result-meta">${escapeHTML(item.subtitle)}</span>
          </a>
        `).join("")}
      `;
    }, 150);
  });

  // Atalho "/" para focar busca
  document.addEventListener("keydown", e => {
    if (e.key === "/" && !e.target.matches("input, textarea, select")) {
      e.preventDefault();
      input.focus();
    }
    if (e.key === "Escape" && document.activeElement === input) {
      input.value = "";
      results.hidden = true;
      input.blur();
    }
  });
}

function escapeHTML(s) {
  return (s || "").replace(/[<>&"]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));
}

// ===== Boot =====
function boot() {
  initTheme();
  buildSidebar();
  bindMobileMenu();
  bindSearch();
  window.addEventListener("hashchange", navigate);
  navigate();
}

document.addEventListener("DOMContentLoaded", boot);
