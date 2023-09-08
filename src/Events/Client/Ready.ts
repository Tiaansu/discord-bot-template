import { Client, Event } from '@/Structures';
import { Logger } from '@/Utils';
import { ActivityType, Events } from 'discord.js';
import ms from 'ms';

export default new Event(Events.ClientReady, async (client: Client) => {
    if (client.isReady()) {
        function setBotPresence() {
            client.user?.setPresence({
                afk: true,
                status: 'idle',
                activities: [
                    {
                        name: 'Games',
                        type: ActivityType.Watching
                    }
                ]
            });
        }

        setBotPresence();

        setInterval(() => setBotPresence(), ms('15s'));

        Logger.info(`${client.user.tag} is now online.`);
    }
});