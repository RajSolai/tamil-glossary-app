import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import axios from "axios";
import React, { CSSProperties, useEffect, useState } from "react";
import { GET_GLOSSARY_ENDPOINT } from "../services/api";
import { allRequestTitle, searchLabel } from "../services/strings";
import { Player } from "@lottiefiles/react-lottie-player";

type Props = {};

const searchBoxContainerStyle: CSSProperties = {
  margin: "1rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignContent: "center",
  justifyItems: "center",
  alignItems: "center",
};

const searchButtonStyle: CSSProperties = {
  marginLeft: "1rem",
  height: "3.2rem",
};

const Glossary = (props: Props) => {
  const [isLoading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const getAllGlossaryEntries = () => {
    setLoading(true);
    axios.get(GET_GLOSSARY_ENDPOINT + "?word=" + searchKey).then((r) => {
      setLoading(false);
      setRequests(r.data["res"]);
      console.log(searchKey);
      console.log(r.data);
    });
  };

  useEffect(() => {
    getAllGlossaryEntries();
  }, []);

  return (
    <div>
      <div style={searchBoxContainerStyle}>
        <TextField
          style={{ width: "100%" }}
          id="outlined-basic"
          label={searchLabel}
          variant="outlined"
          onKeyDown={(e) => {
            if (e.key == "Enter") getAllGlossaryEntries();
          }}
          onChange={(e) => setSearchKey(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={getAllGlossaryEntries}
          style={searchButtonStyle}
        >
          <Search />
        </Button>
      </div>
      <div style={{ margin: "0.5rem" }}>
        <div>
          {isLoading ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Player
                  autoplay
                  loop
                  style={{ height: "100px" }}
                  src="https://assets10.lottiefiles.com/packages/lf20_yyytgjwe.json"
                />
              </div>
            </>
          ) : requests.length == 0 ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Player
                  autoplay
                  loop
                  // style={{ height: "100px" }}
                  src="https://assets2.lottiefiles.com/packages/lf20_zfnngl5k.json"
                />
                <h5>மொழிபெயர்ப்புகள் எதுவும் கிடைக்கவில்லை</h5>
              </div>
            </>
          ) : (
            requests.map((_m: any) => (
              <>
                <Card sx={{ minWidth: 275, margin: "1rem" }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      ஆங்கிலத்திலிருந்து தமிழுக்கு
                    </Typography>
                    <Typography variant="h5" component="div">
                      {_m.tamilWord || "NA"} க்கு
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {_m.englishWord || "NA"}
                    </Typography>
                    <Typography variant="body2">
                      {_m.englishWord} {"--"} {_m.tamilWord} என மொழிபெயர்க்கிறது
                    </Typography>
                  </CardContent>
                </Card>
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Glossary;
