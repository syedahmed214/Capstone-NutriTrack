// src/api/authApi.js
import api from "./axiosConfig";

export const registerUser = (formData) => {
  return api.post("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const loginUser = (formData) => {
  return api.post("/auth/login", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateUserProfile = (formData) => {
  return api.patch("/auth/update-profile", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};