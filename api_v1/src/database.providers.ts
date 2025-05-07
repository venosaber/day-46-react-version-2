import { DataSource } from 'typeorm';
import {ColorEntity} from "./color/entity";
import {EmployeeEntity} from "./employee/entity";

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'default',
        entities: [
          ColorEntity, EmployeeEntity
        ],
        synchronize: false,
        logging: true,
      });

      return dataSource.initialize();
    },
  },
];