import fs from 'fs';
import * as log from './log';

export function delTree(folder) {
    log.info('Deleting temporary files')
    return new Promise((resolve, reject) => 
        (fs.rmdir(folder, { recursive: true }, err => 
            (err ? reject(err) : resolve()))));

}

function ls(path) {
    return new Promise((resolve, reject) => 
        (fs.readdir(path, (err, files) => 
            (err ? reject(err) : resolve(files)))));
}

export async function lsRecursive(path) {
    if(!fs.statSync(path).isDirectory()) {
        return [path];
    }
    return (await ls(path))
        .reduce(async (acc, file) => {
            const content = await lsRecursive(`${path}/${file}`);
            return (await acc).concat(content);
        }
        , []);
}
