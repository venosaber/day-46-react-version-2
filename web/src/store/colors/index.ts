import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getMethod, postMethod} from "../../utils";


export const getColors = createAsyncThunk('colors/getColors', async () => {
  return await getMethod('/colors/')
})

export const createColor = createAsyncThunk('colors/createColor', async (color) => {
  return await postMethod('/colors/', color)
})

const colorsSlice = createSlice({
  name: 'colors',
  initialState: {
    isLoading: false,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getColors.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getColors.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
    })
    builder.addCase(createColor.fulfilled, (state, action) => {
      state.isLoading = false
      // @ts-ignore
      state.data = [...state.data, action.payload]
    })
  }
})

export default colorsSlice.reducer

export const { ...actions } =  colorsSlice