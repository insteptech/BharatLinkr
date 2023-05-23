import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const AddSubCategory = createAsyncThunk(
  "AddSubCategory/corporate/addSubCategories",
  async (data) => {
    return apiRequest
      .post("corporate/addSubCategories", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const getSubCategory = createAsyncThunk(
  "getSubCategory/corporate/SubCategoriesList",
  async () => {
    return apiRequest
      .post("corporate/SubCategoriesList")
      .then((res) => res)
      .catch((err) => err);
  }
);

export const deleteSubCategory = createAsyncThunk(
  "deleteSubCategory/deleteSubCategories/:id",
  async (id) => {
    return apiRequest
      .post(`deleteSubCategories/${id}`)
      .then((res) => res)
      .catch((err) => err);
  }
);
