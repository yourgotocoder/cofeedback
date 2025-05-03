import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

type Props = {
    handleSemesterSelected: (selectedSemester: number) => void;
};

const semesterDisplay = (sem: number): string => {
    let semester = '';
    switch (sem) {
        case 3:
            semester = "Third Sem (CSE)"
            break;
        case 13:
            semester = "Third Sem (AI&ML)"
            break;
        case 23:
            semester = "Third Sem (IoT)"
            break;
        case 5:
            semester = "Fifth Sem (CSE)"
            break;
        case 15:
            semester = "Fifth  Sem (AI&ML)"
            break;
        case 25:
            semester = "Fifth Sem (IoT)"
            break;
        case 7:
            semester = "Seventh Sem (CSE)"
            break;
        case 17:
            semester = "Seventh Sem (AI&ML)"
            break;
        case 27:
            semester = "Seventh Sem (IoT)"
            break;
        case 4:
            semester = "Fourth Sem (CSE)"
            break;
        case 14:
            semester = "Fourth Sem (AI&ML)"
            break;
        case 24:
            semester = "Fourth Sem (IoT)"
            break;
        case 6:
            semester = "Sixth Sem (CSE)"
            break;
        case 16:
            semester = "Sixth Sem (AI&ML)"
            break;
        case 26:
            semester = "Sixth Sem (IoT)"
            break;

        default:
            break;
    }
    return semester
}

const SelectSemester = (props: Props) => {
    const semesters: number[] = [4, 6, 16, 24];

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card
                sx={{
                    minWidth: "50vw",
                    height: "50vh",
                    textAlign: "center",
                    padding: "2rem",
                }}
            >
                <CardContent>
                    <Typography sx={{ fontSize: 20 }}>
                        Please Select Your Semester
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", flexDirection: "column" }}>
                    {semesters.map((sem) => (
                        <div style={{ marginTop: "1.2rem" }}>
                            <Button
                                variant="contained"
                                onClick={() => props.handleSemesterSelected(sem)}
                            >
                                {semesterDisplay(sem)}
                            </Button>
                        </div>
                    ))}
                </CardActions>
            </Card>
        </Box>
    );
};

export default SelectSemester;
