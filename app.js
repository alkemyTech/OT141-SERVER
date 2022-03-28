const createError = require('http-errors');
const express = require('express');

const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

require('dotenv').config();

// Documentation Swagger Interface
const { serve, setup } = require('swagger-ui-express');
const { configSwagger } = require('./documentation/config.swagger');
const swaggerJSDocs = require('swagger-jsdoc')(configSwagger);  // eslint-disable-line

// routers
const indexRouter = require('./routes/index.routes');
const usersRouter = require('./routes/users.routes');
const activitiesRouter = require('./routes/activities.routes');
const authRouter = require('./routes/auth.routes');
const rolesRouter = require('./routes/roles.routes');
const categoriesRouter = require('./routes/categories.routes');
const newsRouter = require('./routes/news.routes');

const testimonialsRouter = require('./routes/testimony.routes');
const commentsRouter = require('./routes/comments.routes');
const membersRouter = require('./routes/members.routes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(fileUpload());

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
app.use('/news', newsRouter);
app.use('/*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

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
