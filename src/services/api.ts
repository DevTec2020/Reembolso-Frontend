import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3333",
})

export const urlIploads = axios.create({
    baseURL: "http://localhost:3333/uploads",
})