const utils = require('../utils');

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;
  const source = utils.getSourceId(headers);

  console.log('Starting viewer Request', JSON.stringify(request));

  if (utils.hasCustomCookie(headers)) {
    callback(null, request);
    return;
  }

  utils.appendRandomSourceCookie(headers);
  callback(null, request);
}
