import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";

export type PrintableOfficial = {
  full_name: string;
  role_title?: string | null;
  role_title_sw?: string | null;
  map_category?: string | null;
  phone?: string | null;
  verified_at?: string | null;
};

export async function printWardDirectory(
  officials: PrintableOfficial[],
  wardName: string,
  wardCode: string
): Promise<void> {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const date = new Date().toLocaleDateString("sw-TZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const liveUrl = `https://semaapp.lovable.app/ward/${wardCode}`;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(28, 28, 30);
  doc.text("SEMA", 14, 18);

  doc.setFontSize(14);
  doc.text(`Orodha ya Maofisa — Kata ya ${wardName}`, 14, 28);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(108, 108, 112);
  doc.text(`Kode: ${wardCode}  ·  Tarehe: ${date}  ·  semaapp.lovable.app`, 14, 35);
  doc.text("Thibitishwa kupitia TAMISEMI na Sema App", 14, 40);

  try {
    const qrDataUrl = await QRCode.toDataURL(liveUrl, { width: 80, margin: 0 });
    doc.addImage(qrDataUrl, "PNG", 170, 12, 25, 25);
    doc.setFontSize(7);
    doc.text("Angalia moja kwa moja", 168, 40);
  } catch {
    /* QR optional */
  }

  doc.setFillColor(245, 197, 0);
  doc.rect(14, 43, 182, 1.5, "F");

  const rows = officials.map((o) => [
    o.full_name,
    o.role_title_sw ?? o.role_title ?? "—",
    (o.map_category ?? "").replace(/_/g, " ").toUpperCase(),
    o.phone ?? "—",
    o.verified_at ? "✓" : "!",
  ]);

  autoTable(doc, {
    startY: 48,
    head: [["Jina", "Cheo", "Aina", "Simu", "✓"]],
    body: rows,
    styles: { fontSize: 9, cellPadding: 3, font: "helvetica" },
    headStyles: { fillColor: [245, 197, 0], textColor: [28, 28, 30], fontStyle: "bold", fontSize: 9 },
    alternateRowStyles: { fillColor: [248, 248, 248] },
    columnStyles: {
      0: { fontStyle: "bold" },
      3: { font: "courier", fontSize: 8 },
      4: { halign: "center", fontSize: 11 },
    },
  });

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(150);
    doc.text(
      `Ukurasa ${i} kati ya ${pageCount}  ·  Sema App — semaapp.lovable.app  ·  ${date}`,
      14,
      290
    );
  }

  doc.save(`sema_kata_${wardCode || "orodha"}_${Date.now()}.pdf`);
}
