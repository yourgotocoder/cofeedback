import React, { useState } from "react";
import "./App.css";
import MainPage6thSem from "./components/SixthSem/MainPage";
import MainPage3rdSem from "./components/ThirdSem/MainPage";
import MainPageAIML from "./components/AIML/MainPage";
import MainPage7thSem from "./components/SeventhSem/MainPage";
import MainPage5thSem from "./components/FifthSem/MainPage";
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
            {semester === 7 && <MainPage7thSem />}{" "}
            {semester === 13 && <MainPageAIML />}{" "}
            {semester === 5 && <MainPage5thSem />}
            {/* {semester === 6 && <MainPage6thSem />} */}
            <GetExcel />
        </>
    );
}

export default App;
