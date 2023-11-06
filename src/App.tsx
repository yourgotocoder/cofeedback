import React, { useState } from "react";
import "./App.css";
import MainPage6thSem from "./components/SixthSem/MainPage";
import MainPage3rdSem from "./components/ThirdSem/MainPage";
import MainPage4thSem from "./components/FourthSem/MainPage";
import SelectSemester from "./components/SelectSemester";
import GetExcel from "./components/GetExcel";

function App() {
    const [semester, setSemester] = useState<number | null>(null);

    const handleSemesterSelected = (semester: number) => {
        setSemester(semester);
    };

    return (
        <>
            {semester === null && (
                <SelectSemester handleSemesterSelected={handleSemesterSelected} />
            )}
            {semester === 3 && <MainPage3rdSem />}{" "}
            {/* {semester === 6 && <MainPage6thSem />} */}
            {/* <GetExcel /> */}
        </>
    );
}

export default App;
