import { createSlice } from "@reduxjs/toolkit";
import { friendRequestStatus, getAllUserList, getContentUserLiked, getPendingFriendRequest, getUserDetailsById } from "../../actions/user/userActions";

const initialState = {
    activeNavItem: null,
    myFriendsList: [],
    myFriendsCount: 0,
    isLoading: false,
    loginStatus: false,
    currentUser: {},
    likeContentList: [],
    likeContentCount: 0,
    layoutByRole: null,
    allUserList: [],
    userCount: 0,
    friendList: [],
    freindCount: 0,
    requestStatus: {},
    isFriendListLoading: false
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
        },
        setLayoutByRole(state, action) {
            state.layoutByRole = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserDetailsById.fulfilled, (state, action) => {
            state.isLoading = false
            state.loginStatus = true
            state.currentUser = action.payload.rows[0]
            state.myFriendsList = action.payload.rows[0]?.Friends
            state.myFriendsCount = action.payload.rows[0]?.Friends.length
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
        });
        builder.addCase(getAllUserList.fulfilled, (state, action) => {
            state.allUserList = action.payload.rows
            state.userCount = action.payload.count
        });
        builder.addCase(getPendingFriendRequest.fulfilled, (state, action) => {
            state.friendList = action.payload.rows
            state.freindCount = action.payload.count
            state.isFriendListLoading = false
        });
        builder.addCase(getPendingFriendRequest.pending, (state, action) => {
            state.isFriendListLoading = true
        });
        builder.addCase(getPendingFriendRequest.rejected, (state, action) => {
            state.isFriendListLoading = false
        });
        builder.addCase(friendRequestStatus.fulfilled, (state, action) => {
            state.requestStatus = action.payload
        });
    }
})

export const { setLoginStatus, setActiveNav, setLayoutByRole } = userSlice.actions
export default userSlice.reducer