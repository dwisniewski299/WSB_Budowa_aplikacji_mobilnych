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
