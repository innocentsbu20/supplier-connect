import { createConnection } from 'mysql';

const db = createConnection({
    host: "localhost",
    user: "root",
    password: "Thabiso@310",
    database: "supplierconnectdb"
})

export default db;