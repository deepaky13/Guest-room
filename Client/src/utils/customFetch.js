import axios from "axios";

const FetchApi = axios.create({
  baseURL: "/api/v1",
});

export default FetchApi;
