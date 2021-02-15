var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mLogger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var logger = require('./config/winston');
const helmet = require("helmet");

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');

var app = express();

if (process.env.IS_DOCKER != 'true') app.set('trust proxy', 'loopback,uniquelocal');
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

if (process.env.NODE_ENV === 'production') {
    app.use(mLogger("common", { "stream": logger.stream }));
} else {
    app.use(mLogger('dev'));
}

app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://hcaptcha.com", "https://*.hcaptcha.com", "https://cdn.ravenjs.com/"],
        imgSrc: ["'self'", "https://blog.pastel.codes", "https://static.ghost.org", "https://secure.gravatar.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://hcaptcha.com", "https://*.hcaptcha.com"],
        fontSrc: ["'self'", "data:"],
        frameSrc: ["https://hcaptcha.com", "https://*.hcaptcha.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    })
  );

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { title: 'Error', description: "Error" });
});

module.exports = app;
