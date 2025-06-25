export interface Header {
  name: string
  text: string
  displayProperty?: string
}

export interface Master {
  id: number | null
  name?: string
}

export type Color = Master

export interface Employee extends Master{
  age: number | null | string
  address: string | null
  salary: number | null | string
  position: string | null
  status: string | null
}

export interface Product extends Master {
  shortName: string
  code: string
  description: string | null
  color: Color | null
}

export interface Customer extends Master {
  companyName: string | null
  address: string | null
  description: string | null
}

export interface OrderGet{
  id: number | null,
  saleDate: string,
  customer: {
    id: number | null,
    name: string
  },
  employee: {
    id: number | null,
    name: string
  },
  deliveryAddress: string,
  comment: string,
  details: OrderDetailGet[]
}

export interface OrderPost {
  id: number | null,
  customerId: number | string,
  saleDate: string,
  deliveryAddress: string,
  employeeId: number | string,
  comment: string,
  details: OrderDetailPost[]
}

export interface OrderDetailGet {
  id: number | null,
  product: {
    id: number | null,
    name: string,
  },
  price: number | string,
  quantity: number | string,
  amount: number | string,
}

export interface OrderDetailPost {
  id: number | null,
  productId: number | string,
  price: number | string,
  quantity: number | string,
  amount: number | string,
  // not for api, just for display
  // product: string
}