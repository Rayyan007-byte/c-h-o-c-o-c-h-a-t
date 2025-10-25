import { createSlice } from "@reduxjs/toolkit";

const userIdSlice = createSlice({
  name: "userid",
  initialState: { receiverId: null, senderId: null, requestId: null },

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
  },
});

export const { setReceiverId, setSenderId, setRequestId } = userIdSlice.actions;
export default userIdSlice.reducer;
