var version = '0.0.2';

module.exports = {
  debug: [
    { search: '@@imgUrl', replace: 'debug' },
    { search: '@@xmlns:name', replace: 'AppDebug' },
    { search: '@@xmlns:access', replace: '*' },
    { search: '@@xmlns:allow-intent', replace: '*' },
    { search: '@@xmlns:allow-navigation', replace: '*' },
    { search: '@@xmlns:widget[@id]', replace: 'com.app.starter' },
    { search: '@@xmlns:widget[@version]', replace: version },
  ],
  release: [
    { search: '@@imgUrl', replace: 'release' },
    { search: '@@xmlns:name', replace: 'App' },
    { search: '@@xmlns:access', replace: '*' },
    { search: '@@xmlns:allow-intent', replace: '*' },
    { search: '@@xmlns:allow-navigation', replace: '*' },
    { search: '@@xmlns:widget[@id]', replace: 'com.app.release' },
    { search: '@@xmlns:widget[@version]', replace: version },
  ]
}
