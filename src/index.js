require('dotenv').config();
const Bitbucket = require('bitbucket');
const download = require('download-git-repo');

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

        const bitbucketResponse = await bitbucket.repositories.list({
            username: process.env.BITBUCKET_USERNAME,
            pagelen: PAGELEN
        });


        const headers = {
            Authorization: `Basic ${new Buffer(`${process.env.BITBUCKET_LOGIN}:${process.env.BITBUCKET_PASSWORD}`).toString('base64')}`
        };
        bitbucketResponse.data.values.map(repo => {
            download(`bitbucket:${repo.full_name}`, `data/${repo.name}`, { headers, clone:true }, err => {
                if (err) {
                    console.error(err);
                }
                console.log(err ? `Error: ${err}` : `Success`);
            });
        });

    } catch (e) {
        console.error(e);
    }
})();