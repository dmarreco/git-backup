import saveToS3 from '../lib/s3';
import moveToZip from '../lib/zip';
import { clone } from '../lib/bitbucket';

export default async function (repo) {
    const folder = await clone(repo.name, repo.url);
    const sourceFileLocation = await moveToZip(folder);
    return saveToS3(process.env.S3_TARGET_BUCKET_NAME, sourceFileLocation);
}