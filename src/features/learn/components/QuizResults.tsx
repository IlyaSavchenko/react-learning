import type { Quiz } from '../types';
import type { QuizResult } from '../utils/scoring';

interface Props {
    quiz: Quiz;
    result: QuizResult;
    onRetry: () => void;
}

export default function QuizResults({ quiz, result, onRetry }: Props) {
    const { scorePct, passed, correctCount, totalCount, questionResults } = result;

    return (
        <div
            className={`quiz-results ${passed ? 'quiz-results--passed' : 'quiz-results--failed'
                }`}
        >
            <p className="quiz-results__score">
                {scorePct}% ({correctCount} из {totalCount})
            </p>
            <p className="quiz-results__status">
                {passed ? '🎉 Поздравляем! Тест пройден.' : '📝 Попробуйте ещё раз!'}
            </p>

            <div className="quiz-results__explanations">
                <h3>Разбор ответов</h3>
                {quiz.questions.map((q, i) => {
                    const qr = questionResults[i];
                    return (
                        <div
                            key={q.id}
                            className={`explanation-item ${qr.correct
                                    ? 'explanation-item--correct'
                                    : 'explanation-item--wrong'
                                }`}
                        >
                            <p className="explanation-item__question">
                                {i + 1}. {q.text}
                            </p>
                            <p className="explanation-item__text">
                                {qr.correct ? '✅ ' : '❌ '}
                                {q.explanation}
                            </p>
                        </div>
                    );
                })}
            </div>

            <button className="quiz-results__retry" onClick={onRetry}>
                🔄 Пройти ещё раз
            </button>
        </div>
    );
}
