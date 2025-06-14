import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getMethod, postMethod, putMethod, deleteMethod} from "../../utils";
import type {OrderPost, OrderGet} from '../../utils'

export const getOrders = createAsyncThunk('orders/getOrders', async ()=>{
    return await getMethod('/orders');
})

export const getOrder = createAsyncThunk('orders/getOrder', async (id: number)=>{
    return await getMethod(`/orders/${id}`);
})

export const createOrder = createAsyncThunk('orders/createOrder', async (order)=>{
    return await postMethod('/orders', order);
})

export const updateOrder = createAsyncThunk('orders/updateOrder', async (order: OrderPost )=>{
    return await putMethod(`/orders/${order.id}`, order);
})

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (id: number)=>{
    await deleteMethod(`/orders/${id}`);
    return {id};
})

interface OrderState {
    isLoading: boolean,
    data: OrderGet[],
    error: string,
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        isLoading: false,
        data: [],
        error: ''
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getOrders.pending, (state: OrderState)=>{
            state.isLoading = true;
            state.error = '';
        })
        builder.addCase(getOrders.fulfilled, (state: OrderState, action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.error = '';
        })
        builder.addCase(getOrders.rejected, (state: OrderState, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to fetch orders data!';
        })

        builder.addCase(getOrder.pending, (state: OrderState)=>{
            state.isLoading = true;
            state.error = '';
        })
        builder.addCase(getOrder.fulfilled, (state: OrderState, action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.error = '';
        })
        builder.addCase(getOrder.rejected, (state: OrderState, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to fetch orders data!';
        })

        builder.addCase(createOrder.pending, (state: OrderState)=>{
            state.isLoading = true;
            state.error = '';
        })
        builder.addCase(createOrder.fulfilled, (state: OrderState,action)=>{
            state.isLoading = false;
            state.data = [...state.data, action.payload];
            state.error = ''
        })
        builder.addCase(createOrder.rejected, (state: OrderState, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to add a new order!';
        })

        builder.addCase(updateOrder.pending, (state: OrderState)=>{
            state.isLoading = true;
            state.error = '';
        })
        builder.addCase(updateOrder.fulfilled, (state: OrderState, action)=>{
            const index = state.data.findIndex(order => order.id === action.payload.id);
            if(index !== -1){
                state.data[index] = action.payload;
            }
            state.isLoading = false;
            state.error = '';
        })
        builder.addCase(updateOrder.rejected, (state: OrderState, action)=>{
            state.isLoading = false;
            state.error = action.error.message || "Failed to edit a order's information !";
        })

        builder.addCase(deleteOrder.pending, (state: OrderState)=>{
            state.isLoading = true;
            state.error = '';
        })
        builder.addCase(deleteOrder.fulfilled, (state: OrderState, action)=>{
            state.isLoading = false;
            state.data = state.data.filter(order => order.id !== action.payload.id);
            state.error = '';
        })
        builder.addCase(deleteOrder.rejected, (state: OrderState, action)=>{
            state.isLoading = false;
            state.error = action.error.message || 'Failed to delete a order!';
        })
    }
})

export default ordersSlice.reducer;

export const {...actions} = ordersSlice