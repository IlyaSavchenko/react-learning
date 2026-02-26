import { Link } from 'react-router-dom';
import { modules } from '../data/modules';
import '../styles/learn.scss';

export default function ModulesPage() {
    return (
        <div className="learn-page">
            <h1>Модули</h1>
            <p className="learn-page__subtitle">Выберите модуль для изучения React</p>
            <div className="modules-grid">
                {modules.map((m) => (
                    <Link key={m.id} to={`/modules/${m.id}`} className="module-card">
                        <h2 className="module-card__title">{m.title}</h2>
                        <p className="module-card__desc">{m.description}</p>
                        <span className="module-card__count">
                            {m.blockIds.length} {m.blockIds.length === 1 ? 'блок' : 'блоков'}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
