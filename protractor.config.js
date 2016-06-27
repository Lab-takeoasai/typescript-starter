require('ts-node/register');
exports.config = {
  baseUrl: 'http://localhost:8100/',

  specs: [
    'src/**/*.e2e.ts'
  ],
  exclude: [],

  framework: 'mocha',

  allScriptsTimeout: 110000,

  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      args: ['--disable-web-security']
    }
  },

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  }
};
