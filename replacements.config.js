var version = '0.0.2';

module.exports = {
  debug: [
    { search: '@@apiUrl', replace: '/api/' },
    { search: '@@xmlns:name', replace: 'AppDebug' },
    { search: '@@xmlns:access', replace: '*' },
    { search: '@@xmlns:allow-intent', replace: '*' },
    { search: '@@xmlns:allow-navigation', replace: '*' },
    { search: '@@xmlns:widget[@id]', replace: 'com.app.starter' },
    { search: '@@xmlns:widget[@version]', replace: version },
  ],
  release: [
    { search: '@@apiUrl', replace: 'https://' },
    { search: '@@xmlns:name', replace: 'App' },
    { search: '@@xmlns:access', replace: '*' },
    { search: '@@xmlns:allow-intent', replace: '*' },
    { search: '@@xmlns:allow-navigation', replace: '*' },
    { search: '@@xmlns:widget[@id]', replace: 'com.app.release' },
    { search: '@@xmlns:widget[@version]', replace: version },
  ]
}
