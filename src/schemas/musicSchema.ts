import * as yup from 'yup'
import { MusicInterface } from '../interfaces/MusicInterface'

interface IBodyProps extends Omit<MusicInterface, 'id'>{ }

export const musicBodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
  title: yup.string().required().min(3).max(40),
  photo: yup.string().url().required(),
  cantor: yup.string().required().min(3).max(100),
  url_music: yup.string().required(),
  realease_date: yup.date().required()
})