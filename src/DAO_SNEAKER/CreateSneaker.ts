import { Music, Sneaker } from '@prisma/client';
import { SneakerInterface } from '../interfaces/SneakerInterface';
import { prismaClient } from '../database/prismaClient';
import { AppError } from '../errors/AppError';

export class CreateSneaker {
   async execute({ name, photo, price, fast_sell, description, new_sneaker, number }: SneakerInterface): Promise<Sneaker> {
      const sneakerAlreadyExist = await prismaClient.sneaker.findUnique({
         where: {
            name,
         },
      })
      if (sneakerAlreadyExist) {
         throw new AppError("sneaker already exist", 400)
      }

      const sneaker = await prismaClient.sneaker.create({
         data: {
          name,
          photo,
          price,
          fast_sell,
          description,
          new_sneaker,
          number
         }
      })

      if(!sneaker) {
         throw new AppError("An information has no informed", 400)
      }

      return sneaker
   }
}