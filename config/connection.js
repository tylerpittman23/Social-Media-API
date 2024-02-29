const { connect, connection } = require('mongoose');
require('dotenv').config()

connect(process.env.DB_URI);

module.exports = connection;