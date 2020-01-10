import Bitbucket from 'bitbucket';
import Git from 'simple-git/promise';
import * as log from '../lib/log';

const MAX_REPOS = 100;

export async function listRepositoriesData() {
    const bitbucket = new Bitbucket({
        baseUrl: process.env.BITBUCKET_API_BASE_URL,
        headers: {},
        options: {
            timeout: process.env.BITBUCKET_API_TIMEOUT
        }
    });

    bitbucket.authenticate({
        type: 'basic',
        username: process.env.BITBUCKET_LOGIN,
        password: process.env.BITBUCKET_PASSWORD
    });

    log.info('Retrieving repository list');

    const result = await bitbucket.repositories.list({
        username: process.env.BITBUCKET_USERNAME,
        pagelen: MAX_REPOS
    });

    if(result.data.next) {
        throw new Error(`The bitbucket client supports a maximum of ${MAX_REPOS} repositories but the given account contains a total of ${result.data} repositories`);
    }

    return result.data.values;
}

export async function clone(repoData) {
    log.info(`Cloning repository`, repoData);
    const cloneLink = repoData.links.clone.find(r => r.name === 'https');
    const cloneLinkUrl = (cloneLink.href).replace(process.env.BITBUCKET_LOGIN, `${process.env.BITBUCKET_LOGIN}:${process.env.BITBUCKET_PASSWORD}`);
    return Git().clone(cloneLinkUrl, `data/${repoData.name}`);
}