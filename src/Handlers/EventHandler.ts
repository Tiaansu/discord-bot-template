import { Client, Event } from '@/Structures';
import { FileLoader, Logger } from '@/Utils';
import { AsciiTable3 } from 'ascii-table3';
import { StructureImport } from '@/Interfaces';
import { ClientEvents } from 'discord.js';
import chalk from 'chalk';
import path from 'path';

const table: AsciiTable3 = new AsciiTable3();
table.setTitle('Events').setTitleAlignCenter();
table.setHeading('Folder', 'Name', 'Status').setHeadingAlignCenter();
table.setStyle('unicode-round');

export async function LoadEvents(client: Client): Promise<void> {
    let count = 0;

    Logger.info('Loading events...');

    const files = await FileLoader('Events');

    if (files.length === 0) {
        Logger.warn('No events found.');
        return;
    }

    for (const file of files) {
        const filePathArr: string[] = file.split(path.sep);

        try {
            const event = (
                (await import(file)) as StructureImport<Event<keyof ClientEvents>>
            ).default;
            
            // Why '@ts-ignore'? Uncomment it to see.
            // If you know how to fix it, please do make a PR for it.
            // I'll appreciate it :)
            // @ts-ignore
            client.on(event.name, event.run.bind(null, client));

            count ++;
            table.addRow(filePathArr.at(-2), event.name, chalk.green('success'));
        } catch (error) {
            Logger.error(`Failed to import file ${chalk.red(path.basename(file))}.`);
            error instanceof Error ? Logger.trace(`\n${error.stack}`) : Logger.error(error);
            table.addRow(filePathArr.at(-2), filePathArr.at(-1), chalk.red('failed'));
        }
    }

    if (table.rows.length > 0) {
        Logger.info(`\n${table.toString()}`);
    }

    return Logger.info(`Loaded ${count} event(s).`);
};