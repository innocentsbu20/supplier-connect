const express = require('express');
const cors = require('cors'); // Import the cors module

const app = express();
// Use cors middleware
app.use(cors());
const sql = require("mssql");


// config for your database
var config = {
    // user: "THABISO/Thabiso",
    server: "(localdb)\\MSSQLLocalDB\\supplierconnectdb",//"THABISO/LOCALDB#95E33F43", - localhost
    database: "supplierconnectdb",
    driver: 'msnodesqlv8',
    options: {
        enableArithAbort: true,
        trustedConnection: true
    },
    requestTimeout: 300000,
    port: 1433
};

async function connectToDatabase() {
    try {
        await sql.connect(config);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

// Call the function to establish the database connection
connectToDatabase();

// create Request object
var request = new sql.Request();

app.get('/', function (req, res) {
    console.log(req)
    // res.send('Hello World')
    // query to the database and get the records
    request.query('SELECT * FROM users', function (err, recordset) {

        if (err) console.log(err)

        // send records as a response
        res.send(recordset);

    });
});

/*
app.get('/', function (req, res) {

    // query to the database and get the records
    request.query('SELECT * FROM users', function (err, recordset) {

        if (err) console.log(err)

        // send records as a response
        res.send(recordset);

    });
});*/
// sql.clo
// Start your Express server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});