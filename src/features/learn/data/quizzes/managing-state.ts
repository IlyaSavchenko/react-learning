import type { Quiz } from '../../types';

export const managingStateQuizzes: Record<string, Quiz> = {
    'quiz-state-input': {
        id: 'quiz-state-input', blockId: 'block-state-input', passingScorePct: 70,
        questions: [
            { id: 'si-1', type: 'single', text: 'Как описывать UI в React?', options: [{ id: 'a', text: 'Императивно через DOM' }, { id: 'b', text: 'Декларативно через состояния' }, { id: 'c', text: 'Через CSS-анимации' }], correctAnswer: 'b', explanation: 'React использует декларативный подход: описываете визуальные состояния через state.', conceptTag: 'state_input' },
            { id: 'si-2', type: 'truefalse', text: 'Для моделирования состояний формы удобно использовать union-типы.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'true', explanation: 'Union-типы (typing | submitting | success) чётко моделируют все состояния.', conceptTag: 'state_input' },
            { id: 'si-3', type: 'single', text: 'Что вызывает переходы между визуальными состояниями?', options: [{ id: 'a', text: 'CSS-переходы' }, { id: 'b', text: 'Действия пользователя и ответы сервера' }, { id: 'c', text: 'Таймеры' }], correctAnswer: 'b', explanation: 'Переходы вызываются взаимодействиями и внешними событиями, которые обновляют state.', conceptTag: 'state_input' },
        ],
    },
    'quiz-state-structure': {
        id: 'quiz-state-structure', blockId: 'block-state-structure', passingScorePct: 70,
        questions: [
            { id: 'ss2-1', type: 'single', text: 'Что лучше: isSending + isSent или status?', options: [{ id: 'a', text: 'Два boolean' }, { id: 'b', text: 'Один union-тип status' }], correctAnswer: 'b', explanation: 'Два boolean могут быть одновременно true — невалидное состояние. Union исключает противоречия.', conceptTag: 'state_structure' },
            { id: 'ss2-2', type: 'truefalse', text: 'Если fullName вычисляется из firstName + lastName, его стоит хранить в state.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'Дублирование: fullName можно вычислить при рендере.', conceptTag: 'state_structure' },
            { id: 'ss2-3', type: 'single', text: 'Какая структура state предпочтительнее?', options: [{ id: 'a', text: 'Глубоко вложенная' }, { id: 'b', text: 'Плоская' }, { id: 'c', text: 'Не имеет значения' }], correctAnswer: 'b', explanation: 'Плоская структура проще обновлять и понимать.', conceptTag: 'state_structure' },
        ],
    },
    'quiz-lifting-state': {
        id: 'quiz-lifting-state', blockId: 'block-lifting-state', passingScorePct: 70,
        questions: [
            { id: 'ls-1', type: 'single', text: 'Куда поднимать state для синхронизации двух компонентов?', options: [{ id: 'a', text: 'В глобальную переменную' }, { id: 'b', text: 'В ближайшего общего родителя' }, { id: 'c', text: 'В Redux' }], correctAnswer: 'b', explanation: 'Общее состояние поднимается в ближайшего общего родителя.', conceptTag: 'lifting_state' },
            { id: 'ls-2', type: 'truefalse', text: 'Контролируемый компонент управляется через props (value + onChange).', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'true', explanation: 'Контролируемый компонент получает значение и обработчик через props.', conceptTag: 'lifting_state' },
            { id: 'ls-3', type: 'single', text: 'Что передаёт родитель дочернему при подъёме state?', options: [{ id: 'a', text: 'Только state' }, { id: 'b', text: 'value и onChange' }, { id: 'c', text: 'Только setter' }], correctAnswer: 'b', explanation: 'Родитель передаёт и текущее значение, и функцию для его обновления.', conceptTag: 'lifting_state' },
        ],
    },
    'quiz-preserving-state': {
        id: 'quiz-preserving-state', blockId: 'block-preserving-state', passingScorePct: 70,
        questions: [
            { id: 'ps-1', type: 'single', text: 'Когда React сохраняет state компонента?', options: [{ id: 'a', text: 'Всегда' }, { id: 'b', text: 'Пока компонент на той же позиции в дереве' }, { id: 'c', text: 'Только при одинаковых props' }], correctAnswer: 'b', explanation: 'State привязан к позиции в рендер-дереве.', conceptTag: 'preserving_state' },
            { id: 'ps-2', type: 'single', text: 'Как сбросить state компонента?', options: [{ id: 'a', text: 'setState(null)' }, { id: 'b', text: 'Изменить key' }, { id: 'c', text: 'Удалить props' }], correctAnswer: 'b', explanation: 'Новый key = новый экземпляр компонента с пустым state.', conceptTag: 'preserving_state' },
            { id: 'ps-3', type: 'truefalse', text: 'key работает только в списках (.map).', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'key работает на любом компоненте — это механизм идентификации.', conceptTag: 'preserving_state' },
        ],
    },
    'quiz-reducer': {
        id: 'quiz-reducer', blockId: 'block-reducer', passingScorePct: 70,
        questions: [
            { id: 'rd-1', type: 'single', text: 'Что принимает reducer?', options: [{ id: 'a', text: 'props и state' }, { id: 'b', text: 'state и action' }, { id: 'c', text: 'event и state' }], correctAnswer: 'b', explanation: 'Reducer — чистая функция (state, action) => newState.', conceptTag: 'reducer' },
            { id: 'rd-2', type: 'truefalse', text: 'Reducer должен быть чистой функцией.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'true', explanation: 'Reducer не должен мутировать state или делать побочные эффекты.', conceptTag: 'reducer' },
            { id: 'rd-3', type: 'single', text: 'Как обновить state через reducer?', options: [{ id: 'a', text: 'setState(newValue)' }, { id: 'b', text: 'dispatch(action)' }, { id: 'c', text: 'reducer(newState)' }], correctAnswer: 'b', explanation: 'dispatch отправляет action в reducer, который вычисляет новый state.', conceptTag: 'reducer' },
        ],
    },
    'quiz-context': {
        id: 'quiz-context', blockId: 'block-context', passingScorePct: 70,
        questions: [
            { id: 'ctx-1', type: 'single', text: 'Для чего нужен Context?', options: [{ id: 'a', text: 'Управление стилями' }, { id: 'b', text: 'Передача данных без prop drilling' }, { id: 'c', text: 'Маршрутизация' }], correctAnswer: 'b', explanation: 'Context позволяет передавать данные вглубь дерева минуя промежуточные компоненты.', conceptTag: 'context' },
            { id: 'ctx-2', type: 'single', text: 'Что будет без Provider?', options: [{ id: 'a', text: 'Ошибка' }, { id: 'b', text: 'Компонент получит defaultValue' }, { id: 'c', text: 'Пустая строка' }], correctAnswer: 'b', explanation: 'Без Provider useContext вернёт значение из createContext(defaultValue).', conceptTag: 'context' },
            { id: 'ctx-3', type: 'truefalse', text: 'Context подходит для всех данных приложения.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'Context для глобальных данных (тема, локаль). Для остального используйте props.', conceptTag: 'context' },
        ],
    },
    'quiz-reducer-context': {
        id: 'quiz-reducer-context', blockId: 'block-reducer-context', passingScorePct: 70,
        questions: [
            { id: 'rctx-1', type: 'single', text: 'Сколько контекстов рекомендуется при Reducer + Context?', options: [{ id: 'a', text: 'Один' }, { id: 'b', text: 'Два (state + dispatch)' }, { id: 'c', text: 'Три' }], correctAnswer: 'b', explanation: 'Разделение state и dispatch предотвращает лишние рендеры.', conceptTag: 'reducer_context' },
            { id: 'rctx-2', type: 'truefalse', text: 'Reducer + Context может заменить Redux для простых случаев.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'true', explanation: 'Для простого глобального состояния Reducer + Context достаточно.', conceptTag: 'reducer_context' },
            { id: 'rctx-3', type: 'single', text: 'Почему разделять state и dispatch контексты?', options: [{ id: 'a', text: 'Для красоты кода' }, { id: 'b', text: 'Для предотвращения лишних рендеров' }, { id: 'c', text: 'Для типобезопасности' }], correctAnswer: 'b', explanation: 'Компоненты, которые только dispatch-ат, не перерендериваются при изменении state.', conceptTag: 'reducer_context' },
        ],
    },
};
