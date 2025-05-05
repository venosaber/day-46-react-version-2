import {createBrowserRouter} from "react-router";
import Product from '../pages/Product'
import Employee from '../pages/Employee'
import Test from '../pages/Test'

const router = createBrowserRouter([
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