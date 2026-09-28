import {
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';

import { AppService } from './app.service.js';
import { CreateEmployee } from './Dto/createemployee.dto.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get('/employees')
  getEmployees(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('name') name?: string,
  ) {
    const currentPage = Number(page) || 1;
    const currentPageSize = Number(pageSize) || 2;

    return this.appService.getEmployees(
      currentPage,
      currentPageSize,
      name,
    );
  }

  @Post('/create')
  postemployeedetails(
    @Body() body: CreateEmployee,
  ) {
    console.log('data:', body);

    return this.appService.createEmployee(body);
  }
}