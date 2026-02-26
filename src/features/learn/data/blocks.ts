import type { Block } from '../types';
import { describingUiBlocks } from './blocks/describing-ui';
import { interactivityBlocks } from './blocks/adding-interactivity';
import { managingStateBlocks } from './blocks/managing-state';
import { escapeHatchesBlocks } from './blocks/escape-hatches';

const blocksMap: Record<string, Block> = {
    ...describingUiBlocks,
    ...interactivityBlocks,
    ...managingStateBlocks,
    ...escapeHatchesBlocks,
};

export function getBlockById(id: string): Block | undefined {
    return blocksMap[id];
}

export function getAllBlocks(): Block[] {
    return Object.values(blocksMap);
}
