import * as yup from 'yup'
import { UserInterface } from '../interfaces/UserInterface'

interface IBodyProps extends Omit<UserInterface, 'id'>{ }

export const userBodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
  email: yup.string().email().required().min(10),
  senha: yup.string().required().min(5),
  name: yup.string().required().min(3).max(100),
})