import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    profilePic: "",
  },
  reducers: {
    setChangedPicture: (state, action) => {
      state.profilePic = action.payload;
    },
  },
});

export const { setChangedPicture } = ProfileSlice.actions;
export default ProfileSlice.reducer;
