import { createSlice } from "@reduxjs/toolkit";
import { companyLikeslist, getOrganisationbyid, getOrganisationlist } from "../../actions/organisation/addorganisation";
import {
  getIndustryById,
  getIndustryList,
  getSectorById,
  getlistSector,
} from "../../actions/organisation/addsector";

const sectorBySlice = createSlice({
  name: "sector",
  initialState: {
    value: 0,
    sectorlist: [],
    status: "",
    isLoading: false,
    industrylist: [],
    sectorByIdlist: [],
    industryBylist: [],
    organisationList: [],
    organisation: [],
    orglikedlist: [],
    error: ""
  },

  // list of all sector that are created
  extraReducers: (builder) => {
    builder.addCase(getlistSector.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(getlistSector.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    });
    builder.addCase(getlistSector.fulfilled, (state, action) => {
      state.sectorlist = action?.payload?.data?.data?.rows;
      state.isLoading = false
    });

    // for get list industry
    builder.addCase(getIndustryList.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(getIndustryList.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    });
    builder.addCase(getIndustryList.fulfilled, (state, action) => {
      state.industrylist = action?.payload?.data?.data?.rows;
      state.isLoading = false
    });

    // for particular id of sector
    builder.addCase(getSectorById.pending, (state, action) => {
      (state.status = action.payload?.status), (state.sectorByIdlist = []);
    });
    builder.addCase(getSectorById.fulfilled, (state, action) => {
      (state.status = ""),
        (state.sectorByIdlist = action.payload?.data?.data?.rows);
    });

    // for particular id of industry
    builder.addCase(getIndustryById.pending, (state, action) => {
      (state.status = action.payload?.status), (state.industryBylist = []);
    });
    builder.addCase(getIndustryById.fulfilled, (state, action) => {
      (state.status = ""),
        (state.industryBylist = action.payload?.data?.data?.rows);
    });

    // org list
    builder.addCase(getOrganisationlist.pending, (state, action) => {
      (state.status = action.payload?.status), (state.organisationList = []);
    });
    builder.addCase(getOrganisationlist.fulfilled, (state, action) => {
      (state.status = ""),
        (state.organisationList = action.payload?.data?.data);
    });

    //org by id
    builder.addCase(getOrganisationbyid.pending, (state, action) => {
      (state.status = action.payload?.status), (state.organisation = []);
    });
    builder.addCase(getOrganisationbyid.fulfilled, (state, action) => {
      (state.status = ""),
        (state.organisation = action.payload?.data?.data);
    });

    //liked
    builder.addCase(companyLikeslist.pending, (state, action) => {
      (state.status = action.payload?.status);
    });
    builder.addCase(companyLikeslist.fulfilled, (state, action) => {
      (state.status = ""),
        (state.orglikedlist = action.payload?.data?.data?.rows);
    });
  },
});

export default sectorBySlice.reducer;
