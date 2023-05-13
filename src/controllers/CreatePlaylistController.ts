import { Request, Response } from 'express'
import { CreateUser } from '../DAO/CreateUser'
import { STATUS_CODES } from 'http'
import { CreatePlaylist } from '../DAO/CreatePlaylist'

export class CreatePlaylistController {
  async handle(req: Request, res: Response) {
    const { title, photo, isPublic } = req.body

    const createPlaylist = new CreatePlaylist()

    const result = await createPlaylist.execute({
      title, photo, isPublic
    })

    return res.status(201).json(result)
  }
}