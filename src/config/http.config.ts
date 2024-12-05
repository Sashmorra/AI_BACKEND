import axios  from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || "https://bothub.chat/api/v2/",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.API_TOKEN || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3YjEyMWFlLWUwZDYtNDliMi1iNjlmLTBkNzE3ODkzYjgzOSIsImlzRGV2ZWxvcGVyIjp0cnVlLCJpYXQiOjE3Mjc2OTA0MTgsImV4cCI6MjA0MzI2NjQxOH0.0_rVXKNuSCBP4MO6hBnTXAE0kE1h52xpwDSGPaR4vGM"}`,
  },
});

export { axiosInstance };
