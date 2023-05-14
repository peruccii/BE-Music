import { Request, Response } from 'express'
import { CreateMusic } from '../DAO/CreateMusic'
import { MusicInterface } from '../interfaces/MusicInterface'

export class CreateMusicController {
  async handle(req: Request<{}, {}, Omit<MusicInterface, "id">>, res: Response) {
    const { title, photo, cantor, url_music, realease_date } = req.body

    const createMusic = new CreateMusic()

    const result = await createMusic.execute({
      title, photo, cantor, url_music, realease_date
    })

    return res.status(201).json(result)
  }
}