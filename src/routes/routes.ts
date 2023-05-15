import { Router } from 'express';
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

Routes.post("/users", createUserValidation, createUserController.handle)
Routes.post("/login",authUserController.handle)
Routes.post("/music", createMusicController.handle)
Routes.post("/curtida", createMusicCurtida.handle)
Routes.post("/favoritar", createMusicFavorita.handle)
Routes.post("/playlist", createPlaylistController.handle)
Routes.post("/playlistUser", createPlayListController.handle)
Routes.post("/playlistMusic", createMusicPlaylistController.handle)
Routes.get("/music", getMusicsController.handle )
Routes.get("/users", ensureAuthentication ,getAllUsersController.handle)

export { Routes }