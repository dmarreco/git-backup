import AWS from 'aws-sdk';
import fs from 'fs';
import * as log from './log';

const REMOTE_FOLDER = 'code';

export default function save(bucket, file) {
    log.info('Uploading to S3 storage', { bucket, file });
    const s3 = new AWS.S3();
    const content = fs.readFileSync(file);

    const fileName = file.split('/')[1];

    return s3.upload({
        Bucket: bucket,
        Key: `${REMOTE_FOLDER}/${fileName}`,
        Body: content
    }).promise();
}