import { config } from 'dotenv';
config();

import {
    REST,
    RESTPostAPIApplicationCommandsJSONBody,
    RESTPostAPIContextMenuApplicationCommandsJSONBody,
    Routes
} from 'discord.js';
import { Client, Command, ContextMenu, SubCommand, SubCommandGroup } from '@/Structures';
import { StructureImport } from '@/Interfaces';
import { FileLoader, Logger } from '@/Utils';
import chalk from 'chalk';
import path from 'path';

export async function RegisterCommands(client: Client) {
    let count = 0;

    const rest = new REST().setToken(process.env.BOT_TOKEN!);

    Logger.info('Registering commands...');

    const commands: (RESTPostAPIApplicationCommandsJSONBody | RESTPostAPIContextMenuApplicationCommandsJSONBody)[] = [];

    const files = await FileLoader('Commands');

    if (files.length !== 0) {
        for (const file of files) {
            try {
                const command = (
                    (await import(file)) as StructureImport<Command & SubCommand & SubCommandGroup>
                ).default;
    
                if (command.subCommandName) continue;
                if (command.subCommandGroupName) continue;

                commands.push(command.data.toJSON());
                count ++;

                Logger.info(`Loaded slash command ${chalk.green(command.data.name)}.`);
            } catch (error) {
                Logger.error(`Failed to import file ${chalk.red(path.basename(file))}.`);
                error instanceof Error ? Logger.trace(`\n${error.stack}`) : Logger.error(error);
            }
        }
    }

    const contextMenus = await FileLoader('Components/ContextMenus');

    if (contextMenus.length !== 0) {
        for (const file of contextMenus) {
            try {
                const contextMenu = (
                    (await import(file)) as StructureImport<ContextMenu>
                ).default;

                commands.push(contextMenu.data.toJSON());
                count ++;

                Logger.info(`Registered context menu ${chalk.green(contextMenu.data.name)}.`);
            } catch (error) {
                Logger.error(`Failed to import file ${chalk.red(path.basename(file))}.`);
                error instanceof Error ? Logger.trace(`\n${error.stack}`) : Logger.error(error);
            }
        }
    }

    if (commands.length > 0) {
        await rest.put(Routes.applicationCommands(client.user?.id!), {
            body: commands
        });

        return Logger.info(`Registered ${count} command(s).`);
    }

    return Logger.warn(`No slash or context menu command registered.`);
}