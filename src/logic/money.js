export function parseAmount(text) {
  const value = text.trim().replace(',', '.');
  if (!/^-?\d{1,9}(\.\d{1,2})?$/.test(value)) {
    return null;
  }
  const negative = value.startsWith('-');
  const [whole, part = ''] = value.replace('-', '').split('.');
  const cents = Number(whole) * 100 + Number(part.padEnd(2, '0'));
  return negative ? -cents : cents;
}

export function formatAmount(cents) {
  const whole = Math.floor(cents / 100);
  const part = String(cents % 100).padStart(2, '0');
  return `${whole},${part} zł`;
}
