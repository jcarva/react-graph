// @ts-ignore
const numberToUSLocale = (
  value: null | undefined | number | string
): string | null => {
  if (value === null || value === undefined) {
    return null;
  }

  const n = typeof value === "number" ? value : parseInt(value, 10);
  if (isNaN(n)) {
    return n.toString();
  }

  return n.toLocaleString("en-US");
};

const optionalToString = (v: any) =>
  ![null, undefined].includes(v) && typeof v.toString === "function"
    ? v.toString()
    : v;

export { numberToUSLocale, optionalToString };
