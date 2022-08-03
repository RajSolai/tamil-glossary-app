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
import { useQuery } from "@tanstack/react-query";

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

const getAllData = async (searchKey: string) => {
  const data = await axios.get(GET_GLOSSARY_ENDPOINT + "?word=" + searchKey);
  console.log(data.data);
  return data.data["res"];
};

const Glossary = (props: Props) => {
  const [searchKey, setSearchKey] = useState("");

  const {
    isLoading,
    data: requests,
    refetch,
  } = useQuery(["data"], () => getAllData(searchKey));

  if (isLoading) {
    return (
      <>
        <div style={searchBoxContainerStyle}>
          <TextField
            style={{ width: "100%" }}
            id="outlined-basic"
            label={searchLabel}
            variant="outlined"
            onKeyDown={(e) => {
              if (e.key == "Enter") refetch();
            }}
            onChange={(e) => {
              e.preventDefault();
              setSearchKey(e.target.value);
            }}
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
            onClick={() => refetch()}
            style={searchButtonStyle}
          >
            <Search />
          </Button>
        </div>
        <div style={{ margin: "0.5rem" }}>
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
        </div>
      </>
    );
  }

  return (
    <div>
      <div style={searchBoxContainerStyle}>
        <TextField
          style={{ width: "100%" }}
          id="outlined-basic"
          label={searchLabel}
          variant="outlined"
          onKeyDown={(e) => {
            if (e.key == "Enter") refetch();
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
          onClick={() => refetch()}
          style={searchButtonStyle}
        >
          <Search />
        </Button>
      </div>
      <div style={{ margin: "0.5rem" }}>
        <div>
          {requests.map((_m: any) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Glossary;
