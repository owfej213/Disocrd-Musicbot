import { GuildQueueEvent } from 'discord-player';
import buttons from '../../modules/playing/buttons.js';
import embed from '../../modules/playing/embed.js';

export const data = {
    name: GuildQueueEvent.EmptyQueue,
    type: 'player',
};

export async function execute(queue) {
    try {
        const components = [...buttons(queue)].filter(Boolean);
        await queue.metadata.message?.edit({
            embeds: [embed(queue)],
            components,
        });
    } catch {
        // Ignore errors
    }
}
