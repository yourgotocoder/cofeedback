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
import Questions from "../Questions";
import Loading from "../Loading";
import Alert from "@mui/material/Alert";
import AnimatedText from "../AnimatedText";

type SubjectQuestions = {
    [key: string]: string[];
};

interface FeedbackQuestions {
    "Main Subjects"?: SubjectQuestions;
    Lab?: SubjectQuestions;
}

const MainPage = () => {
    const [questions, setQuestions] = useState<FeedbackQuestions>({
        "Main Subjects": {},
        Lab: {},
    });

    const [progress, setProgress] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);
    const progressRef = React.useRef(() => { });

    const [initialLoading, setInitialLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [steps, setSteps] = useState<string[]>([""]);

    const [coFeedback, setCoFeedback] = useState<any[]>([]);

    const fetchQuestions = async () => {
        const response = await fetch("QuestionsAIML.json", {
            headers: {
                "Content-Type": "appication/json",
                Accept: "application/json",
            },
        });
        const data = await response.json();

        const keys = Object.keys(data);
        setSteps(keys);
        console.log(data);
        setQuestions(data);
        setInitialLoading(false);
    };

    const handleRatingChange = (
        subjectName: string,
        coNumber: number,
        rating: number | null,
    ) => {
        let newField = { subject: subjectName, co: coNumber, rating };
        const indexOFExisting = coFeedback.findIndex(
            (el) => el.subject === subjectName && el.co === coNumber,
        );
        if (indexOFExisting === -1) {
            if (rating !== null) {
                setCoFeedback([...coFeedback, newField]);
            }
        } else {
            if (rating !== null) {
                const newFeedBackState = [...coFeedback];
                newFeedBackState[indexOFExisting] = newField;
                setCoFeedback(newFeedBackState);
            } else {
                const newFeedBackState = [...coFeedback];
                newFeedBackState.splice(indexOFExisting, 1);
                setCoFeedback(newFeedBackState);
            }
        }
    };

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
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

    const [activeLabStep, setLabInnerStep] = React.useState(0);

    const handleLabNext = () => {
        setLabInnerStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleLabBack = () => {
        setLabInnerStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleSubmit = async () => {
        setSubmitting(true);
        console.log(coFeedback);
        const response = await fetch(
            `${process.env.REACT_APP_API_ROUTE}submit-feedback-aiml`,
            {
                method: "POST",
                body: JSON.stringify(coFeedback),
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
                setBuffer(10);
            } else {
                const diff = Math.random() * 10;
                const diff2 = Math.random() * 10;
                setProgress(progress + diff);
                setBuffer(progress + diff + diff2);
            }
        };

        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        const data = await response.json();
        if (response.ok) {
            setSubmitted(true);
            clearInterval(timer);
        }
    };

    let content;

    if (initialLoading) {
        content = <Loading />;
    }

    if (!initialLoading) {
        content = (
            <Box
                sx={{
                    minWidth: "100vw",
                    minHeight: "100vh",
                    paddingTop: "2rem",
                }}
            >
                <Card sx={{ minWidth: "60vw", maxWidth: "95vw", margin: "auto" }}>
                    <CardContent>
                        {
                            <div>
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                        textAlign: "center",
                                    }}
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
                                    <Stepper activeStep={activeStep} orientation="vertical">
                                        <Step>
                                            <StepLabel>{steps[0]}</StepLabel>
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
                                                        {!!questions["Main Subjects"] &&
                                                            Object.keys(questions["Main Subjects"]).map(
                                                                (keyValue, indexOfStep) => (
                                                                    <Step key={keyValue}>
                                                                        <StepLabel>{keyValue}</StepLabel>
                                                                        <StepContent
                                                                            TransitionProps={{
                                                                                unmountOnExit: false,
                                                                            }}
                                                                        >
                                                                            {!!questions["Main Subjects"] &&
                                                                                questions["Main Subjects"][
                                                                                    keyValue
                                                                                ].map((question, indexValue) => (
                                                                                    <Questions
                                                                                        label={question}
                                                                                        key={question}
                                                                                        ratingChange={handleRatingChange}
                                                                                        coNumber={indexValue + 1}
                                                                                        rating={null}
                                                                                        subjectName={keyValue}
                                                                                    />
                                                                                ))}
                                                                            {activeInnerStep ===
                                                                                (!!questions["Main Subjects"] &&
                                                                                    Object.keys(questions["Main Subjects"])
                                                                                        .length - 1) ? (
                                                                                <Box>
                                                                                    <>
                                                                                        <Button
                                                                                            onClick={handleNext}
                                                                                            variant="contained"
                                                                                            sx={{
                                                                                                mt: 1,
                                                                                                mr: 1,
                                                                                            }}
                                                                                            disabled={
                                                                                                (indexOfStep === 0 &&
                                                                                                    coFeedback.length < 5) ||
                                                                                                (indexOfStep === 1 &&
                                                                                                    coFeedback.length < 10) ||
                                                                                                (indexOfStep === 2 &&
                                                                                                    coFeedback.length < 15) ||
                                                                                                (indexOfStep === 3 &&
                                                                                                    coFeedback.length < 20) ||
                                                                                                (indexOfStep === 4 &&
                                                                                                    coFeedback.length < 25) ||
                                                                                                (indexOfStep === 5 &&
                                                                                                    coFeedback.length < 30) ||
                                                                                                (indexOfStep === 6 &&
                                                                                                    coFeedback.length < 34)
                                                                                            }
                                                                                        >
                                                                                            Next
                                                                                        </Button>

                                                                                        <Button
                                                                                            onClick={handleInnerBack}
                                                                                            sx={{
                                                                                                mt: 1,
                                                                                                mr: 1,
                                                                                            }}
                                                                                            variant="outlined"
                                                                                        >
                                                                                            Back
                                                                                        </Button>
                                                                                    </>
                                                                                </Box>
                                                                            ) : (
                                                                                <Box
                                                                                    sx={{
                                                                                        mb: 2,
                                                                                    }}
                                                                                >
                                                                                    <div>
                                                                                        <Button
                                                                                            variant="contained"
                                                                                            onClick={handleInnerNext}
                                                                                            sx={{
                                                                                                mt: 1,
                                                                                                mr: 1,
                                                                                            }}
                                                                                            disabled={
                                                                                                (indexOfStep === 0 &&
                                                                                                    coFeedback.length < 5) ||
                                                                                                (indexOfStep === 1 &&
                                                                                                    coFeedback.length < 10) ||
                                                                                                (indexOfStep === 2 &&
                                                                                                    coFeedback.length < 15) ||
                                                                                                (indexOfStep === 3 &&
                                                                                                    coFeedback.length < 20) ||
                                                                                                (indexOfStep === 4 &&
                                                                                                    coFeedback.length < 25) ||
                                                                                                (indexOfStep === 5 &&
                                                                                                    coFeedback.length < 30) ||
                                                                                                (indexOfStep === 6 &&
                                                                                                    coFeedback.length < 34)
                                                                                            }
                                                                                        >
                                                                                            Continue
                                                                                        </Button>
                                                                                        {activeInnerStep === 0 ? (
                                                                                            <Button
                                                                                                onClick={handleBack}
                                                                                                sx={{
                                                                                                    mt: 1,
                                                                                                    mr: 1,
                                                                                                }}
                                                                                            >
                                                                                                Back
                                                                                            </Button>
                                                                                        ) : (
                                                                                            <Button
                                                                                                onClick={handleInnerBack}
                                                                                                sx={{
                                                                                                    mt: 1,
                                                                                                    mr: 1,
                                                                                                }}
                                                                                                variant="outlined"
                                                                                            >
                                                                                                Back
                                                                                            </Button>
                                                                                        )}
                                                                                    </div>
                                                                                </Box>
                                                                            )}
                                                                        </StepContent>
                                                                    </Step>
                                                                ),
                                                            )}
                                                    </Stepper>
                                                </Box>
                                                <Box sx={{ mb: 2 }}>
                                                    <div>
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
                                            <StepLabel>{steps[1]}</StepLabel>
                                            <StepContent
                                                TransitionProps={{
                                                    unmountOnExit: false,
                                                }}
                                            >
                                                <Box>
                                                    <Stepper
                                                        activeStep={activeLabStep}
                                                        orientation="vertical"
                                                    >
                                                        {!!questions["Lab"] &&
                                                            Object.keys(questions["Lab"]).map(
                                                                (keyValue, indexOfStep) => (
                                                                    <Step key={keyValue}>
                                                                        <StepLabel>{keyValue}</StepLabel>
                                                                        <StepContent
                                                                            TransitionProps={{
                                                                                unmountOnExit: false,
                                                                            }}
                                                                        >
                                                                            {!!questions["Lab"] &&
                                                                                questions["Lab"][keyValue].map(
                                                                                    (question, indexValue) => (
                                                                                        <Questions
                                                                                            label={question}
                                                                                            key={question}
                                                                                            ratingChange={handleRatingChange}
                                                                                            coNumber={indexValue + 1}
                                                                                            rating={null}
                                                                                            subjectName={keyValue}
                                                                                        />
                                                                                    ),
                                                                                )}
                                                                            {activeLabStep ===
                                                                                (!!questions["Lab"] &&
                                                                                    Object.keys(questions["Lab"]).length -
                                                                                    1) ? (
                                                                                <Box>
                                                                                    <>
                                                                                        <Button
                                                                                            onClick={handleNext}
                                                                                            variant="contained"
                                                                                            disabled={
                                                                                                (indexOfStep === 0 &&
                                                                                                    coFeedback.length < 39) ||
                                                                                                (indexOfStep === 1 &&
                                                                                                    coFeedback.length < 44)
                                                                                            }
                                                                                            sx={{
                                                                                                mt: 1,
                                                                                                mr: 1,
                                                                                            }}
                                                                                        >
                                                                                            Next
                                                                                        </Button>

                                                                                        <Button
                                                                                            onClick={handleLabBack}
                                                                                            sx={{
                                                                                                mt: 1,
                                                                                                mr: 1,
                                                                                            }}
                                                                                            variant="outlined"
                                                                                        >
                                                                                            Back
                                                                                        </Button>
                                                                                    </>
                                                                                </Box>
                                                                            ) : (
                                                                                <Box
                                                                                    sx={{
                                                                                        mb: 2,
                                                                                    }}
                                                                                >
                                                                                    <div>
                                                                                        <Button
                                                                                            variant="contained"
                                                                                            onClick={handleLabNext}
                                                                                            sx={{
                                                                                                mt: 1,
                                                                                                mr: 1,
                                                                                            }}
                                                                                            disabled={
                                                                                                (indexOfStep === 0 &&
                                                                                                    coFeedback.length < 39) ||
                                                                                                (indexOfStep === 1 &&
                                                                                                    coFeedback.length < 44)
                                                                                            }
                                                                                        >
                                                                                            Continue
                                                                                        </Button>
                                                                                        {activeLabStep === 0 ? (
                                                                                            <Button
                                                                                                onClick={handleBack}
                                                                                                sx={{
                                                                                                    mt: 1,
                                                                                                    mr: 1,
                                                                                                }}
                                                                                            >
                                                                                                Back
                                                                                            </Button>
                                                                                        ) : (
                                                                                            <Button
                                                                                                onClick={handleLabBack}
                                                                                                sx={{
                                                                                                    mt: 1,
                                                                                                    mr: 1,
                                                                                                }}
                                                                                                variant="outlined"
                                                                                            >
                                                                                                Back
                                                                                            </Button>
                                                                                        )}
                                                                                    </div>
                                                                                </Box>
                                                                            )}
                                                                        </StepContent>
                                                                    </Step>
                                                                ),
                                                            )}
                                                    </Stepper>
                                                </Box>
                                            </StepContent>
                                        </Step>
                                    </Stepper>
                                    {coFeedback.length === 44 && (
                                        <Box>
                                            <Paper
                                                square
                                                elevation={1}
                                                sx={{
                                                    p: 3,
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Typography>
                                                    All steps completed - Submit if you are satisfied with
                                                    your selections
                                                </Typography>
                                                <Button
                                                    onClick={handleSubmit}
                                                    disabled={submitting}
                                                    sx={{ mt: 1, mr: 1 }}
                                                    variant="contained"
                                                >
                                                    Submit
                                                </Button>
                                                {submitting && (
                                                    <>
                                                        <AnimatedText word="Submitting"></AnimatedText>
                                                    </>
                                                )}
                                            </Paper>
                                        </Box>
                                    )}
                                </Box>
                            </div>
                        }
                    </CardContent>
                </Card>
            </Box>
        );
    }

    if (submitted) {
        content = <Alert severity="success">Feedback submitted successfully</Alert>;
    }

    return <>{content}</>;
};

export default MainPage;
