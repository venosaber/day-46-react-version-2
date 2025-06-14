import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './products'
import customersReducer from './customers'
import colorsReducer from './colors'
import employeesReducer from './employees'
import ordersReducer from './orders'

const store = configureStore({
  reducer: {
    products: productsReducer,
    customers: customersReducer,
    colors: colorsReducer,
    employees: employeesReducer,
    orders: ordersReducer,
  }
})

export default store

export * from './products'
// @ts-expect-error the names of some members are the same
export * from './customers'
// @ts-expect-error the names of some members are the same
export * from './colors'
// @ts-expect-error the names of some members are the same
export * from './employees'
// @ts-expect-error the names of some members are the same
export * from './orders'

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch