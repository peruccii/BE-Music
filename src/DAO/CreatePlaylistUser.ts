import { PlaylistUserInterface } from '../interfaces/PlaylistUserInterface';
import { prismaClient } from '../database/prismaClient';
import { AppError } from '../errors/AppError';

export class CreatePlaylistUser {
   async execute({ playlistId, userId }: PlaylistUserInterface ): Promise<void> {       
      const playlistAlreadyExist = await prismaClient.playlist.findUnique({
         where: {
            id: playlistId,
         },
      })
      
      if (!playlistAlreadyExist) {
         throw new AppError("Music does not exist", 400)
      }

      const userExists = await prismaClient.user.findUnique({
         where: {
            id: userId,
         },
      })
      if(!userExists) {
         throw new AppError("User does not exist", 400)
      }

      await prismaClient.playlistUser.create({
         data: {
            playlistId,
            userId
         } 
      })
     
   }
}