import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './entity';
import {BaseService} from "../base/service";

@Injectable()
export class ProductService extends BaseService {

  columns: string[] = ['id', 'name', 'short_name', 'code', 'description', 'color_id']

  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<ProductEntity>,
  ) {
    super(productRepository)
  }

  handleSelect() {
    return this.productRepository.createQueryBuilder()
      .select([...this.columns])
  }

  getList(condition: any = {active: true}) {
    return super.getList(condition)
  }
}