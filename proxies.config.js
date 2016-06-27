module.exports = {
  debug: [
    {
      "path": "/api/",
      "rejectUnauthorized": false,
      "proxyUrl": "https://stage.sutarepi.net/api/"
    }
  ],
  release: []
}
