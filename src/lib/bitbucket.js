import Bitbucket from 'bitbucket';
import Git from 'simple-git/promise';
import * as log from '../lib/log';

const MAX_REPOS = 100;
const TIMEOUT = 100000;
const DEFAULT_API_URL = 'https://api.bitbucket.org/2.0';

export async function listRepositoriesData(apiUrl = DEFAULT_API_URL, login, password, username) {
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

export async function clone(name, url, targetFolder) {
    log.info(`Cloning repository`, {name, url});
    const outPath = `${targetFolder}/${name}`;
    await Git().clone(url, outPath);
    return outPath;
}