'use strict';
var cas = require('./cas.js');
var session = require('client-sessions');
var nunjucks = require('nunjucks');


module.exports = function(app, host, port, sessionSecret){

  nunjucks.configure('views', {
      autoescape: true,
      express: app,
      watch: true
  });

  // Set up an Express session, which is required for CASAuthentication.
  // 1 week duration, extended by a week each time they log in.
  var duration = 24 * 60 * 60 * 7 * 1000;
  app.use( session({
      cookieName: 'session',
      secret: sessionSecret,
      duration: duration,
      activeDuration: duration
  }));

  var auth = cas(host, port);

  // This route will de-authenticate the client with the Express server and then
  // redirect the client to the CAS logout page.
  app.get( '/logout', auth.logout );

  // All other routes require CAS authorization
  app.use(auth.bounce);

  // Get the homepage
  app.get('/', function (req, res) {
    res.render('index.html', {});
  });

}
