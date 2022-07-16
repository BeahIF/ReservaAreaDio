var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();
//Mongo DB
const mongoose= require("mongoose");
mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology:true,
    useNewUrlParser: true
})
var db = mongoose.connection;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var availabilityRouter= require('./routes/availabilityRoute')
var reservationRouter = require('./routes/reservationRoute');
var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/availability", availabilityRouter);
app.use("/reservation", reservationRouter)
db.on("error", console.error.bind(console, "conection error:"))
db.once("open", _=>{
console.log("Conectado com o mongo")
})
module.exports = app;
