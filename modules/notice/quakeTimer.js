import cron from 'node-cron';
import quake from './quake.js';

export default async (client) => {
    cron.schedule('5 * * * *', async () => {
        try {
            quake(client);
        } catch (error) {
            console.error(error);
        }
    });
};
