require('dotenv').config();
const Bitbucket = require('bitbucket');

(async function () {
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

    const repositories = await bitbucket.repositories.list({
        username: process.env.BITBUCKET_LOGIN
    });

    console.log(repositories);
})();