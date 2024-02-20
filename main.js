//imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');



const app = express();
const PORT = process.env.PORT || 4000;

// //database connection
mongoose.connect(process.env.DB_URI,{useNewUrlParser: true});
const db = mongoose.connection;
db.on("error",(error) => console.log(error));
db.once('open', () => console.log('connect to database!'));

// const uri = 'mongodb://localhost:27017/node_database';

// // MongoDB connection options
// const options = {
//   useNewUrlParser: true, // Remove this line as it's deprecated
//   useUnifiedTopology: true // Remove this line as it's deprecated
// };

// // Connect to MongoDB
// mongoose.connect(process.env.DB_URI, options)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Your code here
//   })
//   .catch(error => {
//     console.error('Error connecting to MongoDB:', error);
//   });

//middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,

})
);


app.use((req, res, next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

//set templater engine
app.set("view engine", "ejs");


//route prefix

app.use("",require('./routes/routes'))

app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
})
