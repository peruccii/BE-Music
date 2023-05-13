import { PlaylistUserSchema } from '../interfaces/PlaylistUserSchema';
import { prismaClient } from '../database/prismaClient';
import { AppError } from '../errors/AppError';

export class CreatePlaylistUser {
   async execute({ playlistId, userId }: PlaylistUserSchema ): Promise<void> { // void
      //Verificar se a playlist existe
     
      
      const playlistAlreadyExist = await prismaClient.playlist.findUnique({
         where: {
            id: playlistId,
         },
      })
      
      if (!playlistAlreadyExist) {
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

      //Criar o relacionamento entre playlist e usuario
      await prismaClient.playlistUser.create({
         data: {
            playlistId,
            userId
         } // nao vamos retornar o resultado, pq como é uma CRIACAO de relacionamento, a promise dele vai ser VOID
      })
     
   }
}