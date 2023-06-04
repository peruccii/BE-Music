import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';
import { User } from '@prisma/client';

export class GetAllUsers {
  async execute(req: Request, res: Response): Promise<void> {
    try {
      const users = await prismaClient.user.findMany({
        orderBy: {
          id: 'desc',
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
                  url_music: true,
                },
              },
            },
          },
          MusicFavorita: {
            select: {
              music: {
                select: {
                  id: true,
                  photo: true,
                  title: true,
                  cantor: true,
                  url_music: true,
                },
              },
            },
          },
          Playlists: {
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
                          cantor: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          TenisCurtida: {
            select: {
              tenis: {
                select: {
                  id: true,
                  photo: true,
                  name: true,
                  description: true,
                  price: true,
                  number: true,
                  new_sneaker: true
                }
              }
            }
          },
          TenisFavorito: {
            select: {
              tenis: {
                select: {
                  id: true,
                  photo: true,
                  name: true,
                  description: true,
                  price: true,
                  number: true,
                  new_sneaker: true
                }
              }
            }
          }
        },
      });

      res.json({ users: users });
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar os usuários' });
    }
  }
}