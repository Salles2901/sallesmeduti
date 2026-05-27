// Copiar texto para o clipboard com fallback + toast
export async function copyToClipboard(text, label = "Prescrição copiada") {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    showToast(label);
    return true;
  } catch (err) {
    showToast("Falha ao copiar — use Ctrl/Cmd+C");
    return false;
  }
}

let toastTimer;
export function showToast(message, duration = 2000) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = message;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, duration);
}

// Wire up: <button class="btn-copy" data-copy-target="<id>">
export function bindCopyButtons(root = document) {
  root.querySelectorAll("[data-copy-target]").forEach(btn => {
    if (btn.__bound) return;
    btn.__bound = true;
    btn.addEventListener("click", async () => {
      const target = btn.dataset.copyTarget;
      const src = target.startsWith("#") ? document.querySelector(target) : null;
      const text = src ? src.textContent.trim() : btn.dataset.copyText || "";
      if (!text) return;
      const ok = await copyToClipboard(text);
      if (ok) {
        const original = btn.innerHTML;
        btn.classList.add("copied");
        btn.innerHTML = "✓ Copiado";
        setTimeout(() => {
          btn.classList.remove("copied");
          btn.innerHTML = original;
        }, 1400);
      }
    });
  });
}
