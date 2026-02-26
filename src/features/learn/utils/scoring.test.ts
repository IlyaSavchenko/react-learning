import { describe, it, expect } from 'vitest';
import { scoreQuiz } from './scoring';
import type { Quiz } from '../types';

const mockQuiz: Quiz = {
    id: 'test-quiz',
    blockId: 'test-block',
    passingScorePct: 70,
    questions: [
        {
            id: 'q1',
            type: 'single',
            text: 'Single choice question',
            options: [
                { id: 'a', text: 'A' },
                { id: 'b', text: 'B' },
            ],
            correctAnswer: 'a',
            explanation: 'A is correct',
            conceptTag: 'concept-1',
        },
        {
            id: 'q2',
            type: 'multi',
            text: 'Multi choice question',
            options: [
                { id: 'a', text: 'A' },
                { id: 'b', text: 'B' },
                { id: 'c', text: 'C' },
            ],
            correctAnswer: ['a', 'c'],
            explanation: 'A and C are correct',
            conceptTag: 'concept-2',
        },
        {
            id: 'q3',
            type: 'truefalse',
            text: 'True or false?',
            options: [
                { id: 'true', text: 'True' },
                { id: 'false', text: 'False' },
            ],
            correctAnswer: 'true',
            explanation: 'It is true',
            conceptTag: 'concept-1',
        },
        {
            id: 'q4',
            type: 'spotbug',
            text: 'Find the bug',
            options: [
                { id: 'a', text: 'Bug A' },
                { id: 'b', text: 'Bug B' },
            ],
            correctAnswer: 'b',
            explanation: 'B is the bug',
            conceptTag: 'concept-3',
        },
    ],
};

describe('scoreQuiz', () => {
    it('scores all correct answers as 100%', () => {
        const answers = {
            q1: 'a',
            q2: ['a', 'c'],
            q3: 'true',
            q4: 'b',
        };
        const result = scoreQuiz(mockQuiz, answers);

        expect(result.scorePct).toBe(100);
        expect(result.passed).toBe(true);
        expect(result.correctCount).toBe(4);
        expect(result.totalCount).toBe(4);
        expect(result.weakConceptTags).toEqual([]);
    });

    it('scores all wrong answers as 0%', () => {
        const answers = {
            q1: 'b',
            q2: ['b'],
            q3: 'false',
            q4: 'a',
        };
        const result = scoreQuiz(mockQuiz, answers);

        expect(result.scorePct).toBe(0);
        expect(result.passed).toBe(false);
        expect(result.correctCount).toBe(0);
        expect(result.weakConceptTags).toHaveLength(4);
    });

    it('computes partial score correctly (50%)', () => {
        const answers = {
            q1: 'a',       // correct
            q2: ['a'],     // wrong (missing 'c')
            q3: 'true',    // correct
            q4: 'a',       // wrong
        };
        const result = scoreQuiz(mockQuiz, answers);

        expect(result.scorePct).toBe(50);
        expect(result.passed).toBe(false);
        expect(result.correctCount).toBe(2);
    });

    it('passes at exactly 75% (above 70% threshold)', () => {
        const answers = {
            q1: 'a',       // correct
            q2: ['a', 'c'],// correct
            q3: 'true',    // correct
            q4: 'a',       // wrong
        };
        const result = scoreQuiz(mockQuiz, answers);

        expect(result.scorePct).toBe(75);
        expect(result.passed).toBe(true);
    });

    it('derives weakConceptTags from wrong answers', () => {
        const answers = {
            q1: 'b',       // wrong -> concept-1
            q2: ['a', 'c'],// correct
            q3: 'true',    // correct
            q4: 'a',       // wrong -> concept-3
        };
        const result = scoreQuiz(mockQuiz, answers);

        expect(result.weakConceptTags).toContain('concept-1');
        expect(result.weakConceptTags).toContain('concept-3');
        expect(result.weakConceptTags).not.toContain('concept-2');
    });

    it('handles multi-select with different order as correct', () => {
        const answers = {
            q1: 'a',
            q2: ['c', 'a'], // reverse order — should still be correct
            q3: 'true',
            q4: 'b',
        };
        const result = scoreQuiz(mockQuiz, answers);

        expect(result.scorePct).toBe(100);
        expect(result.passed).toBe(true);
    });

    it('handles empty/missing answers gracefully', () => {
        const result = scoreQuiz(mockQuiz, {});

        expect(result.scorePct).toBe(0);
        expect(result.passed).toBe(false);
        expect(result.totalCount).toBe(4);
        expect(result.correctCount).toBe(0);
    });

    it('rounds score percentage correctly', () => {
        // 3-question quiz for testing rounding
        const threeQuestionQuiz: Quiz = {
            ...mockQuiz,
            questions: mockQuiz.questions.slice(0, 3),
        };
        const answers = {
            q1: 'a', // correct
            q2: ['a', 'c'], // correct
            q3: 'false', // wrong
        };
        const result = scoreQuiz(threeQuestionQuiz, answers);

        // 2/3 = 66.666... should round to 67
        expect(result.scorePct).toBe(67);
    });
});
