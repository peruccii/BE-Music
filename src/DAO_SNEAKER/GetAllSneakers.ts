import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';
import { Sneaker } from '@prisma/client';

export class GetAllSneakers {
  async execute(res: Response): Promise<void> {
    try {
      const sneakers = await prismaClient.sneaker.findMany({
        orderBy: {
          id: 'desc',
        },
        include: {
          Marca: {
            select: {
              marca: {
                select: {
                  name: true
                }
              }
            }
          }
        },
      });

      res.json({ sneakers: sneakers });
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar os usuários' });
    }
  }
}