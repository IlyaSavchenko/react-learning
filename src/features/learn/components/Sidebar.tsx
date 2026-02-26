import { useState, useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { modules } from '../data/modules';
import { getBlockById } from '../data/blocks';
import { readProgress } from '../utils/storage';

/** Highlight matching substring in text */
function HighlightMatch({ text, query }: { text: string; query: string }) {
    if (!query) return <>{text}</>;

    const lower = text.toLowerCase();
    const qLower = query.toLowerCase();
    const idx = lower.indexOf(qLower);
    if (idx === -1) return <>{text}</>;

    return (
        <>
            {text.slice(0, idx)}
            <mark className="sidebar__highlight">{text.slice(idx, idx + query.length)}</mark>
            {text.slice(idx + query.length)}
        </>
    );
}

export default function Sidebar() {
    const { moduleId, blockId } = useParams<{
        moduleId?: string;
        blockId?: string;
    }>();
    const progress = readProgress();
    const [searchQuery, setSearchQuery] = useState('');

    // Expand the active module by default, or none
    const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
        const init: Record<string, boolean> = {};
        modules.forEach((m) => {
            init[m.id] = m.id === moduleId;
        });
        return init;
    });

    // Filter blocks per module by search query
    const filteredModules = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return modules.map((m) => ({ mod: m, matchedBlockIds: m.blockIds }));

        return modules
            .map((mod) => {
                const matchedBlockIds = mod.blockIds.filter((bid) => {
                    const block = getBlockById(bid);
                    return block && block.title.toLowerCase().includes(q);
                });
                return { mod, matchedBlockIds };
            })
            .filter((entry) => entry.matchedBlockIds.length > 0);
    }, [searchQuery]);

    // When searching, auto-expand all matching modules
    const isSearching = searchQuery.trim().length > 0;

    function toggleModule(id: string) {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    }

    return (
        <aside className="sidebar">
            <div className="sidebar__header">
                <span className="sidebar__title">📚 Модули</span>
            </div>

            <div className="sidebar__search">
                <input
                    type="text"
                    className="sidebar__search-input"
                    placeholder="Поиск блоков..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <button
                        className="sidebar__search-clear"
                        onClick={() => setSearchQuery('')}
                        aria-label="Очистить"
                    >
                        ✕
                    </button>
                )}
            </div>

            <nav className="sidebar__tree">
                {filteredModules.length === 0 && (
                    <div className="sidebar__empty">Ничего не найдено</div>
                )}

                {filteredModules.map(({ mod, matchedBlockIds }) => {
                    const isExpanded = isSearching || expanded[mod.id];
                    const passedCount = mod.blockIds.filter(
                        (bid) => progress.blocks[bid]?.passed
                    ).length;

                    return (
                        <div key={mod.id} className="sidebar__module">
                            <button
                                className={`sidebar__module-btn ${mod.id === moduleId && !blockId
                                        ? 'sidebar__module-btn--active'
                                        : ''
                                    }`}
                                onClick={() => toggleModule(mod.id)}
                                aria-expanded={isExpanded}
                            >
                                <span className="sidebar__chevron">
                                    {isExpanded ? '▾' : '▸'}
                                </span>
                                <span className="sidebar__module-label">{mod.title}</span>
                                <span className="sidebar__module-badge">
                                    {passedCount}/{mod.blockIds.length}
                                </span>
                            </button>

                            {isExpanded && (
                                <ul className="sidebar__blocks">
                                    {matchedBlockIds.map((bid) => {
                                        const block = getBlockById(bid);
                                        if (!block) return null;
                                        const bp = progress.blocks[bid];

                                        return (
                                            <li key={bid}>
                                                <NavLink
                                                    to={`/modules/${mod.id}/blocks/${bid}`}
                                                    className={({ isActive }) =>
                                                        `sidebar__block-link ${isActive ? 'sidebar__block-link--active' : ''
                                                        } ${bp?.passed ? 'sidebar__block-link--passed' : ''}`
                                                    }
                                                >
                                                    <span className="sidebar__block-icon">
                                                        {bp?.passed ? '✅' : bp?.attempts ? '🔄' : '📄'}
                                                    </span>
                                                    <span className="sidebar__block-text">
                                                        <HighlightMatch
                                                            text={block.title}
                                                            query={searchQuery}
                                                        />
                                                    </span>
                                                </NavLink>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}
