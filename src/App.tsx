import { Routes, Route, Navigate, NavLink, useParams } from 'react-router-dom';
import Sidebar from './features/learn/components/Sidebar';
import BlockPage from './features/learn/pages/BlockPage';
import FinalTestPage from './features/learn/pages/FinalTestPage';
import ProgressPage from './features/learn/pages/ProgressPage';
import AboutPage from './features/learn/pages/AboutPage';
import { modules } from './features/learn/data/modules';
import './features/learn/styles/learn.scss';

/** Welcome panel shown when no block is selected */
function LearnWelcome() {
  const { moduleId } = useParams<{ moduleId?: string }>();
  const mod = moduleId ? modules.find((m) => m.id === moduleId) : undefined;

  return (
    <div className="learn-welcome">
      {mod ? (
        <>
          <h1>{mod.title}</h1>
          <p className="learn-welcome__desc">{mod.description}</p>
          <p className="learn-welcome__hint">
            ← Выберите блок в меню слева, чтобы начать изучение
          </p>
          <a
            href={mod.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
          >
            📖 Источник: react.dev
          </a>
        </>
      ) : (
        <>
          <h1>⚛️ React Learn</h1>
          <p className="learn-welcome__desc">
            Интерактивный курс по React на основе официальной документации.
          </p>
          <p className="learn-welcome__hint">
            ← Раскройте модуль и выберите блок для изучения
          </p>
          <div className="learn-welcome__stats">
            <div className="learn-welcome__stat">
              <span className="learn-welcome__stat-num">
                {modules.length}
              </span>
              <span className="learn-welcome__stat-label">модулей</span>
            </div>
            <div className="learn-welcome__stat">
              <span className="learn-welcome__stat-num">
                {modules.reduce((s, m) => s + m.blockIds.length, 0)}
              </span>
              <span className="learn-welcome__stat-label">блоков</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/** Sidebar layout wrapper for /modules routes */
function LearnLayout() {
  return (
    <div className="learn-layout">
      <Sidebar />
      <main className="learn-layout__content">
        <Routes>
          <Route index element={<LearnWelcome />} />
          <Route path=":moduleId" element={<LearnWelcome />} />
          <Route path=":moduleId/blocks/:blockId" element={<BlockPage />} />
          <Route path=":moduleId/final-test" element={<FinalTestPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <>
      <nav className="app-nav">
        <div className="app-nav__inner">
          <NavLink to="/modules" className="app-nav__logo">
            ⚛️ React Learn
          </NavLink>
          <NavLink
            to="/modules"
            className={({ isActive }) =>
              `app-nav__link ${isActive ? 'app-nav__link--active' : ''}`
            }
            end
          >
            Модули
          </NavLink>
          <NavLink
            to="/progress"
            className={({ isActive }) =>
              `app-nav__link ${isActive ? 'app-nav__link--active' : ''}`
            }
          >
            Прогресс
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `app-nav__link ${isActive ? 'app-nav__link--active' : ''}`
            }
          >
            О проекте
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/modules" replace />} />
        <Route path="/modules/*" element={<LearnLayout />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
