const express = require('express');
const mongoose = require('mongoose');

const accountRouter = require('./routes/accounts')
const notificationRouter = require('./routes/notifications')
const app = express();
let port = 3000;
let config = require('./config');
mongoose.connect(config.StorageConnectionString, {
	autoReconnect: true,
	reconnectTries: 60,
	reconnectInterval: 10000,
	useCreateIndex: true,
	useNewUrlParser: true
});
app.listen(port);
app.use(require('body-parser').json());

app.use('/account', accountRouter);
app.use('/notifications', notificationRouter);

module.exports = app;
