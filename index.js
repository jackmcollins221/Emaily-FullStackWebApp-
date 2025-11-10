const express = require("express");
const mongoose = require('mongoose');
//handles connecting to mongodb by importing key and then passing to mongoose
const keys = require('./config/keys');
require('./models/User')//tells the main thread to run that file once to setup the model, THIS HAS TO COME BEFORE BELOW PASSPORT IMPORT, bc passport refrences the schema made here
require("./services/passport"); //this require statement normally has a variable that stores everything reutrn by the file
//however in this case we just say require(file) because that will run the file and setup route handlers


mongoose.connect(keys.mongoURI);


const app = express(); //calling this like a function represents a new express app.  Can have multiple in a node project, but rare

require("./routes/authRoutes")(app); // this passes app to authroutes, it works because when we say require(file) in this case
//it just returns a function (look at authroutes export) and then we immediately pass it app so it can use it

const PORT = process.env.PORT || 5000;
app.listen(PORT);
