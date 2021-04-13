const utils = require('../utils');

const experimentS3DomainName = 'kittygrams-b1-dev-assets-experiment.s3.amazonaws.com';
const experimentS3Region = 'us-east-1';

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  console.log('Starting origin Request', JSON.stringify(request));

  const uri = request.uri;
  const source = utils.getSourceId(headers);
  const cookies = headers ? headers.cookie : [];

  console.log('Log Info: ', JSON.stringify({
    uri,
    source,
    cookies
  }));

  if (source === 'Experiment' && !!uri.match('index.html')) {
    request.origin = {
      s3: {
        authMethod: 'origin-access-identity',
        domainName: experimentS3DomainName,
        path: '',
        region: experimentS3Region
      }
    };
    headers.host = [
      {
        key: 'host',
        value: experimentS3DomainName
      }
    ];

    request.uri = '/app/latest/index.html';

    console.log('Directing to experiment origin: ', JSON.stringify(request));
  }

  callback(null, request);
}
