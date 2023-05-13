import { prismaClient } from '../database/prismaClient';
import { AppError } from '../errors/AppError';
import { MusicPlaylistSchema } from '../interfaces/MusicPlaylistSchema';

export class CreateMusicPlaylist {
   async execute({ musicId, playlistId }: MusicPlaylistSchema): Promise<void> { // void
      //Verificar se a musica existe 
     
      
      const musicAlreadyExist = await prismaClient.music.findUnique({
         where: {
            id: musicId,
         },
      })
      
      if (!musicAlreadyExist) {
         throw new AppError("Music does not exist", 400)
      }

      // Verificar se a playlist ja existe
      const userExists = await prismaClient.playlist.findUnique({
         where: {
            id: playlistId,
         },
      })
      if(!userExists) {
         throw new AppError("Playlist does not exist", 400)
      }

      //Criar o relacionamento entre musica e usuario
      await prismaClient.musicPlaylist.create({
         data: {
            musicId,
            playlistId
         } // nao vamos retornar o resultado, pq como é uma CRIACAO de relacionamento, a promise dele vai ser VOID
      })
     
   }
}