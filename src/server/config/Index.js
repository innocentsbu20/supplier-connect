import express from 'express';
import db from './config/db';
import cors from 'cors';

const app = express();
const PORT = 3306;

app.use(cors());
app.use(express.json());

// Route to get all products
app.get("/api/get", (req, res) => {
    console.log("res", res)
    db.query("SELECT * FROM products", (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log("result", result)
        res.send(result)
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})