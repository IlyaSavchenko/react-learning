import type { AppProgress, BlockProgress, ModuleTestProgress } from '../types';
import type { QuizResult } from './scoring';

const STORAGE_KEY = 'react-learn-progress';

function createEmptyProgress(): AppProgress {
    return { blocks: {}, moduleTests: {} };
}

/**
 * Read progress from localStorage with safe fallback.
 */
export function readProgress(): AppProgress {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return createEmptyProgress();

        const parsed = JSON.parse(raw);
        // Basic shape validation
        if (!parsed || typeof parsed !== 'object' || !parsed.blocks) {
            return createEmptyProgress();
        }
        // Backward compat: ensure moduleTests exists
        if (!parsed.moduleTests) {
            parsed.moduleTests = {};
        }
        return parsed as AppProgress;
    } catch {
        // Corrupted data — reset
        return createEmptyProgress();
    }
}

/**
 * Write full progress to localStorage.
 */
export function writeProgress(progress: AppProgress): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

/**
 * Update progress for a specific block after quiz completion.
 */
export function updateBlockProgress(
    blockId: string,
    result: QuizResult
): AppProgress {
    const progress = readProgress();
    const existing = progress.blocks[blockId];

    const updated: BlockProgress = {
        blockId,
        attempts: (existing?.attempts ?? 0) + 1,
        bestScorePct: Math.max(existing?.bestScorePct ?? 0, result.scorePct),
        lastScorePct: result.scorePct,
        passed: existing?.passed || result.passed,
        lastAttemptAt: new Date().toISOString(),
        weakConceptTags: result.weakConceptTags,
    };

    progress.blocks[blockId] = updated;
    writeProgress(progress);
    return progress;
}

/**
 * Update progress for a module's final test after completion.
 */
export function updateModuleTestProgress(
    moduleId: string,
    result: QuizResult
): AppProgress {
    const progress = readProgress();
    const existing = progress.moduleTests[moduleId];

    const updated: ModuleTestProgress = {
        moduleId,
        attempts: (existing?.attempts ?? 0) + 1,
        bestScorePct: Math.max(existing?.bestScorePct ?? 0, result.scorePct),
        lastScorePct: result.scorePct,
        passed: existing?.passed || result.passed,
        lastAttemptAt: new Date().toISOString(),
        weakConceptTags: result.weakConceptTags,
    };

    progress.moduleTests[moduleId] = updated;
    writeProgress(progress);
    return progress;
}

