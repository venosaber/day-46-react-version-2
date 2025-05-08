import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './entity';
import {BaseService} from "../base/service";
import {ColorEntity} from "../color/entity";

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
    return this.productRepository.createQueryBuilder('product')
      .select([
        'product.id as id',
        'product.name as name',
        'product.short_name as shortName',
        'product.code as code',
        'product.description as description',
        "json_build_object('id', color.id, 'name', color.name) as color"
      ])
      .innerJoin(
        ColorEntity, 'color', 'color.id = product.colorId'
      )
  }

  async getList(condition: any = {active: true}): Promise<any[]> {
    let products = await super.getList(condition)
    console.log(products)
    products = products.map(e => {
      const result = {...e, shortName: e.short_name}
      delete result.short_name
      return result
    })

    console.log(products)
    return products
  }
}