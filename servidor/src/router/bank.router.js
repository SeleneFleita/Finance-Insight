import { Router } from "express";
import {registerBank, editarDatosBanco, editarContraseniaBanco, eliminarUsuBank} from '../controllers/bank.controllers.js';
const routerBank = Router();

routerBank.post("/api/register", registerBank)


export default routerBank;