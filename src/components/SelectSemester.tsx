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

const SelectSemester = (props: Props) => {
    const semesters: number[] = [3, 7];

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
                                {sem === 3
                                    ? "Third Sem"
                                    : sem === 5
                                        ? "Fifth Sem"
                                        : "Seventh Sem"}
                            </Button>
                        </div>
                    ))}
                </CardActions>
            </Card>
        </Box>
    );
};

export default SelectSemester;
