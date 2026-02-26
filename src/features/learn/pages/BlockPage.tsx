import { useParams } from 'react-router-dom';
import { getBlockById } from '../data/blocks';
import { getQuizById } from '../data/quizzes';
import ContentRenderer from '../components/ContentRenderer';
import Quiz from '../components/Quiz';
import '../styles/learn.scss';

export default function BlockPage() {
    const { moduleId, blockId } = useParams<{
        moduleId: string;
        blockId: string;
    }>();
    const block = blockId ? getBlockById(blockId) : undefined;
    const quiz = block ? getQuizById(block.quizId) : undefined;

    if (!block) {
        return (
            <div className="learn-page">
                <h1>Блок не найден</h1>
            </div>
        );
    }

    return (
        <div className="learn-page learn-page--block">
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

            {quiz && <Quiz quiz={quiz} block={block} moduleId={moduleId!} />}
        </div>
    );
}
