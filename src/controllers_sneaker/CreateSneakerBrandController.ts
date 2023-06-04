import { Request, Response } from 'express'
import { RelationSneakerBrand } from '../DAO_SNEAKER/RelationSneakerBrand'

 export class CreateSneakerBrandController {
  async handle(req: Request, res: Response){
    const {marcaId, tenisId} = req.body

    const createSneakerBrand = new RelationSneakerBrand() 

    await createSneakerBrand.execute({marcaId, tenisId}) 

    return res.status(201).send()
    
  }
}

