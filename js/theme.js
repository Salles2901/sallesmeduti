// Theme toggle (light/dark) com persistência via localStorage
const KEY = "sallemed-theme";

export function initTheme() {
  const saved = safeGet(KEY);
  if (saved === "light" || saved === "dark") {
    document.documentElement.setAttribute("data-theme", saved);
  }

  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : (current === "light" ? "dark" : (prefersDark() ? "light" : "dark"));
    document.documentElement.setAttribute("data-theme", next);
    safeSet(KEY, next);
  });
}

function prefersDark() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function safeGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
function safeSet(k, v) { try { localStorage.setItem(k, v); } catch {} }
