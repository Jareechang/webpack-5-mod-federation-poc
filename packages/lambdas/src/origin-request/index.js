const utils = require('../utils');

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;
  console.log('Starting viewer Request', JSON.stringify(request));

  utils.routeTraffic(request);

  callback(null, request);
}
