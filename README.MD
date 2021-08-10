# git-backup

A script that lists all repositories under an username account in either [Bitbucket](https://bitbucket.org/) or [Github](https://github.com/), clones them locally, compress each repository as [Zip](https://en.wikipedia.org/wiki/Zip_(file_format)) files, and uploads them to a [AWS S3](https://aws.amazon.com/pt/s3/) bucket.

## Usage
From the project directory, just execute:

```bash
node src/index
```

## Set-up
- Add a .env file to the project root with the following parameters:
```
PROVIDER=<BITBUCKET | GITHUB>
GIT_LOGIN=<Your git provider login>
GIT_PASSWORD=<Your git provider password>
GIT_USERNAME=<Your gir provider username>
S3_TARGET_BUCKET_NAME=<Target S3 bucket name>
TMP_DIR=<Tmp files directory (e.g.: 'tmp/')>
```

- Add your AWS credentials in _~/.aws/credentials_, as directed [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html).

- You may create a [crontab](https://pt.wikipedia.org/wiki/Crontab) entry to execute this script regularly.

## Next Steps
This is a seed version, intented to become a schedulled [Lambda](https://aws.amazon.com/pt/lambda/) function (or functions).

## License
[ISC](https://choosealicense.com/licenses/isc/)