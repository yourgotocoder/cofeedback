const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const json2xls = require("json2xls");
let xlsx = require("json-as-xlsx");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(json2xls.middleware);

const transformData = (data) => {
  const transformedData = data.reduce((prevValue, currentValue) => {
    const arrayToBeReturned = [...prevValue];
    const newElement = {};
    const foundIndex = arrayToBeReturned.findIndex(
      (element, indexnumber) => element.subject === currentValue.subject,
    );
    if (foundIndex === -1) {
      newElement.subject = currentValue.subject;
      newElement["co" + currentValue.co] = currentValue.rating;
      arrayToBeReturned.push(newElement);
    } else {
      arrayToBeReturned[foundIndex]["co" + currentValue.co] =
        currentValue.rating;
    }
    return arrayToBeReturned;
  }, []);
  return transformedData;
};

const saveToDb = async (collectionName, data) => {
  const dateYear = new Date();
  const year = dateYear.getFullYear();
  const dbName = `feedback-${year}`;
  const client = await MongoClient.connect(process.env.DB_URL);
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const date = new Date().toString();
  const dataToBeSaved = {
    date,
    data,
  };
  const savedPost = await collection.insertOne(dataToBeSaved);
  await client.close();
};

const getCollection = async (collectionName) => {
  const dateYear = new Date();
  const year = dateYear.getFullYear();
  const dbName = `feedback-${year}`;
  const client = await MongoClient.connect(process.env.DB_URL);
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  await client.close();
  const data = await collection.find().toArray();
  return data;
};

app.post("/submit-feedback", async (req, res) => {
  const { body } = req;
  const { sem, branch } = req.query;
  const transformeddatatobesaved = transformData(body);
  // The code below is better than doing the whole switch thing
  // Remember to redesign the DB
  // await saveToDb(`feedback-data-${sem}-${branch}`);
  switch (+sem) {
    case 3:
      if (branch === "cse") {
        await saveToDb("feedback-data-third", transformeddatatobesaved);
      } else if (branch === "aiml") {
        await saveToDb("feedback-data-third-aiml", transformeddatatobesaved);
      } else if (branch === "iot") {
        await saveToDb("feedback-data-third-iot", transformeddatatobesaved);
      }
      break;
    case 4:
      if (branch === "cse") {
        await saveToDb("feedback-data-fourth", transformeddatatobesaved);
      } else if (branch === "aiml") {
        await saveToDb("feedback-data-fourth-aiml", transformeddatatobesaved);
      } else if (branch === "iot") {
        await saveToDb("feedback-data-fourth-iot", transformeddatatobesaved);
      }

      break;
    case 5:
      if (branch === "cse") {
        await saveToDb("feedback-data-fifth", transformeddatatobesaved);
      } else if (branch === "aiml") {
        await saveToDb("feedback-data-fifth-aiml", transformeddatatobesaved);
      } else if (branch === "iot") {
        await saveToDb("feedback-data-fifth-iot", transformeddatatobesaved);
      }

      break;
    case 6:
      if (branch === "cse") {
        await saveToDb("feedback-data-sixth", transformeddatatobesaved);
      } else if (branch === "aiml") {
        await saveToDb("feedback-data-sixth-aiml", transformeddatatobesaved);
      } else if (branch === "iot") {
        await saveToDb("feedback-data-sixth-iot", transformeddatatobesaved);
      }
      break;
    case 7:
      if (branch === "cse") {
        await saveToDb("feedback-data-seventh", transformeddatatobesaved);
      } else if (branch === "aiml") {
        await saveToDb("feedback-data-seventh-aiml", transformeddatatobesaved);
      } else if (branch === "iot") {
        await saveToDb("feedback-data-seventh-iot", transformeddatatobesaved);
      }
      break;
    case 8:
      if (branch === "cse") {
        await saveToDb("feedback-data-eigth", transformeddatatobesaved);
      } else if (branch === "aiml") {
        await saveToDb("feedback-data-eigth-aiml", transformeddatatobesaved);
      } else if (branch === "iot") {
        await saveToDb("feedback-data-eigth-iot", transformeddatatobesaved);
      }
      break;
    default:
      break;
  }
  res.json({ error: false, message: "Feedback submitted successfully" });
});

app.get("/get-excel-data", async (req, res) => {
  const { sem, branch } = req.query;
  let data;
  switch (sem) {
    case 3:
      if (branch === "cse") {
        data = await getCollection("feedback-data-third");
      } else if (branch === "aiml") {
        data = await getCollection("feedback-data-third-aiml");
      } else if (branch === "iot") {
        data = await getCollection("feedback-data-third-iot");
      }
      break;
    case 4:
      if (branch === "cse") {
        data = await getCollection("feedback-data-fourth");
      } else if (branch === "aiml") {
        data = await getCollection("feedback-data-fourth-aiml");
      } else if (branch === "iot") {
        data = await getCollection("feedback-data-fourth-iot");
      }

      break;
    case 5:
      if (branch === "cse") {
        data = await getCollection("feedback-data-fifth");
      } else if (branch === "aiml") {
        data = await getCollection("feedback-data-fifth-aiml");
      } else if (branch === "iot") {
        data = await getCollection("feedback-data-fifth-iot");
      }

      break;
    case 6:
      if (branch === "cse") {
        data = await getCollection("feedback-data-sixth");
      } else if (branch === "aiml") {
        data = await getCollection("feedback-data-sixth-aiml");
      } else if (branch === "iot") {
        data = await getCollection("feedback-data-sixth-iot");
      }
      break;
    case 7:
      if (branch === "cse") {
        data = await getCollection("feedback-data-seventh");
      } else if (branch === "aiml") {
        data = await getCollection("feedback-data-seventh-aiml");
      } else if (branch === "iot") {
        data = await getCollection("feedback-data-seventh-iot");
      }
      break;
    case 8:
      if (branch === "cse") {
        data = await getCollection("feedback-data-eigth");
      } else if (branch === "aiml") {
        data = await getCollection("feedback-data-eigth-aiml");
      } else if (branch === "iot") {
        data = await getCollection("feedback-data-eigth-iot");
      }
      break;
    default:
      break;
  }

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
        (el) => el.sheet === currentValue.subject,
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
    [],
  );
  res.json({ data: reducedData });
});

app.get("", (req, res) => {
  res.json({ message: "Hello from backend" });
});

app.listen(3011, () => console.log(`Server started on port 3011`));
