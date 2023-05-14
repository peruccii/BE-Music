import { Request, Response } from 'express'
import { CreateUser } from '../DAO/CreateUser'
import { UserInterface } from '../interfaces/UserInterface'
import { userBodyValidation } from '../schemas/userSchema'
import * as yup from 'yup'

export class CreateUserController {
  async handle(req: Request<{}, {}, Omit<UserInterface, "id">>, res: Response) {
    const { name, email, senha } = req.body

    let validadeData: UserInterface | undefined = undefined

    try{
      validadeData = await userBodyValidation.validate(req.body)
    }catch (error) {
      const yupError = error as yup.ValidationError

      return res.json({
        errors: {
          default: yupError.message
        }
      })
    }

    const createUser = new CreateUser()

    const result = await createUser.execute({ name, email, senha })

    return res.status(201).json(result)
  }
}