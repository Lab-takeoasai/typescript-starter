require('ts-node/register');
exports.config = {
  baseUrl: 'http://127.0.0.1:8100/',
  seleniumAddress: 'http://127.0.0.1:4723/wd/hub',

  specs: [
    '../src/**/*.e2e.ts'
  ],
  exclude: [],

  framework: 'mocha',

  allScriptsTimeout: 110000,
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'deviceName': 'Android Emulator',
    'chromeOptions': {
      args: ['--disable-web-security'],
    }
  },
  /*
    directConnect: false,
  
    capabilities: {
      'browserName': 'safari',
      'appium-version': '1.5.3',
      'platformName': 'iOS',
      'platformVersion': '9.3',
      'deviceName': 'iPad Pro'
    },*/
  mochaOpts: {
    timeout: 30000
  },

  onPrepare: function () {
    browser.ignoreSynchronization = true;
  }
};
