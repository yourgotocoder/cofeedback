import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SelectSubjects from "./SelectSubjects";

type SubjectQuestions = {
    [key: string]: string[];
};

interface FeedbackQuestions {
    "Main Subjects"?: SubjectQuestions;
    "Elective One"?: SubjectQuestions;
    "Elective Two"?: SubjectQuestions;
    Lab?: SubjectQuestions;
    "Minor Specialization": SubjectQuestions;
}

const steps = [
    {
        label: "Select campaign settings",
        description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: "Create an ad group",
        description:
            "An ad group contains one or more ads which target a shared set of keywords.",
    },
    {
        label: "Create an ad",
        description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
];

const MainPage = () => {
    const [questions, setQuestions] = useState<FeedbackQuestions>({
        "Minor Specialization": {},
        "Elective One": {},
        "Elective Two": {},
        "Main Subjects": {},
        Lab: {},
    });

    const fetchQuestions = async () => {
        const response = await fetch("QuestionsFourthSem.json", {
            headers: {
                "Content-Type": "appication/json",
                Accept: "application/json",
            },
        });
        const data = await response.json();
        setQuestions(data);
    };

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleElectiveOneChange = (value: string) => {
        console.log(value);
    };

    return (
        <Box
            sx={{
                minWidth: "100vw",
                minHeight: "100vh",
                paddingTop: "2rem",
            }}
        >
            <Card sx={{ minWidth: "60vw", maxWidth: "95vw", margin: "auto" }}>
                <CardContent>
                    {!!questions && (
                        <div>
                            <Typography
                                sx={{ fontSize: 14, textAlign: "center" }}
                                color="text.primary"
                                gutterBottom
                            >
                                Please provide your valuable feedback
                            </Typography>
                            <Box
                                sx={{
                                    maxWidth: "100%",
                                    minWidth: "60%",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Stepper
                                    activeStep={activeStep}
                                    orientation="vertical"
                                >
                                    <Step>
                                        <StepLabel>
                                            Choose your electives and minor
                                            specialization
                                        </StepLabel>
                                        <StepContent>
                                            <Stack spacing={1}>
                                                <Box>
                                                    <FormControl>
                                                        <FormLabel id="demo-row-radio-buttons-group-label">
                                                            Elective 1
                                                        </FormLabel>
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                                            name="row-radio-buttons-group"
                                                            onChange={(e) =>
                                                                handleElectiveOneChange(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            {!!questions[
                                                                "Elective One"
                                                            ] &&
                                                                Object.keys(
                                                                    questions[
                                                                        "Elective One"
                                                                    ]
                                                                ).map(
                                                                    (
                                                                        keyName
                                                                    ) => (
                                                                        <FormControlLabel
                                                                            key={
                                                                                keyName
                                                                            }
                                                                            value={
                                                                                keyName
                                                                            }
                                                                            control={
                                                                                <Radio />
                                                                            }
                                                                            label={
                                                                                keyName
                                                                            }
                                                                        />
                                                                    )
                                                                )}
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Box>
                                                <Box>
                                                    {!!questions[
                                                        "Elective One"
                                                    ] && (
                                                        <SelectSubjects
                                                            label="Elective Two"
                                                            subjectObject={
                                                                questions[
                                                                    "Elective Two"
                                                                ]
                                                            }
                                                            handleElectiveChange={
                                                                handleElectiveOneChange
                                                            }
                                                        />
                                                    )}
                                                </Box>
                                                <Box>3</Box>
                                            </Stack>
                                            <Box sx={{ mb: 2 }}>
                                                <div>
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleNext}
                                                        sx={{
                                                            mt: 1,
                                                            mr: 1,
                                                        }}
                                                    >
                                                        Continue
                                                    </Button>
                                                    <Button
                                                        onClick={handleBack}
                                                        sx={{
                                                            mt: 1,
                                                            mr: 1,
                                                        }}
                                                    >
                                                        Back
                                                    </Button>
                                                </div>
                                            </Box>
                                        </StepContent>
                                    </Step>
                                </Stepper>
                                {activeStep === steps.length && (
                                    <Paper square elevation={0} sx={{ p: 3 }}>
                                        <Typography>
                                            All steps completed - you&apos;re
                                            finished
                                        </Typography>
                                        <Button
                                            onClick={handleReset}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Reset
                                        </Button>
                                    </Paper>
                                )}
                            </Box>
                        </div>
                    )}
                    {!questions && <p>Loading</p>}
                </CardContent>
            </Card>
        </Box>
    );
};

export default MainPage;
