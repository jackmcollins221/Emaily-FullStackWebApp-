//uses logic to determine what keys to use
if(process.env.NODE_ENV==='production'){
    //in prod return prod keys (process.env.NODE_ENV is the hint!)
    module.exports = require('./prod');
}else{
    //in dev use dev keys
    module.exports = require ('./dev');
}