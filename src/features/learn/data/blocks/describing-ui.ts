import type { Block } from '../../types';

export const describingUiBlocks: Record<string, Block> = {
    'block-components': {
        id: 'block-components',
        moduleId: 'describing-ui',
        title: 'Компоненты: строительные блоки UI',
        content: [
            { type: 'paragraph', text: 'React-приложение строится из <strong>компонентов</strong> — независимых, переиспользуемых частей интерфейса. Каждый компонент — это JavaScript-функция, которая возвращает разметку (JSX).' },
            { type: 'codeSnippet', language: 'tsx', text: `function Welcome() {\n  return <h1>Привет, мир!</h1>;\n}` },
            { type: 'paragraph', text: 'Имя компонента <strong>всегда</strong> начинается с заглавной буквы — иначе React примет его за обычный HTML-тег. Компоненты можно вкладывать друг в друга.' },
            { type: 'codeSnippet', language: 'tsx', text: `function App() {\n  return (\n    <div>\n      <Welcome />\n      <Welcome />\n    </div>\n  );\n}` },
            { type: 'callout', variant: 'tip', text: 'Один файл может содержать несколько компонентов, но если компонент разрастается — выносите его в отдельный файл.' },
        ],
        takeaways: [
            '<strong>Компонент</strong> — функция, возвращающая JSX.',
            'Имя <strong>с заглавной буквы</strong>.',
            'Компоненты можно <strong>вкладывать</strong> и <strong>переиспользовать</strong>.',
            '<strong>export default</strong> делает компонент доступным для импорта.',
        ],
        mistakes: [
            'Название с маленькой буквы: <code>function welcome()</code> — React не увидит компонент.',
            'Определение компонента внутри другого — пересоздание при каждом рендере.',
        ],
        quizId: 'quiz-components',
        conceptTags: ['components'],
        sourceUrl: 'https://ru.react.dev/learn/your-first-component',
    },

    'block-import-export': {
        id: 'block-import-export',
        moduleId: 'describing-ui',
        title: 'Импорт и экспорт компонентов',
        content: [
            { type: 'paragraph', text: 'Когда компонентов становится много, их выносят в отдельные файлы. JavaScript использует два вида экспорта: <strong>default</strong> и <strong>именованный</strong>.' },
            {
                type: 'list', items: [
                    '<strong>Default export</strong>: один на файл. <code>export default function Button() {}</code>. Импорт: <code>import Button from "./Button"</code> (имя произвольное).',
                    '<strong>Именованный export</strong>: сколько угодно. <code>export function Button() {}</code>. Импорт: <code>import { Button } from "./Button"</code> (имя точное).',
                ]
            },
            { type: 'codeSnippet', language: 'tsx', text: `// Gallery.tsx — default export\nexport default function Gallery() {\n  return <section>...</section>;\n}\n\n// utils.tsx — named exports\nexport function formatDate(d: Date) { ... }\nexport function capitalize(s: string) { ... }` },
            { type: 'callout', variant: 'tip', text: 'В одном файле может быть один default export и сколько угодно именованных. Многие команды предпочитают только именованные для единообразия.' },
        ],
        takeaways: [
            '<strong>Default export</strong> — один на файл, имя при импорте произвольное.',
            '<strong>Именованный export</strong> — имя при импорте должно совпадать.',
            'Используйте <strong>именованные экспорты</strong> для предсказуемости.',
            'Компонент — файл обычно содержит один «главный» компонент.',
        ],
        mistakes: [
            'Путаница default/named: <code>import { Button }</code> для default export не сработает.',
            'Два default export в одном файле — ошибка синтаксиса.',
        ],
        quizId: 'quiz-import-export',
        conceptTags: ['import_export'],
        sourceUrl: 'https://ru.react.dev/learn/importing-and-exporting-components',
    },

    'block-jsx': {
        id: 'block-jsx',
        moduleId: 'describing-ui',
        title: 'JSX: разметка внутри JavaScript',
        content: [
            { type: 'paragraph', text: '<strong>JSX</strong> — расширение синтаксиса JavaScript для разметки. Это не HTML — JSX компилируется в вызовы React.' },
            { type: 'heading', level: 2, text: 'Правила JSX' },
            {
                type: 'list', items: [
                    '<strong>Один корневой элемент</strong> — оберните в <code>&lt;div&gt;</code> или фрагмент <code>&lt;&gt;...&lt;/&gt;</code>.',
                    '<strong>Все теги закрываются</strong>: <code>&lt;img /&gt;</code>, <code>&lt;br /&gt;</code>.',
                    '<strong>camelCase</strong> для атрибутов: <code>className</code>, <code>onClick</code>.',
                ]
            },
            { type: 'heading', level: 2, text: 'Фигурные скобки в JSX' },
            { type: 'paragraph', text: '<code>{}</code> — «окно» в JavaScript внутри JSX. Можно поместить переменную, вычисление, вызов функции.' },
            { type: 'codeSnippet', language: 'tsx', text: `const name = 'Алиса';\nfunction Greeting() {\n  return <h1>Привет, {name}!</h1>;\n}` },
            { type: 'callout', variant: 'warning', text: 'Двойные скобки {{}} — это объект внутри JSX, не особый синтаксис. Часто для inline-стилей.' },
        ],
        takeaways: [
            '<strong>JSX</strong> — синтаксис разметки, компилируется в React.',
            'Нужен <strong>один корневой элемент</strong>.',
            'Теги <strong>обязательно закрываются</strong>.',
            'Атрибуты в <strong>camelCase</strong>.',
            '<strong>{}</strong> — JS-выражения в JSX.',
            '<strong>{{...}}</strong> — объект внутри JSX.',
        ],
        mistakes: [
            'Два корневых элемента без обёртки.',
            '<code>class</code> вместо <code>className</code>.',
            'Незакрытый тег.',
        ],
        quizId: 'quiz-jsx',
        conceptTags: ['jsx_basics', 'jsx_curly_braces'],
        sourceUrl: 'https://ru.react.dev/learn/writing-markup-with-jsx',
    },

    'block-props': {
        id: 'block-props',
        moduleId: 'describing-ui',
        title: 'Props: настройка компонентов',
        content: [
            { type: 'paragraph', text: '<strong>Props</strong> — данные от родительского компонента дочернему. Работают как атрибуты HTML.' },
            { type: 'codeSnippet', language: 'tsx', text: `function Avatar({ src, name }: { src: string; name: string }) {\n  return <img src={src} alt={name} />;\n}` },
            { type: 'paragraph', text: 'Пропсы <strong>неизменяемы</strong> — компонент не должен их менять.' },
            { type: 'paragraph', text: 'Специальный проп <strong>children</strong> содержит вложенное содержимое между тегами компонента.' },
            { type: 'codeSnippet', language: 'tsx', text: `function Card({ children }: { children: React.ReactNode }) {\n  return <div className="card">{children}</div>;\n}` },
        ],
        takeaways: [
            '<strong>Props</strong> — аргументы компонента.',
            'Используйте <strong>деструктуризацию</strong>.',
            'Пропсы <strong>неизменяемы</strong> (read-only).',
            '<strong>children</strong> — вложенное содержимое.',
        ],
        mistakes: [
            'Изменение props: <code>props.name = "новое"</code>.',
            'Передача объектов без spread.',
        ],
        quizId: 'quiz-props',
        conceptTags: ['props'],
        sourceUrl: 'https://ru.react.dev/learn/passing-props-to-a-component',
    },

    'block-conditional': {
        id: 'block-conditional',
        moduleId: 'describing-ui',
        title: 'Условный рендеринг',
        content: [
            { type: 'paragraph', text: 'React использует обычный JavaScript для условий: <strong>if/else</strong>, <strong>тернарный оператор</strong> и <strong>&&</strong>.' },
            { type: 'codeSnippet', language: 'tsx', text: `// Тернарный\n{isLoggedIn ? <Dashboard /> : <LoginForm />}\n\n// &&\n{hasNotifications && <Badge count={count} />}` },
            { type: 'callout', variant: 'warning', text: 'Ловушка: <code>count && &lt;Badge /&gt;</code> при <code>count = 0</code> отрендерит 0!' },
        ],
        takeaways: [
            '<strong>if/else</strong> — до return.',
            '<strong>? :</strong> — выбор между двумя вариантами.',
            '<strong>&&</strong> — показать или ничего.',
            'Осторожно с <strong>0 && ...</strong>',
        ],
        mistakes: [
            '<code>0 && &lt;Badge /&gt;</code> рендерит 0.',
            '<code>if</code> внутри JSX — нужен тернарный или &&.',
        ],
        quizId: 'quiz-conditional',
        conceptTags: ['conditional_rendering'],
        sourceUrl: 'https://ru.react.dev/learn/conditional-rendering',
    },

    'block-lists': {
        id: 'block-lists',
        moduleId: 'describing-ui',
        title: 'Списки и ключи (keys)',
        content: [
            { type: 'paragraph', text: '<strong>.map()</strong> превращает каждый элемент массива в JSX.' },
            { type: 'codeSnippet', language: 'tsx', text: `{fruits.map(fruit => <li key={fruit}>{fruit}</li>)}` },
            { type: 'paragraph', text: '<strong>key</strong> помогает React отличать элементы при обновлении. Должен быть уникальным и стабильным.' },
            { type: 'callout', variant: 'warning', text: 'Не используйте индекс как key при динамических списках — приведёт к багам.' },
        ],
        takeaways: [
            '<strong>.map()</strong> — рендеринг массивов.',
            'Каждому элементу нужен <strong>уникальный key</strong>.',
            'Key <strong>из данных</strong> (ID), не индекс.',
            '<strong>.filter()</strong> + <strong>.map()</strong> для фильтрации.',
        ],
        mistakes: [
            'Отсутствие key — предупреждение + неэффективный DOM.',
            'Индекс как key при перестановках.',
        ],
        quizId: 'quiz-lists',
        conceptTags: ['lists_keys'],
        sourceUrl: 'https://ru.react.dev/learn/rendering-lists',
    },

    'block-pure': {
        id: 'block-pure',
        moduleId: 'describing-ui',
        title: 'Чистые компоненты',
        content: [
            { type: 'paragraph', text: '<strong>Чистый компонент</strong> — как математическая формула: одни и те же входные данные (props) всегда дают одинаковый результат (JSX).' },
            {
                type: 'list', items: [
                    '<strong>Не изменяет</strong> переменные, объявленные до рендера.',
                    '<strong>Нет</strong> побочных эффектов при рендеринге.',
                    'При одинаковых props — <strong>одинаковый</strong> JSX.',
                ]
            },
            { type: 'codeSnippet', language: 'tsx', text: `// ❌ Не чистый — мутирует внешнюю переменную\nlet guest = 0;\nfunction Cup() {\n  guest++; // мутация!\n  return <h2>Гость #{guest}</h2>;\n}\n\n// ✅ Чистый — через props\nfunction Cup({ guest }: { guest: number }) {\n  return <h2>Гость #{guest}</h2>;\n}` },
            { type: 'callout', variant: 'note', text: 'Побочные эффекты (запросы, таймеры, DOM-манипуляции) размещайте в обработчиках событий или useEffect, не при рендеринге.' },
        ],
        takeaways: [
            'Компонент — <strong>чистая функция</strong>: одни props → одинаковый JSX.',
            '<strong>Не мутируйте</strong> внешние переменные при рендере.',
            'Побочные эффекты — в <strong>обработчиках</strong> или <strong>useEffect</strong>.',
            'React может рендерить компоненты повторно — чистота обеспечивает предсказуемость.',
        ],
        mistakes: [
            'Изменение внешних переменных при рендере.',
            'Вызов API или таймера в теле компонента (без useEffect).',
        ],
        quizId: 'quiz-pure',
        conceptTags: ['pure_components'],
        sourceUrl: 'https://ru.react.dev/learn/keeping-components-pure',
    },

    'block-ui-tree': {
        id: 'block-ui-tree',
        moduleId: 'describing-ui',
        title: 'UI как дерево',
        content: [
            { type: 'paragraph', text: 'React строит <strong>дерево компонентов</strong>: App → Page → Header / Content → ... Понимание дерева помогает разобраться в однонаправленном потоке данных (сверху вниз через props).' },
            {
                type: 'list', items: [
                    '<strong>Корень</strong> — обычно App.',
                    '<strong>Листья</strong> — компоненты без дочерних (кнопки, текст).',
                    '<strong>Данные текут вниз</strong> через props.',
                    '<strong>Рендер-дерево</strong> определяет, какие компоненты перерендериваются.',
                ]
            },
            { type: 'callout', variant: 'tip', text: 'Дерево зависимостей модулей (импортов) отличается от дерева рендеринга. Оба полезны для оптимизации.' },
        ],
        takeaways: [
            'React UI — это <strong>дерево компонентов</strong>.',
            'Данные текут <strong>сверху вниз</strong> через props.',
            '<strong>Рендер-дерево</strong> ≠ дерево модулей.',
            'Понимание дерева помогает <strong>оптимизировать</strong> приложение.',
        ],
        mistakes: [
            'Передача данных «снизу вверх» напрямую — нарушает поток.',
            'Слишком глубокая вложенность без разбиения на поддеревья.',
        ],
        quizId: 'quiz-ui-tree',
        conceptTags: ['ui_tree'],
        sourceUrl: 'https://ru.react.dev/learn/understanding-your-ui-as-a-tree',
    },
};
