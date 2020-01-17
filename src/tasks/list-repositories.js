import { listRepositoriesData } from '../lib/bitbucket';

export default async function () {
    const reposData = await listRepositoriesData(process.env.BITBUCKET_API_BASE_URL, process.env.BITBUCKET_LOGIN, process.env.BITBUCKET_PASSWORD, process.env.BITBUCKET_USERNAME);
    return reposData.map(repoData => {
        const cloneLink = repoData.links.clone.find(r => r.name === 'https');
        const url = (cloneLink.href).replace(process.env.BITBUCKET_LOGIN, `${process.env.BITBUCKET_LOGIN}:${process.env.BITBUCKET_PASSWORD}`);
        const name = repoData.name;
        return { name, url };
    });
}