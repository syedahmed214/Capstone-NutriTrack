// // src/api/mealApi.js
// import api from "./axiosConfig";

// export const addMeal = (mealData) => {
//   return api.post("/meals", mealData, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };


// src/api/mealApi.js
import api from "./axiosConfig";

export const addMeal = (mealData) => {
  return api.post("/meals", mealData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAllMeals = () => {
  return api.get("/meals/all", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateMeal = (mealId, mealData) => {
  return api.put(`/meals/${mealId}`, mealData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteMeal = (mealId) => {
  return api.delete(`/meals/${mealId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};