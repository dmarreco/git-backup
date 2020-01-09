require('dotenv').config();
const Bitbucket = require('bitbucket');
const git = require('simple-git/promise')();

const PAGELEN = 100;

(async function () {
    try {
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

        console.log('Retrieving repository list');
        const bitbucketResponse = await bitbucket.repositories.list({
            username: process.env.BITBUCKET_USERNAME,
            pagelen: PAGELEN
        });

        bitbucketResponse.data.values.map(async repo => {
            try {
                console.log(`Cloning ${repo.name}`);
                const cloneLink = repo.links.clone.find(r => r.name === 'https');
                const cloneLinkUrl = (cloneLink.href).replace(process.env.BITBUCKET_LOGIN, `${process.env.BITBUCKET_LOGIN}:${process.env.BITBUCKET_PASSWORD}`);
                await git.clone(cloneLinkUrl, `data/${repo.name}`);
                console.log(`Successfully cloned ${repo.name}`);
            } catch (err) {
                console.error(`Error cloning ${repo.name}: ${err}`);
            }
        });
    } catch (e) {
        console.error(e);
    }
})();