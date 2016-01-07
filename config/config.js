'use strict';
var cas = require('./cas.js');
var session = require('client-sessions');
var nunjucks = require('nunjucks');
var markdown = require('nunjucks-markdown');
var marked = require('marked');
var compression = require('compression');
var loadData = require('./data.js');

module.exports = function(app, host, port, sessionSecret){

  var nunjucksEnv = nunjucks.configure('views', {
      autoescape: true,
      express: app,
      watch: true
  });
  markdown.register(nunjucksEnv, marked);
  nunjucksEnv.addFilter('render', function(content){
    return nunjucksEnv.renderString(content, this.ctx);
  })
  // Load our Yaml files and make the resulting
  // data available whenever we render a template.
  var data = loadData();
  nunjucksEnv.addGlobal('data', data);
  app.locals.data = data;
  app.use(compression());


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

  // Get a particular update
  app.get('/updates/:updateKey', function (req, res) {
    var update = app.locals.data.updates[req.params.updateKey];
    if(!update){
      res.status(404).end();
    }else{
      res.render('update.html', {update: update, updateKey: req.params.updateKey});
    }
  });

}
