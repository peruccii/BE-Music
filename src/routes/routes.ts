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
import { createBrandController } from '../controllers_sneaker/createBrandController';
import { CreateSneakerBrandController } from '../controllers_sneaker/CreateSneakerBrandController';
import { CreateSneakerController } from '../controllers_sneaker/CreateSneakerController';
import { GetAllSneakersController } from '../controllers_sneaker/GetAllSneakersController';
import { forgotPassword } from '../authUser/AuthUserController';
import { log } from 'console';

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

const CreateBrandController = new createBrandController()
const createSneakerBrandController = new CreateSneakerBrandController()
const createSneakerController = new CreateSneakerController()
const getAllSneakersController = new GetAllSneakersController()

const Routes = Router()

const nodemailer = require("nodemailer")
const stripe = require('stripe')('sk_test_51NFmiuB44rleyHUGDyWn2d7P48h5BMW19mZg0ujRGtqaR8Y6rs20B0wxqtMvBB0i96E6ocxJAO8ckFHuKQG7kaB000LooKGoZ0')




Routes.post("/users", createUserValidation, createUserController.handle)
Routes.post("/login",authUserController.handle)
Routes.post("/music", createMusicController.handle)
Routes.post("/curtida", createMusicCurtida.handle)
Routes.post("/favoritar", createMusicFavorita.handle)
Routes.post("/playlist", createPlaylistController.handle)
Routes.post("/playlistUser", createPlayListController.handle)
Routes.post("/playlistMusic", createMusicPlaylistController.handle)
Routes.post("/email", async (req, res) => {
  var transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: "peruccii2917@hotmail.com",
      pass: "eduardoejulia27"
    }
  })

  let message = await transport.sendMail({
    from: "peruccii2917@hotmail.com",
    to: "rpsouza23@outlook.com",
    subject: "Teste",
    html: "<h1 >Oi mae</h1>"
  })

  res.send('email enviado com sucesso')
  
})
Routes.get("/music", getMusicsController.handle )
Routes.get("/users", /*ensureAuthentication*/ getAllUsersController.handle)
Routes.get('/user/:id', GetUserUnique )


Routes.post("/brand", CreateBrandController.handle)
Routes.post("/sneakerBrand", createSneakerBrandController.handle)
Routes.post("/sneaker", createSneakerController.handle)
Routes.get("/sneaker", getAllSneakersController.handle)


Routes.post('/forgot-password', forgotPassword)

Routes.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  })

  
  res.send({ url: session.url })
})

Routes.use(function(req, res, next) {
  throw new UnknowRoute('Unknown route', 404);
});


export { Routes }