import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('savings.db');

export function setupDatabase() {
  db.execSync(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS goals (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      target INTEGER NOT NULL CHECK (target > 0),
      deadline TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY NOT NULL,
      parentId TEXT NOT NULL REFERENCES goals (id) ON DELETE RESTRICT,
      amount INTEGER NOT NULL CHECK (amount > 0),
      date TEXT NOT NULL,
      note TEXT
    );
  `);
}
