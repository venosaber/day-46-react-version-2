import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getMethod, postMethod} from "../../utils";


export const getCustomers = createAsyncThunk('customers/getCustomers', async () => {
  return await getMethod('/customers/')
})

export const createCustomer = createAsyncThunk('customers/createCustomer', async (customer) => {
  return await postMethod('/customers/', customer)
})

const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    isLoading: false,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCustomers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
    })
    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.isLoading = false
      // @ts-ignore
      state.data = [...state.data, action.payload]
    })
  }
})

export default customersSlice.reducer

export const { ...actions } =  customersSlice