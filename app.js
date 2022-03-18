const createError = require('http-errors');
const express = require('express');

const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

// Documentation Swagger Interface
const { serve, setup } = require('swagger-ui-express');
const { configSwagger } = require('./documentation/config.swagger');
const swaggerJSDocs = require('swagger-jsdoc')(configSwagger);  // eslint-disable-line

// routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const activitiesRouter = require('./routes/activities');
const authRouter = require('./routes/auth');
const rolesRouter = require('./routes/roles');
const categoriesRouter = require('./routes/categories');

const testimonialsRouter = require('./routes/testimony');
const commentsRouter = require('./routes/comments');
const membersRouter = require('./routes/members');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// routes
app.use('/', indexRouter);
app.use('/activities', activitiesRouter);
app.use('/api/docs', serve, setup(swaggerJSDocs));
app.use('/auth', authRouter);
app.use('/categories', categoriesRouter);

app.use('/testimonials', testimonialsRouter);
app.use('/comments', commentsRouter);
app.use('/members', membersRouter);
app.use('/posts', commentsRouter);
app.use('/roles', rolesRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
