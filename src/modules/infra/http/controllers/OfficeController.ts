import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IndexOfficeUseCase } from '@modules/useCases/IndexOfficeUseCase';
import { CreateOfficeUseCase } from '@modules/useCases/CreateOfficeUseCase';

export class OfficeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexOfficeUseCase = container.resolve(IndexOfficeUseCase);

    const office = await indexOfficeUseCase.execute();

    return response.json(instanceToInstance(office));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createOfficeUseCase = container.resolve(CreateOfficeUseCase);

    const office = await createOfficeUseCase.execute(name);

    return response.status(201).send(instanceToInstance(office));
  }
}
