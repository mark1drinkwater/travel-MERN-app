const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes) // => /api/places/...
app.use('/api/users', usersRoutes)

// Express error middleware handler (4-args)
app.use((error, req,res,next) => {
    if (res.headerSent) {
        return next(error);
    }
    // If a header has not been sent && a error code is not set
    // Use 500 which indicates something went wrong
    res.status(error.code || 500);
    res.json({message: error.message || 'An unkown error occurred!'});
})

app.listen(5000);