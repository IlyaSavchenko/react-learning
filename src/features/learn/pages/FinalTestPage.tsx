import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { modules } from '../data/modules';
import { isModuleCompleted, generateFinalQuiz } from '../data/finalTests';
import { readProgress } from '../utils/storage';
import FinalTest from '../components/FinalTest';
import '../styles/learn.scss';

export default function FinalTestPage() {
    const { moduleId } = useParams<{ moduleId: string }>();
    const navigate = useNavigate();
    const mod = modules.find((m) => m.id === moduleId);
    const progress = readProgress();

    useEffect(() => {
        const container = document.querySelector('.learn-layout__content');
        if (container) container.scrollTop = 0;
    }, [moduleId]);

    if (!mod) {
        return (
            <div className="learn-page">
                <h1>Модуль не найден</h1>
            </div>
        );
    }

    const completed = isModuleCompleted(mod.id, progress);

    if (!completed) {
        return (
            <div className="learn-page">
                <h1>Финальный тест</h1>
                <div className="final-test__locked">
                    <span className="final-test__locked-icon">🔒</span>
                    <h2>Тест ещё недоступен</h2>
                    <p>
                        Для прохождения финального теста нужно пройти все блоки модуля
                        «{mod.title}».
                    </p>
                    <button
                        className="quiz__submit"
                        onClick={() => navigate(`/modules/${mod.id}`)}
                    >
                        Вернуться к модулю
                    </button>
                </div>
            </div>
        );
    }

    const quiz = generateFinalQuiz(mod.id);

    if (!quiz) {
        return (
            <div className="learn-page">
                <h1>Ошибка генерации теста</h1>
            </div>
        );
    }

    function handleNavigateNext(nextModuleId: string, nextBlockId: string) {
        navigate(`/modules/${nextModuleId}/blocks/${nextBlockId}`);
    }

    return (
        <div className="learn-page learn-page--block">
            <div className="block-content__module-label">
                📚 {mod.title}
            </div>

            <FinalTest
                key={mod.id}
                quiz={quiz}
                moduleId={mod.id}
                moduleTitle={mod.title}
                onNavigateNext={handleNavigateNext}
            />
        </div>
    );
}
