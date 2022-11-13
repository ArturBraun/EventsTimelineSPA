export function toDateFromStr(strDate) {
  const [year, month, day] = strDate.split("-");
  return new Date(+year, month - 1, +day);
}

export function getFormattedDate(date) {
  return date.toLocaleDateString("sv");
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function resetElements(...elementIds) {
  elementIds.forEach((elementId) => document.getElementById(elementId).reset());
}
