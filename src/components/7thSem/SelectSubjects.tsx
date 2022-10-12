import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";

type Props = {
  subjectObject: string[];
  label: string;
  handleElectiveChange: (value: string) => void;
};

const SelectSubjects = (props: Props) => {
  return (
    <Paper sx={{ padding: "1rem" }}>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">
          {props.label}
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(e) => props.handleElectiveChange(e.target.value)}
        >
          {!!props.subjectObject &&
            props.subjectObject.map((keyName) => (
              <FormControlLabel
                key={keyName}
                value={keyName}
                control={<Radio />}
                label={keyName}
              />
            ))}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default SelectSubjects;
