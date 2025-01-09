import { createSlice } from "@reduxjs/toolkit"


const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: "",
    previousEvents: "",
  },
  reducers: {
    setEvents: (state, action) => {
        state.events = action.payload;
      },
      setPreviousEvents: (state, action) => {
        state.previousEvents = action.payload;
      },

  },
})

export const {
    setEvents, setPreviousEvents,
} = eventSlice.actions;
export default eventSlice.reducer;