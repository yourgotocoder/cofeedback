import { Box, Card, CardContent } from "@mui/material";
import FeedbackParameters from "../../FeedbackParameters";
import Rating from "./Rating";

type Props = {
  subjectLabel: string;
};

const SubjectRating = (props: Props) => {
  const handleRatingChange = (label: string, rating: number | null) => {};

  return (
    <Card sx={{ m: 2 }}>
      <CardContent>
        {props.subjectLabel}
        <Box sx={{ paddingLeft: 2 }}>
          {FeedbackParameters.map((feedback) => (
            <div style={{ padding: 2, marginTop: 1, marginBottom: 1 }}>
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
