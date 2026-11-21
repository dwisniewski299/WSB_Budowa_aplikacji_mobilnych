import { randomUUID } from 'expo-crypto';
import {
  countPayments,
  deleteGoal,
  deletePayment,
  getGoal,
  insertGoal,
  insertPayment,
  updateGoal,
  updatePayment,
} from '../data/repository';
import { parseAmount } from './money';
import { validateGoal, validatePayment } from './validation';

function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}

function goalData(form) {
  return {
    name: form.name.trim(),
    target: parseAmount(form.target),
    deadline: form.deadline,
  };
}

function paymentData(form) {
  return {
    amount: parseAmount(form.amount),
    date: form.date,
    note: form.note.trim() || null,
  };
}

export async function createGoal(form) {
  const errors = validateGoal(form);
  if (hasErrors(errors)) {
    return errors;
  }
  await insertGoal({ id: randomUUID(), ...goalData(form) });
  return {};
}

export async function editGoal(id, form) {
  const errors = validateGoal(form);
  if (hasErrors(errors)) {
    return errors;
  }
  await updateGoal({ id, ...goalData(form) });
  return {};
}

export async function removeGoal(id) {
  const total = await countPayments(id);
  if (total > 0) {
    return `Nie można usunąć celu, ponieważ ma przypisane wpłaty (${total}). Najpierw usuń wpłaty.`;
  }
  await deleteGoal(id);
  return '';
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
  await insertPayment({ id: randomUUID(), parentId, ...paymentData(form) });
  return {};
}

export async function editPayment(id, form) {
  const errors = validatePayment(form);
  if (hasErrors(errors)) {
    return errors;
  }
  await updatePayment({ id, ...paymentData(form) });
  return {};
}

export function removePayment(id) {
  return deletePayment(id);
}
