import { listRepositoriesData } from '../lib/providers';

export default async function () {
    const reposData = await listRepositoriesData(process.env.GIT_API_BASE_URL, process.env.GIT_LOGIN, process.env.GIT_PASSWORD, process.env.GIT_USERNAME);
    return reposData.map(repoData => {
        const cloneLink = repoData.links.clone.find(r => r.name === 'https');
        const url = (cloneLink.href).replace(process.env.GIT_LOGIN, `${process.env.GIT_LOGIN}:${process.env.GIT_PASSWORD}`);
        const name = repoData.name;
        return { name, url };
    });
}