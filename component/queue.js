import { replyQueue } from '../shared/queue.js';

export const data = {
    id: 'queue',
    category: 'music',
    queueOnly: true,
    validateVC: true,
};

export async function execute(interaction, queue) {
    await replyQueue(interaction, queue);
}
