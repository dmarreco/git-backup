import zipFolder from 'zip-folder';
import fs from 'fs';
import * as log from './log';

/**
 * Recursively moves all files in a folder structure to a compressed zip file
 * 
 * @param {String} folder The input folder path
 * @returns The path to the output zip file
 */
export default async function (folder) {
    log.info('Compressing folder', { folder } );
    const target = folder + '.zip';
    const res = await new Promise((resolve, reject) => {
        zipFolder(folder, target, err => {
            if(err) {
                reject(err);
            }
            resolve(target);
        });
     });

    log.info('Deleting folder', { folder })
    return new Promise((resolve, reject) => fs.rmdir(folder, { recursive: true }, err => {
        if (err) reject('Error deleting folder');
        resolve(res);
    }));
}