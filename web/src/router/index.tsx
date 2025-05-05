import {createBrowserRouter} from "react-router";
import Product from '../pages/Product'
import Employee from '../pages/Employee'


const router = createBrowserRouter([
  {
    path: "/product",
    element: <Product/>,
  },
  {
    path: "/employee",
    element: <Employee/>,
  },
]);

export default router