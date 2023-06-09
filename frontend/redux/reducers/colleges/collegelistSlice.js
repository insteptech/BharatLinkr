import { createSlice } from "@reduxjs/toolkit";
import { CollegeLikes, CollegeLikesList, getCollegebyId, getColleges } from "../../actions/college/college";

const collegeListSlice = createSlice({
    name: "collegelist",
    initialState: {
        collegelistvalue: 0,
        isLoading: false,
        collegelist: [],
        collegelistStatus: "",
        collegebyIdvalue: 0,
        college: [],
        collegeStatus: "",
        collegeLikes: "",
        collegeListLikes: [],
        colllegeLikesStatus : "",
    },
    extraReducers: (builder) => {
        builder.addCase(getColleges.pending, (state, action) => {
            state.isLoading = true

        });
        builder.addCase(getColleges.rejected, (state, action) => {
            state.isLoading = false
            state.collegelistStatus = action?.status?.message;
        });
        builder.addCase(getColleges.fulfilled, (state, action) => {
            state.collegelist = action?.payload?.data?.data
            state.isLoading = false
        });
        builder.addCase(getCollegebyId.rejected, (state, action) => {
            state.college = [];
            state.collegeStatus = action?.status?.message;
        });
        builder.addCase(getCollegebyId.fulfilled, (state, action) => {
            state.college = action?.payload?.data?.data
            state.collegeStatus = "";
        });
        builder.addCase(CollegeLikes.fulfilled, (state, action) => {
            state.collegeListLikes = action?.payload?.data?.data
            state.collegeLikes = "";
        });
        builder.addCase(CollegeLikesList.rejected, (state, action) => {
            state.collegeListLikes = [];
            state.colllegeLikesStatus = action?.status?.message;
        });
        // builder.addCase(CollegeLikesList.fulfilled, (state, action) => {
        //     state.collegeListLikes = action?.payload?.data?.data
        //     state.colllegeLikesStatus = "";
        // });
    },
});

export default collegeListSlice.reducer;
