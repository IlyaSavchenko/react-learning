import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlockById } from '../data/blocks';
import { getQuizById } from '../data/quizzes';
import { modules } from '../data/modules';
import ContentRenderer from '../components/ContentRenderer';
import Quiz from '../components/Quiz';
import '../styles/learn.scss';

function getNextBlock(moduleId: string, blockId: string) {
    const moduleIndex = modules.findIndex((m) => m.id === moduleId);
    if (moduleIndex === -1) return null;

    const mod = modules[moduleIndex];
    const blockIndex = mod.blockIds.indexOf(blockId);

    // Next block in same module
    if (blockIndex < mod.blockIds.length - 1) {
        const nextBlockId = mod.blockIds[blockIndex + 1];
        const nextBlock = getBlockById(nextBlockId);
        return nextBlock
            ? { moduleId, blockId: nextBlockId, title: nextBlock.title, isNewModule: false }
            : null;
    }

    // First block of next module
    if (moduleIndex < modules.length - 1) {
        const nextModule = modules[moduleIndex + 1];
        const nextBlockId = nextModule.blockIds[0];
        const nextBlock = getBlockById(nextBlockId);
        return nextBlock
            ? { moduleId: nextModule.id, blockId: nextBlockId, title: nextBlock.title, isNewModule: true, moduleName: nextModule.title }
            : null;
    }

    return null;
}

function getPrevBlock(moduleId: string, blockId: string) {
    const moduleIndex = modules.findIndex((m) => m.id === moduleId);
    if (moduleIndex === -1) return null;

    const mod = modules[moduleIndex];
    const blockIndex = mod.blockIds.indexOf(blockId);

    // Previous block in same module
    if (blockIndex > 0) {
        const prevBlockId = mod.blockIds[blockIndex - 1];
        const prevBlock = getBlockById(prevBlockId);
        return prevBlock
            ? { moduleId, blockId: prevBlockId, title: prevBlock.title, isNewModule: false }
            : null;
    }

    // Last block of previous module
    if (moduleIndex > 0) {
        const prevModule = modules[moduleIndex - 1];
        const prevBlockId = prevModule.blockIds[prevModule.blockIds.length - 1];
        const prevBlock = getBlockById(prevBlockId);
        return prevBlock
            ? { moduleId: prevModule.id, blockId: prevBlockId, title: prevBlock.title, isNewModule: true, moduleName: prevModule.title }
            : null;
    }

    return null;
}

export default function BlockPage() {
    const { moduleId, blockId } = useParams<{
        moduleId: string;
        blockId: string;
    }>();
    const navigate = useNavigate();
    const block = blockId ? getBlockById(blockId) : undefined;
    const quiz = block ? getQuizById(block.quizId) : undefined;
    const next = moduleId && blockId ? getNextBlock(moduleId, blockId) : null;
    const prev = moduleId && blockId ? getPrevBlock(moduleId, blockId) : null;

    useEffect(() => {
        const container = document.querySelector('.learn-layout__content');
        if (container) container.scrollTop = 0;
    }, [blockId]);

    if (!block) {
        return (
            <div className="learn-page">
                <h1>Блок не найден</h1>
            </div>
        );
    }

    return (
        <div className="learn-page learn-page--block">
            {moduleId && (
                <div className="block-content__module-label">
                    📚 {modules.find((m) => m.id === moduleId)?.title}
                </div>
            )}

            <article className="block-content">
                <h1>{block.title}</h1>

                <ContentRenderer nodes={block.content} />

                {block.takeaways.length > 0 && (
                    <section className="block-section block-section--takeaways">
                        <h2>🎯 Ключевые выводы</h2>
                        <ul>
                            {block.takeaways.map((t, i) => (
                                <li key={i} dangerouslySetInnerHTML={{ __html: t }} />
                            ))}
                        </ul>
                    </section>
                )}

                {block.mistakes.length > 0 && (
                    <section className="block-section block-section--mistakes">
                        <h2>⚠️ Частые ошибки</h2>
                        <ul>
                            {block.mistakes.map((m, i) => (
                                <li key={i} dangerouslySetInnerHTML={{ __html: m }} />
                            ))}
                        </ul>
                    </section>
                )}

                <a
                    href={block.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="source-link"
                >
                    📖 Источник: react.dev
                </a>
            </article>

            {quiz && <Quiz key={blockId} quiz={quiz} block={block} moduleId={moduleId!} />}

            {(prev || next) && (
                <div className="block-nav">
                    {prev ? (
                        <button
                            className="block-nav__btn block-nav__btn--prev"
                            onClick={() => navigate(`/modules/${prev.moduleId}/blocks/${prev.blockId}`)}
                        >
                            <span className="block-nav__arrow">←</span>
                            <div className="block-nav__info">
                                <span className="block-nav__label">
                                    {prev.isNewModule ? `Модуль: ${prev.moduleName}` : 'Предыдущий шаг'}
                                </span>
                                <span className="block-nav__title">{prev.title}</span>
                            </div>
                        </button>
                    ) : <div />}

                    {next ? (
                        <button
                            className="block-nav__btn block-nav__btn--next"
                            onClick={() => navigate(`/modules/${next.moduleId}/blocks/${next.blockId}`)}
                        >
                            <div className="block-nav__info" style={{ textAlign: 'right' }}>
                                <span className="block-nav__label">
                                    {next.isNewModule ? `Модуль: ${next.moduleName}` : 'Следующий шаг'}
                                </span>
                                <span className="block-nav__title">{next.title}</span>
                            </div>
                            <span className="block-nav__arrow">→</span>
                        </button>
                    ) : <div />}
                </div>
            )}
        </div>
    );
}
