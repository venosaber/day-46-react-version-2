import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getMethod, postMethod, putMethod, deleteMethod} from "../../utils";
import type {Product} from '../../utils'

export const getProducts = createAsyncThunk('products/getProducts', async ()=>{
  return await getMethod('/products');
})

export const createProduct = createAsyncThunk('products/createProduct', async (product: Product)=>{
  return await postMethod('/products', product);
})

export const updateProduct = createAsyncThunk('products/updateProduct', async (product: Product)=>{
  return await putMethod(`/products/${product.id}`, product);
})

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: number)=>{
  await deleteMethod(`/products/${id}`);
  return {id};
})

interface ProductState {
  isLoading: boolean,
  data: Product[],
  error: string,
}

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    isLoading: false,
    data: [],
    error: ''
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.pending, (state: ProductState)=>{
      state.isLoading = true;
      state.error = '';
    })
    builder.addCase(getProducts.fulfilled, (state: ProductState, action)=>{
      state.isLoading = false;
      state.data = action.payload;
      state.error = '';
    })
    builder.addCase(getProducts.rejected, (state: ProductState, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch products data';
    })

    builder.addCase(createProduct.pending, (state: ProductState)=>{
      state.isLoading = true;
      state.error = '';
    })
    builder.addCase(createProduct.fulfilled, (state: ProductState,action)=>{
      state.isLoading = false;
      state.data = [...state.data, action.payload];
      state.error = ''
    })
    builder.addCase(createProduct.rejected, (state: ProductState, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to add a new product!';
    })

    builder.addCase(updateProduct.pending, (state: ProductState)=>{
      state.isLoading = true;
      state.error = '';
    })
    builder.addCase(updateProduct.fulfilled, (state: ProductState, action)=>{
      const index = state.data.findIndex(product => product.id === action.payload.id);
      if(index !== -1){
        state.data[index] = action.payload;
      }
      state.isLoading = false;
      state.error = '';
    })
    builder.addCase(updateProduct.rejected, (state: ProductState, action)=>{
      state.isLoading = false;
      state.error = action.error.message || "Failed to edit a product's information!";
    })

    builder.addCase(deleteProduct.pending, (state: ProductState)=>{
      state.isLoading = true;
      state.error = '';
    })
    builder.addCase(deleteProduct.fulfilled, (state: ProductState, action)=>{
      state.isLoading = false;
      state.data = state.data.filter(product => product.id !== action.payload.id);
      state.error = '';
    })
    builder.addCase(deleteProduct.rejected, (state: ProductState, action)=>{
      state.isLoading = false;
      state.error = action.error.message || 'Failed to delete a product!';
    })
  }
})

export default productsSlice.reducer;

export const {...actions} = productsSlice