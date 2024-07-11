import { Router } from "express";

const routerBank = Router();

routerBank.get("/bank", (req, res) => {
    res.send("I am a Router in banc")
    })


export default routerBank;