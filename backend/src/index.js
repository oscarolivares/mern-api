import path from 'path';
import express from 'express';
import APIv1users from './api/api.v1.users';
import { connect } from './database';
import morgan from 'morgan';

const app = express();
connect();

// Settings
app.set('port', process.env.PORT || 3000);

// CORS for dev
/* if (process.env.NODE_ENV === 'development') { */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://192.168.0.114:4000');

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();

  app.options('*', (req, res) => {
    // allowed XHR methods
    res.header(
      'Access-Control-Allow-Methods',
      'GET, PATCH, PUT, POST, DELETE, OPTIONS'
    );
    res.send();
  });
});
/* } */

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));

// Routes
APIv1users(app);

/* app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
}); */

app.get('/', (req, res) => {
  res.redirect('index.html');
});

// Middlewares for errors
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Starting server
app.listen(app.get('port'), () => {
  console.log('Server on port: ', app.get('port'));
});
