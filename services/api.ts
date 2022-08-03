import { nanoid } from "nanoid";
import axios from "axios";
import Swal from "sweetalert2";
import { errorMessage, thankMessage } from "./strings";

const NEW_REQUEST_ENDPOINT =
  "https://eu-gb.functions.appdomain.cloud/api/v1/web/msraj085%40gmail.com_dev/default/tm_glo_addrequest";
export const GET_REQUESTS_ENDPOINT =
  "https://eu-gb.functions.appdomain.cloud/api/v1/web/msraj085%40gmail.com_dev/default/tm_glo_getrequests";
export const GET_GLOSSARY_ENDPOINT =
  "https://eu-gb.functions.appdomain.cloud/api/v1/web/msraj085%40gmail.com_dev/default/tm_glo_getglo";
const CONFIRM_REQUEST_ENDPOINT =
  "https://eu-gb.functions.appdomain.cloud/api/v1/web/msraj085%40gmail.com_dev/default/tm_glo_addglo";

type RequestData = {
  englishWord: string;
  tamilWord: string;
  requestId: string;
};

export const addNewRequest = async (englishWord: string, tamilWord: string) => {
  const requestData: RequestData = {
    englishWord,
    tamilWord,
    requestId: nanoid(8),
  };
  Swal.fire("பதிவேறுகிறது, காத்திருக்கவும்.....");
  const out = await axios.post(NEW_REQUEST_ENDPOINT, { data: requestData });
  if (out.data.msg == "word-added") {
    Swal.fire(thankMessage);
  } else {
    Swal.fire(errorMessage);
  }
};

export const confirmRequest = async (requestId: string) => {
  Swal.fire("பதிவேறுகிறது, காத்திருக்கவும்.....");
  const out = await axios.post(CONFIRM_REQUEST_ENDPOINT, { id: requestId });
  if (out.data.msg == "word-added") {
    Swal.fire(thankMessage);
  } else {
    Swal.fire(errorMessage);
  }
};
