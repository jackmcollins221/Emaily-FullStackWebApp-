const express = require ('express');
const app = express(); //calling this like a function represents a new express app.  Can have multiple in a node project, but rare

app.get('/', (req, res)=>{ //app. is saying make me a route handler.  get says "what type (post, put, delete, etc)"  / is the path to listen for. req and res are request and response
    res.send({hi: 'Max Payne'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);