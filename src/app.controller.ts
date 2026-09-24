import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service.js';
import { Office } from './Dto/office.dto.js';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}



  @Get()
  getEmployees() {
    return this.appService.getEmployees();
  
  }

  @Post('/details')
  postemployeedetails(@Body() body: Office) {
    console.log('data:', body);

    return body;
  }
}