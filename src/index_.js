import * as log from './lib/log';
import * as dotenv from 'dotenv';
import listRepositories from './tasks/list-repositories';
import backupRepository from './tasks/backup-repository';

dotenv.config();

(async function () {
    try {
        const repos = [(await listRepositories())[0]];
        await Promise.all(repos.map(async repo => {
            return backupRepository(repo);
        }));
    } catch (e) {
        log.error('Error executing script', {}, e)
    }
})();