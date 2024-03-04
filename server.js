const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

const sess = {
    secret: process.env.SECRET_KEY,
    store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
    cookie: {
        maxAge: 86400000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: false,
    
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', routes);
app.use(session(sess));


db.once('open', () => {
    try { 
        app.listen(PORT, ()=> {
            console.log(`Api server now listening`);
        })
    } catch(err) {
        console.error(`Error starting server: ${err}`);
    }
});
