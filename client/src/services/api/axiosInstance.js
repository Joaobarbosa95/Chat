import axios from "axios";

require("dotenv").config();

export default axios.create({
  // baseURL: "https://chateia-me-server.herokuapp.com/",
  baseURL: "http://localhost:4000",
});
