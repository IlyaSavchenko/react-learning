import type { Quiz } from '../../types';

export const describingUiQuizzes: Record<string, Quiz> = {
    'quiz-components': {
        id: 'quiz-components', blockId: 'block-components', passingScorePct: 70,
        questions: [
            { id: 'comp-1', type: 'single', text: 'Что такое компонент React?', options: [{ id: 'a', text: 'CSS-класс' }, { id: 'b', text: 'Функция, возвращающая JSX' }, { id: 'c', text: 'HTML-тег' }, { id: 'd', text: 'Переменная' }], correctAnswer: 'b', explanation: 'Компонент — функция, возвращающая JSX-разметку.', conceptTag: 'components' },
            { id: 'comp-2', type: 'truefalse', text: 'Имя компонента может начинаться с маленькой буквы.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'Имя компонента всегда с заглавной буквы, иначе React считает его HTML-тегом.', conceptTag: 'components' },
            { id: 'comp-3', type: 'single', text: 'Почему нельзя определять компонент внутри другого компонента?', options: [{ id: 'a', text: 'Это синтаксическая ошибка' }, { id: 'b', text: 'Компонент пересоздаётся каждый рендер' }, { id: 'c', text: 'Нельзя передавать props' }], correctAnswer: 'b', explanation: 'Вложенное определение пересоздаёт компонент при каждом рендере, сбрасывая state.', conceptTag: 'components' },
            { id: 'comp-4', type: 'spotbug', text: 'Найдите ошибку:\nfunction card() {\n  return <div>Карточка</div>;\n}', options: [{ id: 'a', text: 'Нет export' }, { id: 'b', text: 'Имя с маленькой буквы' }, { id: 'c', text: 'Нет return' }], correctAnswer: 'b', explanation: 'card → Card. Компонент с маленькой буквы будет интерпретирован как HTML-тег.', conceptTag: 'components' },
        ],
    },

    'quiz-import-export': {
        id: 'quiz-import-export', blockId: 'block-import-export', passingScorePct: 70,
        questions: [
            { id: 'ie-1', type: 'single', text: 'Сколько default export может быть в одном файле?', options: [{ id: 'a', text: 'Сколько угодно' }, { id: 'b', text: 'Один' }, { id: 'c', text: 'Два' }], correctAnswer: 'b', explanation: 'В одном файле может быть только один default export.', conceptTag: 'import_export' },
            { id: 'ie-2', type: 'truefalse', text: 'При импорте default export имя может быть любым.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'true', explanation: 'Default export импортируется с произвольным именем.', conceptTag: 'import_export' },
            { id: 'ie-3', type: 'single', text: 'Как импортировать именованный export Button?', options: [{ id: 'a', text: 'import Button from "./Button"' }, { id: 'b', text: 'import { Button } from "./Button"' }, { id: 'c', text: 'import * as Button from "./Button"' }], correctAnswer: 'b', explanation: 'Именованный экспорт импортируется через фигурные скобки.', conceptTag: 'import_export' },
        ],
    },

    'quiz-jsx': {
        id: 'quiz-jsx', blockId: 'block-jsx', passingScorePct: 70,
        questions: [
            { id: 'jsx-1', type: 'single', text: 'Что нужно, если компонент возвращает несколько элементов?', options: [{ id: 'a', text: 'Запятая между ними' }, { id: 'b', text: 'Один корневой элемент или фрагмент' }, { id: 'c', text: 'Массив элементов' }], correctAnswer: 'b', explanation: 'JSX требует один корневой элемент или фрагмент <></>.', conceptTag: 'jsx_basics' },
            { id: 'jsx-2', type: 'truefalse', text: 'В JSX можно использовать атрибут class для CSS-классов.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'В JSX используется className, а не class.', conceptTag: 'jsx_basics' },
            { id: 'jsx-3', type: 'single', text: 'Что означает {{ color: "red" }} в JSX?', options: [{ id: 'a', text: 'Специальный синтаксис' }, { id: 'b', text: 'Объект внутри фигурных скобок' }, { id: 'c', text: 'Ошибка' }], correctAnswer: 'b', explanation: 'Двойные скобки — это объект JavaScript внутри JSX.', conceptTag: 'jsx_curly_braces' },
            { id: 'jsx-4', type: 'spotbug', text: 'Найдите ошибку:\nreturn (\n  <h1>Заголовок</h1>\n  <p>Текст</p>\n)', options: [{ id: 'a', text: 'Нет корневого элемента' }, { id: 'b', text: 'Нет точки с запятой' }, { id: 'c', text: 'Неправильные теги' }], correctAnswer: 'a', explanation: 'Два корневых элемента — нужна обёртка в <></> или <div>.', conceptTag: 'jsx_basics' },
        ],
    },

    'quiz-props': {
        id: 'quiz-props', blockId: 'block-props', passingScorePct: 70,
        questions: [
            { id: 'prop-1', type: 'single', text: 'Как передать проп name компоненту User?', options: [{ id: 'a', text: '<User name="Ольга" />' }, { id: 'b', text: '<User>name="Ольга"</User>' }, { id: 'c', text: 'User.name = "Ольга"' }], correctAnswer: 'a', explanation: 'Пропсы передаются как атрибуты JSX.', conceptTag: 'props' },
            { id: 'prop-2', type: 'truefalse', text: 'Пропсы можно изменять внутри компонента.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'Props — read-only. Для изменения используйте state.', conceptTag: 'props' },
            { id: 'prop-3', type: 'single', text: 'Какой проп содержит вложенное содержимое?', options: [{ id: 'a', text: 'content' }, { id: 'b', text: 'children' }, { id: 'c', text: 'inner' }], correctAnswer: 'b', explanation: 'children — специальный проп для содержимого между тегами.', conceptTag: 'props' },
        ],
    },

    'quiz-conditional': {
        id: 'quiz-conditional', blockId: 'block-conditional', passingScorePct: 70,
        questions: [
            { id: 'cond-1', type: 'single', text: 'Что отрендерит {0 && <Badge />}?', options: [{ id: 'a', text: 'Ничего' }, { id: 'b', text: 'Badge' }, { id: 'c', text: '0' }], correctAnswer: 'c', explanation: '0 — falsy, но React отображает числа. Результат: 0 на экране.', conceptTag: 'conditional_rendering' },
            { id: 'cond-2', type: 'single', text: 'Какой оператор показывает компонент ИЛИ ничего?', options: [{ id: 'a', text: '? :' }, { id: 'b', text: '&&' }, { id: 'c', text: '||' }], correctAnswer: 'b', explanation: '&& — показать или ничего. Тернарный — выбор из двух.', conceptTag: 'conditional_rendering' },
            { id: 'cond-3', type: 'truefalse', text: 'if/else можно использовать прямо внутри JSX.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'if — оператор, а не выражение. В JSX используйте тернарный или &&.', conceptTag: 'conditional_rendering' },
        ],
    },

    'quiz-lists': {
        id: 'quiz-lists', blockId: 'block-lists', passingScorePct: 70,
        questions: [
            { id: 'list-1', type: 'single', text: 'Какой метод используется для рендеринга массива?', options: [{ id: 'a', text: '.forEach()' }, { id: 'b', text: '.map()' }, { id: 'c', text: '.reduce()' }], correctAnswer: 'b', explanation: '.map() возвращает новый массив JSX-элементов.', conceptTag: 'lists_keys' },
            { id: 'list-2', type: 'truefalse', text: 'Индекс массива — лучший выбор для key.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'Индекс как key вызывает баги при перестановках. Используйте ID из данных.', conceptTag: 'lists_keys' },
            { id: 'list-3', type: 'single', text: 'Что происходит без key в списке?', options: [{ id: 'a', text: 'Ошибка компиляции' }, { id: 'b', text: 'Предупреждение + неэффективный DOM' }, { id: 'c', text: 'Ничего' }], correctAnswer: 'b', explanation: 'React показывает предупреждение и может неверно обновлять DOM.', conceptTag: 'lists_keys' },
        ],
    },

    'quiz-pure': {
        id: 'quiz-pure', blockId: 'block-pure', passingScorePct: 70,
        questions: [
            { id: 'pure-1', type: 'single', text: 'Что означает «чистый компонент»?', options: [{ id: 'a', text: 'Не использует CSS' }, { id: 'b', text: 'Возвращает одинаковый JSX для одинаковых props' }, { id: 'c', text: 'Не имеет state' }], correctAnswer: 'b', explanation: 'Чистый = детерминированный: одни props → одинаковый результат.', conceptTag: 'pure_components' },
            { id: 'pure-2', type: 'truefalse', text: 'Побочные эффекты допустимы при рендеринге компонента.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'При рендеринге нельзя вызывать побочные эффекты. Используйте обработчики или useEffect.', conceptTag: 'pure_components' },
            { id: 'pure-3', type: 'spotbug', text: 'let count = 0;\nfunction Counter() {\n  count++;\n  return <p>{count}</p>;\n}', options: [{ id: 'a', text: 'Нет return' }, { id: 'b', text: 'Мутация внешней переменной при рендере' }, { id: 'c', text: 'Нет props' }], correctAnswer: 'b', explanation: 'Изменение внешней переменной count нарушает чистоту.', conceptTag: 'pure_components' },
        ],
    },

    'quiz-ui-tree': {
        id: 'quiz-ui-tree', blockId: 'block-ui-tree', passingScorePct: 70,
        questions: [
            { id: 'tree-1', type: 'single', text: 'Как данные передаются в дереве React?', options: [{ id: 'a', text: 'Снизу вверх' }, { id: 'b', text: 'Сверху вниз через props' }, { id: 'c', text: 'Горизонтально' }], correctAnswer: 'b', explanation: 'Данные в React текут сверху вниз через props.', conceptTag: 'ui_tree' },
            { id: 'tree-2', type: 'truefalse', text: 'Рендер-дерево и дерево импортов модулей — одно и то же.', options: [{ id: 'true', text: 'Правда' }, { id: 'false', text: 'Ложь' }], correctAnswer: 'false', explanation: 'Это разные деревья. Рендер-дерево — компоненты в UI, дерево модулей — файловые зависимости.', conceptTag: 'ui_tree' },
            { id: 'tree-3', type: 'single', text: 'Какой компонент обычно является корнем дерева?', options: [{ id: 'a', text: 'index.html' }, { id: 'b', text: 'App' }, { id: 'c', text: 'main.tsx' }], correctAnswer: 'b', explanation: 'App — обычно корневой компонент дерева.', conceptTag: 'ui_tree' },
        ],
    },
};
