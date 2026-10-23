/* Sets Google Sheet navigation/text links. The page intentionally displays only the payment QR code. */
(function () {
  const url = (typeof GOOGLE_SHEET_PUBLIC_URL === "string") ? GOOGLE_SHEET_PUBLIC_URL.trim() : "";
  const placeholder = !url || url === "PASTE_YOUR_GOOGLE_SHEET_LINK_HERE";
  const nav = document.getElementById("googleSheetNavLink");
  const link = document.getElementById("googleSheetTextLink");
  const help = document.getElementById("googleSheetHelp");
  if (placeholder) {
    const msg = "Organiser setup required: paste the Google Sheet share link into sheet-config.js.";
    if (help) help.textContent = msg;
    [nav, link].forEach(el => { if (el) el.addEventListener("click", e => { e.preventDefault(); alert(msg); }); });
    return;
  }
  [nav, link].forEach(el => { if (el) el.href = url; });
  if (help) help.textContent = "Use the Google Sheet link in the navigation to view registration records.";
})();
