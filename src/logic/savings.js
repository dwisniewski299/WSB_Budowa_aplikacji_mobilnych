import { randomUUID } from 'expo-crypto';
import { getGoal, insertGoal, insertPayment } from '../data/repository';
import { parseAmount } from './money';
import { validateGoal, validatePayment } from './validation';

function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}

export async function createGoal(form) {
  const errors = validateGoal(form);
  if (hasErrors(errors)) {
    return errors;
  }
  await insertGoal({
    id: randomUUID(),
    name: form.name.trim(),
    target: parseAmount(form.target),
    deadline: form.deadline,
  });
  return {};
}

export async function createPayment(parentId, form) {
  const errors = validatePayment(form);
  if (hasErrors(errors)) {
    return errors;
  }
  const goal = await getGoal(parentId);
  if (!goal) {
    return { goal: 'Wybrany cel nie istnieje.' };
  }
  await insertPayment({
    id: randomUUID(),
    parentId,
    amount: parseAmount(form.amount),
    date: form.date,
    note: form.note.trim() || null,
  });
  return {};
}
