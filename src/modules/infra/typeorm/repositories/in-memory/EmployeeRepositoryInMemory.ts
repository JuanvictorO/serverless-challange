import { ICreateEmployeeDTO } from '@modules/dtos/ICreateEmployeeDTO';
import { IUpdateEmployeeDTO } from '@modules/dtos/IUpdateEmployeeDTO';
import { EmployeeRepositoryInterface } from '@modules/repositories/EmployeeRepositoryInterface';
import { Employee } from '../../entities/Employee';

class EmployeeRepositoryInMemory implements EmployeeRepositoryInterface {
  employees: Employee[] = [];

  async findOne(id: string): Promise<Employee | undefined> {
    const employee = await this.employees.find(employee => employee.id === id);
    return employee;
  }

  async findAll(): Promise<Employee[]> {
    const all = this.employees;
    return all;
  }

  async save({ id, name, birthday, office_id }: IUpdateEmployeeDTO): Promise<Employee> {
    const employee = new Employee();

    Object.assign(employee, {
      id,
      name,
      birthday,
      office_id,
    });

    const employeePosition = await this.employees.findIndex(employee => employee.id === id);

    this.employees[employeePosition].name = employee.name;
    this.employees[employeePosition].birthday = employee.birthday;
    this.employees[employeePosition].office_id = employee.office_id;

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

  async delete(id: string): Promise<boolean> {
    const employeeIndex = await this.employees.findIndex(employee => employee.id === id);
    this.employees.splice(employeeIndex, 1);

    return true;
  }

  async findByName(name: string): Promise<Employee | undefined> {
    const employee = await this.employees.find(employee => employee.name === name);
    return employee;
  }

  async index(): Promise<Employee[]> {
    const all = this.employees;
    return all;
  }

  async show(id: string): Promise<Employee | undefined> {
    const employee = this.employees.find(employee => employee.id === id);
    return employee;
  }
}

export { EmployeeRepositoryInMemory };
