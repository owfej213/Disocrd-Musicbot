import { nowplaying } from '../shared/np.js';

export const data = {
    id: 'np',
    category: 'music',
    queueOnly: true,
};

export function execute(interaction, queue) {
    nowplaying(interaction, queue);
}
