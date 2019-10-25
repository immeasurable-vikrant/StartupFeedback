if(process.env.NODE_ENV ==='production') {
    // we are in production - return production set of keys
    module.exports = require('./prod');
} else {
    // we are in development - return development set of keys
    module.exports = require('./dev');
}
