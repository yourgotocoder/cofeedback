import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BasicRating from "./BasicRating";

type Props = {
  label: string;
  ratingChange: (
    subjectName: string,
    coNumber: number,
    rating: number | null
  ) => void;
  subjectName: string;
  coNumber: number;
  rating: number | null;
};

const Questions = (props: Props) => {
  return (
    <Box>
      <Typography>{props.label}</Typography>
      <BasicRating
        ratingChange={props.ratingChange}
        coNumber={props.coNumber}
        rating={props.rating}
        subjectName={props.subjectName}
      />
    </Box>
  );
};

export default Questions;
