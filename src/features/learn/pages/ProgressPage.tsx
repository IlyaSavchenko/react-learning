import { Link } from 'react-router-dom';
import { modules } from '../data/modules';
import { getBlockById } from '../data/blocks';
import { readProgress } from '../utils/storage';
import type { Block, Module } from '../types';
import '../styles/learn.scss';

interface BlockEntry {
    moduleId: string;
    block: Block | undefined;
}

export default function ProgressPage() {
    const progress = readProgress();
    const allBlocks = modules.flatMap<BlockEntry>((m: Module) =>
        m.blockIds.map((id: string) => ({ moduleId: m.id, block: getBlockById(id) }))
    );
    const totalBlocks = allBlocks.length;
    const passedBlocks = allBlocks.filter(
        (b: BlockEntry) => b.block && progress.blocks[b.block.id]?.passed
    ).length;
    const overallPct = totalBlocks > 0 ? Math.round((passedBlocks / totalBlocks) * 100) : 0;

    return (
        <div className="learn-page">
            <h1>📊 Прогресс</h1>

            <div className="progress-overall">
                <div className="progress-bar">
                    <div
                        className="progress-bar__fill"
                        style={{ width: `${overallPct}%` }}
                    />
                </div>
                <p className="progress-overall__text">
                    Пройдено: {passedBlocks} из {totalBlocks} блоков ({overallPct}%)
                </p>
            </div>

            {modules.map((mod: Module) => {
                const modBlocks = mod.blockIds.map((id: string) => getBlockById(id)).filter((b): b is Block => Boolean(b));
                const modPassed = modBlocks.filter(
                    (b: Block) => progress.blocks[b.id]?.passed
                ).length;
                const modPct = modBlocks.length > 0
                    ? Math.round((modPassed / modBlocks.length) * 100)
                    : 0;

                return (
                    <section key={mod.id} className="progress-module">
                        <h2>
                            <Link to={`/modules/${mod.id}`}>{mod.title}</Link>
                            <span className="progress-module__pct">{modPct}%</span>
                        </h2>
                        <div className="progress-bar progress-bar--small">
                            <div
                                className="progress-bar__fill"
                                style={{ width: `${modPct}%` }}
                            />
                        </div>
                        <table className="progress-table">
                            <thead>
                                <tr>
                                    <th>Блок</th>
                                    <th>Статус</th>
                                    <th>Лучший</th>
                                    <th>Попыток</th>
                                </tr>
                            </thead>
                            <tbody>
                                {modBlocks.map((block: Block) => {
                                    const bp = progress.blocks[block.id];
                                    return (
                                        <tr key={block.id}>
                                            <td>
                                                <Link to={`/modules/${mod.id}/blocks/${block.id}`}>
                                                    {block.title}
                                                </Link>
                                            </td>
                                            <td>{bp?.passed ? '✅' : bp?.attempts ? '🔄' : '—'}</td>
                                            <td>{bp ? `${bp.bestScorePct}%` : '—'}</td>
                                            <td>{bp?.attempts ?? 0}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </section>
                );
            })}
        </div>
    );
}
