import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderEntity } from './entity';
import { BaseService } from "../base/service";
import { EmployeeEntity } from "../employee/entity";
import { CreateOrderDto } from "./dto";
import { OrderDetailService } from "../orderDetail/service";
import { CreateOrderDetailDto } from "../orderDetail/dto";
import { toCamelCase } from "../utils";

@Injectable()
export class OrderService extends BaseService {

  columns: string[] = ['id', 'employee_id', 'total_amount', 'delivery_address', 'payment_status', 'comment']

  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<OrderEntity>,

    private orderDetailService: OrderDetailService
  ) {
    super(orderRepository)
  }

  handleSelect() {
    return this.orderRepository.createQueryBuilder('order')
      .select([
        'order.id as id',
        "json_build_object('id', employee.id, 'name', employee.name) as employee",
        'order.total_amount as totalAmount',
        'order.delivery_address as deliveryAddress',
        'order.payment_status as paymentStatus',
        'order.comment as comment',
      ])
      .innerJoin(
        EmployeeEntity, 'employee', 'employee.id = order.employeeId'
      )
  }

  async create(orderDto: CreateOrderDto): Promise<any> {
    console.log(orderDto)
    const order = toCamelCase(await super.create({
      employeeId: orderDto.employeeId,
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
}