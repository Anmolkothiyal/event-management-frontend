import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
    token: null,
    loginDetails: JSON.parse(Cookies.get('loginDetails') || '{}') || { isauth: false },
  },
  reducers: {
    setLoginDetails: (state, action) => {
      state.loginDetails = action.payload;
      Cookies.set('loginDetails', JSON.stringify(action.payload));
    },

    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loginDetails = false;
      localStorage.removeItem("token");
    }
  },
});

export const { setUser, logout, setLoginDetails } = authSlice.actions;
export default authSlice.reducer;
