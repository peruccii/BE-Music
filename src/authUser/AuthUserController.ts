import { Request, Response } from 'express'
import { AuthUser } from './AuthUser'
import { prismaClient } from '../database/prismaClient';
import * as crypto from 'crypto'
import * as bcrypt from 'bcrypt'
const nodemailer = require("nodemailer")

export class AuthUserController {
  async handle(request: Request, response: Response){
    const {email, senha} = request.body

    const authUser = new AuthUser()

    const token = await authUser.execute({
      email,
      senha
    })
    
    return response.json(token)
  }
}

export const forgotPassword = async (request: Request, response: Response) => {
  const { email } = request.body;

  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email
      }
    });

    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const newPassword = crypto.randomBytes(4).toString('hex');

    transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Recuperação de senha',
      text: `Sua nova senha ${newPassword}<a href="http://localhost:3000/login">Sistema</a>`
    }).then(() => {
      bcrypt.hash(newPassword, 8).then((hashedPassword) => {
        prismaClient.user
          .update({
            where: {
              id: user.id
            },
            data: {
              senha: hashedPassword
            }
          })
          .then(() => {
            return response.status(200).json({ message: 'Email enviado' });
          });
      });
    }).catch(() => {
      return response.status(404).json({ message: 'User not found email' });
    });

  } catch (error) {
    return response.status(404).json({ message: 'Fail to send email' });
  }
};
