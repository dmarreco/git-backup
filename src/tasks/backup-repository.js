import saveToS3 from '../lib/s3';
import moveToZip from '../lib/zip';
import { clone } from '../lib/providers';

export default async function (repo) {
    const folder = await clone(repo.name, repo.url, process.env.TMP_DIR);
    const sourceFileLocation = await moveToZip(folder);
    await saveToS3(process.env.S3_TARGET_BUCKET_NAME, sourceFileLocation);
}

