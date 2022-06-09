import React, { useEffect, useState } from "react";
import xlsx from "json-as-xlsx";
import Button from "@mui/material/Button";

type Props = {};

const trandformData = (data: any) => {
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
    const [_4thSemData, set_4thSemData] = useState();
    const [_6thSemData, set_6thSemData] = useState();

    useEffect(() => {
        fetch("http://localhost:3011/get-excel-data-4th-sem")
            .then((response) => response.json())
            .then((data) => {
                const arrayWithTotals = trandformData(data);
                set_4thSemData(arrayWithTotals);
                console.log(arrayWithTotals);
            });
    }, []);

    const handleDownload = () => {
        const setting = {
            fileName: "4thSemFeedbackData",
            extraLength: 3,
        };
        if (_4thSemData) {
            xlsx(_4thSemData, setting);
        }
    };

    const handle6thDownload = () => {
        const setting = {
            fileName: "6thSemFeedbackData",
            extraLength: 3,
        };
        if (_6thSemData) {
            xlsx(_6thSemData, setting);
        }
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleDownload}
                disabled={_4thSemData === undefined}
            >
                GetExcel4th
            </Button>
            <Button
                variant="contained"
                onClick={handle6thDownload}
                disabled={_6thSemData === undefined}
            >
                GetExcel6th
            </Button>
        </>
    );
};

export default GetExcel;
