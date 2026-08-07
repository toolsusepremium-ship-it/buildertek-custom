// Salesforce Web-to-Lead capture.
//
// The /contact form (ContactForm.jsx) posts natively — the browser navigates to
// Salesforce and comes back via retURL. Forms that must keep the user on the page
// (blog sidebar, blog comments) use submitLeadToSalesforce() instead: a background
// POST that leaves the page untouched.
//
// Note: Web-to-Lead never sends a readable CORS response, so this is fire-and-forget
// (mode: 'no-cors'). A resolved promise means "the request left the browser", not
// "Salesforce accepted it". connect-src in vercel.json must allow webto.salesforce.com.

export const SF_ORG_ID = '00Dak00000LHFzR'
const SF_ENDPOINT = 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8'

// Salesforce rejects a Lead outright if last_name or company is empty, so both
// always need a value even when the form doesn't collect them.
const FALLBACK_COMPANY = 'Not provided'

/** Splits a single "Full Name" input into the first_name / last_name Salesforce expects. */
export function splitName(fullName = '') {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return { first_name: '', last_name: 'Unknown' }
  if (parts.length === 1) return { first_name: '', last_name: parts[0] }
  return { first_name: parts[0], last_name: parts.slice(1).join(' ') }
}

export async function submitLeadToSalesforce(fields) {
  const body = new URLSearchParams({
    oid: SF_ORG_ID,
    ...fields,
    company: fields.company?.trim() || FALLBACK_COMPANY,
    last_name: fields.last_name?.trim() || 'Unknown',
  })

  await fetch(SF_ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
}
