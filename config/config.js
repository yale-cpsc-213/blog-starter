'use strict';
var cas = require('./cas.js');
var session = require('express-session');
var nunjucks = require('nunjucks');


module.exports = function(app, host, port, sessionSecret){

    nunjucks.configure('views', {
        autoescape: true,
        express: app
    });

  // Set up an Express session, which is required for CASAuthentication.
  app.use( session({
      secret            : sessionSecret,
      resave            : false,
      saveUninitialized : true
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
