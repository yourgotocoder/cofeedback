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

const MainPage = () => {
    const [questions, setQuestions] = useState<FeedbackQuestions>({
        "Minor Specialization": {},
        "Elective One": {},
        "Elective Two": {},
        "Main Subjects": {},
        Lab: {},
    });

    const [steps, setSteps] = useState<string[]>([""]);
    const [selectedElectiveOne, setSelectedElectiveOne] = useState<string>();
    const [selectedElectiveTwo, setSelectedElectiveTwo] = useState<string>();
    const [selectedMinorSpecialization, setSelectedMinorSpecialization] =
        useState<string>();

    const fetchQuestions = async () => {
        const response = await fetch("QuestionsFourthSem.json", {
            headers: {
                "Content-Type": "appication/json",
                Accept: "application/json",
            },
        });
        const data = await response.json();
        const keys = Object.keys(data);
        keys.unshift("Choose your electives and minor specialization");
        setSteps(keys);
        setQuestions(data);
    };

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log(
            selectedElectiveOne,
            selectedElectiveTwo,
            selectedMinorSpecialization
        );
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [activeInnerStep, setActiveInnerStep] = React.useState(0);

    const handleInnerNext = () => {
        setActiveInnerStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleInnerBack = () => {
        setActiveInnerStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleElectiveOneChange = (value: string) => {
        setSelectedElectiveOne(value);
    };
    const handleElectiveTwoChange = (value: string) => {
        setSelectedElectiveTwo(value);
    };
    const handleMinorChange = (value: string) => {
        setSelectedMinorSpecialization(value);
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
                                    alignItems: "center",
                                    flexDirection: "column",
                                }}
                            >
                                <Stepper
                                    activeStep={activeStep}
                                    orientation="vertical"
                                >
                                    <Step>
                                        <StepLabel>
                                            {steps && steps[0]}
                                        </StepLabel>
                                        <StepContent
                                            TransitionProps={{
                                                unmountOnExit: false,
                                            }}
                                            sx={{
                                                marginTop: "1rem",
                                            }}
                                        >
                                            <Stack spacing={1}>
                                                <Box>
                                                    {!!questions[
                                                        "Elective One"
                                                    ] && (
                                                        <SelectSubjects
                                                            label="Elective One"
                                                            subjectObject={
                                                                questions[
                                                                    "Elective One"
                                                                ]
                                                            }
                                                            handleElectiveChange={
                                                                handleElectiveOneChange
                                                            }
                                                        />
                                                    )}
                                                </Box>
                                                <Box>
                                                    {!!questions[
                                                        "Elective Two"
                                                    ] && (
                                                        <SelectSubjects
                                                            label="Elective Two"
                                                            subjectObject={
                                                                questions[
                                                                    "Elective Two"
                                                                ]
                                                            }
                                                            handleElectiveChange={
                                                                handleElectiveTwoChange
                                                            }
                                                        />
                                                    )}
                                                </Box>
                                                <Box>
                                                    {!!questions[
                                                        "Minor Specialization"
                                                    ] && (
                                                        <SelectSubjects
                                                            label="Minor Specialization"
                                                            subjectObject={
                                                                questions[
                                                                    "Minor Specialization"
                                                                ]
                                                            }
                                                            handleElectiveChange={
                                                                handleMinorChange
                                                            }
                                                        />
                                                    )}
                                                </Box>
                                            </Stack>
                                            <Box sx={{ mb: 2 }}>
                                                <div>
                                                    <Button
                                                        disabled={
                                                            !selectedElectiveOne ||
                                                            !selectedElectiveTwo ||
                                                            !selectedMinorSpecialization
                                                        }
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
                                                        disabled={true}
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
                                    <Step>
                                        <StepLabel>{steps[1]}</StepLabel>
                                        <StepContent
                                            TransitionProps={{
                                                unmountOnExit: false,
                                            }}
                                        >
                                            <Box>
                                                <Stepper
                                                    activeStep={activeInnerStep}
                                                    orientation="vertical"
                                                >
                                                    <Step>
                                                        <StepLabel>
                                                            Lable
                                                        </StepLabel>
                                                        <StepContent>
                                                            <Box sx={{ mb: 2 }}>
                                                                <div>
                                                                    <Button
                                                                        variant="contained"
                                                                        onClick={
                                                                            handleInnerNext
                                                                        }
                                                                        sx={{
                                                                            mt: 1,
                                                                            mr: 1,
                                                                        }}
                                                                    >
                                                                        Continue
                                                                    </Button>
                                                                    <Button
                                                                        onClick={
                                                                            handleInnerBack
                                                                        }
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
                                            </Box>
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
                                    <Step>
                                        <StepLabel>{steps[2]}</StepLabel>
                                        <StepContent>
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
                                    <Step>
                                        <StepLabel>{steps[3]}</StepLabel>
                                        <StepContent>
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
                                    <Step>
                                        <StepLabel>{steps[4]}</StepLabel>
                                        <StepContent>
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
                                    <Step>
                                        <StepLabel>{steps[5]}</StepLabel>
                                        <StepContent>
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
                                    <Box>
                                        <Paper
                                            square
                                            elevation={0}
                                            sx={{ p: 3 }}
                                        >
                                            <Typography>
                                                All steps completed -
                                                you&apos;re finished
                                            </Typography>
                                            <Button
                                                onClick={handleReset}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Reset
                                            </Button>
                                        </Paper>
                                    </Box>
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
