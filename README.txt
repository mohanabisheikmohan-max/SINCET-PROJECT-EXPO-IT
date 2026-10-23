INNOVATE FEST 2K26 — Project Expo Website
========================================

FILES
- index.html: website and team registration form
- style.css: responsive styling
- script.js: mobile menu, scroll animations, and Google Sheets form submission
- assets/registration-qr.png: supplied QR image (shown in the payment area)
- assets/event-poster.png: supplied event poster
- assets/website-reference.png: supplied website reference image
- google-apps-script/Code.gs: Google Sheet submission receiver
- GOOGLE_SHEETS_SETUP_TAMIL.txt: step-by-step setup guide in Tamil

RUN LOCALLY
1. Extract this ZIP.
2. Open the extracted folder in Visual Studio Code.
3. Install the Live Server extension if needed.
4. Right-click index.html > Open with Live Server.

IMPORTANT — CONNECT GOOGLE SHEETS
Follow GOOGLE_SHEETS_SETUP_TAMIL.txt. Create a Google Sheet, deploy the supplied Code.gs as a Web App, and paste its /exec URL into script.js where GOOGLE_SHEETS_WEB_APP_URL is declared. The form will not send data until this URL is configured.

FORM FIELDS
Team Leader, Member 1, Member 2, Project/Topic Name, phone, email, and UPI transaction/payment reference.

NOTES
- The Google Sheet must remain private; do not share the Sheet with website visitors.
- The QR is displayed for payment. This website does not verify payment automatically; the organiser must verify the UPI reference.
- Payment screenshot upload is not included in this version.
- Google Apps Script's no-cors request means the browser cannot confirm the server response. Always verify that the submitted row appears in the Sheet while testing.
- Check the QR image with a phone before publishing.


DIRECT GOOGLE SHEET LINK + QR
- Edit sheet-config.js and paste your original Google Sheet share URL.
- Set Google Sheet Share -> Anyone with the link -> Viewer only if you intentionally want public view.
- Register / Open Sheet and the new SCAN TO OPEN GOOGLE SHEET QR open the same URL.
- Existing assets/registration-qr.png remains the payment QR.
- The Sheet QR image is generated online via QRServer.
- Direct Sheet QR opens the spreadsheet; it does not submit registration entries.


NEW WEBSITE SECTIONS
- Expo Benefits: showcase talent, receive feedback, networking, learn technology, presentation skills, future opportunities.
- Student Project Ideas: smart plant monitor, waste segregation, campus chatbot, energy dashboard, skill exchange, accessible campus map.
- These are sample ideas for inspiration, not official event rules.
