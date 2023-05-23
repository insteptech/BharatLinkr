import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const AddMainCategory = createAsyncThunk(
  "AddMainCategory/corporate/addMainCategories",
  async (data) => {
    return apiRequest
      .post("corporate/addMainCategories", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const getMainCategory = createAsyncThunk(
    "getMainCategory/corporate/mainCategoryList",
    async (data) => {
      return apiRequest
        .post("corporate/mainCategoryList", data)
        .then((res) => res)
        .catch((err) => err);
    }
  );