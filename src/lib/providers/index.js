import * as Bitbucket from './bitbucket';
import * as Github from './github';

const providersMap = {
    'BITBUCKET': Bitbucket,
    'GITHUB': Github
};

function _getProviderImpl(providerName) {
    const providerImpl = providersMap[providerName.toUpperCase()];

    if (providerImpl == null) throw new Error('Provider is not implemented: ' + providerName);

    return providerImpl;
}

export default _getProviderImpl(process.env.PROVIDER);