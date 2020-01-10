const { expect } = require('chai');
const sinon = require('sinon');

//import Bitbucket from 'bitbucket';
const Bitbucket = require('bitbucket');

let BitbucketService;

describe('Bitbucket service module', () => {

    describe('List repositories with success', () => {
        const bitbucketResponseMock = {
            data: {
                values: [
                    { name: 'repo-1' },
                    { name: 'repo-2' }
                ]
            }
        };
        const bb = new Bitbucket({});

        beforeEach(() => {
            sinon.stub(Bitbucket.prototype, 'constructor').returns(bb);
            sinon.stub(bb, 'authenticate').returns();
            sinon.stub(bb.repositories, 'list').returns(bitbucketResponseMock);

            BitbucketService = require('../src/service/bitbucket.service');
        });

        afterEach(() => {
            Bitbucket.prototype.constructor.restore();
        });

        it('Should return a list of repository objects witn names and links', async () => {

            const result = await BitbucketService.listRepositoriesData();

            expect(result).to.deep.eq(bitbucketResponseMock.data.values);
        });

    });

}); 