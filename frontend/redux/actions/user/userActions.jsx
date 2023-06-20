import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiRequest } from "../../services/api"

export const getUserDetailsById = createAsyncThunk('userSlice/get-User-Details', async (body) => {
    const apiData = await apiRequest.post(`auth/userList`, { id: body })
    return apiData.data.data
});

export const getContentUserLiked = createAsyncThunk("userSlice/get-content-userLiked", async (body) => {
    const apiData = await apiRequest.post("auth/userLikesList", body)
    return apiData.data.data
});