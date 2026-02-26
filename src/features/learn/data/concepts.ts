/**
 * Concept tag registry + recommendation templates.
 * Used to generate deterministic recommendations based on quiz weaknesses.
 */

export interface ConceptInfo {
    tag: string;
    label: string;
    hint: string;
    relatedBlockIds: string[];
    docsUrl: string;
}

export const concepts: Record<string, ConceptInfo> = {
    /* ── Module 1: Describing the UI ── */
    components: {
        tag: 'components',
        label: 'Компоненты React',
        hint: 'Компонент — это функция, возвращающая JSX. Имя всегда с большой буквы. Компоненты — строительные блоки UI.',
        relatedBlockIds: ['block-components'],
        docsUrl: 'https://ru.react.dev/learn/your-first-component',
    },
    import_export: {
        tag: 'import_export',
        label: 'Импорт и экспорт',
        hint: 'Default export — один на файл, именованный — сколько угодно. Используйте именованные экспорты для предсказуемости.',
        relatedBlockIds: ['block-import-export'],
        docsUrl: 'https://ru.react.dev/learn/importing-and-exporting-components',
    },
    jsx_basics: {
        tag: 'jsx_basics',
        label: 'Основы JSX',
        hint: 'JSX — расширение синтаксиса, похожее на HTML, но внутри JavaScript. Один корневой элемент, закрытие всех тегов, camelCase для атрибутов.',
        relatedBlockIds: ['block-jsx'],
        docsUrl: 'https://ru.react.dev/learn/writing-markup-with-jsx',
    },
    jsx_curly_braces: {
        tag: 'jsx_curly_braces',
        label: 'Фигурные скобки в JSX',
        hint: 'Фигурные скобки {} позволяют использовать JavaScript-выражения внутри JSX. {{}} — это объект внутри JSX.',
        relatedBlockIds: ['block-jsx'],
        docsUrl: 'https://ru.react.dev/learn/javascript-in-jsx-with-curly-braces',
    },
    props: {
        tag: 'props',
        label: 'Пропсы',
        hint: 'Props — аргументы компонента. Они неизменяемы. children — специальный проп для вложенного содержимого.',
        relatedBlockIds: ['block-props'],
        docsUrl: 'https://ru.react.dev/learn/passing-props-to-a-component',
    },
    conditional_rendering: {
        tag: 'conditional_rendering',
        label: 'Условный рендеринг',
        hint: 'Используйте if/else, тернарный оператор (? :) или &&. Осторожно: 0 && <X/> отрендерит 0!',
        relatedBlockIds: ['block-conditional'],
        docsUrl: 'https://ru.react.dev/learn/conditional-rendering',
    },
    lists_keys: {
        tag: 'lists_keys',
        label: 'Списки и ключи',
        hint: '.map() для рендеринга массивов. Каждому элементу нужен уникальный key из данных, не индекс.',
        relatedBlockIds: ['block-lists'],
        docsUrl: 'https://ru.react.dev/learn/rendering-lists',
    },
    pure_components: {
        tag: 'pure_components',
        label: 'Чистые компоненты',
        hint: 'Компоненты должны быть чистыми: одни и те же props → одинаковый JSX. Не изменяйте внешние переменные при рендере.',
        relatedBlockIds: ['block-pure'],
        docsUrl: 'https://ru.react.dev/learn/keeping-components-pure',
    },
    ui_tree: {
        tag: 'ui_tree',
        label: 'UI как дерево',
        hint: 'React строит дерево компонентов. Понимание дерева помогает разобраться в потоках данных и оптимизации.',
        relatedBlockIds: ['block-ui-tree'],
        docsUrl: 'https://ru.react.dev/learn/understanding-your-ui-as-a-tree',
    },

    /* ── Module 2: Adding Interactivity ── */
    events: {
        tag: 'events',
        label: 'Обработка событий',
        hint: 'Обработчики передаются как пропсы: onClick={handleClick}. Передавайте функцию, а не вызов функции.',
        relatedBlockIds: ['block-events'],
        docsUrl: 'https://ru.react.dev/learn/responding-to-events',
    },
    state: {
        tag: 'state',
        label: 'Состояние (state)',
        hint: 'useState возвращает [значение, setter]. Состояние сохраняется между рендерами. Каждый рендер видит свой «снимок» state.',
        relatedBlockIds: ['block-state', 'block-state-snapshot'],
        docsUrl: 'https://ru.react.dev/learn/state-a-components-memory',
    },
    render_commit: {
        tag: 'render_commit',
        label: 'Рендер и коммит',
        hint: 'React работает в 3 фазы: триггер → рендер → коммит (обновление DOM). React обновляет DOM только при изменениях.',
        relatedBlockIds: ['block-render-commit'],
        docsUrl: 'https://ru.react.dev/learn/render-and-commit',
    },
    state_snapshot: {
        tag: 'state_snapshot',
        label: 'State как снимок',
        hint: 'Каждый рендер «видит» свой снимок state. setState не меняет текущую переменную, а запускает новый рендер.',
        relatedBlockIds: ['block-state-snapshot'],
        docsUrl: 'https://ru.react.dev/learn/state-as-a-snapshot',
    },
    state_queue: {
        tag: 'state_queue',
        label: 'Очередь обновлений state',
        hint: 'React группирует обновления. Для серийных обновлений используйте функцию-апдейтер: setN(prev => prev + 1).',
        relatedBlockIds: ['block-state-queue'],
        docsUrl: 'https://ru.react.dev/learn/queueing-a-series-of-state-updates',
    },
    update_objects: {
        tag: 'update_objects',
        label: 'Обновление объектов в state',
        hint: 'Не мутируйте state! Создавайте новый объект через spread: { ...obj, field: value }.',
        relatedBlockIds: ['block-update-objects'],
        docsUrl: 'https://ru.react.dev/learn/updating-objects-in-state',
    },
    update_arrays: {
        tag: 'update_arrays',
        label: 'Обновление массивов в state',
        hint: 'Используйте .map(), .filter(), [...arr, newItem] вместо мутирующих методов (push, splice).',
        relatedBlockIds: ['block-update-arrays'],
        docsUrl: 'https://ru.react.dev/learn/updating-arrays-in-state',
    },

    /* ── Module 3: Managing State ── */
    state_input: {
        tag: 'state_input',
        label: 'Реакция на ввод',
        hint: 'Опишите UI декларативно через состояния, а не императивно через DOM-манипуляции.',
        relatedBlockIds: ['block-state-input'],
        docsUrl: 'https://ru.react.dev/learn/reacting-to-input-with-state',
    },
    state_structure: {
        tag: 'state_structure',
        label: 'Структура состояния',
        hint: 'Группируйте связанные данные. Избегайте дублирования. Плоская структура лучше вложенной.',
        relatedBlockIds: ['block-state-structure'],
        docsUrl: 'https://ru.react.dev/learn/choosing-the-state-structure',
    },
    lifting_state: {
        tag: 'lifting_state',
        label: 'Подъём состояния',
        hint: 'Чтобы синхронизировать компоненты, поднимите общий state в ближайшего родителя.',
        relatedBlockIds: ['block-lifting-state'],
        docsUrl: 'https://ru.react.dev/learn/sharing-state-between-components',
    },
    preserving_state: {
        tag: 'preserving_state',
        label: 'Сохранение и сброс state',
        hint: 'React сохраняет state, пока компонент на той же позиции в дереве. Разные key = сброс state.',
        relatedBlockIds: ['block-preserving-state'],
        docsUrl: 'https://ru.react.dev/learn/preserving-and-resetting-state',
    },
    reducer: {
        tag: 'reducer',
        label: 'Редюсеры (useReducer)',
        hint: 'useReducer — альтернатива useState для сложной логики. Reducer — чистая функция (state, action) => newState.',
        relatedBlockIds: ['block-reducer'],
        docsUrl: 'https://ru.react.dev/learn/extracting-state-logic-into-a-reducer',
    },
    context: {
        tag: 'context',
        label: 'Контекст (useContext)',
        hint: 'Context позволяет передавать данные вглубь дерева без прокидывания через props.',
        relatedBlockIds: ['block-context'],
        docsUrl: 'https://ru.react.dev/learn/passing-data-deeply-with-context',
    },
    reducer_context: {
        tag: 'reducer_context',
        label: 'Reducer + Context',
        hint: 'Комбинация useReducer + useContext — паттерн для масштабируемого управления состоянием.',
        relatedBlockIds: ['block-reducer-context'],
        docsUrl: 'https://ru.react.dev/learn/scaling-up-with-reducer-and-context',
    },

    /* ── Module 4: Escape Hatches ── */
    refs: {
        tag: 'refs',
        label: 'Рефы (useRef)',
        hint: 'useRef хранит значение между рендерами без вызова перерендера. Идеально для таймеров, DOM-элементов.',
        relatedBlockIds: ['block-refs', 'block-dom-refs'],
        docsUrl: 'https://ru.react.dev/learn/referencing-values-with-refs',
    },
    dom_refs: {
        tag: 'dom_refs',
        label: 'Управление DOM через рефы',
        hint: 'ref={myRef} + myRef.current даёт прямой доступ к DOM-узлу для фокуса, скролла, замеров.',
        relatedBlockIds: ['block-dom-refs'],
        docsUrl: 'https://ru.react.dev/learn/manipulating-the-dom-with-refs',
    },
    effects: {
        tag: 'effects',
        label: 'Эффекты (useEffect)',
        hint: 'useEffect синхронизирует компонент с внешней системой. Не забывайте функцию очистки.',
        relatedBlockIds: ['block-effects', 'block-no-effect'],
        docsUrl: 'https://ru.react.dev/learn/synchronizing-with-effects',
    },
    no_effect: {
        tag: 'no_effect',
        label: 'Когда эффект не нужен',
        hint: 'Не используйте useEffect для трансформации данных при рендере или для обработки событий.',
        relatedBlockIds: ['block-no-effect'],
        docsUrl: 'https://ru.react.dev/learn/you-might-not-need-an-effect',
    },
    effect_lifecycle: {
        tag: 'effect_lifecycle',
        label: 'Жизненный цикл эффектов',
        hint: 'Эффект начинает синхронизацию и останавливает её. Зависимости определяют, когда эффект перезапускается.',
        relatedBlockIds: ['block-effect-lifecycle'],
        docsUrl: 'https://ru.react.dev/learn/lifecycle-of-reactive-effects',
    },
    effect_events: {
        tag: 'effect_events',
        label: 'Отделение событий от эффектов',
        hint: 'Обработчики событий — для реакции на действия пользователя. Эффекты — для синхронизации с внешними системами.',
        relatedBlockIds: ['block-effect-events'],
        docsUrl: 'https://ru.react.dev/learn/separating-events-from-effects',
    },
    effect_deps: {
        tag: 'effect_deps',
        label: 'Удаление зависимостей эффекта',
        hint: 'Избыточные зависимости вызывают лишние перезапуски. Вынесите объекты/функции из тела компонента или используйте функцию-апдейтер.',
        relatedBlockIds: ['block-effect-deps'],
        docsUrl: 'https://ru.react.dev/learn/removing-effect-dependencies',
    },
    custom_hooks: {
        tag: 'custom_hooks',
        label: 'Кастомные хуки',
        hint: 'Кастомный хук — функция, начинающаяся с use, которая инкапсулирует логику с другими хуками.',
        relatedBlockIds: ['block-custom-hooks'],
        docsUrl: 'https://ru.react.dev/learn/reusing-logic-with-custom-hooks',
    },
};

export function getRecommendations(
    weakTags: string[],
    limit = 3
): ConceptInfo[] {
    const unique = [...new Set(weakTags)];
    return unique
        .map((tag) => concepts[tag])
        .filter(Boolean)
        .slice(0, limit);
}
