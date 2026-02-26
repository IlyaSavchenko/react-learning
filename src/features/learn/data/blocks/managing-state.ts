import type { Block } from '../../types';

export const managingStateBlocks: Record<string, Block> = {
    'block-state-input': {
        id: 'block-state-input', moduleId: 'managing-state',
        title: 'Реакция на ввод через state',
        content: [
            { type: 'paragraph', text: 'В React UI описывается <strong>декларативно</strong>: вы задаёте визуальные состояния (загрузка, успех, ошибка), а React обновляет DOM.' },
            {
                type: 'list', items: [
                    'Определите все <strong>визуальные состояния</strong> компонента.',
                    'Определите, что <strong>вызывает переходы</strong> между ними (ввод, клик, ответ сервера).',
                    'Смоделируйте state через <strong>useState</strong>.',
                ]
            },
            { type: 'codeSnippet', language: 'tsx', text: `type Status = 'typing' | 'submitting' | 'success';\nconst [status, setStatus] = useState<Status>('typing');` },
        ],
        takeaways: [
            'Описывайте UI <strong>декларативно</strong> через состояния.',
            'Определите <strong>все визуальные состояния</strong> заранее.',
            'Используйте <strong>union-типы</strong> для моделирования состояний.',
            '<strong>Reducer</strong> удобнее при сложных переходах.',
        ],
        mistakes: ['Императивное показывание/скрывание через DOM вместо state.'],
        quizId: 'quiz-state-input', conceptTags: ['state_input'],
        sourceUrl: 'https://ru.react.dev/learn/reacting-to-input-with-state',
    },

    'block-state-structure': {
        id: 'block-state-structure', moduleId: 'managing-state',
        title: 'Выбор структуры state',
        content: [
            { type: 'paragraph', text: 'Правильная структура state делает компонент понятным и предотвращает баги.' },
            {
                type: 'list', items: [
                    '<strong>Группируйте</strong> связанные данные в один объект.',
                    'Избегайте <strong>противоречий</strong>: isSending и isSent не могут быть true одновременно → используйте status.',
                    'Избегайте <strong>дублирования</strong>: не храните то, что можно вычислить из другого state.',
                    '<strong>Плоская</strong> структура лучше глубоко вложенной.',
                ]
            },
        ],
        takeaways: [
            '<strong>Группируйте</strong> связанные переменные.',
            'Избегайте <strong>противоречивых</strong> состояний.',
            'Не <strong>дублируйте</strong> то, что можно вычислить.',
            '<strong>Плоская</strong> > глубоко вложенная.',
        ],
        mistakes: [
            'isSending + isSent — возможен невалидный баг. Используйте enum/union.',
            'Хранение fullName в state, если есть firstName + lastName.',
        ],
        quizId: 'quiz-state-structure', conceptTags: ['state_structure'],
        sourceUrl: 'https://ru.react.dev/learn/choosing-the-state-structure',
    },

    'block-lifting-state': {
        id: 'block-lifting-state', moduleId: 'managing-state',
        title: 'Подъём состояния (lifting state up)',
        content: [
            { type: 'paragraph', text: 'Когда два компонента должны <strong>синхронизировать</strong> данные, поднимите общий state в их ближайшего <strong>общего родителя</strong>.' },
            { type: 'codeSnippet', language: 'tsx', text: `function Parent() {\n  const [value, setValue] = useState('');\n  return (\n    <>\n      <InputA value={value} onChange={setValue} />\n      <InputB value={value} onChange={setValue} />\n    </>\n  );\n}` },
            { type: 'paragraph', text: 'Родитель хранит state и передаёт через props значение и setter. Это называется <strong>контролируемый компонент</strong>.' },
        ],
        takeaways: [
            '<strong>Подъём state</strong> — в общего родителя для синхронизации.',
            'Родитель передаёт <strong>value + onChange</strong>.',
            '<strong>Контролируемый</strong> компонент управляется через props.',
            '<strong>Неконтролируемый</strong> — управляет собой через локальный state.',
        ],
        mistakes: ['Дублирование state в дочерних компонентах вместо подъёма.'],
        quizId: 'quiz-lifting-state', conceptTags: ['lifting_state'],
        sourceUrl: 'https://ru.react.dev/learn/sharing-state-between-components',
    },

    'block-preserving-state': {
        id: 'block-preserving-state', moduleId: 'managing-state',
        title: 'Сохранение и сброс state',
        content: [
            { type: 'paragraph', text: 'React сохраняет state компонента, пока тот занимает <strong>ту же позицию</strong> в дереве. Разный компонент или <strong>другой key</strong> — сброс state.' },
            { type: 'codeSnippet', language: 'tsx', text: `// Разный key — React создаёт новый компонент\n{isPlayerA\n  ? <Counter key="A" person="Алиса" />\n  : <Counter key="B" person="Борис" />\n}` },
            { type: 'callout', variant: 'tip', text: 'Атрибут key работает не только в списках. Любой компонент с новым key сбрасывает state.' },
        ],
        takeaways: [
            'State привязан к <strong>позиции</strong> в дереве.',
            'Тот же компонент на той же позиции — state <strong>сохраняется</strong>.',
            'Другой <strong>key</strong> — state <strong>сбрасывается</strong>.',
            'key полезен для <strong>сброса форм</strong> при смене пользователя.',
        ],
        mistakes: ['Ожидать сброс state без смены key или типа компонента.'],
        quizId: 'quiz-preserving-state', conceptTags: ['preserving_state'],
        sourceUrl: 'https://ru.react.dev/learn/preserving-and-resetting-state',
    },

    'block-reducer': {
        id: 'block-reducer', moduleId: 'managing-state',
        title: 'Редюсеры (useReducer)',
        content: [
            { type: 'paragraph', text: '<strong>useReducer</strong> — альтернатива useState для сложной логики обновления. Reducer — чистая функция <code>(state, action) => newState</code>.' },
            { type: 'codeSnippet', language: 'tsx', text: `function reducer(state, action) {\n  switch (action.type) {\n    case 'increment': return { count: state.count + 1 };\n    case 'decrement': return { count: state.count - 1 };\n  }\n}\nconst [state, dispatch] = useReducer(reducer, { count: 0 });` },
            { type: 'paragraph', text: '<strong>dispatch({ type: "increment" })</strong> вместо прямого setState. Вся логика обновления собрана в одном месте.' },
        ],
        takeaways: [
            '<strong>useReducer</strong> — для сложной логики состояния.',
            'Reducer — <strong>чистая функция</strong>.',
            '<strong>dispatch(action)</strong> вместо прямого set.',
            'Удобно для <strong>множества связанных обновлений</strong>.',
        ],
        mistakes: [
            'Мутация state внутри reducer вместо возврата нового объекта.',
            'Побочные эффекты в reducer — нарушает чистоту.',
        ],
        quizId: 'quiz-reducer', conceptTags: ['reducer'],
        sourceUrl: 'https://ru.react.dev/learn/extracting-state-logic-into-a-reducer',
    },

    'block-context': {
        id: 'block-context', moduleId: 'managing-state',
        title: 'Контекст (useContext)',
        content: [
            { type: 'paragraph', text: '<strong>Context</strong> позволяет передавать данные вглубь дерева без прокидывания через каждый уровень props (prop drilling).' },
            { type: 'codeSnippet', language: 'tsx', text: `const ThemeContext = createContext('light');\n\n// Провайдер (родитель)\n<ThemeContext.Provider value="dark">\n  <App />\n</ThemeContext.Provider>\n\n// Потребитель (любой потомок)\nconst theme = useContext(ThemeContext);` },
        ],
        takeaways: [
            '<strong>createContext</strong> — создать контекст.',
            '<strong>Provider</strong> — обернуть поддерево + передать value.',
            '<strong>useContext</strong> — считать ближайшее значение.',
            'Подходит для <strong>темы, локали, текущего пользователя</strong>.',
        ],
        mistakes: [
            'Использование контекста для всего — часто достаточно props.',
            'Забыли Provider — компонент получит defaultValue.',
        ],
        quizId: 'quiz-context', conceptTags: ['context'],
        sourceUrl: 'https://ru.react.dev/learn/passing-data-deeply-with-context',
    },

    'block-reducer-context': {
        id: 'block-reducer-context', moduleId: 'managing-state',
        title: 'Масштабирование: Reducer + Context',
        content: [
            { type: 'paragraph', text: 'Комбинация <strong>useReducer + Context</strong> — паттерн для глобального состояния без внешних библиотек.' },
            {
                type: 'list', items: [
                    'Создайте <strong>два контекста</strong>: один для state, один для dispatch.',
                    '<strong>Provider</strong> оборачивает приложение, внутри — useReducer.',
                    'Дочерние читают state через <strong>useContext(StateCtx)</strong>.',
                    'Обновляют через <strong>useContext(DispatchCtx)</strong>.',
                ]
            },
            { type: 'callout', variant: 'tip', text: 'Разделение state и dispatch контекстов предотвращает лишние рендеры компонентов, которые только dispatch-ат.' },
        ],
        takeaways: [
            '<strong>Reducer + Context</strong> = масштабируемое управление state.',
            'Два контекста: <strong>state + dispatch</strong>.',
            'Заменяет <strong>Redux</strong> для простых случаев.',
            'Выносите Provider в <strong>отдельный компонент</strong> для чистоты.',
        ],
        mistakes: ['Один контекст для state и dispatch — лишние рендеры.'],
        quizId: 'quiz-reducer-context', conceptTags: ['reducer_context'],
        sourceUrl: 'https://ru.react.dev/learn/scaling-up-with-reducer-and-context',
    },
};
