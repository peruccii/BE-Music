import { prismaClient } from '../database/prismaClient';
import { AppError } from '../errors/AppError';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken'

interface UserAuthSchema {
  name: string
  senha: string
 
}

export class AuthUser {
  async execute({name, senha}: UserAuthSchema) {
    
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        name
      }
    })
 
    if(!userAlreadyExists) {
      throw new AppError("User does not exit", 400)
    }

    const passwordMatch = await compare(senha, userAlreadyExists.senha)

    if(!passwordMatch) {
      throw new AppError("User or passowrd incorrect!", 400)
    }

    const {senha: _, ...User} = userAlreadyExists

    const token = sign({}, "5ad1ca5e-8d09-46d8-9b0a-b4a8ba58577b", {
      subject: userAlreadyExists.id,
      expiresIn: "30s"
    })

    return {User, token}
  }
}