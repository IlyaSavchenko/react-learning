import { describe, it, expect, beforeEach, vi } from 'vitest';
import { readProgress, writeProgress, updateBlockProgress } from './storage';
import type { AppProgress } from '../types';
import type { QuizResult } from './scoring';

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: vi.fn((key: string) => store[key] ?? null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
            delete store[key];
        }),
        clear: vi.fn(() => {
            store = {};
        }),
        get length() {
            return Object.keys(store).length;
        },
        key: vi.fn((_index: number) => null),
    };
})();

Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock,
    writable: true,
});

beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
});

describe('readProgress', () => {
    it('returns empty progress when nothing is stored', () => {
        const progress = readProgress();
        expect(progress).toEqual({ blocks: {} });
    });

    it('reads valid stored progress', () => {
        const stored: AppProgress = {
            blocks: {
                'block-1': {
                    blockId: 'block-1',
                    attempts: 2,
                    bestScorePct: 80,
                    lastScorePct: 60,
                    passed: true,
                    lastAttemptAt: '2024-01-01T00:00:00.000Z',
                    weakConceptTags: [],
                },
            },
        };
        localStorageMock.setItem(
            'react-learn-progress',
            JSON.stringify(stored)
        );

        const progress = readProgress();
        expect(progress.blocks['block-1'].bestScorePct).toBe(80);
        expect(progress.blocks['block-1'].passed).toBe(true);
    });

    it('returns empty progress on corrupted JSON', () => {
        localStorageMock.setItem('react-learn-progress', '{not valid json');
        const progress = readProgress();
        expect(progress).toEqual({ blocks: {} });
    });

    it('returns empty progress when stored data has wrong shape', () => {
        localStorageMock.setItem(
            'react-learn-progress',
            JSON.stringify({ wrong: 'shape' })
        );
        const progress = readProgress();
        expect(progress).toEqual({ blocks: {} });
    });
});

describe('writeProgress', () => {
    it('serializes and stores progress', () => {
        const progress: AppProgress = {
            blocks: {
                'b1': {
                    blockId: 'b1',
                    attempts: 1,
                    bestScorePct: 100,
                    lastScorePct: 100,
                    passed: true,
                    lastAttemptAt: '2024-01-01T00:00:00.000Z',
                    weakConceptTags: [],
                },
            },
        };
        writeProgress(progress);

        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            'react-learn-progress',
            JSON.stringify(progress)
        );
    });
});

describe('updateBlockProgress', () => {
    const mockResult: QuizResult = {
        scorePct: 80,
        passed: true,
        correctCount: 4,
        totalCount: 5,
        weakConceptTags: ['concept-1'],
        questionResults: [],
    };

    it('creates new block progress on first attempt', () => {
        const progress = updateBlockProgress('block-1', mockResult);

        expect(progress.blocks['block-1']).toBeDefined();
        expect(progress.blocks['block-1'].attempts).toBe(1);
        expect(progress.blocks['block-1'].bestScorePct).toBe(80);
        expect(progress.blocks['block-1'].passed).toBe(true);
    });

    it('increments attempts on subsequent submissions', () => {
        updateBlockProgress('block-1', mockResult);
        const progress = updateBlockProgress('block-1', mockResult);

        expect(progress.blocks['block-1'].attempts).toBe(2);
    });

    it('keeps best score when new score is lower', () => {
        updateBlockProgress('block-1', mockResult); // 80%

        const lowerResult: QuizResult = {
            ...mockResult,
            scorePct: 60,
            passed: false,
        };
        const progress = updateBlockProgress('block-1', lowerResult);

        expect(progress.blocks['block-1'].bestScorePct).toBe(80);
        expect(progress.blocks['block-1'].lastScorePct).toBe(60);
    });

    it('keeps passed=true once passed', () => {
        updateBlockProgress('block-1', mockResult); // passed

        const failResult: QuizResult = {
            ...mockResult,
            scorePct: 20,
            passed: false,
        };
        const progress = updateBlockProgress('block-1', failResult);

        expect(progress.blocks['block-1'].passed).toBe(true);
    });

    it('persists progress to localStorage', () => {
        updateBlockProgress('block-1', mockResult);

        expect(localStorageMock.setItem).toHaveBeenCalled();
        const stored = JSON.parse(
            localStorageMock.setItem.mock.calls[0][1]
        );
        expect(stored.blocks['block-1']).toBeDefined();
    });
});
