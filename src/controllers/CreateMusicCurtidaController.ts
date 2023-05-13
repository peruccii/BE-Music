import { Request, Response } from 'express'
import { CreateMusicCurtida } from '../DAO/CreateMusicCurtida'

 export class CreateMusicCurtidaController {
  async handle(req: Request, res: Response){
    const {musicId, userId} = req.body

    const createMusicCurtida = new CreateMusicCurtida() 

    /*const result = */  await createMusicCurtida.execute({musicId, userId}) // Como ele retorna nada, ele nao tem result, apenas cria uma relação

    return res.status(201).send()/*.json(result)*/
    // .send() pra enviar a resposta ( relacao )
  }
}

