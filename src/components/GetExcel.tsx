import React, { useEffect, useState } from "react";
import xlsx from "json-as-xlsx";
import Button from "@mui/material/Button";

type Props = {};

const GetExcel = (props: Props) => {
    const [_4thSemData, set_4thSemData] = useState();
    useEffect(() => {
        fetch("http://localhost:3011/get-excel-data-4th-sem")
            .then((response) => response.json())
            .then((data) => {
                set_4thSemData(data.data);
                console.log(data.data);
            });
    }, []);

    const handleDownload = () => {
        const setting = {
            fileName: "4thSemFeedbackData",
        };
        if (_4thSemData) {
            xlsx(_4thSemData, setting);
        }
    };

    return (
        <Button
            variant="contained"
            onClick={handleDownload}
            disabled={_4thSemData === undefined}
        >
            GetExcel
        </Button>
    );
};

export default GetExcel;
