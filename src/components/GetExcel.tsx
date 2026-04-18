import React, { useEffect, useState } from "react";
import xlsx from "json-as-xlsx";
import Button from "@mui/material/Button";

type Props = {};

const transformData = (data: any) => {
  const arrayWithTotals = data.data.map((element: any) => {
    let objToBeInserted = {
      SNo: "Avg",
      CO1: 0,
      CO2: 0,
      CO3: 0,
      CO4: 0,
      CO5: 0,
    };
    for (let content of element.content) {
      objToBeInserted.CO1 += content.CO1;
      objToBeInserted.CO2 += content.CO2;
      objToBeInserted.CO3 += content.CO3;
      objToBeInserted.CO4 += content.CO4;
      objToBeInserted.CO5 += content.CO5;
    }
    objToBeInserted.CO1 = +(
      objToBeInserted.CO1 / element.content.length
    ).toFixed(3);
    objToBeInserted.CO2 = +(
      objToBeInserted.CO2 / element.content.length
    ).toFixed(3);
    objToBeInserted.CO3 = +(
      objToBeInserted.CO3 / element.content.length
    ).toFixed(3);
    objToBeInserted.CO4 = +(
      objToBeInserted.CO4 / element.content.length
    ).toFixed(3);
    objToBeInserted.CO5 = +(
      objToBeInserted.CO5 / element.content.length
    ).toFixed(3);

    element.content.push(objToBeInserted);
    return element;
  });
  return arrayWithTotals;
};

const GetExcel = (props: Props) => {
  const [_3rdSemData, set_3rdSemData] = useState();
  const [_3rdSemDataAIML, set_3rdSemDataAIML] = useState();
  const [_3rdSemDataIoT, set_3rdSemDataIoT] = useState();
  const [_5thSemData, set_5thSemData] = useState();
  const [_5thSemDataAIML, set_5thSemDataAIML] = useState();
  const [_5thSemDataIoT, set_5thSemDataIoT] = useState();

  useEffect(() => {
    fetch("http://localhost:3011/get-excel-data?sem=3&branch=cse")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const arrayWithTotals = transformData(data);
        set_3rdSemData(arrayWithTotals);
      });
    fetch("http://localhost:3011/get-excel-data?sem=3&branch=aiml")
      .then((response) => response.json())
      .then((data) => {
        const arrayWithTotals = transformData(data);
        set_3rdSemDataAIML(arrayWithTotals);
      });
    fetch("http://localhost:3011/get-excel-data?sem=3&branch=iot")
      .then((response) => response.json())
      .then((data) => {
        const arrayWithTotals = transformData(data);
        set_3rdSemDataIoT(arrayWithTotals);
      });
    fetch("http://localhost:3011/get-excel-data?sem=5&branch=cse")
      .then((response) => response.json())
      .then((data) => {
        const arrayWithTotals = transformData(data);
        set_5thSemData(arrayWithTotals);
      });
    fetch("http://localhost:3011/get-excel-data?sem=5&branch=aiml")
      .then((response) => response.json())
      .then((data) => {
        const arrayWithTotals = transformData(data);
        set_5thSemDataAIML(arrayWithTotals);
      });
    fetch("http://localhost:3011/get-excel-data?sem=5&branch=iot")
      .then((response) => response.json())
      .then((data) => {
        const arrayWithTotals = transformData(data);
        set_5thSemDataIoT(arrayWithTotals);
      });
  }, []);

  const handleDownload = (sem: number) => {
    let fileName = "";
    switch (sem) {
      case 3:
        fileName = "3rdSemFeedbackData";
        break;
      case 4:
        fileName = "4thSemFeedbackData";
        break;
      case 5:
        fileName = "5thSemFeedbackData";
        break;
      case 6:
        fileName = "6thSemFeedbackData";
        break;
      case 7:
        fileName = "7thSemFeedbackData";
        break;
      case 13:
        fileName = "3rdSemAIMLFeedbackData";
        break;
      case 23:
        fileName = "3rdSemIoTFeedbackData";
        break;
      case 15:
        fileName = "5thSemAIMLFeedbackData";
        break;
      case 25:
        fileName = "5thSemIoTFeedbackData";
        break;
    }
    const setting = {
      fileName: fileName,
      extraLength: 3,
    };
    switch (sem) {
      case 3:
        _3rdSemData && xlsx(_3rdSemData, setting);
        break;
      case 5:
        _5thSemData && xlsx(_5thSemData, setting);
        break;
      case 13:
        _3rdSemDataAIML && xlsx(_3rdSemDataAIML, setting);
        break;
      case 15:
        _5thSemDataAIML && xlsx(_5thSemDataAIML, setting);
        break;
      case 23:
        _3rdSemDataIoT && xlsx(_3rdSemDataIoT, setting);
        break;
      case 25:
        _5thSemDataIoT && xlsx(_5thSemDataIoT, setting);
        break;
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => handleDownload(3)}
        disabled={_3rdSemData === undefined}
      >
        GetExcel3rd
      </Button>
      <Button
        variant="contained"
        onClick={() => handleDownload(13)}
        disabled={_3rdSemDataAIML === undefined}
      >
        GetExcel3rdAIML
      </Button>
      <Button
        variant="contained"
        onClick={() => handleDownload(23)}
        disabled={_3rdSemDataIoT === undefined}
      >
        GetExcel3rdIoT
      </Button>

      <Button
        variant="contained"
        onClick={() => handleDownload(5)}
        disabled={_5thSemData === undefined}
      >
        GetExcel5th
      </Button>
      <Button
        variant="contained"
        onClick={() => handleDownload(15)}
        disabled={_5thSemDataAIML === undefined}
      >
        GetExcel5thAIML
      </Button>
      <Button
        variant="contained"
        onClick={() => handleDownload(25)}
        disabled={_5thSemDataIoT === undefined}
      >
        GetExcel5thIoT
      </Button>
    </>
  );
};

export default GetExcel;
