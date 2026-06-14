import { test } from 'node:test';
import assert from 'node:assert';
import { tambahPengitung } from './hitung.js';

test('Pengujian Fungsi tambahPengitung', async (t) => {
  
  await t.test('Harus mengembalikan 8 ketika 5 ditambah 3', () => {
    const hasil = tambahPengitung(5, 3);
    assert.strictEqual(hasil, 8);
  });

  await t.test('Harus mengembalikan 10 ketika 0 ditambah 10', () => {
    const hasil = tambahPengitung(0, 10);
    assert.strictEqual(hasil, 10);
  });

  await t.test('Harus menangani nilai negatif (5 ditambah -2 harusnya 3)', () => {
    const hasil = tambahPengitung(5, -2);
    assert.strictEqual(hasil, 3);
  });
  
});