/**
 * Tanzania Banking Institutions — CEOs & Managing Directors
 * Source: Public disclosures, annual reports (2025–2026)
 */

export interface BankingCEO {
  id: string;
  name: string;
  position: string;
  organization: string;
  category: "Banking_CEOs";
}

export const bankingCEOs: BankingCEO[] = [
  { id: "bank-crdb", name: "Abdulmajid Mussa Nsekela", position: "Group CEO & Managing Director", organization: "CRDB Bank", category: "Banking_CEOs" },
  { id: "bank-nmb", name: "Ruth Zaipuna", position: "Managing Director & CEO", organization: "NMB Bank", category: "Banking_CEOs" },
  { id: "bank-nbc", name: "Theobald Sabi", position: "Managing Director", organization: "NBC (National Bank of Commerce)", category: "Banking_CEOs" },
  { id: "bank-exim", name: "Jaffari Matundu", position: "Chief Executive Officer", organization: "Exim Bank Tanzania", category: "Banking_CEOs" },
  { id: "bank-stanbic", name: "Manzi Rwegasira", position: "Chief Executive Officer", organization: "Stanbic Bank Tanzania", category: "Banking_CEOs" },
  { id: "bank-dtb", name: "Lilian Mbassy Awinja", position: "Managing Director", organization: "DTB (Diamond Trust Bank)", category: "Banking_CEOs" },
  { id: "bank-equity", name: "Jackson Minja", position: "Managing Director", organization: "Equity Bank Tanzania", category: "Banking_CEOs" },
  { id: "bank-absa", name: "Abdi Mohamed", position: "Managing Director", organization: "Absa Bank Tanzania", category: "Banking_CEOs" },
  { id: "bank-kcb", name: "Richard Sobir Gillyon", position: "Managing Director", organization: "KCB Bank Tanzania", category: "Banking_CEOs" },
  { id: "bank-scb", name: "Sanjay Rughani", position: "CEO", organization: "Standard Chartered Bank Tanzania", category: "Banking_CEOs" },
  { id: "bank-tib", name: "Sabasaba Moshingi", position: "Managing Director", organization: "TIB (Tanzania Investment Bank)", category: "Banking_CEOs" },
  { id: "bank-pbz", name: "Hafidh Khalil Ali", position: "Managing Director", organization: "PBZ (People's Bank of Zanzibar)", category: "Banking_CEOs" },
  { id: "bank-azania", name: "Dunstan Mhando", position: "Managing Director", organization: "Azania Bank", category: "Banking_CEOs" },
  { id: "bank-bot", name: "Emmanuel Tutuba", position: "Governor", organization: "Bank of Tanzania (BOT)", category: "Banking_CEOs" },
];

/** Search banking CEOs */
export function searchBanking(query: string): BankingCEO[] {
  const q = query.toLowerCase();
  return bankingCEOs.filter(
    (b) =>
      b.name.toLowerCase().includes(q) ||
      b.organization.toLowerCase().includes(q) ||
      b.position.toLowerCase().includes(q)
  );
}

export const bankingStats = {
  total: bankingCEOs.length,
};
