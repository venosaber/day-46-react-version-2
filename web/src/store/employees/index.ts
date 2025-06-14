import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getMethod, postMethod, putMethod, deleteMethod} from "../../utils";
import type {Employee} from '../../utils'

export const getEmployees = createAsyncThunk('employees/getEmployees', async ()=>{
  return await getMethod('/employees');
})

export const createEmployee = createAsyncThunk('employees/createEmployee', async (employee: Employee)=>{
  return await postMethod('/employees', employee);
})

export const updateEmployee = createAsyncThunk('employees/updateEmployee', async (employee: Employee)=>{
  return await putMethod(`/employees/${employee.id}`, employee);
})

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id: number)=>{
  await deleteMethod(`/employees/${id}`);
  return {id};
})

interface EmployeeState {
  isLoading: boolean,
  data: Employee[],
  error: string,
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    isLoading: false,
    data: [],
    error: ''
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getEmployees.pending, (state: EmployeeState)=>{
      state.isLoading = true;
      state.error = '';
    })
    builder.addCase(getEmployees.fulfilled, (state: EmployeeState, action)=>{
      state.isLoading = false;
      state.data = action.payload;
      state.error = '';
    })
    builder.addCase(getEmployees.rejected, (state: EmployeeState, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch employees data!';
    })

    builder.addCase(createEmployee.pending, (state: EmployeeState)=>{
      state.isLoading = true;
      state.error = '';
    })
    builder.addCase(createEmployee.fulfilled, (state: EmployeeState,action)=>{
      state.isLoading = false;
      state.data = [...state.data, action.payload];
      state.error = ''
    })
    builder.addCase(createEmployee.rejected, (state: EmployeeState, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to add a new employee!';
    })

    builder.addCase(updateEmployee.pending, (state: EmployeeState)=>{
      state.isLoading = true;
      state.error = '';
    })
    builder.addCase(updateEmployee.fulfilled, (state: EmployeeState, action)=>{
      const index = state.data.findIndex(employee => employee.id === action.payload.id);
      if(index !== -1){
        state.data[index] = action.payload;
      }
      state.isLoading = false;
      state.error = '';
    })
    builder.addCase(updateEmployee.rejected, (state: EmployeeState, action)=>{
      state.isLoading = false;
      state.error = action.error.message || "Failed to edit a employee's information !";
    })

    builder.addCase(deleteEmployee.pending, (state: EmployeeState)=>{
      state.isLoading = true;
      state.error = '';
    })
    builder.addCase(deleteEmployee.fulfilled, (state: EmployeeState, action)=>{
      state.isLoading = false;
      state.data = state.data.filter(employee => employee.id !== action.payload.id);
      state.error = '';
    })
    builder.addCase(deleteEmployee.rejected, (state: EmployeeState, action)=>{
      state.isLoading = false;
      state.error = action.error.message || 'Failed to delete a employee!';
    })
  }
})

export default employeesSlice.reducer;

export const {...actions} = employeesSlice