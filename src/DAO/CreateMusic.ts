import { Music } from '@prisma/client';
import { MusicInterface } from '../interfaces/MusicInterface';
import { prismaClient } from '../database/prismaClient';
import { AppError } from '../errors/AppError';

export class CreateMusic {
   async execute({ title, photo, cantor, url_music, realease_date }: MusicInterface): Promise<Music> {
      const musicAlreadyExist = await prismaClient.music.findUnique({
         where: {
            title,
         },
      })
      if (musicAlreadyExist) {
         throw new AppError("user already exist", 400)
      }
      //Criar a musica
      const music = await prismaClient.music.create({
         data: {
            title,
            photo,
            cantor,
            url_music,
            realease_date
         }
      })

      return music
   }
}