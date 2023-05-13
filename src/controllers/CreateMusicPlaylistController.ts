import { Request, Response } from 'express'
import { CreateMusicPlaylist } from '../DAO/CreateMusicPlaylist'

 export class CreateMusicPlaylistController {
  async handle(req: Request, res: Response){
    const {musicId, playlistId} = req.body

    const createMusicPlaylist = new CreateMusicPlaylist() 

    /*const result = */  await createMusicPlaylist.execute({musicId, playlistId}) // Como ele retorna nada, ele nao tem result, apenas cria uma relação

    return res.status(201).send()/*.json(result)*/
    // .send() pra enviar a resposta ( relacao )
  }
}