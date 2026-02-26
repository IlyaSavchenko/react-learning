import { Link } from 'react-router-dom';
import { getRecommendations } from '../data/concepts';
import { getBlockById } from '../data/blocks';

interface Props {
    weakConceptTags: string[];
    sourceUrl: string;
}

export default function Recommendations({ weakConceptTags, sourceUrl }: Props) {
    if (weakConceptTags.length === 0) return null;

    const recs = getRecommendations(weakConceptTags, 3);
    if (recs.length === 0) return null;

    return (
        <div className="recommendations">
            <h3>💡 Рекомендации</h3>

            <div className="recommendations__section">
                <h4>Обратить внимание на:</h4>
                <ul>
                    {recs.map((r) => (
                        <li key={r.tag}>
                            <strong>{r.label}</strong> — {r.hint}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="recommendations__section">
                <h4>Вернуться и повторить:</h4>
                <ul>
                    {recs.flatMap((r) =>
                        r.relatedBlockIds.map((blockId) => {
                            const block = getBlockById(blockId);
                            if (!block) return null;
                            return (
                                <li key={blockId}>
                                    <Link to={`/modules/${block.moduleId}/blocks/${block.id}`}>
                                        {block.title}
                                    </Link>
                                </li>
                            );
                        })
                    )}
                </ul>
            </div>

            <div className="recommendations__section">
                <h4>Источник:</h4>
                <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
                    📖 Оригинальная документация
                </a>
            </div>
        </div>
    );
}
