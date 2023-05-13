import { Request, Response } from 'express'
import { GetMusics } from '../DAO/GetMusics'

export class GetMusicsController {
  async handle(req: Request, res: Response) {


    const getMusic = new GetMusics()

    const result = await getMusic.execute()

    return res.status(201).json(result)
  }
}