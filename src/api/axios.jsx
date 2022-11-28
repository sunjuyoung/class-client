import axios from "axios";


const headers = {
    'Content-Type': 'application/json',
    'Authorization': "Bearer "+localStorage.getItem("ACCESS_TOKEN"),
  }

export default axios.create({
    baseURL: 'http://localhost:8888',
    headers : headers
});