// Busca global em todos os capítulos
// Constrói um índice em memória; busca instantânea com debounce e match parcial.

import { capitulos } from "../data/index.js";

let index = null;

function build() {
  if (index) return index;
  const items = [];

  for (const cap of capitulos) {
    // Item do capítulo em si
    items.push({
      type: "capitulo",
      title: cap.titulo,
      subtitle: `Capítulo ${cap.num}`,
      href: `#/${cap.id}`,
      text: `${cap.titulo} ${cap.intro || ""}`,
      capId: cap.id
    });

    // Drogas Molde A (vasoativas, sedoanalgesia, bloqueadores)
    if (cap.drogas) {
      for (const d of cap.drogas) {
        items.push({
          type: "droga",
          title: d.nome + (d.variante ? ` — ${d.variante}` : ""),
          subtitle: `${cap.titulo} · ${d.concentracao || ""}`,
          href: `#/${cap.id}#${d.id}`,
          text: [d.nome, d.variante, d.ampola, d.diluicao, d.concentracao, d.observacoes].filter(Boolean).join(" "),
          capId: cap.id
        });
      }
    }

    // Outras infusões
    if (cap.items && cap.id === "outras-infusoes") {
      for (const it of cap.items) {
        items.push({
          type: "droga",
          title: it.nome,
          subtitle: cap.titulo,
          href: `#/${cap.id}#${it.id}`,
          text: [it.nome, it.ampola, it.indicacao, (it.preparo || []).join(" ")].filter(Boolean).join(" "),
          capId: cap.id
        });
      }
    }

    // Antimicrobianos
    if (cap.lista && cap.id === "antimicrobianos") {
      for (const a of cap.lista) {
        items.push({
          type: "antibiotico",
          title: a.nome,
          subtitle: a.classe,
          href: `#/${cap.id}#${a.id}`,
          text: [a.nome, a.classe, a.dose, a.indicacoes].filter(Boolean).join(" "),
          capId: cap.id
        });
      }
    }

    // Prescrição empírica — entradas por doença/microrganismo
    if (cap.sistemas) {
      for (const sis of cap.sistemas) {
        for (const caso of sis.casos) {
          items.push({
            type: "empirica",
            title: caso.doenca,
            subtitle: `${cap.titulo} · ${sis.nome}`,
            href: `#/${cap.id}#${sis.id}`,
            text: [caso.doenca, caso.microrganismo, caso.esquema].join(" "),
            capId: cap.id
          });
        }
      }
    }

    // Fórmulas
    if (cap.itens && cap.id === "formulas") {
      for (const f of cap.itens) {
        items.push({
          type: "formula",
          title: f.nome,
          subtitle: cap.titulo,
          href: `#/${cap.id}#${f.id}`,
          text: [f.nome, f.formula, f.observacao].join(" "),
          capId: cap.id
        });
      }
    }

    // Eletrólitos
    if (cap.itens && cap.id === "eletrolitos") {
      for (const e of cap.itens) {
        items.push({
          type: "protocolo",
          title: e.nome,
          subtitle: cap.titulo,
          href: `#/${cap.id}#${e.id}`,
          text: [e.nome, e.definicao, (e.atencao || []).join(" ")].join(" "),
          capId: cap.id
        });
      }
    }

    // Hemoderivados
    if (cap.itens && cap.id === "hemoderivados") {
      for (const e of cap.itens) {
        items.push({
          type: "protocolo",
          title: e.nome,
          subtitle: cap.titulo,
          href: `#/${cap.id}#${e.id}`,
          text: [e.nome, (e.indicacoes || []).join(" "), (e.dose || []).join(" ")].join(" "),
          capId: cap.id
        });
      }
    }
  }

  index = items;
  return index;
}

function normalize(s) {
  return (s || "")
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function search(query) {
  if (!query || query.trim().length < 2) return [];
  const items = build();
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const results = [];

  for (const item of items) {
    const haystack = normalize(`${item.title} ${item.subtitle} ${item.text}`);
    if (terms.every(t => haystack.includes(t))) {
      // Score: matches no título valem mais
      const titleNorm = normalize(item.title);
      let score = 0;
      for (const t of terms) {
        if (titleNorm.startsWith(t)) score += 10;
        else if (titleNorm.includes(t)) score += 5;
        else score += 1;
      }
      results.push({ ...item, score });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 30);
}

export function highlight(text, query) {
  if (!query) return escape(text);
  const terms = query.split(/\s+/).filter(t => t.length >= 2);
  let out = escape(text);
  for (const t of terms) {
    const re = new RegExp(`(${escapeRegex(t)})`, "gi");
    out = out.replace(re, "<mark>$1</mark>");
  }
  return out;
}

function escape(s) {
  return (s || "").replace(/[<>&"]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));
}
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
