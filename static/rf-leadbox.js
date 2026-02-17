(async function () {
  const cfg = window.RF_LEADBOX_CONFIG || {};
  const root = document.getElementById("rf-leadbox");
  if (!root) return;

  root.innerHTML = `
    <div style="font-family: system-ui; border:1px solid #e5e7eb; border-radius:12px; padding:16px; max-width:900px;">
      <h3 style="margin:0 0 8px;">LeadBox (v1)</h3>
      <div id="rf-status" style="color:#6b7280;">Connecting…</div>

      <div style="margin-top:12px;">
        <textarea id="rf-prompt" rows="5"
          style="width:100%; padding:10px; border-radius:10px; border:1px solid #e5e7eb;"
          placeholder="Describe who you want to reach…"></textarea>

        <button id="rf-build"
          style="margin-top:10px; padding:10px 14px; border-radius:10px; border:1px solid #111827; background:#111827; color:#fff;">
          Build ICP
        </button>
      </div>

      <pre id="rf-out"
        style="margin-top:12px; padding:12px; background:#f9fafb; border-radius:10px; border:1px solid #e5e7eb; overflow:auto;"></pre>
    </div>
  `;

  const status = root.querySelector("#rf-status");
  const out = root.querySelector("#rf-out");
  const btn = root.querySelector("#rf-build");
  const promptEl = root.querySelector("#rf-prompt");

  const apiBase = (cfg.apiBase || "").replace(/\/$/, "");

  try {
    const r = await fetch(`${apiBase}/health`);
    status.textContent = r.ok ? "Connected" : "API reachable but unhealthy";
  } catch (e) {
    status.textContent = "API not reachable (check apiBase/CORS).";
  }

  btn.addEventListener("click", async () => {
    out.textContent = "Building ICP…";
    const prompt = promptEl.value.trim();

    const r = await fetch(`${apiBase}/icp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    out.textContent = await r.text();
  });
})();
