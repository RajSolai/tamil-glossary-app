import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { loginText } from "../services/strings";
import { textFieldStyle } from "./addnew";

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const [userId, setUser] = useState<string>();
  const [pass, setPass] = useState<string>();

  const login = () => {
    if (userId == "admin" && pass == "srmvectamil") {
      localStorage.setItem("oip", "none");
      router.push("/allrequests");
    } else {
      Swal.fire("மன்னிக்கவும் தவறான சான்றுகள்");
    }
  };

  return (
    <div>
      <div className="form">
        <h2>{loginText}</h2>
        <TextField
          id="outlined-basic"
          onChange={(e) => setUser(e.target.value)}
          label={"பயனர் பெயர்"}
          variant="outlined"
          style={textFieldStyle}
        />
        <TextField
          id="outlined-basic"
          onChange={(e) => setPass(e.target.value)}
          label={"பயனர் கடவுச்சொல்"}
          variant="outlined"
          style={textFieldStyle}
        />
        <Button onClick={login}>{loginText}</Button>
      </div>
    </div>
  );
};

export default Login;
