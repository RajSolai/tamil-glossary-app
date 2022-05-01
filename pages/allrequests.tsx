import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GET_REQUESTS_ENDPOINT } from "../services/api";
import { allRequestTitle } from "../services/strings";
import { Player } from "@lottiefiles/react-lottie-player";

type Props = {};

const AllRequests = (props: Props) => {
  const [requests, setRequests] = useState([]);
  const [lc, setLc] = useState<string | null>();

  useEffect(() => {
    axios.get(GET_REQUESTS_ENDPOINT).then((r) => {
      setRequests(r.data["res"]);
    });
    setLc(localStorage.getItem("oip"));
  });

  if (lc) {
    return (
      <div>
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
                        {_m.englishWord} {"--"} {_m.tamilWord} என
                        மொழிபெயர்க்கிறது
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Add to Glossary</Button>
                    </CardActions>
                  </Card>
                </>
              ))
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <h2>Entry Restricted</h2>
      </>
    );
  }
};

export default AllRequests;
