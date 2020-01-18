import Zip from 'node-zip';
import * as log from './log';
import { lsRecursive } from './file-system';
import fs from 'fs';


/**
 * Recursively moves all files in a folder structure to a compressed zip file
 * 
 * @param {String} folder The input folder path
 * @returns The path to the output zip file
 */
export default async function (folder) {
    log.info('Compressing folder', { folder } );

    const files = await lsRecursive(folder);

    const target = folder + '.zip';

    const zip = new Zip();

    files.map(file => {
        const content = fs.readFileSync(file);
        zip.file(file, content);
    });

    const data = zip.generate({base64:false,compression:'DEFLATE'});

    fs.writeFileSync(target, data, 'binary');

    return target;
}
