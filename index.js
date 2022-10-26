
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser') ;
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 8000;
app.listen(port) ;

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));
app.use(cookieParser());

// HOme route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ecommerce application." });
});


// Database connection
// MONGODB CONNECTION 

mongoose.connect(process.env.DB_URI , {
  useUnifiedTopology : true ,
  useNewUrlParser : true 
})
.then(() => console.log(" Connected !!"))
.catch(err => console.log(err)) ;

// Routes

/**** User Routes ****/
const userRoutes = require('./routes/user') ;
app.use('/user', userRoutes ) ;

/*** Product ****/
const productRoutes = require('./routes/product') ;
app.use('/product' , productRoutes ) ;
