import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const addCollege = createAsyncThunk("College/Add", async (data) => {
  console.log(data, "form");
  const data1 = apiRequest.post("college/addCollege", data);
  return data1.data;
});

export const getColleges = createAsyncThunk("getColleges", async (data) => {
  return apiRequest
    .post("college/popularCollegeList", data)
    .then((res) => res)
    .catch((err) => err);
});

export const getCollegebyId = createAsyncThunk(
  "getCollegebyId",
  async (data) => {
    return apiRequest
      .post("college/collegeList", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const deleteCollege = createAsyncThunk(
  "deleteCollege/college/deleteCollege",
  async (id) => {
    return apiRequest
      .delete(`college/deleteCollege/${id}`)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const CollegeLikes = createAsyncThunk(
  "collegeLikes/college/collegeLikeShareCount",
  async (data) => {
    return apiRequest
      .post(`college/collegeLikeShareCount`, data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const CollegeLikesList = createAsyncThunk(
    "collegeLikes/college/collegeLikeShareCount",
    async (id) => {
      return apiRequest
        .post("auth/userLikesList", {
          userId: id,
          categoryTypes: "college",
        })
        .then((res) => res)
        .catch((err) => err);
    }
  );

// to update college
export const updateCollege = createAsyncThunk(
  "updateCollege/college/updateCollege",
  async (data) => {
    return apiRequest
      .post("college/updateCollege", data)
      .then((res) => res)
      .catch((err) => err);
  }
);
export const CollegeLikesList = createAsyncThunk(
  "collegeLikes/college/collegeLikeShareCount",
  async (id) => {
    return apiRequest
      .post("auth/userLikesList", {
        userId: id,
        categoryTypes: "college",
      })
      .then((res) => res)
      .catch((err) => err);
  }
);
