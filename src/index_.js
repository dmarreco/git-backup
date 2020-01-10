import * as log from './lib/log';
import * as dotenv from 'dotenv';
import * as Bitbucket from './service/bitbucket.service';

dotenv.config();

(async function () {
    try {
        const repos = await Bitbucket.listRepositoriesData();

        await Promise.all(repos.map(async repo => {
            return Bitbucket.clone(repo);
        }));
    } catch (e) {
        log.error('Error executing script', {}, e)
    }
})();