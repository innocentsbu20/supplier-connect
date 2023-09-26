const sql = require('mssql');

const db = sql.createConnection({
    host: "localhost",
    user: "THABISO\\Thabiso",
    password: "",
    database: "supplierconnectdb",
    port: 3306
});
db.connect((error) => {
    if (error) throw new Error(error)
})

module.exports = db;