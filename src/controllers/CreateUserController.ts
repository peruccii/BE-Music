import { Request, RequestHandler, Response } from 'express'
import { CreateUser } from '../DAO/CreateUser'
import { UserInterface } from '../interfaces/UserInterface'
import { userBodyValidation } from '../schemas/userSchema'
import * as yup from 'yup'

export const createUserValidation: RequestHandler = async (req, res, next) => {
  try {
    await userBodyValidation.validate(req.body, { abortEarly: false })
    return next()
  } catch (err) {
    const yupError = err as yup.ValidationError
    const errors: Record<string, string> = {}

    yupError.inner.forEach(error => {
      if (error.path === undefined) return
      errors[error.path] = error.message
    })

    return res.status(400).json({
      errors
    })
  }
}

export class CreateUserController {
  async handle(req: Request<{}, {}, Omit<UserInterface, "id">>, res: Response) {
    const { name, email, senha } = req.body

    const createUser = new CreateUser()

    const result = await createUser.execute({ name, email, senha })

    return res.status(201).json(result)
  }
}