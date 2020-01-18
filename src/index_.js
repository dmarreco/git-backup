import * as log from './lib/log';
import * as dotenv from 'dotenv';
import listRepositories from './tasks/list-repositories';
import backupRepository from './tasks/backup-repository';
import { delTree } from './lib/file-system';


dotenv.config();

(async function () {
    try {
        await delTree(process.env.TMP_DIR);
        const repos = (await listRepositories());
        await Promise.all(repos.map(async repo => {
            return backupRepository(repo);
        }));
        log.info('DONE');
    } catch (e) {
        log.error('Error executing script', {}, e)
    }
})();