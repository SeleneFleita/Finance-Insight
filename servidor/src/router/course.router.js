import { Router } from "express";

console.log("object");
const routerCourse = Router();
routerCourse.get("/course", (req, res) => {
    res.send("I am a Router")
    })



export default routerCourse;