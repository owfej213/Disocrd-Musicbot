import { GuildQueueEvent } from 'discord-player';
import buttons from '../../modules/playing/buttons.js';
import embed from '../../modules/playing/embed.js';

export const data = {
    name: GuildQueueEvent.PlayerStart,
    type: 'player',
};

export async function execute(queue, track) {
    try {
        const lastMessage = queue.metadata.message;
        await lastMessage?.delete();
    } catch {
        // Ignore errors
    }
    const components = [...buttons(queue)];

    const newMessage = await queue.metadata.channel.send({
        embeds: [embed(queue, track)],
        components,
    });

    queue.metadata.message = newMessage;
}
