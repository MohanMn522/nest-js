import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

type Employee = {
  name: string;
  id: number;
  email: string;
};

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  private employees: Employee[] = [
    {
      id: 1,
      name: 'mohan',
      email: 'mohan@gmail.com',
    },
    {
      id: 2,
      name: 'raju',
      email: 'raju@gmail.com',
    },
    {
      id: 3,
      name: 'suresh',
      email: 'suresh@gmail.com',
    },
    {
      id: 4,
      name: 'ravi',
      email: 'ravi@gmail.com',
    },
    {
      id: 5,
      name: 'kiran',
      email: 'kiran@gmail.com',
    },
  ];

  getEmployees(
    page: number = 1,
    pageSize: number = 2,
    name?: string,
  ) {
    try {
      console.log('Getting employees');

      if (page < 1) {
        page = 1;
      }

      if (pageSize < 1) {
        pageSize = 1;
      }

      let filteredEmployees = this.employees;

      if (name) {
        filteredEmployees = this.employees.filter(
          (employee) =>
            employee.name
              .toLowerCase()
              .includes(name.toLowerCase()),
        );
      }

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const data = filteredEmployees.slice(
        startIndex,
        endIndex,
      );

      const total = filteredEmployees.length;

      const totalPages = Math.ceil(
        total / pageSize,
      );

      return {
        data,
        page,
        pageSize,
        name: name || null,
        total,
        totalPages,
      };
    } catch (e: any) {
      console.error('Error:', e);

      this.logger.error(
        'Error while getting employees',
        e.stack,
      );

      throw new InternalServerErrorException(
        'Something went wrong',
      );
    }
  }

  createEmployee(employee: Employee): Employee {
    try {
      console.log('Creating employee:', employee);

      this.employees.push(employee);

      return employee;
    } catch (e: any) {
      console.error('Error:', e);

      this.logger.error(
        'Error while creating employee',
        e.stack,
      );

      throw new InternalServerErrorException(
        'Unable to create employee',
      );
    }
  }

  getEmployeeById(id: number): Employee {
    try {
      const employee = this.employees.find(
        (employee) => employee.id === id,
      );

      if (!employee) {
        throw new NotFoundException(
          'Employee not found',
        );
      }

      return employee;
    } catch (e: any) {
      if (e instanceof NotFoundException) {
        throw e;
      }

      console.error('Error:', e);

      this.logger.error(
        'Error while getting employee',
        e.stack,
      );

      throw new InternalServerErrorException(
        'Something went wrong',
      );
    }
  }
}