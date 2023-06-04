import { Request, Response } from 'express'
import { GetAllSneakers } from '../DAO_SNEAKER/GetAllSneakers'

export class GetAllSneakersController {
  async handle(req: Request, res: Response) {
    const getAllSneakers = new GetAllSneakers()

    const result = await getAllSneakers.execute(res)

    return res.status(201).json(result)
  }
}