import { Box, Card, CardContent } from "@mui/material";
import FeedbackParameters from "../../FeedbackParameters";
import Rating from "./Rating";

type Props = {
  subjectLabel: string;
  subjectRatings: (
    subjectName: string,
    label: string,
    rating: number | null
  ) => void;
};

const SubjectRating = (props: Props) => {
  const handleRatingChange = (label: string, rating: number | null) => {
    props.subjectRatings(props.subjectLabel, label, rating);
  };

  return (
    <Card sx={{ m: 2, maxWidth: "100vw", minWidth: "100%" }}>
      <CardContent>
        {props.subjectLabel}
        <Box sx={{ paddingLeft: 2 }}>
          {FeedbackParameters.map((feedback) => (
            <div style={{ padding: 2, marginTop: 1, marginBottom: 1 }} key={feedback}>
              {feedback}{" "}
              <Rating
                key={feedback}
                label={feedback}
                ratingChange={handleRatingChange}
              />
            </div>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SubjectRating;
