import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const getDepartmentForJob = createAsyncThunk('Organisation-Post/Department-List',
    async (body) => {
        const apiCalls = {
            state: apiRequest.post("/location/statelist"),
            // city: apiRequest.post("/location/citylist"),
            organisation: apiRequest.post("/organisation/organisationList"),
            department: apiRequest.post("/mainStream/streamList"),
            // subDepartment: apiRequest.post("/subStream/subStreamList"),
            eligibility: apiRequest.post("/masterFilter/masterFilterList?types=eligibility"),
            jobRole: apiRequest.post("/masterFilter/masterFilterList?types=jobrole"),
        };
        const apiData = Promise.all(Object.entries(apiCalls).map(([key, value]) => {
            return value
                .then(data => ({ [key]: data.data.data.rows }));
        }))
            .then(results => {
                const responseData = Object.assign({}, ...results);
                return responseData
            })
            .catch(error => {
                console.error('Error:', error);
            });
        console.log(apiData)
        return apiData

    }
)

export const addOrganisationPost = createAsyncThunk('Organisation-Post/Add',
    async (body) => {
        const apiData = await apiRequest.post('organisation/addOrganisationPost', body)
        return apiData.data
    }
)

export const cityByStateIdForPost = createAsyncThunk('Organisation/Post/Cities-By-State',
    async (body) => {
        const apiData = await apiRequest.post('/location/citydropdown', body)
        return apiData.data
    }
)

export const subStreamByMainStreamForPost = createAsyncThunk('Organisation/Post/SubStreams-By-MainStreams',
    async (body) => {
        const apiData = await apiRequest.post('subStream/subStreamList', body)
        return apiData.data
    }
)