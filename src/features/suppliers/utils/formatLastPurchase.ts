export function formatLastPurchase(dateIso: string) {
  if (!dateIso || dateIso === "—" || !/^\d{4}-\d{2}-\d{2}/.test(dateIso)) {
    return "—";
  }

  const date = new Date(`${dateIso.slice(0, 10)}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
