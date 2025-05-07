import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ColorModule} from "./color/module";
import {EmployeeModule} from "./employee/module";

@Module({
  imports: [ColorModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
