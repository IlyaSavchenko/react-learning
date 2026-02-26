import type { Question } from '../types';

interface Props {
    question: Question;
    index: number;
    selectedAnswer: string | string[];
    onAnswer: (questionId: string, answer: string | string[]) => void;
    disabled: boolean;
    showResult?: {
        correct: boolean;
    };
}

const TYPE_LABELS: Record<string, string> = {
    single: 'Выберите один ответ',
    multi: 'Выберите все подходящие',
    truefalse: 'Правда или ложь',
    spotbug: 'Найдите ошибку',
};

export default function QuizQuestion({
    question,
    index,
    selectedAnswer,
    onAnswer,
    disabled,
    showResult,
}: Props) {
    const isMulti = question.type === 'multi';
    const inputType = isMulti ? 'checkbox' : 'radio';

    function handleChange(optionId: string) {
        if (disabled) return;

        if (isMulti) {
            const current = Array.isArray(selectedAnswer) ? selectedAnswer : [];
            const next = current.includes(optionId)
                ? current.filter((id) => id !== optionId)
                : [...current, optionId];
            onAnswer(question.id, next);
        } else {
            onAnswer(question.id, optionId);
        }
    }

    function isSelected(optionId: string): boolean {
        if (Array.isArray(selectedAnswer)) {
            return selectedAnswer.includes(optionId);
        }
        return selectedAnswer === optionId;
    }

    function getOptionClass(optionId: string): string {
        const base = 'quiz-option';
        const classes = [base];

        if (isSelected(optionId)) classes.push(`${base}--selected`);

        if (showResult) {
            const correct = Array.isArray(question.correctAnswer)
                ? question.correctAnswer.includes(optionId)
                : question.correctAnswer === optionId;

            if (correct) {
                classes.push(`${base}--correct`);
            } else if (isSelected(optionId)) {
                classes.push(`${base}--wrong`);
            }
        }

        return classes.join(' ');
    }

    return (
        <div className="quiz-question">
            <p className="quiz-question__type">{TYPE_LABELS[question.type]}</p>
            <p className="quiz-question__text">
                {index + 1}. {question.text}
            </p>
            <div className="quiz-question__options">
                {question.options.map((opt) => (
                    <div
                        key={opt.id}
                        className={getOptionClass(opt.id)}
                        onClick={() => handleChange(opt.id)}
                    >
                        <input
                            type={inputType}
                            name={question.id}
                            checked={isSelected(opt.id)}
                            onChange={() => handleChange(opt.id)}
                            disabled={disabled}
                        />
                        <label>{opt.text}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}
