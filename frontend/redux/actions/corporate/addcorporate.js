import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const CorporateData = createAsyncThunk(
  "CorporateData/corporate/addCorporate",
  async (data) => {
    return apiRequest
      .post("corporate/addCorporate", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const getCorporateData = createAsyncThunk(
  "getCorporateData/corporate/corporateList",
  async (data) => {
    return apiRequest
      .post("corporate/corporateList", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const getCorporateById = createAsyncThunk(
  "getCorporatebyid/corporate/corporateList",
  async (data) => {
    return apiRequest
      .post("corporate/corporateList", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const deleteCorporate = createAsyncThunk(
  "deleteCorporate/corporate/deleteCorporate",
  async (id) => {
    return apiRequest
      .delete(`corporate/deleteCorporate/${id}`)
      .then((req) => req)
      .catch((err) => err);
  }
);

export const updateCorporate = createAsyncThunk(
  "updateCorporate/corporate/updateCorporate",
  async (data) => {
    return apiRequest
      .post("corporate/updateCorporate", data)
      .then((res) => res)
      .catch((err) => err);
  }
);
export const corpotateLikes = createAsyncThunk(
  "corpotateLikes/ccorporate/corporateLikesCount",
  async (data) => {
    return apiRequest
      .post("corporate/corporateLikesCount", data)
      .then((res) => res)
      .catch((err) => err);
  }
);