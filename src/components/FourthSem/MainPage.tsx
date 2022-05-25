import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const fetchQuestions = async () => {
    const response = await fetch("QuestionsFourthSem.json", {
        headers: {
            "Content-Type": "appication/json",
            Accept: "application/json",
        },
    });
    const data = await response.json();
    return data;
};

const MainPage = () => {
    useEffect(() => {
        fetchQuestions().then((data) => console.log(data));
    }, []);
    return <div>MainPage</div>;
};

export default MainPage;
