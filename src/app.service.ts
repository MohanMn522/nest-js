import { Injectable } from '@nestjs/common';

type Employee = {
  name: string;
  id: number;
  email: string;
};

@Injectable()
export class AppService {

  private employees: Employee[] = [
    {
    id: 1,
    name: 'mohan',
    email: 'mohan@gmail.com',
    },
    {
      id:2,
      name:"raju",
      email:"raju@gmail.com",
    }

  ];

  getEmployees(): Employee[] {
    return this.employees;
  }
}