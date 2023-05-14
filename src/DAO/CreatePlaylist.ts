import { Playlist } from '@prisma/client';
import { PlaylistInterface } from '../interfaces/PlaylistInterface';
import { prismaClient } from '../database/prismaClient';
import { AppError } from '../errors/AppError';


export class CreatePlaylist {
   async execute({ title, photo, isPublic }: PlaylistInterface): Promise<Playlist> {
      const playlistAlreadyExist = await prismaClient.playlist.findUnique({
         where: {
            title,
         },
      })
      if (playlistAlreadyExist) {
         throw new AppError("playlist already exist", 400)
      }
      //Criar a playlist
      const playlist = await prismaClient.playlist.create({
         data: {
            title,
            photo,
            isPublic
         }
      })

      return playlist
   }
}