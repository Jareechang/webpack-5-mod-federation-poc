
const utils = require('.');
const sampleEvent = require('./sample-request.json');

describe('utils', () => {
  const mockHeadersNoCookie = {
    cookie: [
      {
        "value": "Session=Xyz;",
        "key": "Cookie"
      }
    ],
    "user-agent": [
      {
        key: "User-Agent",
        value: "curl/7.51.0"
      }
    ]
  };
  const mockHeadersOriginal = {
    cookie: [
      {
        "value": "Session=Xyz;",
        "key": "Cookie"
      },
      {
        "value": "source=Original;",
        "key": "Cookie"
      }
    ],
    "user-agent": [
      {
        key: "User-Agent",
        value: "curl/7.51.0"
      }
    ]
  };

  const mockHeadersExp = {
    cookie: [
      {
        "value": "Session=Xyz;",
        "key": "Cookie"
      },
      {
        "value": "source=Experiment;",
        "key": "Cookie"
      }
    ],
    "user-agent": [
      {
        key: "User-Agent",
        value: "curl/7.51.0"
      }
    ]
  };

  describe('getSourceId()', () => {
    describe('Original', () => {
      it('should get the source from the cloudfront message event', () => {
        expect(utils.getSourceId(mockHeadersOriginal)).toEqual('Original');
      });
    });
    describe('Experiment', () => {
      it('should get the source from the cloudfront message event', () => {
        expect(utils.getSourceId(mockHeadersExp)).toEqual('Experiment');
        expect(utils.getSourceId(sampleEvent.headers)).toEqual('Experiment');
      });
    });
  });

  describe('hasCustomCookie()', () => {
    it('should return false if it does not contain custom cookie', () => {
      expect(utils.hasCustomCookie(mockHeadersNoCookie)).toBeFalsy();
    });
    it('should return true if it does not contain custom cookie', () => {
      expect(utils.hasCustomCookie(mockHeadersOriginal)).toBeTruthy();
      expect(utils.hasCustomCookie(mockHeadersExp)).toBeTruthy();
    });
  });

  describe('appendRandomSourceCookie()', () => {
    it('should include source cookie into the header.cookie', () => {
      const headers = {
        cookie: [{
          key: 'Cookie',
          value: 'Session=Xyz;'
        }]
      };
      utils.appendRandomSourceCookie(headers);
      const newCookie = headers.cookie[1];
      expect(newCookie.value.match('source=')).toBeTruthy();
      expect(newCookie.key).toEqual('Cookie');
    });
  });

  describe('routeTraffic', () => {
    it('should leave request / header unchanged for original source', () => {
      const request = {
        headers: {
          ...mockHeadersOriginal
        },
        uri: '/app/latest/index.html'
      };
      utils.routeTraffic(request);
      expect(request.headers).toEqual(mockHeadersOriginal);
      expect(request.origin).toBeFalsy();
    });
    it('should request / header for experiment source', () => {
      const request = {
        headers: {
          ...mockHeadersExp
        },
        uri: '/app/latest/index.html'
      };

      utils.routeTraffic(request);
      expect(request.origin).toEqual({
        s3: {
          authMethod: 'origin-access-identity',
          domainName: 'kittygrams3-dev-assets-experiment.s3.amazonaws.com',
          path: '',
          region: 'us-east-1' 
        }
      });
      expect(request.headers.host).toEqual([
        {
          key: 'host',
          value: 'kittygrams3-dev-assets-experiment.s3.amazonaws.com',
        }
      ]);
    });

    it('should not change request if request uri is not index.html', () => {
      const request = {
        headers: {
          ...mockHeadersExp
        },
        uri: '/app/latest/app.js'
      };

      utils.routeTraffic(request);

      expect(request).toEqual(request);
    });
  });
});
