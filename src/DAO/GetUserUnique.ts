import { prismaClient } from '../database/prismaClient';
import { Request, Response, response } from 'express';



export const GetUserUnique = async (req: Request, res: Response) => {
  try {
    const paramId = req.params.id

    const uniqueUser = await prismaClient.user.findUnique({
      where: {
        id: paramId,
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
      },
    });

   

    if (!uniqueUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.json({ uniqueUser: uniqueUser });
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    return res.status(500).json({ error: 'Ocorreu um erro ao buscar o usuário' });
  }
};
