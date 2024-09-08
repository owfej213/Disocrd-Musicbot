import { GuildQueueEvent } from 'discord-player';

export const data = {
    name: GuildQueueEvent.Error,
    type: 'player',
};

export function execute(queue, error) {
    console.log('-----DISCORD-PLAYER ERROR-----\n' + error);

    queue.metadata.channel.send(`:x: 發生錯誤`);
}
