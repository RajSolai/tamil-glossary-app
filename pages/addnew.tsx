import { TextField, Button } from "@mui/material";
import React, { CSSProperties, useState } from "react";
import { addNewRequest } from "../services/api";
import {
  addEnglishWordLabel,
  addNewWordTitle,
  addTamilWordLabel,
  submitWord,
} from "../services/strings";

type Props = {};

export const textFieldStyle: CSSProperties = {
  width: "80vw",
  margin: "0.7rem",
};

const AddNew = (props: Props) => {
  const [englishWord, setEnglishWord] = useState<string>("");
  const [tamilWord, setTamilWord] = useState<string>("");

  return (
    <>
      <div className="form">
        <h2>{addNewWordTitle}</h2>
        <TextField
          id="outlined-basic"
          onChange={(e) => setEnglishWord(e.target.value)}
          label={addEnglishWordLabel}
          variant="outlined"
          style={textFieldStyle}
        />
        <TextField
          id="outlined-basic"
          onChange={(e) => setTamilWord(e.target.value)}
          label={addTamilWordLabel}
          variant="outlined"
          style={textFieldStyle}
        />
        <Button onClick={() => addNewRequest(englishWord, tamilWord)}>
          {submitWord}
        </Button>
      </div>
    </>
  );
};

export default AddNew;
