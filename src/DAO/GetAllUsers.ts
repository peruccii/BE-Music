import {  User } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';

export class GetAllUsers {
   async execute(): Promise<User[]> {
      const users = await prismaClient.user.findMany({
        orderBy: {
          id: "desc",
        },
        include: { 
          music_curtida: {
            select: {
              music: {
                select: {
                  id: true,
                  photo: true,
                  title: true,
                  cantor: true,
                  url_music: true
                }
              }
            }
          },
          MusicFavorita : {
            select: {
              music: {
                select: {
                  id: true,
                  photo: true,
                  title: true,
                  cantor: true,
                  url_music: true
                }
              }
            }
          },
          Playlists : {
            select: {
              playlist: {
                select: {
                  id: true,
                  photo: true,
                  title: true,
                  isPublic: true,
                  musicas_adicionadas: {
                    select: {
                      music: {
                        select: {
                          id: true,
                          photo: true,
                          title: true,
                          cantor: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      })
      return users
   }
}