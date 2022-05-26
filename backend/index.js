const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();

console.log(process.env.DB_URL);

app.use(cors());
app.use(express.json());

app.post("/submit-feedback", async (req, res) => {
    const { body } = req;
    const client = await MongoClient.connect(process.env.DB_URL);
    const db = client.db("feedback");
    const collection = db.collection("feedback-data");
    console.log(body);
    res.json({ error: false, message: "Feedback submitted successfully" });
});

app.get("", (req, res) => {
    res.json({ message: "Hello from backend" });
});

app.listen(3011, () => console.log(`Server started on port 3011`));
