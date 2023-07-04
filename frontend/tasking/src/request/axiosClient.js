import axios from "axios";
import { constants } from "../constants/constant";

const axiosClient = axios.create({
  baseURL: constants.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosClient };
