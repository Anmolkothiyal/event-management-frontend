import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
    token: "",
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload;
      },
    logout: (state) => {
        state.isAuthenticated = false;
        localStorage.removeItem("token");
      }

  },
})

export const {
    setUser,
    logout
} = authSlice.actions;
export default authSlice.reducer;