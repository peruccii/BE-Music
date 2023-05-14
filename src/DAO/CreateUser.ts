import { User } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';
import { UserInterface } from '../interfaces/UserInterface';
import { AppError } from '../errors/AppError';
import bcrypt from "bcrypt"

export class CreateUser { // UserSchema = Interface de user
  async execute({ name, email, senha}: UserInterface): Promise<User> { // Promise<tabela User do banco de dados>, ele espera retornar se baseando nessr banco de dados
    // Verificar se o usuario ja existe
    const userAlreadyExists = await prismaClient.user.findUnique({ // FindUnique para achar algum argumento que seja proprio
      where : {
        email // no nosso banco o email é um unique, o que facilita na verificação
      }
    })
    if(userAlreadyExists) {
      throw new AppError("user already exist", 400)
    }

    const hashPassword = await bcrypt.hash(senha, 10)

    

    //Criar o usuario
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        senha: hashPassword
      }
    })

 

    return user
  }
}