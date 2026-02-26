import type { Quiz, AppProgress, Question } from '../types';
import { modules } from './modules';
import { getBlockById } from './blocks';
import { getQuizById } from './quizzes';

/**
 * Check if all blocks in a module have been passed.
 */
export function isModuleCompleted(
    moduleId: string,
    progress: AppProgress
): boolean {
    const mod = modules.find((m) => m.id === moduleId);
    if (!mod) return false;
    return mod.blockIds.every((bid) => progress.blocks[bid]?.passed);
}

/**
 * Get the next module after the given one, or null.
 */
export function getNextModule(moduleId: string) {
    const idx = modules.findIndex((m) => m.id === moduleId);
    if (idx === -1 || idx >= modules.length - 1) return null;
    return modules[idx + 1];
}

/**
 * Simple seeded shuffle (Fisher-Yates) for deterministic-per-attempt but varied questions.
 */
function shuffleArray<T>(arr: T[], seed: number): T[] {
    const result = [...arr];
    let s = seed;
    for (let i = result.length - 1; i > 0; i--) {
        s = (s * 1664525 + 1013904223) & 0x7fffffff;
        const j = s % (i + 1);
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

/**
 * Generate a final quiz for a module by sampling 1–2 questions from each block quiz.
 * Uses Date.now()-based seed so questions vary per attempt.
 */
export function generateFinalQuiz(moduleId: string): Quiz | null {
    const mod = modules.find((m) => m.id === moduleId);
    if (!mod) return null;

    const seed = Date.now();
    const allQuestions: Question[] = [];

    for (const blockId of mod.blockIds) {
        const block = getBlockById(blockId);
        if (!block) continue;

        const quiz = getQuizById(block.quizId);
        if (!quiz || quiz.questions.length === 0) continue;

        // Shuffle block questions, pick 1–2
        const shuffled = shuffleArray(quiz.questions, seed + blockId.length);
        const pickCount = quiz.questions.length >= 3 ? 2 : 1;
        allQuestions.push(...shuffled.slice(0, pickCount));
    }

    if (allQuestions.length === 0) return null;

    // Shuffle the final question order too
    const finalQuestions = shuffleArray(allQuestions, seed + 42);

    return {
        id: `final-test-${moduleId}`,
        blockId: moduleId, // re-using blockId field for module context
        questions: finalQuestions,
        passingScorePct: 80, // Higher bar for final test
    };
}
