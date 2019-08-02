import path from 'path';
import express from 'express';
import APIv1users from './api/api.v1.users';
import { connect } from './database';

const app = express();
connect();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
APIv1users(app);

/* app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
}); */

app.get('/', (req, res) => {
  res.send('<h1>Ready</h1>');
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
