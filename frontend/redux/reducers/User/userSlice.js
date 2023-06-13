import { createSlice } from "@reduxjs/toolkit";
import { getContentUserLiked, getUserDetailsById } from "../../actions/user/userActions";

const initialState = {
    activeNavItem: null,
    isLoading: false,
    loginStatus: false,
    currentUser: {},
    likeContentList: [],
    likeContentCount: 0,
}

const userSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
        setLoginStatus(state, action) {
            state.loginStatus = action.payload
        },
        setActiveNav(state, action) {
            state.activeNavItem = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserDetailsById.fulfilled, (state, action) => {
            state.isLoading = false
            state.loginStatus = true
            state.currentUser = action.payload
        });
        builder.addCase(getUserDetailsById.pending, (state, action) => {
            state.isLoading = true
            state.loginStatus = true
            state.currentUser = action.payload
        });
        builder.addCase(getContentUserLiked.fulfilled, (state, action) => {
            state.isLoading = false
            state.likeContentList = action.payload?.rows
            state.likeContentCount = action.payload?.count
        });
        builder.addCase(getContentUserLiked.pending, (state, action) => {
            state.isLoading = true
        })
    }
})

export const { setLoginStatus, setActiveNav } = userSlice.actions
export default userSlice.reducer