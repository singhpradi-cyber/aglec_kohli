# AGLEC Website — GitHub Pages Ready

This folder is intentionally flat: upload every file directly to the root of your GitHub repository.

## Publish on GitHub Pages
1. Open the GitHub repository `singhpradi-cyber/aglec_kohli`.
2. Upload every file from this folder to the repository root.
3. Go to Settings → Pages.
4. Choose **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save.

Primary Book Appointment actions call **+91 9927005959**, matching the primary number supplied for the Google Business Profile.
WhatsApp: **+91 9927005959**.
Alternate phone: **+91 9762772430**.

Doctor display name: **Dr. Krishna Kohli**.
UPMCI Registration No.: **131386**.

## Consultation routes

- Homepage: general gastroenterology and the existing `#services`, `#liver`, `#endoscopy`, `#doctor` and `#contact` ad destinations.
- `digestive-care-agra.html`: stomach, gut, intestinal, pancreas, gallbladder and appendix consultation information, including IBS and IBD.
- `liver-specialist-agra.html`: liver report review and FibroScan enquiries. Procedure availability must be confirmed by reception.
- `endoscopy-agra.html`: endoscopy, colonoscopy, sigmoidoscopy, balloon-assisted enteroscopy and ERCP information and preparation enquiries.
- `contact.html`: appointment request, consultation hours and directions.

Hours confirmed by the clinic owner: Dr. Kohli’s OPD is open Monday–Saturday, 10 AM–8 PM IST; Sunday closed. IPD is available 24 hours every day, including Sunday. Structured data separates OPD and IPD departments so inpatient availability is not confused with the doctor’s consultation hours. These are clinic hours, not ad delivery hours.
The original AGLEC logo and approved Dr. Kohli portrait are unchanged. The Maps button targets Dr. Kohli's listing (place ID `ChIJNYV8R8t3dDkRwiCrJwYga7k`).

## Measurement

`script.js` preserves the existing Google Ads tag AW-622603961 and both contact-click actions:

- Telephone click: `WlN6CNiti4wdELnd8KgC`
- WhatsApp click: `TInxCNuti4wdELnd8KgC`

These events measure contact clicks, not connected calls or confirmed appointments. Google Ads controls whether each action is primary or secondary; this release does not change those settings. Directions are not counted as contact conversions.

Measurement runs only on the two production domain variants. Preview hosts emit no Ads events. The event configuration uses a generic title and origin-level page/referrer URLs while retaining gclid/gbraid/wbraid. Do not put patient information in URLs or event fields. No enhanced conversions, patient forms or remarketing audiences are added.

## Validation

Run `node --check script.js`, `node --test tests/contact-flow.test.cjs`, and `python tests/check_site.py` (requires beautifulsoup4). Check mobile layouts and menu behavior in the browser before publishing. After a Pages deployment, compare the public HTML and assets with the committed version; a repository commit alone does not prove the public site updated.
