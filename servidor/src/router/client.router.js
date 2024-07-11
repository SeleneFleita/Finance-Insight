import { Router } from "express";

const routerClient = Router();

routerClient.get("/client", (req, res) => {
    res.send("I am a Router in banc");
});

export default routerClient;
