import { prismaClient } from '../database/prismaClient';
import { AppError } from '../errors/AppError';
import { SneakerBrandInterface } from '../interfaces/SneakerBrandInterface';


export class RelationSneakerBrand {
   async execute({ tenisId, marcaId }: SneakerBrandInterface): Promise<void> { 

      const relationAlreadyExist = await prismaClient.sneaker.findUnique({
         where: {
            id: tenisId,
         },
      })
      
      if (!relationAlreadyExist) {
         throw new AppError("sneaker does not exist", 400)
      }

      const brandExists = await prismaClient.brand.findUnique({
         where: {
            id: marcaId,
         },
      })
      if(!brandExists) {
         throw new AppError("brand does not exist", 400)
      }

      await prismaClient.tenisBrand.create({
         data: {
            marcaId,
            tenisId
         } 
      })
     
   }
}