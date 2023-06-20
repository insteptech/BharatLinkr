import { createSlice } from "@reduxjs/toolkit";
import { addOrganisationPost, cityByStateIdForPost, getDepartmentForJob, subStreamByMainStreamForPost } from "../../actions/organisation/postActions";

const initialState = {
    postFilterList: {
        status: [],
        department: [],
        subDepartment: [],
        streams: [],
        subStreams: [],
        state: [],
        city: [],
        workMode: [],
        jobType: [],
        jobRole: [],
        eligibility: [],
        organization: [],
        college: [],
        course: [],
        exam: [],
        corporate: []
    },
    creatingPost: false,
    addedPost: {},
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDepartmentForJob.fulfilled, (state, action) => {
            state.postFilterList = { ...state.postFilterList, ...action.payload }
            state.creatingPost = false
        })
        builder.addCase(getDepartmentForJob.pending, (state, action) => {
            state.creatingPost = true
        })
        builder.addCase(getDepartmentForJob.rejected, (state, action) => {
            state.creatingPost = false
        })

        builder.addCase(addOrganisationPost.fulfilled, (state, action) => {
            state.addedPost = action.payload
            state.creatingPost = false
        })
        builder.addCase(addOrganisationPost.pending, (state, action) => {
            state.creatingPost = true
        })
        builder.addCase(addOrganisationPost.rejected, (state, action) => {
            state.creatingPost = false
        })

        builder.addCase(cityByStateIdForPost.fulfilled, (state, action) => {
            state.postFilterList = { ...state.postFilterList, city: action.payload.result }
        })

        builder.addCase(subStreamByMainStreamForPost.fulfilled, (state, action) => {
            state.postFilterList = { ...state.postFilterList, subDepartment: action.payload.data.rows }
        })
    }
})

export default postSlice.reducer