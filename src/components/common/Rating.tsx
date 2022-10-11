import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";

type Props = {
  ratingChange: (
    label: string,
    rating: number | null
  ) => void;
  label: string;
};

const labels: { [index: string]: string } = {
  1: "Useless+",
  2: "Poor+",
  3: "Ok+",
  4: "Good+",
  5: "Excellent+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const BasicRating = (props: Props) => {
  const [value, setValue] = React.useState<number | null>(null);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          props.ratingChange(props.label, newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
         <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
         
      )}
      { value === null && (
         <Box sx={{ ml: 2 }}>
           <Typography sx={{color: "red"}}>Please provide a rating</Typography>
         </Box>
      
      )}
    </Box>
  );
};

export default React.memo(BasicRating);
