import type { Quiz } from '../../types';

export const escapeHatchesQuizzes: Record<string, Quiz> = {
    'quiz-refs': {
        id: 'quiz-refs', blockId: 'block-refs', passingScorePct: 70,
        questions: [
            { id: 'ref-1', type: 'single', text: 'Чем useRef отличается от useState?', options: [{ id: 'a', text: 'ref быстрее' }, { id: 'b', text: 'Изменение ref.current не вызывает перерендер' }, { id: 'c', text: 'ref хранит только числа' }], correctAnswer: 'b', explanation: 'useRef не вызывает перерендер при изменении current, useState — вызывает.', conceptTag: 'refs' },
            { id: 'ref-2', type: 'truefalse', text: 'ref.current можно читать и писать при рендере.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'Чтение/запись ref.current при рендере нарушает предсказуемость. Используйте в обработчиках/эффектах.', conceptTag: 'refs' },
            { id: 'ref-3', type: 'single', text: 'Для чего подходит useRef?', options: [{ id: 'a', text: 'Хранение отображаемых данных' }, { id: 'b', text: 'Таймеры, DOM-элементы, предыдущие значения' }, { id: 'c', text: 'Стилизация' }], correctAnswer: 'b', explanation: 'useRef идеален для значений, которые не влияют на рендеринг.', conceptTag: 'refs' },
        ],
    },
    'quiz-dom-refs': {
        id: 'quiz-dom-refs', blockId: 'block-dom-refs', passingScorePct: 70,
        questions: [
            { id: 'dr-1', type: 'single', text: 'Как получить DOM-узел элемента?', options: [{ id: 'a', text: 'document.getElementById' }, { id: 'b', text: 'ref={myRef}, затем myRef.current' }, { id: 'c', text: 'props.dom' }], correctAnswer: 'b', explanation: 'React привязывает DOM-узел к ref через атрибут ref.', conceptTag: 'dom_refs' },
            { id: 'dr-2', type: 'truefalse', text: 'Через ref можно безопасно удалять DOM-дочерние элементы, управляемые React.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'Модификация React-управляемого DOM через ref приводит к конфликтам.', conceptTag: 'dom_refs' },
            { id: 'dr-3', type: 'multi', text: 'Для чего используют DOM-рефы? (выберите все)', options: [{ id: 'a', text: 'focus()' }, { id: 'b', text: 'scrollIntoView()' }, { id: 'c', text: 'Управление state' }, { id: 'd', text: 'getBoundingClientRect()' }], correctAnswer: ['a', 'b', 'd'], explanation: 'DOM-рефы для императивных операций с DOM: фокус, скролл, замеры.', conceptTag: 'dom_refs' },
        ],
    },
    'quiz-effects': {
        id: 'quiz-effects', blockId: 'block-effects', passingScorePct: 70,
        questions: [
            { id: 'eff-1', type: 'single', text: 'Когда запускается useEffect с пустым массивом []?', options: [{ id: 'a', text: 'Каждый рендер' }, { id: 'b', text: 'Только после монтирования' }, { id: 'c', text: 'Никогда' }], correctAnswer: 'b', explanation: 'Пустой массив зависимостей = эффект запускается один раз после монтирования.', conceptTag: 'effects' },
            { id: 'eff-2', type: 'single', text: 'Зачем нужна функция очистки в useEffect?', options: [{ id: 'a', text: 'Для красоты кода' }, { id: 'b', text: 'Для отмены подписок и таймеров' }, { id: 'c', text: 'Для обработки ошибок' }], correctAnswer: 'b', explanation: 'Очистка предотвращает утечки: отписывается от событий, очищает таймеры.', conceptTag: 'effects' },
            { id: 'eff-3', type: 'truefalse', text: 'В Strict Mode useEffect запускается один раз при разработке.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'В Strict Mode React запускает эффект дважды для выявления проблем с очисткой.', conceptTag: 'effects' },
        ],
    },
    'quiz-no-effect': {
        id: 'quiz-no-effect', blockId: 'block-no-effect', passingScorePct: 70,
        questions: [
            { id: 'ne-1', type: 'single', text: 'Нужен ли useEffect для фильтрации списка при рендере?', options: [{ id: 'a', text: 'Да, всегда' }, { id: 'b', text: 'Нет, вычислите прямо в теле компонента' }, { id: 'c', text: 'Зависит от размера' }], correctAnswer: 'b', explanation: 'Трансформация данных — прямо в теле компонента или useMemo, не useEffect.', conceptTag: 'no_effect' },
            { id: 'ne-2', type: 'spotbug', text: 'useEffect(() => {\n  setFiltered(items.filter(i => i.active));\n}, [items]);', options: [{ id: 'a', text: 'Нет очистки' }, { id: 'b', text: 'useEffect не нужен — вычислите при рендере' }, { id: 'c', text: 'Неправильные зависимости' }], correctAnswer: 'b', explanation: 'Антипаттерн: useEffect + setState для трансформации. Используйте const filtered = items.filter(...).', conceptTag: 'no_effect' },
            { id: 'ne-3', type: 'truefalse', text: 'Fetch при нажатии кнопки должен быть в useEffect.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'Действие по клику — в обработчике onClick, не в useEffect.', conceptTag: 'no_effect' },
        ],
    },
    'quiz-effect-lifecycle': {
        id: 'quiz-effect-lifecycle', blockId: 'block-effect-lifecycle', passingScorePct: 70,
        questions: [
            { id: 'elc-1', type: 'single', text: 'Как думать об эффектах?', options: [{ id: 'a', text: 'Как о componentDidMount/Unmount' }, { id: 'b', text: 'Как о процессе синхронизации (start/stop)' }, { id: 'c', text: 'Как о таймерах' }], correctAnswer: 'b', explanation: 'Эффекты — это процессы синхронизации с внешней системой.', conceptTag: 'effect_lifecycle' },
            { id: 'elc-2', type: 'truefalse', text: 'Очистка вызывается только при размонтировании.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'Очистка вызывается и при перезапуске (смена зависимостей), и при размонтировании.', conceptTag: 'effect_lifecycle' },
            { id: 'elc-3', type: 'single', text: 'Что является зависимостью эффекта?', options: [{ id: 'a', text: 'Любая переменная' }, { id: 'b', text: 'Реактивные значения (props, state)' }, { id: 'c', text: 'Только state' }], correctAnswer: 'b', explanation: 'Зависимости — реактивные значения: props, state и вычисляемые из них.', conceptTag: 'effect_lifecycle' },
        ],
    },
    'quiz-effect-events': {
        id: 'quiz-effect-events', blockId: 'block-effect-events', passingScorePct: 70,
        questions: [
            { id: 'ee-1', type: 'single', text: 'Fetch при нажатии кнопки — это...', options: [{ id: 'a', text: 'Эффект' }, { id: 'b', text: 'Обработчик события' }, { id: 'c', text: 'Контекст' }], correctAnswer: 'b', explanation: 'Реакция на действие пользователя — обработчик события.', conceptTag: 'effect_events' },
            { id: 'ee-2', type: 'single', text: 'Подписка на WebSocket при отображении компонента — это...', options: [{ id: 'a', text: 'Обработчик' }, { id: 'b', text: 'Эффект' }, { id: 'c', text: 'State' }], correctAnswer: 'b', explanation: 'Синхронизация с внешней системой при отображении — useEffect.', conceptTag: 'effect_events' },
            { id: 'ee-3', type: 'truefalse', text: 'Логика в обработчике событий реактивна.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'Обработчик запускается по действию пользователя, не реагируя на изменения state.', conceptTag: 'effect_events' },
        ],
    },
    'quiz-effect-deps': {
        id: 'quiz-effect-deps', blockId: 'block-effect-deps', passingScorePct: 70,
        questions: [
            { id: 'ed-1', type: 'single', text: 'Почему объект в зависимостях вызывает бесконечные перезапуски?', options: [{ id: 'a', text: 'Объекты медленные' }, { id: 'b', text: 'Объект пересоздаётся каждый рендер (новая ссылка)' }, { id: 'c', text: 'Объекты нельзя сравнивать' }], correctAnswer: 'b', explanation: 'Каждый рендер создаёт новый объект → React видит изменение → перезапуск.', conceptTag: 'effect_deps' },
            { id: 'ed-2', type: 'truefalse', text: 'Допустимо подавлять линтер зависимостей через eslint-disable.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'Подавление скрывает баги. Исправьте причину: вынесите объект, используйте апдейтер.', conceptTag: 'effect_deps' },
            { id: 'ed-3', type: 'single', text: 'Как убрать state из зависимостей эффекта?', options: [{ id: 'a', text: 'Удалить из массива' }, { id: 'b', text: 'Использовать функцию-апдейтер setState(c => c+1)' }, { id: 'c', text: 'Обернуть в useRef' }], correctAnswer: 'b', explanation: 'Функция-апдейтер не зависит от текущего значения state.', conceptTag: 'effect_deps' },
        ],
    },
    'quiz-custom-hooks': {
        id: 'quiz-custom-hooks', blockId: 'block-custom-hooks', passingScorePct: 70,
        questions: [
            { id: 'ch-1', type: 'single', text: 'С чего должно начинаться имя кастомного хука?', options: [{ id: 'a', text: 'hook' }, { id: 'b', text: 'use' }, { id: 'c', text: 'custom' }], correctAnswer: 'b', explanation: 'Конвенция: имя кастомного хука начинается с use (useWindowWidth, useAuth).', conceptTag: 'custom_hooks' },
            { id: 'ch-2', type: 'truefalse', text: 'Два компонента, вызывающие один кастомный хук, разделяют state.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'Каждый вызов хука имеет изолированный state.', conceptTag: 'custom_hooks' },
            { id: 'ch-3', type: 'single', text: 'Что можно делать внутри кастомного хука?', options: [{ id: 'a', text: 'Только useState' }, { id: 'b', text: 'Любые хуки' }, { id: 'c', text: 'Только чистые функции' }], correctAnswer: 'b', explanation: 'Кастомный хук может использовать любые хуки: useState, useEffect, useRef и другие кастомные.', conceptTag: 'custom_hooks' },
        ],
    },
};
