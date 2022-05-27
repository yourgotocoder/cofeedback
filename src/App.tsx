import React, { useState } from "react";
import "./App.css";
import MainPage6thSem from "./components/SixthSem/MainPage";
import MainPage4thSem from "./components/FourthSem/MainPage";
import SelectSemester from "./components/SelectSemester";

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
            {semester === 4 ? <MainPage4thSem /> : <MainPage6thSem />}
        </>
    );
}

export default App;
