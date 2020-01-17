import Bitbucket from 'bitbucket';
import Git from 'simple-git/promise';
import * as log from '../lib/log';

const MAX_REPOS = 100;
const TIMEOUT = 100000;
const TMP_DIR = 'tmp';

export async function listRepositoriesData(apiUrl, login, password, username) {
    const bitbucket = new Bitbucket({
        baseUrl: apiUrl,
        headers: {},
        options: {
            timeout: TIMEOUT
        }
    });

    bitbucket.authenticate({
        type: 'basic',
        username: login,
        password: password
    });

    log.info('Retrieving repository list');

    const result = await bitbucket.repositories.list({
        username,
        pagelen: MAX_REPOS
    });

    if(result.data.next) {
        throw new Error(`The bitbucket client supports a maximum of ${MAX_REPOS} repositories but the given account contains a total of ${result.data} repositories`);
    }

    return result.data.values;
}

export async function clone(name, url) {
    log.info(`Cloning repository`, {name, url});
    const outPath = `${TMP_DIR}/${name}`;
    await Git().clone(url, outPath);
    return outPath;
}