//helper file en el frontend --> -npm i axios 
import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:5000/api/v1/restaurants", //url base de nuestro servidor backend, todas las demas urls vienen despues de esta
  headers: {
    "Content-type": "application/json"
  }
});
