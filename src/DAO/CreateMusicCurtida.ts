import { prismaClient } from '../database/prismaClient';
import { AppError } from '../errors/AppError';
import { MusicCurtidaSchema } from '../interfaces/MusicCurtidaSchema';


export class CreateMusicCurtida {
   async execute({ musicId, userId }: MusicCurtidaSchema): Promise<void> { // void
      //Verificar se a musica existe
     
      
      const musicAlreadyExist = await prismaClient.music.findUnique({
         where: {
            id: musicId,
         },
      })
      
      if (!musicAlreadyExist) {
         throw new AppError("Music does not exist", 400)
      }

      // Verificar se o usuario ja existe
      const userExists = await prismaClient.user.findUnique({
         where: {
            id: userId,
         },
      })
      if(!userExists) {
         throw new AppError("User does not exist", 400)
      }

      //Criar o relacionamento entre musica e usuario
      await prismaClient.musicCurtida.create({
         data: {
            musicId,
            userId
         } // nao vamos retornar o resultado, pq como é uma CRIACAO de relacionamento, a promise dele vai ser VOID
      })
     
   }
}