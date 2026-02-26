import type { Question, Quiz } from '../types';

export interface QuizResult {
    scorePct: number;
    passed: boolean;
    correctCount: number;
    totalCount: number;
    weakConceptTags: string[];
    /** Per-question results */
    questionResults: QuestionResult[];
}

export interface QuestionResult {
    questionId: string;
    correct: boolean;
    conceptTag: string;
}

/**
 * Evaluate a single question answer.
 */
function isAnswerCorrect(
    question: Question,
    userAnswer: string | string[]
): boolean {
    const { correctAnswer } = question;

    if (Array.isArray(correctAnswer)) {
        // multi-select: exact set equality
        if (!Array.isArray(userAnswer)) return false;
        if (userAnswer.length !== correctAnswer.length) return false;
        const sorted = [...userAnswer].sort();
        const expected = [...correctAnswer].sort();
        return sorted.every((v, i) => v === expected[i]);
    }

    // single / truefalse / spotbug: exact match
    if (Array.isArray(userAnswer)) return false;
    return userAnswer === correctAnswer;
}

/**
 * Score a completed quiz.
 * @param quiz - The quiz definition
 * @param answers - Map of questionId -> user's answer(s)
 */
export function scoreQuiz(
    quiz: Quiz,
    answers: Record<string, string | string[]>
): QuizResult {
    const questionResults: QuestionResult[] = quiz.questions.map((q) => ({
        questionId: q.id,
        correct: isAnswerCorrect(q, answers[q.id] ?? ''),
        conceptTag: q.conceptTag,
    }));

    const correctCount = questionResults.filter((r) => r.correct).length;
    const totalCount = quiz.questions.length;
    const scorePct =
        totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    const passed = scorePct >= quiz.passingScorePct;

    // Derive weak concept tags from wrong answers
    const weakConceptTags = questionResults
        .filter((r) => !r.correct)
        .map((r) => r.conceptTag);

    return {
        scorePct,
        passed,
        correctCount,
        totalCount,
        weakConceptTags,
        questionResults,
    };
}
