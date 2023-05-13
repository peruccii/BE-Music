import { prismaClient } from '../database/prismaClient';
import { AppError } from '../errors/AppError';
import { MusicFavoritaSchema } from '../interfaces/MusicFavoritaSchema';


export class CreateMusicFavorita {
   async execute({ musicId, userId }: MusicFavoritaSchema): Promise<void> { // void
      //Verificar se a musica favorita existe
     
      
      const musicFavoriteAlreadyExist = await prismaClient.music.findUnique({
         where: {
            id: musicId,
         },
      })
      
      if (!musicFavoriteAlreadyExist) {
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
      await prismaClient.musicFavorita.create({
         data: {
            musicId,
            userId
         } // nao vamos retornar o resultado, pq como é uma CRIACAO de relacionamento, a promise dele vai ser VOID
      })
     
   }
}