import '../styles/learn.scss';

export default function AboutPage() {
    return (
        <div className="learn-page about-page">
            <h1>О приложении</h1>

            <section className="about-section">
                <h2>📚 Что это?</h2>
                <p>
                    Интерактивное приложение для изучения React. Материалы составлены на
                    основе официальной документации, адаптированы и сжаты в короткие
                    учебные блоки с проверочными заданиями.
                </p>
            </section>

            <section className="about-section">
                <h2>📖 Источники</h2>
                <p>
                    Контент создан на основе материалов:
                </p>
                <ul>
                    <li>
                        <a
                            href="https://react.dev/learn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            react.dev/learn
                        </a>{' '}
                        — официальная документация React (английский)
                    </li>
                    <li>
                        <a
                            href="https://ru.react.dev/learn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ru.react.dev/learn
                        </a>{' '}
                        — официальная документация React (русский)
                    </li>
                </ul>
                <p>
                    Материалы пересказаны, сокращены и реструктурированы. Это
                    <strong> не копия</strong> оригинальной документации, а адаптированное
                    учебное пособие.
                </p>
            </section>

            <section className="about-section">
                <h2>📄 Лицензия контента</h2>
                <p>
                    Оригинальная документация React распространяется под лицензией{' '}
                    <a
                        href="https://creativecommons.org/licenses/by/4.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Creative Commons Attribution 4.0 International (CC BY 4.0)
                    </a>
                    .
                </p>
                <p>
                    © Meta Open Source. Адаптация контента выполнена с указанием
                    авторства и ссылок на первоисточники.
                </p>
            </section>

            <section className="about-section">
                <h2>🛠️ Технологии</h2>
                <ul>
                    <li>React 19 + TypeScript</li>
                    <li>Vite</li>
                    <li>React Router v6</li>
                    <li>SCSS</li>
                    <li>localStorage для хранения прогресса</li>
                </ul>
            </section>
        </div>
    );
}
