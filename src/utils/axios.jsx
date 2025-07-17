const token = import.meta.env.VITE_TMDB_BEARER_TOKEN;
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
