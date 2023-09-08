import { AsciiTable3 } from 'ascii-table3';
import { FileLoader, Logger } from '@/Utils';
import { Client, Component, Modal } from '@/Structures';
import { StructureImport } from '@/Interfaces';
import { MessageComponentInteraction } from 'discord.js';
import chalk from 'chalk';
import path from 'path';

const table: AsciiTable3 = new AsciiTable3();
table.setTitle('Components').setTitleAlignCenter();
table.setHeading('Type', 'Folder', 'Name', 'Status').setHeadingAlignCenter();
table.setStyle('unicode-round');

export async function LoadComponents(client: Client) {
    let count = 0;

    Logger.info('Loading components...');

    client.buttons.clear();
    client.selectMenus.clear();
    client.modals.clear();

    const files = await FileLoader('Components');

    if (files.length === 0) {
        Logger.warn('No components found.');
        return;
    }

    for (const file of files) {
        const filePathArr: string[] = file.split(path.sep);

        try {
            const component = (
                (await import(file)) as StructureImport<Component<MessageComponentInteraction> & Modal>
            ).default;

            switch (filePathArr.at(-3)?.toLowerCase())
            {
                case 'buttons':
                    if (!component.customId) {
                        table.addRow('Button', filePathArr.at(-2), filePathArr.at(-1), `${chalk.red('failed')} - no custom id`);
                        continue;
                    }

                    client.buttons.set(component.customId, component);
                    table.addRow('Button', filePathArr.at(-2), component.customId, chalk.green('success'));
                    count ++;
                    break;

                    case 'selectmenus':
                        if (!component.customId) {
                            table.addRow('Select Menu', filePathArr.at(-2), filePathArr.at(-1), `${chalk.red('failed')} - no custom id`);
                        }
    
                        client.selectMenus.set(component.customId, component);
                        table.addRow('Select Menu', filePathArr.at(-2), component.customId, chalk.green('success'));
                        count ++;
                        break;
    
                    case 'modal':
                        if (!component.customId) {
                            table.addRow('Modal', filePathArr.at(-2), filePathArr.at(-1), `${chalk.red('failed')} - no custom id`);
                        }
    
                        client.modals.set(component.customId, component);
                        table.addRow('Modal', filePathArr.at(-2), component.customId, chalk.green('success'));
                        count ++;
                        break;
    
                    default:
                        break;
            }
        } catch (error) {
            Logger.error(`Failed to import file ${chalk.red(path.basename(file))}.`);
            error instanceof Error ? Logger.trace(`\n${error.stack}`) : Logger.error(error);
            table.addRow(filePathArr.at(-3), filePathArr.at(-2), filePathArr.at(-1), chalk.red('failed'));
        }
    }

    if (table.rows.length > 0) {
        Logger.info(`\n${table.toString()}`);
    }

    return Logger.info(`Loaded ${count} component(s).`);
}