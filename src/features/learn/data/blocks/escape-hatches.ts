import type { Block } from '../../types';

export const escapeHatchesBlocks: Record<string, Block> = {
    'block-refs': {
        id: 'block-refs', moduleId: 'escape-hatches',
        title: 'Рефы (useRef)',
        content: [
            { type: 'paragraph', text: '<strong>useRef</strong> хранит значение между рендерами, <strong>не вызывая</strong> перерендер при изменении. Идеально для таймеров, DOM-элементов, предыдущих значений.' },
            { type: 'codeSnippet', language: 'tsx', text: `const ref = useRef(0);\nref.current++; // изменение НЕ вызывает перерендер` },
            {
                type: 'list', items: [
                    '<strong>ref.current</strong> — мутабельное свойство.',
                    'Изменение <strong>не вызывает</strong> рендер (отличие от state).',
                    'Не читайте/пишите <strong>ref.current при рендере</strong>.',
                ]
            },
        ],
        takeaways: [
            '<strong>useRef</strong> — «коробка» для мутабельного значения.',
            'Изменение <strong>не перерендеривает</strong> компонент.',
            'Используйте для <strong>таймеров, DOM, интервалов</strong>.',
            '<strong>Не используйте</strong> при рендеринге — только в обработчиках/эффектах.',
        ],
        mistakes: ['Использовать ref вместо state для отображаемых данных — UI не обновится.'],
        quizId: 'quiz-refs', conceptTags: ['refs'],
        sourceUrl: 'https://ru.react.dev/learn/referencing-values-with-refs',
    },

    'block-dom-refs': {
        id: 'block-dom-refs', moduleId: 'escape-hatches',
        title: 'Управление DOM через рефы',
        content: [
            { type: 'paragraph', text: 'Рефы дают <strong>прямой доступ к DOM-узлу</strong>: фокус, скролл, замеры размеров.' },
            { type: 'codeSnippet', language: 'tsx', text: `const inputRef = useRef<HTMLInputElement>(null);\n\nfunction handleClick() {\n  inputRef.current?.focus();\n}\n\nreturn <input ref={inputRef} />;` },
            { type: 'callout', variant: 'warning', text: 'Не модифицируйте DOM, управляемый React (добавление/удаление children). React может перезаписать ваши изменения.' },
        ],
        takeaways: [
            '<strong>ref={myRef}</strong> привязывает реф к DOM-узлу.',
            'Доступ через <strong>myRef.current</strong> после монтирования.',
            'Используйте для <strong>focus, scrollIntoView, getBoundingClientRect</strong>.',
            '<strong>Не модифицируйте</strong> DOM, управляемый React.',
        ],
        mistakes: ['Модификация React-управляемого DOM через ref — конфликт с React.'],
        quizId: 'quiz-dom-refs', conceptTags: ['dom_refs'],
        sourceUrl: 'https://ru.react.dev/learn/manipulating-the-dom-with-refs',
    },

    'block-effects': {
        id: 'block-effects', moduleId: 'escape-hatches',
        title: 'Эффекты (useEffect)',
        content: [
            { type: 'paragraph', text: '<strong>useEffect</strong> синхронизирует компонент с <strong>внешней системой</strong> (API, DOM, таймеры, WebSocket).' },
            { type: 'codeSnippet', language: 'tsx', text: `useEffect(() => {\n  const id = setInterval(() => tick(), 1000);\n  return () => clearInterval(id); // очистка\n}, [tick]); // зависимости` },
            {
                type: 'list', items: [
                    '<strong>[]</strong> — запуск один раз (монтирование).',
                    '<strong>[dep1, dep2]</strong> — перезапуск при изменении зависимостей.',
                    '<strong>return () => {}</strong> — функция очистки.',
                ]
            },
        ],
        takeaways: [
            '<strong>useEffect</strong> — для синхронизации с внешними системами.',
            'Массив зависимостей контролирует <strong>когда</strong> перезапуск.',
            '<strong>Функция очистки</strong> вызывается при размонтировании и перезапуске.',
            'В Strict Mode эффект запускается <strong>дважды</strong> при разработке.',
        ],
        mistakes: [
            'Пустой массив зависимостей, когда эффект зависит от props/state.',
            'Забыли очистку: утечка подписок, таймеров.',
        ],
        quizId: 'quiz-effects', conceptTags: ['effects'],
        sourceUrl: 'https://ru.react.dev/learn/synchronizing-with-effects',
    },

    'block-no-effect': {
        id: 'block-no-effect', moduleId: 'escape-hatches',
        title: 'Когда эффект не нужен',
        content: [
            { type: 'paragraph', text: 'Многие задачи <strong>не требуют</strong> useEffect. Эффекты — для синхронизации с внешними системами, не для реакции на данные.' },
            {
                type: 'list', items: [
                    '<strong>Трансформация данных при рендере</strong> — вычисляйте прямо в теле компонента.',
                    '<strong>Реакция на действие пользователя</strong> — используйте обработчик события.',
                    '<strong>Инициализация</strong> — вычисление аргумента для useState.',
                    '<strong>Кэширование</strong> — useMemo, не useEffect + setState.',
                ]
            },
            { type: 'callout', variant: 'warning', text: 'Паттерн useEffect + setState для трансформации данных — антипаттерн. Вызывает лишний рендер.' },
        ],
        takeaways: [
            'Не нужен эффект для <strong>трансформации данных</strong> при рендере.',
            'Не нужен эффект для <strong>обработки событий</strong>.',
            '<strong>useMemo</strong> для кэширования вычислений.',
            'useEffect только для <strong>внешних систем</strong>.',
        ],
        mistakes: [
            'useEffect + setState для фильтрации списка — лишний рендер.',
            'Fetch в обработчике формы через useEffect вместо прямого вызова.',
        ],
        quizId: 'quiz-no-effect', conceptTags: ['no_effect'],
        sourceUrl: 'https://ru.react.dev/learn/you-might-not-need-an-effect',
    },

    'block-effect-lifecycle': {
        id: 'block-effect-lifecycle', moduleId: 'escape-hatches',
        title: 'Жизненный цикл эффектов',
        content: [
            { type: 'paragraph', text: 'Эффект <strong>начинает синхронизацию</strong> и <strong>останавливает</strong> её. Это может происходить <strong>несколько раз</strong> за жизнь компонента.' },
            {
                type: 'list', items: [
                    'Эффект <strong>запускается</strong> после рендера, если зависимости изменились.',
                    '<strong>Очистка</strong> вызывается перед перезапуском и при размонтировании.',
                    'Зависимости — <strong>реактивные значения</strong> (props, state, вычисляемые).',
                ]
            },
            { type: 'paragraph', text: 'Думайте об эффекте как о независимом процессе синхронизации, а не как о lifecycle-методе.' },
        ],
        takeaways: [
            'Цикл эффекта: <strong>start → stop → start → stop...</strong>',
            'Зависимости = <strong>реактивные значения</strong>.',
            'Думайте о <strong>синхронизации</strong>, не о «монтировании».',
            'Каждый перезапуск — <strong>очистка + запуск</strong>.',
        ],
        mistakes: ['Думать в терминах «при монтировании/размонтировании» вместо синхронизации.'],
        quizId: 'quiz-effect-lifecycle', conceptTags: ['effect_lifecycle'],
        sourceUrl: 'https://ru.react.dev/learn/lifecycle-of-reactive-effects',
    },

    'block-effect-events': {
        id: 'block-effect-events', moduleId: 'escape-hatches',
        title: 'Отделение событий от эффектов',
        content: [
            { type: 'paragraph', text: '<strong>Обработчики событий</strong> — для реакции на действия пользователя. <strong>Эффекты</strong> — для синхронизации с внешними системами.' },
            {
                type: 'list', items: [
                    '<strong>Обработчик</strong>: «пользователь нажал кнопку» → fetch, навигация.',
                    '<strong>Эффект</strong>: «компонент отображается» → подписка на чат, таймер.',
                    'Логика в обработчике <strong>не реактивна</strong> (не зависит от рендера).',
                    'Логика в эффекте <strong>реактивна</strong> (перезапуск при смене зависимостей).',
                ]
            },
        ],
        takeaways: [
            '<strong>Обработчик</strong> — реакция на действие пользователя.',
            '<strong>Эффект</strong> — синхронизация с внешней системой.',
            'Не смешивайте: <strong>fetch по клику</strong> — в обработчике, не в эффекте.',
            'Реактивная логика — в эффекте, нереактивная — в обработчике.',
        ],
        mistakes: ['useEffect для fetch при нажатии кнопки вместо onClick.'],
        quizId: 'quiz-effect-events', conceptTags: ['effect_events'],
        sourceUrl: 'https://ru.react.dev/learn/separating-events-from-effects',
    },

    'block-effect-deps': {
        id: 'block-effect-deps', moduleId: 'escape-hatches',
        title: 'Удаление зависимостей эффекта',
        content: [
            { type: 'paragraph', text: 'Избыточные зависимости вызывают <strong>лишние перезапуски</strong>. Удалите их правильно.' },
            {
                type: 'list', items: [
                    'Вынесите <strong>статические объекты/функции</strong> за пределы компонента.',
                    'Используйте <strong>функцию-апдейтер</strong>: <code>setCount(c => c + 1)</code> вместо count.',
                    'Разделите <strong>несвязанные</strong> эффекты.',
                    'Не подавляйте линтер <code>// eslint-disable</code> — исправьте причину.',
                ]
            },
        ],
        takeaways: [
            'Зависимости <strong>определяются кодом</strong>, а не вами.',
            '<strong>Вынесите</strong> константы за компонент.',
            '<strong>Функция-апдейтер</strong> убирает зависимость от state.',
            '<strong>Не подавляйте</strong> линтер зависимостей.',
        ],
        mistakes: [
            'Подавление eslint для зависимостей — скрытые баги.',
            'Объект в массиве зависимостей — пересоздаётся каждый рендер.',
        ],
        quizId: 'quiz-effect-deps', conceptTags: ['effect_deps'],
        sourceUrl: 'https://ru.react.dev/learn/removing-effect-dependencies',
    },

    'block-custom-hooks': {
        id: 'block-custom-hooks', moduleId: 'escape-hatches',
        title: 'Кастомные хуки',
        content: [
            { type: 'paragraph', text: '<strong>Кастомный хук</strong> — функция, начинающаяся с <code>use</code>, которая инкапсулирует логику с другими хуками.' },
            { type: 'codeSnippet', language: 'tsx', text: `function useWindowWidth() {\n  const [width, setWidth] = useState(window.innerWidth);\n  useEffect(() => {\n    const handler = () => setWidth(window.innerWidth);\n    window.addEventListener('resize', handler);\n    return () => window.removeEventListener('resize', handler);\n  }, []);\n  return width;\n}` },
            {
                type: 'list', items: [
                    'Имя <strong>начинается с use</strong>.',
                    'Внутри можно вызывать <strong>любые хуки</strong>.',
                    'Каждый вызов имеет <strong>изолированный</strong> state.',
                ]
            },
        ],
        takeaways: [
            'Кастомный хук — <strong>use + логика с хуками</strong>.',
            'Инкапсулирует <strong>повторяющуюся</strong> логику.',
            'Каждый вызов имеет <strong>свой state</strong>.',
            'Хуки — это <strong>конвенция</strong>, не магия.',
        ],
        mistakes: [
            'Функция без use в имени, но использующая хуки — линтер не проверит.',
            'Расшаривание state между вызовами — каждый вызов изолирован.',
        ],
        quizId: 'quiz-custom-hooks', conceptTags: ['custom_hooks'],
        sourceUrl: 'https://ru.react.dev/learn/reusing-logic-with-custom-hooks',
    },
};
