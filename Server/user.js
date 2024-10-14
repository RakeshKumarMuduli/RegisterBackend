const mypg  =require('pg').Pool

const db = new mypg({
    host: 'localhost',
    user: 'postgres', // Change this to your PostgreSQL username
    password: 'Rakesh@424', // Change this to your PostgreSQL password
    database: 'college', // Change this to your PostgreSQL database name
});

 

module.exports = db;
