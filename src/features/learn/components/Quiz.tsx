import { useState } from 'react';
import type { Block, Quiz as QuizType } from '../types';
import type { QuizResult } from '../utils/scoring';
import { scoreQuiz } from '../utils/scoring';
import { updateBlockProgress } from '../utils/storage';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import Recommendations from './Recommendations';

interface Props {
    quiz: QuizType;
    block: Block;
    moduleId: string;
}

export default function Quiz({ quiz, block }: Props) {
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const [result, setResult] = useState<QuizResult | null>(null);

    function handleAnswer(questionId: string, answer: string | string[]) {
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    }

    function handleSubmit() {
        const quizResult = scoreQuiz(quiz, answers);
        setResult(quizResult);
        updateBlockProgress(block.id, quizResult);
    }

    function handleRetry() {
        setAnswers({});
        setResult(null);
    }

    const allAnswered = quiz.questions.every((q) => {
        const a = answers[q.id];
        if (Array.isArray(a)) return a.length > 0;
        return !!a;
    });

    return (
        <section className="quiz">
            <h2 className="quiz__title">📝 Проверь себя</h2>

            {quiz.questions.map((q, i) => (
                <QuizQuestion
                    key={q.id}
                    question={q}
                    index={i}
                    selectedAnswer={answers[q.id] ?? (q.type === 'multi' ? [] : '')}
                    onAnswer={handleAnswer}
                    disabled={!!result}
                    showResult={
                        result
                            ? { correct: result.questionResults[i].correct }
                            : undefined
                    }
                />
            ))}

            {!result && (
                <button
                    className="quiz__submit"
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                >
                    Проверить ответы
                </button>
            )}

            {result && (
                <>
                    <QuizResults quiz={quiz} result={result} onRetry={handleRetry} />
                    {!result.passed && (
                        <Recommendations
                            weakConceptTags={result.weakConceptTags}
                            sourceUrl={block.sourceUrl}
                        />
                    )}
                </>
            )}
        </section>
    );
}
