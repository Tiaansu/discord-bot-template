import { globSync } from 'glob';
import path from 'path';

export async function FileLoader(directory: string) {
    const files = globSync(`${path.join(__dirname.split(path.sep).join('/'), `/../${directory}`).replace(/\\/g, '/')}/**/*{.ts,.js}`);
    files.forEach((file) => delete require.cache[require.resolve(file)]);
    return files;
}