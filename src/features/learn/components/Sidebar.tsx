import { useState, useMemo, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { modules } from '../data/modules';
import { getBlockById } from '../data/blocks';
import { readProgress } from '../utils/storage';
import { isModuleCompleted } from '../data/finalTests';

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

/** Extract moduleId and blockId from current URL path */
function useRouteIds() {
    const location = useLocation();
    const path = location.pathname;

    // matches /modules/:moduleId/blocks/:blockId
    const blockMatch = path.match(/\/modules\/([^/]+)\/blocks\/([^/]+)/);
    if (blockMatch) return { moduleId: blockMatch[1], blockId: blockMatch[2] };

    // matches /modules/:moduleId (final-test or just module)
    const moduleMatch = path.match(/\/modules\/([^/]+)/);
    if (moduleMatch) return { moduleId: moduleMatch[1], blockId: undefined };

    return { moduleId: undefined, blockId: undefined };
}

export default function Sidebar() {
    const { moduleId, blockId } = useRouteIds();
    const location = useLocation();
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

    // Auto-expand the module that matches the current URL and scroll to it
    useEffect(() => {
        if (moduleId) {
            setExpanded((prev) => {
                if (prev[moduleId]) return prev;
                return { ...prev, [moduleId]: true };
            });

            // Scroll to the active module after expand settles
            const timer = setTimeout(() => {
                const el = document.querySelector(
                    `[data-module-id="${moduleId}"]`
                );
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [moduleId]);

    // Check if current page is final test
    const isFinalTestPage = location.pathname.endsWith('/final-test');

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
                    const allBlocksPassed = isModuleCompleted(mod.id, progress);
                    const moduleTestPassed = progress.moduleTests[mod.id]?.passed;

                    return (
                        <div key={mod.id} className="sidebar__module" data-module-id={mod.id}>
                            <button
                                className={`sidebar__module-btn ${mod.id === moduleId && !blockId && !isFinalTestPage
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

                                    {/* Final test link — only when all blocks are passed */}
                                    {allBlocksPassed && !isSearching && (
                                        <li>
                                            <NavLink
                                                to={`/modules/${mod.id}/final-test`}
                                                className={({ isActive }) =>
                                                    `sidebar__block-link sidebar__final-test-link ${isActive ? 'sidebar__block-link--active' : ''
                                                    } ${moduleTestPassed ? 'sidebar__block-link--passed' : ''}`
                                                }
                                            >
                                                <span className="sidebar__block-icon">
                                                    {moduleTestPassed ? '✅' : '🏆'}
                                                </span>
                                                <span className="sidebar__block-text">
                                                    Финальный тест
                                                </span>
                                            </NavLink>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}
