// Google Apps Script Web App endpoint — set VITE_GS_WEBHOOK in .env
// Apps Script deployment steps:
//   1. Open Google Sheet → Extensions → Apps Script
//   2. Paste the doPost() script below into the editor
//   3. Deploy → New deployment → Web app → Execute as: Me, Who can access: Anyone
//   4. Copy the deployment URL → VITE_GS_WEBHOOK in .env

/*
  ── Paste this into your Apps Script editor ─────────────────────────────────
  function doPost(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    var row = [new Date()].concat(Object.values(data));
    sheet.appendRow(row);
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  ────────────────────────────────────────────────────────────────────────────
*/

export async function submitToGoogleSheets(payload) {
    const url = import.meta.env.VITE_GS_WEBHOOK;
    if (!url) throw new Error('VITE_GS_WEBHOOK is not set in .env');

    const res = await fetch(url, {
        method: 'POST',
        // Apps Script requires text/plain to avoid CORS preflight on the deployed URL
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`Google Sheets submission failed: ${res.status}`);
    return res.json();
}
