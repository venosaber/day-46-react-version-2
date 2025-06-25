import { Injectable, Inject } from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import { OrderEntity } from './entity';
import { BaseService } from "../base/service";
import { EmployeeEntity } from "../employee/entity";
import {CreateOrderDto, UpdateOrderDto} from "./dto";
import { OrderDetailService } from "../orderDetail/service";
import {CreateOrderDetailDto, UpdateOrderDetailDto} from "../orderDetail/dto";
import { toCamelCase } from "../utils";
import {OrderDetailEntity} from "../orderDetail/entity";

@Injectable()
export class OrderService extends BaseService {

  columns: string[] = ['id', 'sale_date', 'employee_id', 'total_amount', 'delivery_address', 'payment_status', 'comment']

  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<OrderEntity>,

    private orderDetailService: OrderDetailService,

    @Inject('DATA_SOURCE')
    private dataSource: DataSource
  ) {
    super(orderRepository)
  }

  getOrders() {
    const dataSource = this.dataSource.query(`
      with
        order_detail_tmp as (
          select order_detail.id,
                 order_detail.order_id,
                 order_detail.price,
                 order_detail.amount,
                 json_build_object(
                      'id', product.id,
                      'name', product.name
                 ) as product
          from order_detail
          join product on product.id = order_detail.product_id
          where order_detail.active
        )
    
        select
          "order".id,
          to_char("order".sale_date, 'YYYY-MM-DD') as "saleDate",
          jsonb_build_object(
            'id', customer.id,
            'name', customer.name
          ) as customer,
          jsonb_build_object(
                  'id', employee.id,
                  'name', employee.name
          ) as employee,
          "order".delivery_address as "deliveryAddress",
          "order".comment,
          json_agg(
            json_build_object(
              'id', order_detail_tmp.id,
              'product', order_detail_tmp.product,
              'price', order_detail_tmp.price,
              'amount', order_detail_tmp.amount
            )
          ) as details
        
        from "order"
        join order_detail_tmp on "order".id = order_detail_tmp.order_id
        join customer on customer.id = "order".customer_id
        join employee on employee.id = "order".employee_id
        group by "order".id, customer.id, employee.id
    `)

    return dataSource
  }

  async getOne(id: number) {
    const dataSource = await this.dataSource.query(`
      with
        order_detail_tmp as (
          select order_detail.id,
                 order_detail.order_id,
                 order_detail.price,
                 order_detail.amount,
                 json_build_object(
                      'id', product.id,
                      'name', product.name
                 ) as product
          from order_detail
          join product on product.id = order_detail.product_id
          where order_detail.active
        )
    
        select
          "order".id,
          to_char("order".sale_date, 'YYYY-MM-DD') as "saleDate",
          jsonb_build_object(
            'id', customer.id,
            'name', customer.name
          ) as customer,
          jsonb_build_object(
                  'id', employee.id,
                  'name', employee.name
          ) as employee,
          "order".delivery_address as "deliveryAddress",
          "order".comment,
          json_agg(
            json_build_object(
              'id', order_detail_tmp.id,
              'product', order_detail_tmp.product,
              'price', order_detail_tmp.price,
              'amount', order_detail_tmp.amount
            )
          ) as details
        
        from "order"
        join order_detail_tmp on "order".id = order_detail_tmp.order_id
        join customer on customer.id = "order".customer_id
        join employee on employee.id = "order".employee_id
        where "order".id = ${id}
        group by "order".id, customer.id, employee.id
    `)
    return dataSource[0]
  }

  async create(orderDto: CreateOrderDto): Promise<any> {
    const order = toCamelCase(await super.create({
      saleDate: orderDto.saleDate,
      employeeId: orderDto.employeeId,
      customerId: orderDto.customerId,
      deliveryAddress: orderDto.deliveryAddress,
      comment: orderDto.comment
    }))
    console.log(order)
    // insert order details
    let orderDetails = orderDto.details.map((detail: CreateOrderDetailDto) => {
      return { ...detail, orderId: order.id }
    })
    orderDetails = toCamelCase(await this.orderDetailService.create(orderDetails))

    order.details = orderDetails
    return order
  }

  async updateOne(id: number, orderDto: UpdateOrderDto) {
    const details = orderDto.details
    // @ts-ignore
    delete orderDto.details;

    const order = super.updateOne(id, orderDto)

    details.forEach((detail) => {
      // @ts-ignore
      detail.orderId = order.id
    })
    // console.log(details)
    await this.orderDetailService.updateMany(details)

    return this.getOne(id)
  }
}