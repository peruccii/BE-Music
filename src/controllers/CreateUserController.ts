import { Request, Response } from 'express'
import { CreateUser } from '../DAO/CreateUser'

import { STATUS_CODES } from 'http'

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, senha } = req.body

    const createUser = new CreateUser()

    const result = await createUser.execute({ name, email, senha })

    return res.status(201).json(result)
  }
}