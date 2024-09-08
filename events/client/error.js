import { Events } from 'discord.js';

export const data = {
    name: Events.Error,
};

export function execute(error) {
    console.log('-----ERROR-----\n' + error);
}
