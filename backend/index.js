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
  const date = new Date().toLocaleString(undefined, {
    timeZone: "Asia/Kolkata",
  });
  const client = await MongoClient.connect(process.env.DB_URL);
  const db = client.db("feedback-2022");
  const collection = db.collection("feedback-data");
  const dataToBeSaved = {
    ...body,
    date,
  };
  const savedPost = await collection.insertOne(dataToBeSaved);
  await client.close();
  console.log(new Date(date));
  res.json({
    error: false,
    message: "Feedback submitted successfully",
    responseId: savedPost.insertedId.toString(),
  });
});


app.get("/get-excel-data-4th-sem", async (req, res) => {
  const client = await MongoClient.connect(process.env.DB_URL);
  const collection = client.db("feedback").collection("feedback-data");
  const data = await collection.find().toArray();
  const justData = data.reduce((previousValues, currentValue) => {
    const array = currentValue.data;
    for (let element of array) {
      previousValues.push(element);
    }
    return previousValues;
  }, []);
  const reducedData = justData.reduce(
    (previousValues, currentValue, currentIndex) => {
      currentValue.subject = currentValue.subject.substring(0, 30);
      const indexOfSubjectSheet = previousValues.findIndex(
        (el) => el.sheet === currentValue.subject
      );
      if (indexOfSubjectSheet === -1) {
        const sheetToBeInserted = {
          sheet: currentValue.subject,
          columns: [
            { label: "Sno.", value: "SNo" },
            { label: "CO1", value: "CO1" },
            { label: "CO2", value: "CO2" },
            { label: "CO3", value: "CO3" },
            { label: "CO4", value: "CO4" },
            { label: "CO5", value: "CO5" },
          ],
          content: [
            {
              SNo: 1,
              CO1: currentValue.CO1,
              CO2: currentValue.CO2,
              CO3: currentValue.CO3,
              CO4: currentValue.CO4,
              CO5: currentValue.CO5,
            },
          ],
        };
        previousValues.push(sheetToBeInserted);
      } else if (indexOfSubjectSheet !== -1) {
        previousValues[indexOfSubjectSheet].content.push({
          SNo: previousValues[indexOfSubjectSheet].content.length + 1,
          CO1: currentValue.CO1,
          CO2: currentValue.CO2,
          CO3: currentValue.CO3,
          CO4: currentValue.CO4,
          CO5: currentValue.CO5,
        });
      }
      return previousValues;
    },
    []
  );
  res.json({ data: reducedData });
});

app.get("/get-excel-data-6th-sem", async (req, res) => {
  const client = await MongoClient.connect(process.env.DB_URL);
  const collection = client.db("feedback").collection("feedback-data-6th-sem");
  const data = await collection.find().toArray();
  const justData = data.reduce((previousValues, currentValue) => {
    const array = currentValue.data;
    for (let element of array) {
      previousValues.push(element);
    }
    return previousValues;
  }, []);
  const reducedData = justData.reduce(
    (previousValues, currentValue, currentIndex) => {
      currentValue.subject = currentValue.subject.substring(0, 30);
      const indexOfSubjectSheet = previousValues.findIndex(
        (el) => el.sheet === currentValue.subject
      );
      if (indexOfSubjectSheet === -1) {
        const sheetToBeInserted = {
          sheet: currentValue.subject,
          columns: [
            { label: "Sno.", value: "SNo" },
            { label: "CO1", value: "CO1" },
            { label: "CO2", value: "CO2" },
            { label: "CO3", value: "CO3" },
            { label: "CO4", value: "CO4" },
            { label: "CO5", value: "CO5" },
          ],
          content: [
            {
              SNo: 1,
              CO1: currentValue.CO1,
              CO2: currentValue.CO2,
              CO3: currentValue.CO3,
              CO4: currentValue.CO4,
              CO5: currentValue.CO5,
            },
          ],
        };
        previousValues.push(sheetToBeInserted);
      } else if (indexOfSubjectSheet !== -1) {
        previousValues[indexOfSubjectSheet].content.push({
          SNo: previousValues[indexOfSubjectSheet].content.length + 1,
          CO1: currentValue.CO1,
          CO2: currentValue.CO2,
          CO3: currentValue.CO3,
          CO4: currentValue.CO4,
          CO5: currentValue.CO5,
        });
      }
      return previousValues;
    },
    []
  );
  res.json({ data: reducedData });
});

app.get("", (req, res) => {
  res.json({ message: "Feedback api works" });
});

app.listen(3011, () => console.log(`Server started on port 3011`));
