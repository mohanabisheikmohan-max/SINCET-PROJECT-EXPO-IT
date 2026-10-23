/**
 * INNOVATE FEST 2K26 registration receiver.
 * Paste this code into Extensions > Apps Script from your Google Sheet.
 */
const SHEET_NAME = 'Registrations';

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Event', 'Team Leader', 'Member 1', 'Member 2',
        'Project / Topic', 'Phone', 'Email', 'UPI Transaction ID / Payment Reference'
      ]);
      sheet.setFrozenRows(1);
    }

    // Basic required-field validation before saving a row.
    const required = ['teamLeader', 'member1', 'member2', 'topicName', 'phone', 'email', 'paymentReference'];
    const missing = required.filter(key => !String(data[key] || '').trim());
    if (missing.length) {
      return jsonResponse({ ok: false, message: 'Missing required fields: ' + missing.join(', ') });
    }

    sheet.appendRow([
      new Date(),
      safeCell(data.eventName || 'INNOVATE FEST 2K26'),
      safeCell(data.teamLeader),
      safeCell(data.member1),
      safeCell(data.member2),
      safeCell(data.topicName),
      safeCell(data.phone),
      safeCell(data.email),
      safeCell(data.paymentReference)
    ]);
    return jsonResponse({ ok: true, message: 'Registration saved' });
  } catch (error) {
    return jsonResponse({ ok: false, message: String(error) });
  }
}

// Prevent values beginning with spreadsheet formula characters from being treated as formulas.
function safeCell(value) {
  const text = String(value == null ? '' : value).trim();
  return /^[=+@\-]/.test(text) ? "'" + text : text;
}

function jsonResponse(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
