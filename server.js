// Require Statements
const express = require('express');

const mongoose = require ('mongoose');
const methodOverride = require('method-override');

const app = express();

require("dotenv").config()

const superheroesController = require('./controllers/superheroes')
const powersController = require('./controllers/powers')

const ejsLayouts = require('express-ejs-layouts')

// Middleware
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:false}));

app.use('/public', express.static('public'));

// Database Connection
const connectionString = 'mongodb://localhost/superhero'

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useCreateIndex: true, 
  useFindAndModify: false
});

mongoose.connection.on('connected', () => console.log(`Mongoose connected to ${connectionString}`));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));
mongoose.connection.on('error', (err) => console.log('Mongoose error', err));

// Routes

// Homepage Route
app.get('/',(request, response) => {
  response.render('home.ejs')
});

app.use('/superheroes', superheroesController);
app.use('/powers', powersController);

      
//  Listen function
app.listen(process.env.PORT, () => {
  console.log('Heroes GO!')
});