import { Request, Response, Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { CreateMusicController } from '../controllers/CreateMusicController';
import { CreateMusicCurtidaController } from '../controllers/CreateMusicCurtidaController';
import { GetMusicsController } from '../controllers/GetMusicsController';
import { GetAllUsersController } from '../controllers/GetAllUsersController';
import { CreateMusicFavoritaController } from '../controllers/CreateMusicFavoritaController';
import { CreatePlaylistController } from '../controllers/CreatePlaylistController';
import { CreatePlaylistUserController } from '../controllers/CreatePlaylistUserController';
import { CreateMusicPlaylistController } from '../controllers/CreateMusicPlaylistController';
import { AuthUserController } from '../authUser/AuthUserController';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';
import { createUserValidation } from '../controllers/CreateUserController';
import { UnknowRoute } from '../errors/AppError';
import { GetUserUnique } from '../DAO/GetUserUnique';
const nodemailer = require("nodemailer");
require('dotenv').config();
import * as crypto from 'crypto'

const createUserController = new CreateUserController();
const createMusicController = new CreateMusicController();
const createMusicCurtida = new CreateMusicCurtidaController()
const getMusicsController = new GetMusicsController()
const getAllUsersController = new GetAllUsersController()
const createMusicFavorita = new CreateMusicFavoritaController()
const createPlaylistController = new CreatePlaylistController()
const createPlayListController = new CreatePlaylistUserController()
const createMusicPlaylistController = new CreateMusicPlaylistController()
const authUserController = new AuthUserController() 


const Routes = Router()

const forgotPassword = async (request: Request, response: Response) => {
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 3000,
  secure: false,
  auth: {
    user: process.env.MY_EMAIL,
    password: process.env.MY_PASSWORD
  }
})

const newPassword = crypto.randomBytes(4).toString('hex')

transporter.sendMail({
  from: process.env.MY_EMAIL,
  to: process.env.MY_EMAIL,
  subject: 'Olar',
  text: `teste ${newPassword}`
}).then(
  () => {
    return response.status(200).json({message: 'email enviado'})
  }
).catch(
  () => {
    return response.status(404).json({message: 'nao'})
  }
)
}

Routes.post("/users", createUserValidation, createUserController.handle)
Routes.post("/login",authUserController.handle)
Routes.post("/music", createMusicController.handle)
Routes.post("/curtida", createMusicCurtida.handle)
Routes.post("/favoritar", createMusicFavorita.handle)
Routes.post("/playlist", createPlaylistController.handle)
Routes.post("/playlistUser", createPlayListController.handle)
Routes.post("/playlistMusic", createMusicPlaylistController.handle)
Routes.post("/email", forgotPassword)
Routes.get("/music", getMusicsController.handle )
Routes.get("/users", /*ensureAuthentication*/ getAllUsersController.handle)
Routes.get('/user/:id', GetUserUnique )


Routes.use(function(req, res, next) {
  throw new UnknowRoute('Unknown route', 404);
});


export { Routes }