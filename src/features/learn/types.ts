/* ── Question types ── */

export type QuestionType = 'single' | 'multi' | 'truefalse' | 'spotbug';

export interface QuestionOption {
    id: string;
    text: string;
}

export interface Question {
    id: string;
    type: QuestionType;
    text: string;
    options: QuestionOption[];
    /** For single/truefalse/spotbug — one id; for multi — set of ids */
    correctAnswer: string | string[];
    explanation: string;
    conceptTag: string;
}

export interface Quiz {
    id: string;
    blockId: string;
    questions: Question[];
    passingScorePct: number; // 0–100
}

/* ── Content nodes (for ContentRenderer) ── */

export type ContentNodeType =
    | 'heading'
    | 'paragraph'
    | 'list'
    | 'callout'
    | 'codeSnippet';

export interface ContentNode {
    type: ContentNodeType;
    /** Main text / markdown-like string */
    text?: string;
    /** For lists */
    items?: string[];
    /** For code snippets */
    language?: string;
    /** For callouts: tip | warning | note */
    variant?: 'tip' | 'warning' | 'note';
    /** For headings: level */
    level?: number;
}

/* ── Block ── */

export interface Block {
    id: string;
    moduleId: string;
    title: string;
    /** Ordered content sections */
    content: ContentNode[];
    /** 3–7 bullet key takeaways */
    takeaways: string[];
    /** 0–4 common mistakes */
    mistakes: string[];
    quizId: string;
    /** Concept tags this block covers */
    conceptTags: string[];
    /** Link to original react.dev / ru.react.dev section */
    sourceUrl: string;
}

/* ── Module ── */

export interface Module {
    id: string;
    title: string;
    description: string;
    blockIds: string[];
    sourceUrl: string;
}

/* ── Progress ── */

export interface BlockProgress {
    blockId: string;
    attempts: number;
    bestScorePct: number;
    lastScorePct: number;
    passed: boolean;
    lastAttemptAt: string; // ISO date
    weakConceptTags: string[];
}

export interface AppProgress {
    blocks: Record<string, BlockProgress>;
}
