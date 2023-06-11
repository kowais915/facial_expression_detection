import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  url: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg",
}

export const counterSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    
    addUrl: (state, action) => {
      state.url = action.payload
    },
    
  },
})


// Action creators are generated for each case reducer function
export const { addUrl } = counterSlice.actions

export default counterSlice.reducer