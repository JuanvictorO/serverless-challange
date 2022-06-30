import { ICreateEmployeeDTO } from '@modules/dtos/ICreateEmployeeDTO';
import { IUpdateEmployeeDTO } from '@modules/dtos/IUpdateEmployeeDTO';
import { EmployeeRepositoryInterface } from '@modules/repositories/EmployeeRepositoryInterface';
import { Employee } from '../../entities/Employee';
import { Office } from '../../entities/Office';

class EmployeeRepositoryInMemory implements EmployeeRepositoryInterface {
  employees: Employee[] = [];

  findOne(id: string): Promise<Employee | undefined> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Employee[]> {
    throw new Error('Method not implemented.');
  }
  save(data: IUpdateEmployeeDTO): Promise<Employee> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async index(): Promise<Employee[]> {
    const all = this.employees;
    return all;
  }

  async show(id: string): Promise<Employee | undefined> {
    const employee = this.employees.find(employee => employee.id === id);
    return employee;
  }

  async create({ name, birthday, office_id }: ICreateEmployeeDTO): Promise<Employee> {
    const employee = new Employee();

    Object.assign(employee, {
      name,
      birthday,
      office_id,
    });

    this.employees.push(employee);

    return employee;
  }
}

export { EmployeeRepositoryInMemory };
