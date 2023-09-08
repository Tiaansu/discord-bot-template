import { AsciiTable3 } from 'ascii-table3';
import { Client, Command, ContextMenu, SubCommand, SubCommandGroup } from '@/Structures';
import { StructureImport } from '@/Interfaces';
import { FileLoader, Logger } from '@/Utils';
import chalk from 'chalk';
import path from 'path';

const table: AsciiTable3 = new AsciiTable3();
table.setTitle('Commands').setTitleAlignCenter();
table.setHeading('Type', 'Folder', 'Name', 'Status').setHeadingAlignCenter();
table.setStyle('unicode-round');

export async function LoadCommands(client: Client) {
    let count = 0;

    Logger.info('Loading commands...');
    
    client.commands.clear();
    client.subCommands.clear();
    client.subCommandGroups.clear();
    client.contextMenus.clear();

    const files = await FileLoader('Commands');

    if (files.length !== 0) {
        for (const file of files) {
            const filePathArr: string[] = file.split(path.sep);

            try {
                const command = (
                    (await import(file)) as StructureImport<Command & SubCommand & SubCommandGroup>
                ).default;

                if (command.subCommandName) {
                    client.subCommands.set(command.subCommandName, command);
                    continue;
                }

                if (command.subCommandGroupName) {
                    client.subCommandGroups.set(command.subCommandGroupName, command);
                    continue;
                }

                count ++;
                client.commands.set(command.data.name, command);
                table.addRow('Slash command', filePathArr.at(-2), command.data.name, chalk.green('success'));
            } catch (error) {
                Logger.error(`Failed to import file ${chalk.red(path.basename(file))}.`);
                error instanceof Error ? Logger.trace(error.stack) : Logger.error(error);
                table.addRow('Slash command', filePathArr.at(-2), filePathArr.at(-1), chalk.red('failed'));
            }
        }
    } else {
        Logger.warn('No commands found.');
    }

    const contextMenus = await FileLoader('Components/ContextMenus');

    if (contextMenus.length !== 0) {
        for (const file of contextMenus) {
            const filePathArr: string[] = file.split(path.sep);

            try {
                const contextMenu = (
                    (await import(file)) as StructureImport<ContextMenu>
                ).default;

                count ++;
                client.contextMenus.set(contextMenu.data.name, contextMenu);
                table.addRow('Context menu', filePathArr.at(-2), contextMenu.data.name, chalk.green('success'));
            } catch (error) {
                Logger.error(`Failed to import file ${path.basename(file)}.`);
                error instanceof Error ? Logger.trace(error.stack) : Logger.error(error);
                table.addRow('Context menu', filePathArr.at(-2), filePathArr.at(-1), chalk.red('failed'));
            }
        }
    } else {
        Logger.warn('No context menus found.');
    }

    if (table.rows.length > 0) {
        Logger.info(`\n${table.toString()}`);
    }

    return Logger.info(`Loaded ${count} command(s).`);
}