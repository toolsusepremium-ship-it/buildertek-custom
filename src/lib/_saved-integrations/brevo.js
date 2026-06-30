// ── Brevo (formerly Sendinblue) Integration ──────────────────────────────────
// Saved for future use. Not active — forms currently use Google Sheets.
//
// Setup:
//   1. Get API key from https://app.brevo.com/settings/keys/api
//   2. Set VITE_BREVO_API_KEY in .env
//   3. (Optional) Create a contact list in Brevo and note the list ID
//
// NOTE: Brevo API key must NOT be exposed client-side in production.
//       Route through a serverless function or Vite proxy instead.

const BREVO_API_URL = 'https://api.brevo.com/v3';

// Add/update a contact in a Brevo list
export async function addBrevoContact({ email, firstName, lastName, phone, company, attributes = {}, listIds = [] }) {
    const res = await fetch(`${BREVO_API_URL}/contacts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': import.meta.env.VITE_BREVO_API_KEY,
        },
        body: JSON.stringify({
            email,
            updateEnabled: true,
            attributes: {
                FIRSTNAME: firstName,
                LASTNAME: lastName,
                SMS: phone,
                COMPANY: company,
                ...attributes,
            },
            listIds,
        }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Brevo error ${res.status}`);
    }

    return res.status === 204 ? null : res.json();
}

// Send a transactional notification email (e.g. to the sales team)
export async function sendBrevoNotification({ toEmail, toName, subject, htmlContent }) {
    const res = await fetch(`${BREVO_API_URL}/smtp/email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': import.meta.env.VITE_BREVO_API_KEY,
        },
        body: JSON.stringify({
            sender: { name: 'BuilderTek Website', email: 'noreply@buildertek.com' },
            to: [{ email: toEmail, name: toName }],
            subject,
            htmlContent,
        }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Brevo SMTP error ${res.status}`);
    }

    return res.json();
}

// Convenience: submit a contact form lead to Brevo
// Call this from FreeDemoForm or ContactForm handleSubmit
export async function submitContactToBrevo(formData) {
    await addBrevoContact({
        email: formData.email,
        firstName: formData.fullName?.split(' ')[0] ?? formData.first_name,
        lastName: formData.fullName?.split(' ').slice(1).join(' ') ?? formData.last_name,
        phone: formData.phone ?? formData.mobile,
        company: formData.company,
        listIds: [Number(import.meta.env.VITE_BREVO_LIST_ID)], // set in .env
    });

    await sendBrevoNotification({
        toEmail: 'sales@buildertek.com',
        toName: 'BuilderTek Sales',
        subject: 'New lead from website',
        htmlContent: `<pre>${JSON.stringify(formData, null, 2)}</pre>`,
    });
}
