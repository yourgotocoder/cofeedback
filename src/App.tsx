import React, { useState } from "react";
import "./App.css";
import MainPage3rdSem from "./components/3rdSem/MainPage";
// import MainPage4thSem from "./components/FourthSem/MainPage";
import MainPage5thSem from "./components/5thSem/MainPage";
// import MainPage6thSem from "./components/SixthSem/MainPage";
import MainPage7thSem from "./components/7thSem/MainPage"
import SelectSemester from "./components/SelectSemester";
// import GetExcel from "./components/GetExcel";

function App() {
    const [semester, setSemester] = useState<number | null>(null);

    const handleSemesterSelected = (semester: number) => {
        setSemester(semester);
    };

    return (
        <>
            {semester === null && (
                <SelectSemester
                    handleSemesterSelected={handleSemesterSelected}
                />
            )}
            {semester === 3 && <MainPage3rdSem/>}
            {/* {semester === 4 && <MainPage4thSem />}{" "} */}
            {semester === 5 && <MainPage5thSem/>}
            {/* {semester === 6 && <MainPage6thSem />} */}
            {semester === 7 && <MainPage7thSem/>}
            {/* <GetExcel /> */}
        </>
    );
}

export default App;
