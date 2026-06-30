// ── Zapier Webhook Integration ────────────────────────────────────────────────
// Saved for future use. Not active — forms currently use Google Sheets.
//
// Setup:
//   1. Create a Zap in Zapier with trigger: "Webhooks by Zapier" → "Catch Hook"
//   2. Copy the webhook URL Zapier generates
//   3. Set VITE_ZAPIER_CONTACT_WEBHOOK and VITE_ZAPIER_DEMO_WEBHOOK in .env
//   4. Configure Zap actions: CRM update, email notification, Slack ping, etc.

// Generic POST to a Zapier webhook
async function postToZapier(webhookUrl, payload) {
    const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    // Zapier returns "1" (plain text) on success
    if (!res.ok) throw new Error(`Zapier webhook failed: ${res.status}`);
    return res.text();
}

// Submit ContactForm data to Zapier
export async function submitContactToZapier(formData) {
    return postToZapier(import.meta.env.VITE_ZAPIER_CONTACT_WEBHOOK, {
        source: 'contact-form',
        timestamp: new Date().toISOString(),
        department: formData['00Nak00003zqYtl'],
        firstName: formData.first_name,
        lastName: formData.last_name,
        email: formData.email,
        phone: formData.mobile,
        company: formData.company,
        companyType: formData['00Nak00003zpcBV'],
        message: formData.description,
    });
}

// Submit FreeDemoForm data to Zapier
export async function submitDemoToZapier(formData) {
    return postToZapier(import.meta.env.VITE_ZAPIER_DEMO_WEBHOOK, {
        source: 'demo-request',
        timestamp: new Date().toISOString(),
        fullName: formData.fullName,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        bestTime: `${formData.bestTimeHour}:${formData.bestTimeMinute}`,
        month: formData.month,
        interest: formData.interest,
    });
}
