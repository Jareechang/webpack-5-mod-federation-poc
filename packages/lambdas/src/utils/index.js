const original = 'Original';
const experiment = 'Experiment';

// 50% traffic to new experiment page
const experimentWeighting = 0.5;
const experimentS3DomainName = 'kittygrams-b1-dev-assets-experiment.s3.amazonaws.com';
const experimentS3Region = 'us-east-1';

/*
 *
 * Route traffic to s3 source origin based on custom cookie
 *
 * **/
function routeTraffic(request) {
  const headers = request.headers;
  const source = getSourceId(headers);
  const uri = request.uri || '';
  console.log('routeTraffic, got source: ', source)
  if (source === experiment && uri.match('index.html')) {
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
  }
}

/*
 *
 * Randomly assign custom cookie for source 
 *
 * **/
function appendRandomSourceCookie(headers) {
  const source =  Math.random() < experimentWeighting
    ? experiment 
    : original;

  if (headers.cookie) {
    headers.cookie.push({
      key: 'Cookie',
      value: `source=${source};`
    });
  } else {
    headers.cookie = [
      {
        key: 'Cookie',
        value: `source=${source};`
      }
    ];
  }
}

function hasCustomCookie(headers) {
  let result = false;
  const cookies = headers ? headers.cookie : [];
  if (cookies) {
    cookies.forEach((cookie) => {
      if (!!cookie.value.match('source=')) {
        result = true;
      }
    });
  }
  return result;
}

function getSourceId(headers) {
  let sourceValue = '';
  const cookies = headers ? headers.cookie : [];
  if (cookies) {
    cookies.forEach((cookie) => {
      if (!!cookie.value.match(`source=${original}`)) {
        sourceValue = original;
      }
      if (!!cookie.value.match(`source=${experiment}`)) {
        sourceValue = experiment;
      }
    });
  }
  return sourceValue;
}

module.exports = {
  getSourceId,
  routeTraffic,
  hasCustomCookie,
  appendRandomSourceCookie,
};

