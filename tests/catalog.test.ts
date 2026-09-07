import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { IMAGES, QUIZ_QUESTIONS, TEXTS } from '../constants';

const collectStrings = (value: unknown): string[] => {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(collectStrings);
  return [];
};

describe('microscope content integrity', () => {
  it('points every local image reference to an existing public asset', () => {
    const missing = collectStrings(IMAGES)
      .filter((value) => value.startsWith('/'))
      .filter((value) => !existsSync(join(process.cwd(), 'public', value.slice(1))));

    expect(missing).toEqual([]);
  });

  it('keeps the bilingual specimen catalog aligned', () => {
    const zhIds = TEXTS.zh.planner.specimens.map((item) => item.id);
    const enIds = TEXTS.en.planner.specimens.map((item) => item.id);
    expect(enIds).toEqual(zhIds);
  });

  it('contains only answerable bilingual quiz questions', () => {
    expect(QUIZ_QUESTIONS.length).toBeGreaterThanOrEqual(10);
    for (const question of QUIZ_QUESTIONS) {
      expect(question.question.zh.trim()).not.toBe('');
      expect(question.question.en.trim()).not.toBe('');
      expect(question.options.zh).toHaveLength(question.options.en.length);
      expect(question.options.zh.length).toBeGreaterThanOrEqual(2);
      expect(question.correctAnswerIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctAnswerIndex).toBeLessThan(question.options.zh.length);
    }
  });
});
