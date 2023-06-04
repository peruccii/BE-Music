import { Request, Response } from 'express'
import { CreateSneaker } from '../DAO_SNEAKER/CreateSneaker'
import { SneakerInterface } from '../interfaces/SneakerInterface'

export class CreateSneakerController {
  async handle(req: Request<{}, {}, Omit<SneakerInterface, "id">>, res: Response) {
    const { name, photo, description, new_sneaker, fast_sell, number, price} = req.body

    const createSneaker = new CreateSneaker()

    const rs = await createSneaker.execute({
      name, price, photo, description, new_sneaker, fast_sell, number
    })

    return res.status(201).json(rs)
  }
}