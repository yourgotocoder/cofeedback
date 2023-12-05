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
  const [_4thSemData, set_4thSemData] = useState();
  const [_5thSemData, set_5thSemData] = useState();
  const [_6thSemData, set_6thSemData] = useState();
  const [_7thSemData, set_7thSemData] = useState();
  const [_AISemData, set_AISemData] = useState();

  useEffect(() => {
    fetch("http://localhost:3011/get-excel-data-3rd-sem")
      .then((response) => response.json())
      .then((data) => {
        const arrayWithTotals = transformData(data);
        set_3rdSemData(arrayWithTotals);
      });
    fetch("http://localhost:3011/get-excel-data-aiml-sem")
      .then((response) => response.json())
      .then((data) => {
        const arrayWithTotals = transformData(data);
        set_AISemData(arrayWithTotals);
      });

    fetch("http://localhost:3011/get-excel-data-4th-sem")
      .then((response) => response.json())
      .then((data) => {
        const arrayWithTotals = transformData(data);
        set_4thSemData(arrayWithTotals);
      });
    fetch("http://localhost:3011/get-excel-data-5th-sem")
      .then((response) => response.json())
      .then((data) => {
        const arrayWithTotals = transformData(data);
        set_5thSemData(arrayWithTotals);
      });
    fetch("http://localhost:3011/get-excel-data-6th-sem")
      .then((response) => response.json())
      .then((data) => {
        const arrayWithTotals = transformData(data);
        set_6thSemData(arrayWithTotals);
      });
    fetch("http://localhost:3011/get-excel-data-7th-sem")
      .then((response) => response.json())
      .then((data) => {
        const arrayWithTotals = transformData(data);
        set_7thSemData(arrayWithTotals);
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
      case 9:
        fileName = "AIMLFeedbackData";
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
      case 4:
        _4thSemData && xlsx(_4thSemData, setting);
        break;
      case 5:
        _5thSemData && xlsx(_5thSemData, setting);
        break;
      case 6:
        _6thSemData && xlsx(_6thSemData, setting);
        break;
      case 7:
        _7thSemData && xlsx(_7thSemData, setting);
        break;
      case 9:
        _AISemData && xlsx(_AISemData, setting);
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
        onClick={() => handleDownload(9)}
        disabled={_AISemData === undefined}
      >
        GetExcelAIML
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
        onClick={() => handleDownload(7)}
        disabled={_7thSemData === undefined}
      >
        GetExcel7th
      </Button>

      <Button
        variant="contained"
        onClick={() => handleDownload(4)}
        disabled={_4thSemData === undefined}
      >
        GetExcel4th
      </Button>
      <Button
        variant="contained"
        onClick={() => handleDownload(6)}
        disabled={_6thSemData === undefined}
      >
        GetExcel6th
      </Button>
    </>
  );
};

export default GetExcel;
