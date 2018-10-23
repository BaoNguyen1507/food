module.exports = {
  get: function (req, res) {
    res.sendFile(require('path').resolve(sails.config.appPath) + '/' + req.path.substr(1));
  },

  _config: {
    rest: false,
    shortcuts: false
  }
};  