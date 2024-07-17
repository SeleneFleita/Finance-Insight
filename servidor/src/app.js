//IMPORTS
import express from "express";
import cors from "cors";
import morgan from "morgan";


const app = express();
//END

//MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// END
//BASE DATA
import { conectionDB } from "./bd/basedata.js";
import {createTableAndRelations} from './bd/sync.js';
//conexion
conectionDB();
//creacion 
createTableAndRelations();
//END

//ROUTES
import routerBank from "./router/bank.router.js";
import routerClient from "./router/client.router.js";
import routerCourse from "./router/course.router.js";

app.use(routerBank);
app.use(routerClient);
app.use(routerCourse);
//END

//SERVER CONECTION
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("Servidor posicionado en el puerto", port);
});
//END
