import { Request, Response } from 'express'
import { AuthUser } from './AuthUser'


export class AuthUserController {
  async handle(request: Request, response: Response){
    const {name, senha} = request.body

    const authUser = new AuthUser()

    const token = await authUser.execute({
      name,
      senha
    })
    
    return response.json(token)
  }
}