import { Request, Response } from 'express'
import { CreateMusicFavorita } from '../DAO/CreateMusicFavorita'

 export class CreateMusicFavoritaController {
  async handle(req: Request, res: Response){
    const {musicId, userId} = req.body

    const createMusicFavorita = new CreateMusicFavorita() 

    /*const result = */  await createMusicFavorita.execute({musicId, userId}) // Como ele retorna nada, ele nao tem result, apenas cria uma relação

    return res.status(201).send()/*.json(result)*/
    // .send() pra enviar a resposta ( relacao )
  }
}