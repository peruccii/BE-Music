import { Request, Response } from 'express'
import { CreateBrand } from '../DAO_SNEAKER/CreateBrand'
import { BrandInterface } from '../interfaces/BrandInterface'

export class createBrandController {
  async handle(req: Request<{}, {}, Omit<BrandInterface, "id">>, res: Response) {
    const { name, photo } = req.body

    const createBrand = new CreateBrand()

    const result = await createBrand.execute({
      name, photo
    })

    return res.status(201).json(result)
  }
}