// Image uploading file


// Makes a random file name for our image:
const s3 = require('./s3');
const uuid = require('uuid');

function imageUpload(req, res, next) {
  if(!req.body.base64) return next();


  // Extract data and mime type from base64 string with regex:
  const base64Data = req.body.base64.match(/base64,(.*)$/)[1];
  const mimeType = req.body.base64.match(/^data:(.*);/)[1];
  // Get extension from the mime type:
  const extension = mimeType.replace('image/', '');
  const filename = `${uuid.v1()}.${extension}`;

  // Upload image to AWS:
  s3.upload({
    Key: filename,
    Body: new Buffer(base64Data, 'base64'), // Converts string back into image
    ContentType: mimeType // Once file is uploaded we're storing the filename and mimType on req.file
  }, err => {
    if(err) return next(err);

    req.file = { filename, mimeType };
    next();
  });
}

module.exports = imageUpload;
