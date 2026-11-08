import { parseAmount } from './money';

export function isValidDate(text) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    return false;
  }
  const [year, month, day] = text.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function validateGoal(form) {
  const errors = {};
  if (!form.name.trim()) {
    errors.name = 'Podaj nazwę celu.';
  }
  const target = parseAmount(form.target);
  if (target === null) {
    errors.target = 'Podaj kwotę, np. 1500 lub 1500,50.';
  } else if (target <= 0) {
    errors.target = 'Kwota musi być większa od zera.';
  }
  if (!isValidDate(form.deadline)) {
    errors.deadline = 'Podaj datę w formacie RRRR-MM-DD.';
  }
  return errors;
}

export function validatePayment(form) {
  const errors = {};
  const amount = parseAmount(form.amount);
  if (amount === null) {
    errors.amount = 'Podaj kwotę, np. 200 lub 200,50.';
  } else if (amount <= 0) {
    errors.amount = 'Kwota wpłaty musi być większa od zera.';
  }
  if (!isValidDate(form.date)) {
    errors.date = 'Podaj datę w formacie RRRR-MM-DD.';
  }
  return errors;
}
