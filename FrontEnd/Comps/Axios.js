import axios from "axios";

const AxiosApi = axios.create({
  baseURL: "https://boraaideplot-api.onrender.com"
});

export default AxiosApi;