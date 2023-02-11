const {Pool} = require('pg');
require('dotenv').config();

// COONECTING TO THE DB

const pool = new Pool();

//EXPORTING QUERY TO USE EVERYWHERE IN THE SERVER

module.exports = {
    query: (text,params) => pool.query(text,params)
}