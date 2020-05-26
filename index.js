const express = require('express');
const Joi = require('joi');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const mongoose = require('mongoose');


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers',customers);
//old connection
//mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
console.log('-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------')
mongoose.connect('mongodb+srv://user1:1234@myonlinecluster-y6uej.gcp.mongodb.net/vidly?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------')
        console.log('Connected to MongoDB')
    })
    .catch(err => console.error('Could not connect', err));


const port = process.env.PORT || 3000;
app.listen(port, () => {
    var time = new Date(); console.log(`Port ${port}-${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`);
}); 