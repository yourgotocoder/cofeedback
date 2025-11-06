import React, { useState } from "react";
import "./App.css";
import MainPage6thSem from "./components/SixthSem/MainPage";
import MainPage6thSemAIML from "./components/SixthSemAIML/MainPage";
import MainPage3rdSem from "./components/ThirdSem/MainPage";
import MainPage3rdSemIoT from "./components/ThirdSemIoT/MainPage";
import MainPage3rdSemAIML from "./components/ThirdSemAIML/MainPage";
import MainPageAIML from "./components/AIML/MainPage";
import MainPage7thSem from "./components/SeventhSem/MainPage";
import MainPage5thSem from "./components/FifthSem/MainPage";
import MainPage5thSemAIML from "./components/FifthSemAIML/MainPage";
import MainPage4thSem from "./components/FourthSem/MainPage";
import MainPage4thSemIoT from "./components/FourthSemIoT/MainPage";
import SelectSemester from "./components/SelectSemester";
import GetExcel from "./components/GetExcel";

function App() {
  const [semester, setSemester] = useState<number | null>(null);
  console.log("Production");
  const handleSemesterSelected = (semester: number) => {
    setSemester(semester);
  };

  return (
    <>
      {semester === null && (
        <SelectSemester handleSemesterSelected={handleSemesterSelected} />
      )}
      {semester === 3 && <MainPage3rdSem />}{" "}
      {semester === 13 && <MainPage3rdSemAIML />}{" "}
      {semester === 23 && <MainPage3rdSemIoT />}{" "}
      {/* {semester === 5 && <MainPage5thSem />} */}
      {/* {semester === 15 && <MainPage5thSemAIML />} */}
      {/* {semester === 7 && <MainPage7thSem />}{" "} */}
      {/* {semester === 14 && <MainPageAIML />}{" "} */}
      {/* {semester === 4 && <MainPage4thSem />}{" "} */}
      {/* {semester === 24 && <MainPage4thSemIoT />}{" "} */}
      {/* {semester === 6 && <MainPage6thSem />} */}
      {/* {semester === 16 && <MainPage6thSemAIML />} */}
      {/* <GetExcel /> */}
    </>
  );
}

export default App;
