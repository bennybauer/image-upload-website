var albumBucketName = 'bennys-face-236';
var bucketRegion = 'eu-west-1';
var IdentityPoolId = 'eu-west-1:592a5e44-7bd8-46a5-baf8-081cf2542689';

// Initialize the Amazon Cognito credentials provider
AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});

function displayMessage(message) {
  document.getElementById('output').innerHTML = message;
}

function clearMessage() {
  document.getElementById('output').innerHTML = '';
}

function addPhoto(albumName) {
  clearMessage();
  const files = document.getElementById('photoupload').files;
  if (!files.length) {
    return displayMessage('Please choose a file to upload first.');
  }

  displayMessage('Uploading photo...');

  const file = files[0];
  const ext = file.name.split('.').pop().toLowerCase();
  s3.upload({
    Key: `${generateUUID()}.${ext}`,
    Body: file,
    ACL: 'public-read'
  }, function(err, data) {
    if (err) {
      return displayMessage(`There was an error uploading your photo: ${err.message}`);
    }

    displayMessage('Successfully uploaded photo.');
  });
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};
