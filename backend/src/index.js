import path from 'path';
import express from 'express';
import apiV1 from './routes/api.v1';
import { connect } from './database';

const app = express();
connect();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Ready</h1>');
});

apiV1(app);

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
