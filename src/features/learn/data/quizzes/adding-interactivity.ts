import type { Quiz } from '../../types';

export const interactivityQuizzes: Record<string, Quiz> = {
    'quiz-events': {
        id: 'quiz-events', blockId: 'block-events', passingScorePct: 70,
        questions: [
            { id: 'ev-1', type: 'spotbug', text: '<button onClick={handleClick()}>Click</button>', options: [{ id: 'a', text: 'Вызов функции вместо передачи' }, { id: 'b', text: 'Нет return' }, { id: 'c', text: 'Забыт type' }], correctAnswer: 'a', explanation: 'handleClick() вызывается при рендере, нужно onClick={handleClick}.', conceptTag: 'events' },
            { id: 'ev-2', type: 'single', text: 'Как остановить всплытие события?', options: [{ id: 'a', text: 'e.preventDefault()' }, { id: 'b', text: 'e.stopPropagation()' }, { id: 'c', text: 'return false' }], correctAnswer: 'b', explanation: 'stopPropagation останавливает всплытие, preventDefault отменяет действие браузера.', conceptTag: 'events' },
            { id: 'ev-3', type: 'truefalse', text: 'Обработчики событий можно передавать через props.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'true', explanation: 'Обработчики — обычные функции, передаются как любые props.', conceptTag: 'events' },
        ],
    },
    'quiz-state': {
        id: 'quiz-state', blockId: 'block-state', passingScorePct: 70,
        questions: [
            { id: 'st-1', type: 'single', text: 'Что возвращает useState(0)?', options: [{ id: 'a', text: 'Число 0' }, { id: 'b', text: '[значение, setter]' }, { id: 'c', text: 'Объект с value' }], correctAnswer: 'b', explanation: 'useState возвращает массив из двух элементов: значение и функцию обновления.', conceptTag: 'state' },
            { id: 'st-2', type: 'truefalse', text: 'useState можно вызывать внутри if.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'Хуки вызываются только на верхнем уровне компонента.', conceptTag: 'state' },
            { id: 'st-3', type: 'single', text: 'Почему обычная переменная не подходит вместо state?', options: [{ id: 'a', text: 'Она не может хранить числа' }, { id: 'b', text: 'Она не сохраняется между рендерами' }, { id: 'c', text: 'Она слишком медленная' }], correctAnswer: 'b', explanation: 'Локальные переменные сбрасываются при каждом рендере и не вызывают перерендер.', conceptTag: 'state' },
        ],
    },
    'quiz-render-commit': {
        id: 'quiz-render-commit', blockId: 'block-render-commit', passingScorePct: 70,
        questions: [
            { id: 'rc-1', type: 'single', text: 'В каком порядке происходят фазы?', options: [{ id: 'a', text: 'Коммит → Рендер → Триггер' }, { id: 'b', text: 'Триггер → Рендер → Коммит' }, { id: 'c', text: 'Рендер → Триггер → Коммит' }], correctAnswer: 'b', explanation: 'Триггер (setState) → Рендер (вызов функции) → Коммит (обновление DOM).', conceptTag: 'render_commit' },
            { id: 'rc-2', type: 'truefalse', text: 'React обновляет весь DOM при каждом рендере.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'React обновляет только изменённые DOM-узлы.', conceptTag: 'render_commit' },
            { id: 'rc-3', type: 'single', text: 'Что такое «рендер» в React?', options: [{ id: 'a', text: 'Обновление экрана' }, { id: 'b', text: 'Вызов функции компонента' }, { id: 'c', text: 'Загрузка страницы' }], correctAnswer: 'b', explanation: 'Рендер — это вызов функции компонента, а не обновление экрана.', conceptTag: 'render_commit' },
        ],
    },
    'quiz-state-snapshot': {
        id: 'quiz-state-snapshot', blockId: 'block-state-snapshot', passingScorePct: 70,
        questions: [
            { id: 'ss-1', type: 'single', text: 'count = 0. После setCount(count+1); setCount(count+1); каким будет count?', options: [{ id: 'a', text: '2' }, { id: 'b', text: '1' }, { id: 'c', text: '0' }], correctAnswer: 'b', explanation: 'Оба вызова считают от снимка count=0. Результат: 0+1=1.', conceptTag: 'state_snapshot' },
            { id: 'ss-2', type: 'truefalse', text: 'setState мгновенно обновляет переменную state.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'setState запрашивает новый рендер. Текущий рендер видит «старый» state.', conceptTag: 'state_snapshot' },
            { id: 'ss-3', type: 'single', text: 'Как выполнить серийное обновление?', options: [{ id: 'a', text: 'setCount(count+1) несколько раз' }, { id: 'b', text: 'setCount(c => c + 1)' }, { id: 'c', text: 'count += 1' }], correctAnswer: 'b', explanation: 'Функция-апдейтер получает предыдущее значение из очереди.', conceptTag: 'state_snapshot' },
        ],
    },
    'quiz-state-queue': {
        id: 'quiz-state-queue', blockId: 'block-state-queue', passingScorePct: 70,
        questions: [
            { id: 'sq-1', type: 'single', text: 'Что делает React batching?', options: [{ id: 'a', text: 'Объединяет обновления state' }, { id: 'b', text: 'Кэширует компоненты' }, { id: 'c', text: 'Сжимает JSX' }], correctAnswer: 'a', explanation: 'Batching группирует несколько setState в один рендер.', conceptTag: 'state_queue' },
            { id: 'sq-2', type: 'single', text: 'Что получает функция-апдейтер?', options: [{ id: 'a', text: 'Текущий state из рендера' }, { id: 'b', text: 'Результат предыдущего в очереди' }, { id: 'c', text: 'props' }], correctAnswer: 'b', explanation: 'Апдейтер получает результат предыдущего обновления в очереди.', conceptTag: 'state_queue' },
            { id: 'sq-3', type: 'truefalse', text: 'setCount(c => c+1); setCount(c => c+1) при count=0 даст count=2.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'true', explanation: 'Первый апдейтер: 0→1, второй: 1→2. Функции-апдейтеры работают последовательно.', conceptTag: 'state_queue' },
        ],
    },
    'quiz-update-objects': {
        id: 'quiz-update-objects', blockId: 'block-update-objects', passingScorePct: 70,
        questions: [
            { id: 'uo-1', type: 'spotbug', text: 'person.name = "Ольга";\nsetPerson(person);', options: [{ id: 'a', text: 'Мутация объекта — React не перерендерит' }, { id: 'b', text: 'Нет return' }, { id: 'c', text: 'Неправильный тип' }], correctAnswer: 'a', explanation: 'Мутация того же объекта. Нужно: setPerson({...person, name: "Ольга"}).', conceptTag: 'update_objects' },
            { id: 'uo-2', type: 'single', text: 'Как обновить поле во вложенном объекте state?', options: [{ id: 'a', text: 'obj.nested.field = val' }, { id: 'b', text: '{...obj, nested: {...obj.nested, field: val}}' }, { id: 'c', text: 'Object.assign(obj.nested, {field: val})' }], correctAnswer: 'b', explanation: 'Каждый уровень вложенности нужно копировать через spread.', conceptTag: 'update_objects' },
            { id: 'uo-3', type: 'truefalse', text: 'Spread-оператор делает глубокую копию объекта.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'Spread делает неглубокую (shallow) копию. Для вложенных нужно копировать каждый уровень.', conceptTag: 'update_objects' },
        ],
    },
    'quiz-update-arrays': {
        id: 'quiz-update-arrays', blockId: 'block-update-arrays', passingScorePct: 70,
        questions: [
            { id: 'ua-1', type: 'multi', text: 'Какие методы мутируют массив? (выберите все)', options: [{ id: 'a', text: '.push()' }, { id: 'b', text: '.filter()' }, { id: 'c', text: '.splice()' }, { id: 'd', text: '.map()' }], correctAnswer: ['a', 'c'], explanation: 'push и splice мутируют. filter и map возвращают новый массив.', conceptTag: 'update_arrays' },
            { id: 'ua-2', type: 'single', text: 'Как добавить элемент в массив-state?', options: [{ id: 'a', text: 'arr.push(item)' }, { id: 'b', text: '[...arr, item]' }, { id: 'c', text: 'arr[arr.length] = item' }], correctAnswer: 'b', explanation: 'Spread создаёт новый массив с добавленным элементом.', conceptTag: 'update_arrays' },
            { id: 'ua-3', type: 'single', text: 'Как безопасно отсортировать массив-state?', options: [{ id: 'a', text: 'arr.sort()' }, { id: 'b', text: '[...arr].sort()' }, { id: 'c', text: 'sort(arr)' }], correctAnswer: 'b', explanation: 'Сначала копия через spread, потом sort на копии.', conceptTag: 'update_arrays' },
        ],
    },
};
