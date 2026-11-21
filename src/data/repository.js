import { db } from './database';

export function getGoals() {
  return db.getAllAsync('SELECT * FROM goals ORDER BY name COLLATE NOCASE');
}

export function getGoal(id) {
  return db.getFirstAsync('SELECT * FROM goals WHERE id = ?', [id]);
}

export function insertGoal(goal) {
  return db.runAsync(
    'INSERT INTO goals (id, name, target, deadline) VALUES (?, ?, ?, ?)',
    [goal.id, goal.name, goal.target, goal.deadline]
  );
}

export function updateGoal(goal) {
  return db.runAsync(
    'UPDATE goals SET name = ?, target = ?, deadline = ? WHERE id = ?',
    [goal.name, goal.target, goal.deadline, goal.id]
  );
}

export function deleteGoal(id) {
  return db.runAsync('DELETE FROM goals WHERE id = ?', [id]);
}

export async function countPayments(parentId) {
  const row = await db.getFirstAsync(
    'SELECT COUNT(*) AS total FROM payments WHERE parentId = ?',
    [parentId]
  );
  return row.total;
}

export function getPayment(id) {
  return db.getFirstAsync('SELECT * FROM payments WHERE id = ?', [id]);
}

export function getPayments(parentId) {
  return db.getAllAsync(
    'SELECT * FROM payments WHERE parentId = ? ORDER BY date DESC',
    [parentId]
  );
}

export function insertPayment(payment) {
  return db.runAsync(
    'INSERT INTO payments (id, parentId, amount, date, note) VALUES (?, ?, ?, ?, ?)',
    [payment.id, payment.parentId, payment.amount, payment.date, payment.note]
  );
}

export function updatePayment(payment) {
  return db.runAsync(
    'UPDATE payments SET amount = ?, date = ?, note = ? WHERE id = ?',
    [payment.amount, payment.date, payment.note, payment.id]
  );
}

export function deletePayment(id) {
  return db.runAsync('DELETE FROM payments WHERE id = ?', [id]);
}
