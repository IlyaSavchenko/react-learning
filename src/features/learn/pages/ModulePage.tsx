import { Link, useParams } from 'react-router-dom';
import { modules } from '../data/modules';
import { getBlockById } from '../data/blocks';
import { readProgress } from '../utils/storage';
import '../styles/learn.scss';

export default function ModulePage() {
    const { moduleId } = useParams<{ moduleId: string }>();
    const mod = modules.find((m) => m.id === moduleId);
    const progress = readProgress();

    if (!mod) {
        return (
            <div className="learn-page">
                <h1>Модуль не найден</h1>
                <Link to="/modules">← Назад к модулям</Link>
            </div>
        );
    }

    return (
        <div className="learn-page">
            <Link to="/modules" className="learn-page__back">← Все модули</Link>
            <h1>{mod.title}</h1>
            <p className="learn-page__subtitle">{mod.description}</p>

            <div className="blocks-list">
                {mod.blockIds.map((blockId) => {
                    const block = getBlockById(blockId);
                    if (!block) return null;
                    const bp = progress.blocks[blockId];
                    return (
                        <Link
                            key={blockId}
                            to={`/modules/${moduleId}/blocks/${blockId}`}
                            className={`block-card ${bp?.passed ? 'block-card--passed' : ''}`}
                        >
                            <div className="block-card__status">
                                {bp?.passed ? '✅' : bp?.attempts ? '🔄' : '📘'}
                            </div>
                            <div className="block-card__info">
                                <h3 className="block-card__title">{block.title}</h3>
                                {bp && (
                                    <span className="block-card__score">
                                        Лучший: {bp.bestScorePct}%
                                    </span>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>

            <a
                href={mod.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="source-link"
            >
                📖 Источник: react.dev
            </a>
        </div>
    );
}
