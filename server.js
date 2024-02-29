const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', routes);


db.once('open', () => {
    try { 
        app.listen(PORT, ()=> {
            console.log(`Api server now listening`);
        })
    } catch(err) {
        console.error(`Error starting server: ${err}`);
    }
});
