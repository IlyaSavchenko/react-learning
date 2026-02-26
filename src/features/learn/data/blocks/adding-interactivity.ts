import type { Block } from '../../types';

export const interactivityBlocks: Record<string, Block> = {
    'block-events': {
        id: 'block-events', moduleId: 'adding-interactivity',
        title: 'Обработка событий',
        content: [
            { type: 'paragraph', text: 'Обработчики событий — функции, которые React вызывает при взаимодействии (клик, ввод, наведение). Передаются как пропсы: <code>onClick={handleClick}</code>.' },
            { type: 'codeSnippet', language: 'tsx', text: `function Button() {\n  function handleClick() {\n    alert('Нажата!');\n  }\n  return <button onClick={handleClick}>Нажми</button>;\n}` },
            { type: 'callout', variant: 'warning', text: '<code>onClick={handleClick}</code> — передаёт функцию. <code>onClick={handleClick()}</code> — вызывает сразу при рендере!' },
            { type: 'paragraph', text: 'Обработчики можно <strong>передавать через props</strong> дочерним компонентам. Событие «всплывает» вверх по дереву — <code>e.stopPropagation()</code> останавливает всплытие.' },
        ],
        takeaways: [
            '<strong>onClick={fn}</strong> — передайте функцию, не вызов.',
            'Обработчики определяются <strong>внутри</strong> компонента.',
            'Можно <strong>передавать</strong> обработчики через props.',
            '<strong>e.stopPropagation()</strong> — остановить всплытие.',
            '<strong>e.preventDefault()</strong> — отменить действие браузера.',
        ],
        mistakes: [
            '<code>onClick={handleClick()}</code> — вызывает при рендере.',
            'Забыли stopPropagation — обработчик родителя тоже сработает.',
        ],
        quizId: 'quiz-events', conceptTags: ['events'],
        sourceUrl: 'https://ru.react.dev/learn/responding-to-events',
    },

    'block-state': {
        id: 'block-state', moduleId: 'adding-interactivity',
        title: 'State: память компонента',
        content: [
            { type: 'paragraph', text: '<strong>useState</strong> — хук, который даёт компоненту «память». Локальные переменные не сохраняются между рендерами и не вызывают перерисовку.' },
            { type: 'codeSnippet', language: 'tsx', text: `import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Счётчик: {count}\n    </button>\n  );\n}` },
            {
                type: 'list', items: [
                    '<strong>useState(initialValue)</strong> возвращает <code>[значение, setter]</code>.',
                    'Вызов setter <strong>запускает</strong> перерендер.',
                    'State <strong>привязан к позиции</strong> компонента в дереве.',
                    'Хуки вызываются <strong>только на верхнем уровне</strong> — не в условиях и циклах.',
                ]
            },
        ],
        takeaways: [
            '<strong>useState</strong> — хук для хранения данных между рендерами.',
            'Setter <strong>запускает перерендер</strong>.',
            'Хуки — <strong>только на верхнем уровне</strong>, не в if/for.',
            'Можно использовать <strong>несколько</strong> useState в одном компоненте.',
        ],
        mistakes: [
            'Обычная переменная вместо state — не вызывает перерендер.',
            'useState в условии или цикле — нарушает порядок вызовов.',
        ],
        quizId: 'quiz-state', conceptTags: ['state'],
        sourceUrl: 'https://ru.react.dev/learn/state-a-components-memory',
    },

    'block-render-commit': {
        id: 'block-render-commit', moduleId: 'adding-interactivity',
        title: 'Рендер и коммит',
        content: [
            { type: 'paragraph', text: 'React обновляет UI в <strong>три фазы</strong>: триггер (setState или первый рендер), рендер (вызов компонента), коммит (обновление DOM).' },
            {
                type: 'list', items: [
                    '<strong>Триггер</strong>: setState или монтирование.',
                    '<strong>Рендер</strong>: React вызывает компонент (и вложенные).',
                    '<strong>Коммит</strong>: React обновляет только изменённые DOM-узлы.',
                ]
            },
            { type: 'callout', variant: 'note', text: 'React <strong>не трогает DOM</strong>, если результат рендера не изменился. Это делает React быстрым.' },
        ],
        takeaways: [
            '<strong>Три фазы</strong>: триггер → рендер → коммит.',
            'React обновляет <strong>только изменённое</strong> в DOM.',
            '<strong>Рендер</strong> — это вызов функции компонента, не обновление экрана.',
            'Первый рендер создаёт DOM, последующие — обновляют.',
        ],
        mistakes: [
            'Путать «рендер» с «обновлением экрана» — рендер = вызов функции.',
        ],
        quizId: 'quiz-render-commit', conceptTags: ['render_commit'],
        sourceUrl: 'https://ru.react.dev/learn/render-and-commit',
    },

    'block-state-snapshot': {
        id: 'block-state-snapshot', moduleId: 'adding-interactivity',
        title: 'State как снимок',
        content: [
            { type: 'paragraph', text: 'Каждый рендер «видит» свой <strong>снимок</strong> state. Вызов setState не меняет текущую переменную — он запускает <strong>новый рендер</strong> с новым значением.' },
            { type: 'codeSnippet', language: 'tsx', text: `function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => {\n      setCount(count + 1);\n      setCount(count + 1);\n      // count по-прежнему 0 в этом рендере!\n      // Результат: 1, а не 2\n    }}>+</button>\n  );\n}` },
            { type: 'callout', variant: 'warning', text: 'setState не «обновляет переменную». Он просит React перерисовать с новым значением. Текущий рендер всегда видит «старый» state.' },
        ],
        takeaways: [
            'State — <strong>снимок</strong> на момент рендера.',
            'setState <strong>не мутирует</strong> текущую переменную.',
            'Несколько setState с одним значением <strong>не суммируются</strong>.',
            'Для серийных обновлений используйте <strong>функцию-апдейтер</strong>.',
        ],
        mistakes: [
            'Ожидать изменения state сразу после setState.',
            'Несколько одинаковых setCount(count+1) вместо setCount(c => c+1).',
        ],
        quizId: 'quiz-state-snapshot', conceptTags: ['state_snapshot'],
        sourceUrl: 'https://ru.react.dev/learn/state-as-a-snapshot',
    },

    'block-state-queue': {
        id: 'block-state-queue', moduleId: 'adding-interactivity',
        title: 'Очередь обновлений state',
        content: [
            { type: 'paragraph', text: 'React <strong>группирует</strong> обновления state (batching). Чтобы применить несколько обновлений последовательно, используйте <strong>функцию-апдейтер</strong>.' },
            { type: 'codeSnippet', language: 'tsx', text: `// ❌ Не работает: count = 0 → 1\nsetCount(count + 1);\nsetCount(count + 1);\n\n// ✅ Работает: count = 0 → 1 → 2\nsetCount(c => c + 1);\nsetCount(c => c + 1);` },
            { type: 'paragraph', text: 'Функция-апдейтер <code>c => c + 1</code> получает <strong>предыдущий</strong> результат из очереди, а не текущий state.' },
        ],
        takeaways: [
            'React <strong>группирует</strong> setState (batching).',
            '<strong>Функция-апдейтер</strong> <code>prev => next</code> для серийных обновлений.',
            'Апдейтер получает <strong>результат предыдущего</strong> в очереди.',
            'Batching применяется к <strong>одному обработчику</strong>.',
        ],
        mistakes: [
            '<code>setCount(count + 1)</code> несколько раз — считает от одного снимка.',
        ],
        quizId: 'quiz-state-queue', conceptTags: ['state_queue'],
        sourceUrl: 'https://ru.react.dev/learn/queueing-a-series-of-state-updates',
    },

    'block-update-objects': {
        id: 'block-update-objects', moduleId: 'adding-interactivity',
        title: 'Обновление объектов в state',
        content: [
            { type: 'paragraph', text: 'State с объектами нельзя <strong>мутировать</strong>. Создавайте <strong>новый объект</strong> через spread-оператор.' },
            { type: 'codeSnippet', language: 'tsx', text: `// ❌ Мутация — React не увидит изменение\nperson.name = 'Ольга';\nsetPerson(person);\n\n// ✅ Новый объект\nsetPerson({ ...person, name: 'Ольга' });` },
            { type: 'paragraph', text: 'Для <strong>вложенных</strong> объектов нужно копировать каждый уровень: <code>{ ...obj, nested: { ...obj.nested, field: val } }</code>.' },
        ],
        takeaways: [
            '<strong>Не мутируйте</strong> объекты в state.',
            '<strong>Spread</strong>: <code>{ ...obj, field: value }</code>.',
            'Для вложенных — <strong>копируйте каждый уровень</strong>.',
            'Мутация не вызовет перерендер.',
        ],
        mistakes: [
            '<code>obj.field = val; setState(obj)</code> — мутация, React не перерендерит.',
            'Забыли spread для вложенного объекта.',
        ],
        quizId: 'quiz-update-objects', conceptTags: ['update_objects'],
        sourceUrl: 'https://ru.react.dev/learn/updating-objects-in-state',
    },

    'block-update-arrays': {
        id: 'block-update-arrays', moduleId: 'adding-interactivity',
        title: 'Обновление массивов в state',
        content: [
            { type: 'paragraph', text: 'Массивы в state тоже <strong>нельзя мутировать</strong>. Используйте методы, которые возвращают <strong>новый массив</strong>.' },
            {
                type: 'list', items: [
                    '<strong>Добавить</strong>: <code>[...arr, newItem]</code> или <code>[newItem, ...arr]</code>.',
                    '<strong>Удалить</strong>: <code>arr.filter(item => item.id !== id)</code>.',
                    '<strong>Изменить</strong>: <code>arr.map(item => item.id === id ? {...item, done: true} : item)</code>.',
                    '<strong>Сортировать</strong>: <code>[...arr].sort()</code> (копия, потом sort).',
                ]
            },
            { type: 'callout', variant: 'warning', text: 'push, pop, splice, sort, reverse — <strong>мутируют</strong> массив. Используйте их только на копии.' },
        ],
        takeaways: [
            '<strong>Не мутируйте</strong> массивы в state.',
            '<strong>[...arr, item]</strong> — добавление.',
            '<strong>.filter()</strong> — удаление.',
            '<strong>.map()</strong> — замена элемента.',
            'Мутирующие методы — <strong>только на копии</strong>.',
        ],
        mistakes: [
            '<code>arr.push(item)</code> — мутация, перерендера не будет.',
            '<code>arr.sort()</code> без копирования — мутация оригинала.',
        ],
        quizId: 'quiz-update-arrays', conceptTags: ['update_arrays'],
        sourceUrl: 'https://ru.react.dev/learn/updating-arrays-in-state',
    },
};
