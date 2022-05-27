const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const json2xls = require("json2xls");
let xlsx = require("json-as-xlsx");
require("dotenv").config();

const app = express();

console.log(process.env.DB_URL);

app.use(cors());
app.use(express.json());
app.use(json2xls.middleware);

app.post("/submit-feedback", async (req, res) => {
    const { body } = req;
    const transformedDataToBeSaved = body.reduce((prevValue, currentValue) => {
        const arrayToBeReturned = [...prevValue];
        const newElement = {};
        const foundIndex = arrayToBeReturned.findIndex(
            (element, indexNumber) => element.subject === currentValue.subject
        );
        if (foundIndex === -1) {
            newElement.subject = currentValue.subject;
            newElement["CO" + currentValue.co] = currentValue.rating;
            arrayToBeReturned.push(newElement);
        } else {
            arrayToBeReturned[foundIndex]["CO" + currentValue.co] =
                currentValue.rating;
        }
        return arrayToBeReturned;
    }, []);
    const client = await MongoClient.connect(process.env.DB_URL);
    const db = client.db("feedback");
    const collection = db.collection("feedback-data");
    const date = new Date().toString();
    const dataToBeSaved = {
        date,
        data: transformedDataToBeSaved,
    };
    const savedPost = await collection.insertOne(dataToBeSaved);
    client.close();
    res.json({ error: false, message: "Feedback submitted successfully" });
});

app.post("/submit-feedback-6th-sem", async (req, res) => {
    const { body } = req;
    const transformedDataToBeSaved = body.reduce((prevValue, currentValue) => {
        const arrayToBeReturned = [...prevValue];
        const newElement = {};
        const foundIndex = arrayToBeReturned.findIndex(
            (element, indexNumber) => element.subject === currentValue.subject
        );
        if (foundIndex === -1) {
            newElement.subject = currentValue.subject;
            newElement["CO" + currentValue.co] = currentValue.rating;
            arrayToBeReturned.push(newElement);
        } else {
            arrayToBeReturned[foundIndex]["CO" + currentValue.co] =
                currentValue.rating;
        }
        return arrayToBeReturned;
    }, []);
    const client = await MongoClient.connect(process.env.DB_URL);
    const db = client.db("feedback");
    const collection = db.collection("feedback-data-6th-sem");
    const date = new Date().toString();
    const dataToBeSaved = {
        date,
        data: transformedDataToBeSaved,
    };
    const savedPost = await collection.insertOne(dataToBeSaved);
    client.close();
    res.json({ error: false, message: "Feedback submitted successfully" });
});

app.get("/get-excel-data-4th-sem", async (req, res) => {
    const client = await MongoClient.connect(process.env.DB_URL);
    const collection = client.db("feedback").collection("feedback-data");
    const data = await collection.find().toArray();
    const justData = data.map((el) => el.data);
    const reducedData = justData.reduce((previousValues, currentValue) => {
        for (let element of currentValue) {
            const indexOfSubjectSheet = previousValues.findIndex(
                (el) => el.sheet === element.subject
            );
            if (indexOfSubjectSheet === -1) {
                const sheetToBeInserted = {
                    sheet: element.subject,
                    columns: [
                        { label: "CO1", value: "CO1" },
                        { label: "CO2", value: "CO2" },
                        { label: "CO3", value: "CO3" },
                        { label: "CO4", value: "CO4" },
                        { label: "CO5", value: "CO5" },
                    ],
                    content: [
                        {
                            CO1: element.CO1,
                            CO2: element.CO2,
                            CO3: element.CO3,
                            CO4: element.CO4,
                            CO5: element.CO5,
                        },
                    ],
                };
                previousValues.push(sheetToBeInserted);
            } else if (indexOfSubjectSheet !== -1) {
                previousValues[indexOfSubjectSheet].content.push({
                    CO1: element.CO1,
                    CO2: element.CO2,
                    CO3: element.CO3,
                    CO4: element.CO4,
                    CO5: element.CO5,
                });
            }
        }
        return previousValues;
    }, []);
    const setting = {
        fileName: "MySpreadsheet", // Name of the resulting spreadsheet
        extraLength: 3,
    };
    xlsx(reducedData, setting);
    res.json({ message: "Success" });
});

app.get("", (req, res) => {
    res.json({ message: "Hello from backend" });
});

app.listen(3011, () => console.log(`Server started on port 3011`));
