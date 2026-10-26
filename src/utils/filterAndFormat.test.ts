import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterSurahs,
  filterDuas,
  getPresetFontSizes,
  toggleBookmark,
  formatTasbeeh
} from './filterAndFormat';
import { LOCAL_SURAHS, MASNOON_DUAS } from '../data/quranData';

test('filterSurahs returns all surahs on empty query', () => {
  const result = filterSurahs(LOCAL_SURAHS, '');
  assert.equal(result.length, LOCAL_SURAHS.length);
});

test('filterSurahs filters by Arabic name and English name', () => {
  const fatiha = filterSurahs(LOCAL_SURAHS, 'الفاتحة');
  assert.equal(fatiha.length, 1);
  assert.equal(fatiha[0].id, 1);

  const ikhlas = filterSurahs(LOCAL_SURAHS, 'Ikhlas');
  assert.equal(ikhlas.length, 1);
  assert.equal(ikhlas[0].id, 112);
});

test('filterDuas filters by title and category', () => {
  const morningDuas = filterDuas(MASNOON_DUAS, '', 'صبح و شام');
  assert.ok(morningDuas.length >= 2);
  morningDuas.forEach((d) => assert.equal(d.category, 'صبح و شام'));

  const sleepDua = filterDuas(MASNOON_DUAS, 'سوتے');
  assert.ok(sleepDua.length >= 1);
  assert.equal(sleepDua[0].id, 'dua-sleep');
});

test('getPresetFontSizes correctly scales typography', () => {
  const small = getPresetFontSizes('small');
  const large = getPresetFontSizes('large');
  assert.ok(large.arabic > small.arabic);
  assert.ok(large.urdu > small.urdu);
});

test('toggleBookmark adds and removes ids correctly', () => {
  const initial: string[] = ['surah-1'];
  const added = toggleBookmark(initial, 'surah-112');
  assert.deepEqual(added, ['surah-1', 'surah-112']);

  const removed = toggleBookmark(added, 'surah-1');
  assert.deepEqual(removed, ['surah-112']);
});

test('formatTasbeeh calculates progress and completion', () => {
  const inProgress = formatTasbeeh(1, 3);
  assert.equal(inProgress.percent, 33);
  assert.equal(inProgress.isComplete, false);

  const complete = formatTasbeeh(3, 3);
  assert.equal(complete.percent, 100);
  assert.equal(complete.isComplete, true);
});

test('calculateEstimatedEarnings calculates correct revenues in USD and PKR', async () => {
  const { calculateEstimatedEarnings } = await import('./monetizationConfig');
  const earnings = calculateEstimatedEarnings(10000, 2.0); // 10,000 impressions at $2 eCPM = $20
  assert.equal(earnings.totalUsd, '20.00');
  assert.ok(Number(earnings.totalPkr.replace(/,/g, '')) > 5000);
});
