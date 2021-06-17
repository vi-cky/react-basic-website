import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3002/api/v1/mstate",
});
export default instance;
