import type { Quiz } from '../types';
import { describingUiQuizzes } from './quizzes/describing-ui';
import { interactivityQuizzes } from './quizzes/adding-interactivity';
import { managingStateQuizzes } from './quizzes/managing-state';
import { escapeHatchesQuizzes } from './quizzes/escape-hatches';

const quizzesMap: Record<string, Quiz> = {
    ...describingUiQuizzes,
    ...interactivityQuizzes,
    ...managingStateQuizzes,
    ...escapeHatchesQuizzes,
};

export function getQuizById(id: string): Quiz | undefined {
    return quizzesMap[id];
}

export function getAllQuizzes(): Quiz[] {
    return Object.values(quizzesMap);
}
