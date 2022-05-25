import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

type Props = {
    subjectObject: Object | undefined;
    label: string;
    handleElectiveChange: (value: string) => void;
};

const SelectSubjects = (props: Props) => {
    return (
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
                    Object.keys(props.subjectObject).map((keyName) => (
                        <FormControlLabel
                            key={keyName}
                            value={keyName}
                            control={<Radio />}
                            label={keyName}
                        />
                    ))}
            </RadioGroup>
        </FormControl>
    );
};

export default SelectSubjects;
