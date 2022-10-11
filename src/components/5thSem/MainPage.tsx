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
import Questions from "../common/Questions";
import Loading from "../common/Loading";
import Alert from "@mui/material/Alert";
import AnimatedText from "../common/AnimatedText";
import SubjectRating from "../common/SubjectRating";

const steps = ["Select Electives", "Feedback"];

const MainSubjects: string[] = [
  "MA1502 PROBABILITY, STATISTICS AND STOCHASTIC PROCESSES",
  "CS1502 OPERATING SYSTEM",
  "CS 1508 COMPUTER NETWORKS-I",
  "CS 1509 SOFTWARE ENGINEERING",
];

const Labs: string[] = [
  "CS 1561 OPERATING SYSTEM LAB",
  "CS 1566 SOFTWARE ENGINEERING AND OBJECT ORIENTED ANALYSIS LAB",
  "CS 1567 SCRIPTING LANGUAGE LAB",
];

const ElectiveII: string[] = [
  "CS1537 ADVANCED WEB TECHNOLOGIES",
  "CS1535 GRAPH THEORY",
  "CS1532 ADVANCED JAVA PROGRAMMING",
];

const ElectiveIII: string[] = [
  "CS1759/1644 ARTIFICIAL INTELLIGENCE",
  "CS1545 ARTIFICIAL NEURAL NETWORK",
  "CS1541 DIGITAL IMAGE PROCESSING",
  "CS1669 DESIGN THINKING",
];
const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  let content = <Loading />;
  if (!isLoading) content = <MainPageContent />;
  return content;
};

const MainPageContent = () => {
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

  const [electiveTwo, setElectiveTwo] = useState("");

  const handleElectiveTwoChange = (value: string) => {
    setElectiveTwo(value);
  };

  const [electiveThree, setElectiveThree] = useState("");

  const handleElectiveThreeChange = (value: string) => {
    setElectiveThree(value);
  };

  const handleSubjectRatingChange = (
    subjectName: string,
    label: string,
    value: number | null
  ) => {
    console.log(subjectName, label, value);
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
            <Box sx={{ maxWidth: "100%", alignItems: "center" }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step}>
                    <StepLabel
                      optional={
                        index === 2 ? (
                          <Typography variant="caption">Last step</Typography>
                        ) : null
                      }
                    >
                      {step}
                    </StepLabel>
                    <StepContent TransitionProps={{ unmountOnExit: false }}>
                      {index === 0 && (
                        <Typography>
                          <SelectSubjects
                            label="Elective II"
                            subjectObject={ElectiveII}
                            handleElectiveChange={handleElectiveTwoChange}
                          />
                          <SelectSubjects
                            label="Elective III"
                            subjectObject={ElectiveIII}
                            handleElectiveChange={handleElectiveThreeChange}
                          />
                        </Typography>
                      )}
                      {index === 1 && (
                        <Box sx={{ m: 1 }}>
                          {MainSubjects.map((subject) => (
                            <SubjectRating
                              key={subject}
                              subjectLabel={subject}
                              subjectRatings={handleSubjectRatingChange}
                            ></SubjectRating>
                          ))}
                          {electiveTwo !== "" && (
                            <SubjectRating
                              subjectLabel={electiveTwo}
                              subjectRatings={handleSubjectRatingChange}
                            />
                          )}
                          {electiveThree !== "" && (
                            <SubjectRating
                              subjectLabel={electiveThree}
                              subjectRatings={handleSubjectRatingChange}
                            />
                          )}
                          {Labs.map((subject) => (
                            <SubjectRating
                              key={subject}
                              subjectLabel={subject}
                              subjectRatings={handleSubjectRatingChange}
                            />
                          ))}
                        </Box>
                      )}
                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            {index === steps.length - 1 ? "Finish" : "Continue"}
                          </Button>
                          <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button>
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                  </Button>
                </Paper>
              )}
            </Box>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MainPage;
