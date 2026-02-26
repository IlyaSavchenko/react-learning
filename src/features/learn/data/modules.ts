import type { Module } from '../types';

export const modules: Module[] = [
    {
        id: 'describing-ui',
        title: 'Описание UI',
        description:
            'Компоненты, JSX, пропсы, условный рендеринг, списки, чистота и дерево компонентов.',
        blockIds: [
            'block-components',
            'block-import-export',
            'block-jsx',
            'block-props',
            'block-conditional',
            'block-lists',
            'block-pure',
            'block-ui-tree',
        ],
        sourceUrl: 'https://ru.react.dev/learn/describing-the-ui',
    },
    {
        id: 'adding-interactivity',
        title: 'Добавление интерактивности',
        description:
            'События, состояние, рендеринг, снимки state, обновление объектов и массивов.',
        blockIds: [
            'block-events',
            'block-state',
            'block-render-commit',
            'block-state-snapshot',
            'block-state-queue',
            'block-update-objects',
            'block-update-arrays',
        ],
        sourceUrl: 'https://ru.react.dev/learn/adding-interactivity',
    },
    {
        id: 'managing-state',
        title: 'Управление состоянием',
        description:
            'Декларативный UI, структура state, подъём состояния, редюсеры, контекст.',
        blockIds: [
            'block-state-input',
            'block-state-structure',
            'block-lifting-state',
            'block-preserving-state',
            'block-reducer',
            'block-context',
            'block-reducer-context',
        ],
        sourceUrl: 'https://ru.react.dev/learn/managing-state',
    },
    {
        id: 'escape-hatches',
        title: 'Запасные выходы',
        description:
            'Рефы, управление DOM, эффекты, кастомные хуки и когда эффект не нужен.',
        blockIds: [
            'block-refs',
            'block-dom-refs',
            'block-effects',
            'block-no-effect',
            'block-effect-lifecycle',
            'block-effect-events',
            'block-effect-deps',
            'block-custom-hooks',
        ],
        sourceUrl: 'https://ru.react.dev/learn/escape-hatches',
    },
];
