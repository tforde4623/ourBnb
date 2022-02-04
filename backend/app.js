const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');


const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());

if (!isProduction) {
  // allows cross origin requests when not in prod
  app.use(cors());
}

// variety of headers helps a little mitig vulns
app.use(helmet({
  contentSecurityPolicy: false
}));

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

app.use(express.json());

app.use(require('./routes'));

// "404" err handler
app.use((_req, _res, next) => {
  const err = new Error('The requested resource could not be found.');
  err.title = "Resource Not Found";
  err.errors = ['The requested resource could not be found.'];
  err.status = 404;
  next(err);
});

// sequelize error 'processing'
app.use((err, _req, _res, next) => {
  // check error type
  if (err instanceof ValidationError) {
    err.errors = err.errors.map(e => e.message);
    err.title = 'Validation error';
  }
  next(err)
});

// format errors for json response
app.use((err, _req, res, _next) => {
  // if it is not an error we have assigned prev, send generic internal err
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    // if server is in prod we don't want to send the stack
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;
