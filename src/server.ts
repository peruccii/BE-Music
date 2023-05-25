import "express-async-errors"
import express, { NextFunction,Request, Response } from "express"
import { Routes } from './routes/routes';
import { AppError } from './errors/AppError';

const app = express()
var cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(Routes, cors())

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: `internal server error - ${err.message}`
  })
})

app.listen(3000, () => console.log("Server esta rodando na porta"));


/*import app from "./app";
import http from "http";
import debug from "debug";
import { Server } from "socket.io";

const port = normalizePort(process.env.PORT || "3333");
console.log(port);


app.io.on("connection", (socket) => {
  const user = socket.id;
  console.log(`Usuário conectado no socket ${socket.id} `);
  app.io.emit("userConnected", user);
});

app.httpServer.listen(port, () => console.log("App rodando"));

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}*/