const S3 = require('aws-sdk/clients/s3');

const s3 = new S3({
  region: 'eu-west-1',
  params: { Bucket: process.env.AWS_BUCKET_NAME },
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});

module.exports = s3;
