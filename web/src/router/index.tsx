import {createBrowserRouter} from "react-router";
import Product from '../pages/Product'
import Employee from '../pages/Employee'
import Test from '../pages/Test'
import Order from '../pages/Order'
import OrderDetail from '../pages/OrderDetail'

const router = createBrowserRouter([
  {
    path: "/order",
    element: <Order/>,
  },
  {
    path: "/order/:id",
    element: <OrderDetail/>,
  },
  {
    path: "/product",
    element: <Product/>,
  },
  {
    path: "/employee",
    element: <Employee/>,
  },
  {
    path: "/test/:id/:name",
    element: <Test/>,
  },
]);

export default router