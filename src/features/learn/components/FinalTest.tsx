import { useState } from 'react';
import type { Quiz as QuizType } from '../types';
import type { QuizResult } from '../utils/scoring';
import { scoreQuiz } from '../utils/scoring';
import { updateModuleTestProgress } from '../utils/storage';
import { getNextModule } from '../data/finalTests';
import { getBlockById } from '../data/blocks';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import Recommendations from './Recommendations';

interface Props {
    quiz: QuizType;
    moduleId: string;
    moduleTitle: string;
    onNavigateNext?: (nextModuleId: string, nextBlockId: string) => void;
}

export default function FinalTest({ quiz, moduleId, moduleTitle, onNavigateNext }: Props) {
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const [result, setResult] = useState<QuizResult | null>(null);

    function handleAnswer(questionId: string, answer: string | string[]) {
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    }

    function handleSubmit() {
        const quizResult = scoreQuiz(quiz, answers);
        setResult(quizResult);
        updateModuleTestProgress(moduleId, quizResult);
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

    const nextModule = getNextModule(moduleId);

    return (
        <section className="quiz final-test">
            <div className="final-test__header">
                <span className="final-test__icon">🏆</span>
                <div>
                    <h2 className="final-test__title">Финальный тест</h2>
                    <p className="final-test__subtitle">
                        Модуль «{moduleTitle}» · {quiz.questions.length} вопросов
                    </p>
                </div>
            </div>

            <p className="final-test__desc">
                Этот тест охватывает все темы модуля. Для прохождения нужно набрать не менее {quiz.passingScorePct}%.
            </p>

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
                    {result.passed && (
                        <div className="final-test__congrats">
                            <span className="final-test__congrats-icon">🎓</span>
                            <h3>Поздравляем!</h3>
                            <p>Вы успешно прошли финальный тест модуля «{moduleTitle}»!</p>
                        </div>
                    )}

                    <QuizResults quiz={quiz} result={result} onRetry={handleRetry} />

                    {!result.passed && (
                        <Recommendations
                            weakConceptTags={result.weakConceptTags}
                            sourceUrl=""
                        />
                    )}

                    {result.passed && nextModule && onNavigateNext && (
                        <button
                            className="final-test__next-module-btn"
                            onClick={() => {
                                const firstBlockId = nextModule.blockIds[0];
                                const firstBlock = getBlockById(firstBlockId);
                                if (firstBlock) {
                                    onNavigateNext(nextModule.id, firstBlockId);
                                }
                            }}
                        >
                            <div className="final-test__next-module-info">
                                <span className="final-test__next-module-label">
                                    Следующий модуль
                                </span>
                                <span className="final-test__next-module-title">
                                    {nextModule.title} →
                                </span>
                            </div>
                        </button>
                    )}
                </>
            )}
        </section>
    );
}
