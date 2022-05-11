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
  justifyContent: "center",
  alignContent: "center",
  justifyItems: "center",
  alignItems: "center",
};

const Glossary = (props: Props) => {
  const [requests, setRequests] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    console.log("loading.......");
    axios.get(GET_GLOSSARY_ENDPOINT + "?word=" + searchKey).then((r) => {
      setRequests(r.data["res"]);
    });
  }, [searchKey]);

  return (
    <div>
      <div style={searchBoxContainerStyle}>
        <TextField
          style={{ width: "100%" }}
          id="outlined-basic"
          label={searchLabel}
          variant="outlined"
          onChange={(e) => setSearchKey(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div style={{ margin: "0.5rem" }}>
        <div>
          {requests.length == 0 ? (
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
