import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './products'
import customersReducer from './customers'

const store = configureStore({
  reducer: {
    products: productsReducer,
    customers: customersReducer
  }
})

export default store


// @ts-ignore
export * from './products'
// @ts-ignore
export * from './customers'
