import axios from "axios";
import BASE_URL from "./apiConfig";

// const loginData = JSON.parse(localStorage.getItem("token"));
// const token = loginData && loginData;

let api = axios.create({
  baseURL: BASE_URL.url,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, Content-Type, X-Auth-Token, X-CSRFToken, CSRF ",
    // 'CSRF': csrfToken.content,
    // Authorization: "Bearer " + token,
  },
});

export default api;
