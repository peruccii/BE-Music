import { Request, Response } from 'express'
import { CreatePlaylistUser } from '../DAO/CreatePlaylistUser'

 export class CreatePlaylistUserController {
  async handle(req: Request, res: Response){
    const {playlistId, userId} = req.body

    const createPlaylistUser = new CreatePlaylistUser() 

    /*const result = */  await createPlaylistUser.execute({playlistId, userId}) // Como ele retorna nada, ele nao tem result, apenas cria uma relação

    return res.status(201).send()/*.json(result)*/
    // .send() pra enviar a resposta ( relacao )
  }
}