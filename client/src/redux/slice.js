import { createSlice } from "@reduxjs/toolkit";

const userIdSlice = createSlice({
  name: "userid",
  initialState: { 
    receiverId: null, 
    senderId: null, 
    requestId: null,
    isLoggedIn: false
  },

  reducers: {
    setReceiverId: (state, action) => {
      state.receiverId = action.payload;
    },
    setSenderId: (state, action) => {
      state.senderId = action.payload;
    },
    setRequestId: (state, action) => {
      state.requestId = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    }
  },
});

export const { setReceiverId, setSenderId, setRequestId, setIsLoggedIn } = userIdSlice.actions;
export default userIdSlice.reducer;
