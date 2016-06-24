module.exports = {
  debug: [
    { search: '@@imgUrl', replace: 'debug' }
  ],
  release: [
    { search: '@@imgUrl', replace: 'release' }
  ]
}
