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
import SelectSubjects from "./SelectSubjects";
import Loading from "../common/Loading";
import SubjectRating from "../common/SubjectRating";
import FeedbackParameters from "../../FeedbackParameters";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";

const steps = ["Select Electives", "Feedback"];

const MainSubjects: string[] = [
  "MA1308 DISCRETE MATHEMATICS",
  "CS1302 DATA STRUCTURES",
  "CS1304 DIGITAL CIRCUITS AND LOGIC DESIGN",
  "CS1306 COMPUTER ORGANIZATION AND ARCHITECTURE",
  "CS1307 INTELLECTUAL PROPERTY RIGHT AND SOFTWARE",
  "CS1308 OBJECT ORIENTED CONCEPTS & PROGRAMMING USING C++"
];

const Labs: string[] = [
  "CS1361 DATA STRUCTURES LAB",
  "CS1363 DIGITAL CIRCUITS & LOGIC DESIGN LAB",
  "CS1365 OBJECT ORIENTED CONCEPTS & PROGRAMMING USING C++ LAB",
];

const ratingKeys = FeedbackParameters.reduce(
  (acc, key) => ({ ...acc, [key]: null }),
  {}
);

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
  const [ratingsDetail, setRatingsDetail] = useState<any>({});

  useEffect(() => {
    MainSubjects.forEach((subject) => {
      setRatingsDetail((prevValue: any) => {
        return {
          ...prevValue,
          [subject]: { ...ratingKeys },
        };
      });
    });
    Labs.forEach((subject) => {
      setRatingsDetail((prevValue: any) => {
        return {
          ...prevValue,
          [subject]: { ...ratingKeys },
        };
      });
    });
  }, []);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };


  const [section, setSection] = useState("");

  const handleSectionChange = (value: string) => {
    setSection(value);
  };

  const handleSubjectRatingChange = (
    subjectName: string,
    label: string,
    value: number | null
  ) => {
    setRatingsDetail((prevValue: any) => {
      return {
        ...prevValue,
        [subjectName]: {
          ...prevValue[subjectName],
          [label]: value,
        },
      };
    });
  };

  const [invalidForm, setInvalidForm] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    const finalRatings = {
      ...ratingsDetail,
    };
    for (let key in finalRatings) {
      for (let label in finalRatings[key]) {
        if (finalRatings[key][label] === null) {
          setInvalidForm(true);
          return;
        }
      }
    }
    setInvalidForm(false)
    const response = await fetch(`http://localhost:3011/submit-feedback`, {
      method: "POST",
      body: JSON.stringify({ ratingData: {...finalRatings}, section: section, semester: 5 }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setSubmitted(true);
    }
  };

  return (
    <Box
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        paddingTop: "2rem",
      }}
    >
      <Card sx={{ minWidth: "60vw", maxWidth: "100vw", margin: "auto" }}>
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
                        <>
                          <SelectSubjects
                            label="Section"
                            subjectObject={["A", "B", "C"]}
                            handleElectiveChange={handleSectionChange}
                          />
                        </>
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
                          {index === steps.length - 1 ? (
                            <Box sx={{ m: "auto", width: "300px" }}>
                              <Button
                                variant="contained"
                                sx={{ mt: 1, mr: 1, mb: 1 }}
                                onClick={handleSubmit}
                                // disabled={!invalidForm && submitting}
                              >
                                Finish
                              </Button>
                              {submitting && invalidForm && (
                                <Chip
                                  label="Please fill all the fields"
                                  color="error"
                                />
                              )}
                              {submitting && !invalidForm && (
                                <>
                                  <Chip
                                    label="Submitting form"
                                    color="success"
                                  />
                                  <LinearProgress />
                                </>
                              )}
                            </Box>
                          ) : (
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 1, mr: 1 }}
                              disabled={
                                section === ""
                              }
                            >
                              Continue
                            </Button>
                          )}
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MainPage;
