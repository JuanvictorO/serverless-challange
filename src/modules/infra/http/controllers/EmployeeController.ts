import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IndexEmployeeUseCase } from '@modules/useCases/IndexEmployeeUseCase';
import { ShowEmployeeUseCase } from '@modules/useCases/ShowEmployeeUseCase';
import { UpdateEmployeeUseCase } from '@modules/useCases/UpdateEmployeeUseCase';
import { CreateEmployeeUseCase } from '@modules/useCases/CreateEmployeeUseCase';
import { DeleteEmployeeUseCase } from '@modules/useCases/DeleteEmployeeUseCase';

export class EmployeeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexEmployeeUseCase = container.resolve(IndexEmployeeUseCase);

    const employee = await indexEmployeeUseCase.execute();

    return response.json(instanceToInstance(employee));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showEmployeeUseCase = container.resolve(ShowEmployeeUseCase);

    const employee = await showEmployeeUseCase.execute({ id });

    return response.json(instanceToInstance(employee));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, birthday, office_id } = request.body;

    const createEmployeeUseCase = container.resolve(CreateEmployeeUseCase);

    const employee = await createEmployeeUseCase.execute({
      name,
      birthday,
      office_id,
    });

    return response.status(201).send(instanceToInstance(employee));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, birthday, office_id } = request.body;

    const updateEmployeeUseCase = container.resolve(UpdateEmployeeUseCase);

    const employee = await updateEmployeeUseCase.execute({
      id,
      name,
      birthday,
      office_id,
    });

    return response.json(instanceToInstance(employee));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteEmployeeUseCase = container.resolve(DeleteEmployeeUseCase);

    await deleteEmployeeUseCase.execute({ id });

    return response.status(204).send();
  }
}
