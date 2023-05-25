import { Music } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';

export class GetMusics {
   async execute(): Promise<Music[]> {
      const musics = await prismaClient.music.findMany({
        orderBy: {
          realease_date: "desc"
        }
      })
      return musics
   }
}