import { Request, Response } from 'express'
import { GetAllUsers } from '../DAO/GetAllUsers'

export class GetAllUsersController {
  async handle(req: Request, res: Response) {


    const getAllUsers = new GetAllUsers()

    const result = await getAllUsers.execute()

    return res.status(201).json(result)
  }
}