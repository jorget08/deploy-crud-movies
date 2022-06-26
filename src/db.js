require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

//const conn = 'mongodb://localhost:27017/movies'

module.exports = () => {
  const connect = () => {
    mongoose.connect(process.env.DB_URL, 
      {keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true},
                     console.log(process.env.DB_URL),
      (err) => {err ? console.log("DB error!") : console.log('Conectado')})
  }
  connect()
};
