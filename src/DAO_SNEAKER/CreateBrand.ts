import { Brand } from '@prisma/client';
import { BrandInterface } from '../interfaces/BrandInterface';
import { prismaClient } from '../database/prismaClient';
import { AppError } from '../errors/AppError';

export class CreateBrand{
  async execute({name, photo}: BrandInterface): Promise<Brand> {
    const brandAlreadyExist = await prismaClient.brand.findUnique({
      where: {
        name,
      },
    })
    if(brandAlreadyExist) {
      throw new AppError("brand already exist", 400)
    }
    const brand = await prismaClient.brand.create({
      data: {
        name,
        photo
      }
    })
    return brand
  }
}