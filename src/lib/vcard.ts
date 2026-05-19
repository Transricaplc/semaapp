/** Build a minimal vCard 3.0 string and trigger a browser download. */
export interface VCardInput {
  fullName: string;
  org?: string;
  title?: string;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  address?: string | null;
  url?: string | null;
  note?: string | null;
}

function escape(value: string): string {
  return value.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
}

export function buildVCard(input: VCardInput): string {
  const lines = ["BEGIN:VCARD", "VERSION:3.0"];
  lines.push(`FN:${escape(input.fullName)}`);
  if (input.org) lines.push(`ORG:${escape(input.org)}`);
  if (input.title) lines.push(`TITLE:${escape(input.title)}`);
  if (input.phone) lines.push(`TEL;TYPE=WORK,VOICE:${escape(input.phone)}`);
  if (input.whatsapp) lines.push(`TEL;TYPE=CELL:${escape(input.whatsapp)}`);
  if (input.email) lines.push(`EMAIL;TYPE=WORK:${escape(input.email)}`);
  if (input.address) lines.push(`ADR;TYPE=WORK:;;${escape(input.address)};;;;`);
  if (input.url) lines.push(`URL:${escape(input.url)}`);
  if (input.note) lines.push(`NOTE:${escape(input.note)}`);
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

export function downloadVCard(input: VCardInput) {
  const vcf = buildVCard(input);
  const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const safe = input.fullName.replace(/[^a-z0-9]+/gi, "_").toLowerCase();
  const a = document.createElement("a");
  a.href = url;
  a.download = `${safe || "contact"}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
