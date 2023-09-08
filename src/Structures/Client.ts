import {
    ActivityType,
    Client as BaseClient,
    Collection,
    ButtonInteraction,
    StringSelectMenuInteraction
} from 'discord.js';

import { botIntents as intents, botPartials as partials} from '@/Constants';
import { Logger } from '@/Utils';
import { 
    Command, 
    Component, 
    ContextMenu, 
    Modal, 
    SubCommand, 
    SubCommandGroup 
} from './';
import { LoadCommands, LoadComponents, LoadEvents, RegisterCommands } from '@/Handlers';

export class Client<
    Ready extends boolean = boolean
> extends BaseClient {
    public commands: Collection<string, Command> = new Collection();
    public subCommands: Collection<string, SubCommand> = new Collection();
    public subCommandGroups: Collection<string, SubCommandGroup> = new Collection();
    public buttons: Collection<string, Component<ButtonInteraction>> = new Collection();
    public selectMenus: Collection<string, Component<StringSelectMenuInteraction>> = new Collection();
    public contextMenus: Collection<string, ContextMenu> = new Collection();
    public cooldowns: Collection<string, number> = new Collection();
    public modals: Collection<string, Modal> = new Collection();

    public componentPermissionHandler: Collection<string, string[]> = new Collection();

    public constructor() {
        super({
            intents,
            partials,
            presence: {
                activities: [
                    {
                        name: 'Starting up...',
                        type: ActivityType.Listening
                    }
                ]
            }
        });
    }

    public async start() {
        try {
            Logger.info('Starting the bot...');

            await LoadEvents(this);
            await LoadCommands(this);
            await LoadComponents(this);

            await RegisterCommands(this);

            await this.login(process.env.BOT_TOKEN);
        } catch (error) {
            error instanceof Error ? Logger.trace(`\n${error.stack}`) : Logger.error(error);
        }
    }
}