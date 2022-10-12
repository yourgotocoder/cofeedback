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
  "CS1703 COMPILER DESIGN",
  "BA1710 INDUSTRIAL ENGINEERING MANAGEMENT",
];

const Labs: string[] = [
  "CS1762 COMPILER DESIGN LAB",
  "CS1763 INTELLIGENT SYSTEMS LAB",
];

const ElectiveVII: string[] = [
  "CS1733 CRYPTOGRAPHY AND NETWORK SECURITY",
  "CS1756 R PROGRAMMING",
  "CS1650 AGILE METHODOLOGY",
  "CS1789 ENGINEERING RESEARCH METHODOLOGY",
];

const ElectiveVIII: string[] = [
  "CS1746 HUMAN COMPUTER INTERACTION",
  "CS1659 ETHICAL HACKING",
  "CS1631 DEEP LEARNING ",
];

const OpenElectiveI: string[] = [
  "CS1723 IPR",
  "CS1728/CS1701 DISTRIBUTED SYSTEMS",
  "CS1724 OPTIMIZATION TECHNIQ UES",
  "CS1729 ENGINEERING RESEARCH METHODOLOGY",
  "EC1721 INDUSTRIAL IOT AND INDUSTRY 4.0",
  "EC1722 AUTOMATION AND ROBOTICS",
  "EC1723 MEMS AND NEMS DEVICES",
  "EE1724 MACHINE LEARNING",
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

  const [ratingsDetailElectiveSeven, setRatingsDetailElectiveSeven] =
    useState<any>({});
  const [ratingsDetailElectiveEight, setRatingsDetailElectiveEight] =
    useState<any>({});

  const [electiveSeven, setElectiveSeven] = useState("");

  const handleElectiveSevenChange = (value: string) => {
    setElectiveSeven(value);
    setRatingsDetailElectiveSeven({ [value]: ratingKeys });
  };

  const [section, setSection] = useState("");

  const handleSectionChange = (value: string) => {
    setSection(value);
  };

  const [electiveEight, setElectiveEight] = useState("");

  const handleElectiveEightChange = (value: string) => {
    setElectiveEight(value);
    setRatingsDetailElectiveEight({ [value]: ratingKeys });
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

  const handleSubjectRatingChangeElectiveSeven = (
    subjectName: string,
    label: string,
    value: number | null
  ) => {
    setRatingsDetailElectiveSeven((prevValue: any) => {
      return {
        ...prevValue,
        [subjectName]: {
          ...prevValue[subjectName],
          [label]: value,
        },
      };
    });
  };

  const handleSubjectRatingChangeElectiveEight = (
    subjectName: string,
    label: string,
    value: number | null
  ) => {
    setRatingsDetailElectiveEight((prevValue: any) => {
      return {
        ...prevValue,
        [subjectName]: {
          ...prevValue[subjectName],
          [label]: value,
        },
      };
    });
  };

  const [openElective, setOpenElective] = useState("");
  const [ratingsDetailOpenElective, setRatingDetailOpenElective] =
    useState<any>({});

  const handleOpenElectiveChange = (value: string) => {
    setOpenElective(value);
    setRatingDetailOpenElective({ [value]: ratingKeys });
  };

  const handleSubjectRatingChangeOpenElective = (
    subjectName: string,
    label: string,
    value: number | null
  ) => {
    setRatingDetailOpenElective((prevValue: any) => {
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
      ...ratingsDetailElectiveSeven,
      ...ratingsDetailElectiveEight,
      ...ratingsDetailOpenElective
    };
    for (let key in finalRatings) {
      for (let label in finalRatings[key]) {
        if (finalRatings[key][label] === null) {
          setInvalidForm(true);
          return;
        }
      }
    }
    setInvalidForm(false);
    const response = await fetch(`http://localhost:3011/submit-feedback`, {
      method: "POST",
      body: JSON.stringify({
        ratingData: { ...finalRatings },
        section: section,
        semester: 7,
      }),
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
                            label="Elective VII"
                            subjectObject={ElectiveVII}
                            handleElectiveChange={handleElectiveSevenChange}
                          />
                          <SelectSubjects
                            label="Elective VIII"
                            subjectObject={ElectiveVIII}
                            handleElectiveChange={handleElectiveEightChange}
                          />
                          <SelectSubjects
                            label="Open Elective"
                            subjectObject={OpenElectiveI}
                            handleElectiveChange={handleOpenElectiveChange}
                          />
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
                          {electiveSeven !== "" && (
                            <SubjectRating
                              subjectLabel={electiveSeven}
                              subjectRatings={
                                handleSubjectRatingChangeElectiveSeven
                              }
                            />
                          )}
                          {electiveEight !== "" && (
                            <SubjectRating
                              subjectLabel={electiveEight}
                              subjectRatings={
                                handleSubjectRatingChangeElectiveEight
                              }
                            />
                          )}
                          {openElective !== "" && (
                            <SubjectRating
                              subjectLabel={openElective}
                              subjectRatings={
                                handleSubjectRatingChangeOpenElective
                              }
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
                                electiveSeven === "" ||
                                electiveEight === "" ||
                                openElective === "" ||
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
