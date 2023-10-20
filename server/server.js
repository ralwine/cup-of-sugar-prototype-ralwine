const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const profileRouter = require('./routes/profile.router')
const offerRouter = require('./routes/offer.router')
const requestRouter = require('./routes/request.router')
const groupRouter = require('./routes/group.router')
const allergyRouter = require('./routes/allergy.router')
const restrictionRouter = require('./routes/restriction.router')
const categoryRouter = require('./routes/category.router')
const adminRouter = require('./routes/admin.router')


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/offer', offerRouter);
app.use('/api/request', requestRouter);
app.use('/api/group', groupRouter);
app.use('/api/allergy', allergyRouter)
app.use('/api/restriction', restrictionRouter)
app.use('/api/category', categoryRouter)
app.use('/api/admin', adminRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
