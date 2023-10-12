import axios from "axios";
import { config } from "../configs/config";

export default axios.create({
    baseURL: config.API_URL
})