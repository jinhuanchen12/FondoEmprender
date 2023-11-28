//const express = require("express");
import express  from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors"
import usuarioRoutes from './routes/usuarioRoutes.js'
import emprendimiendoRoutes from './routes/emprendimiendoRoutes.js'


const app = express();
app.use(express.json())

dotenv.config();
conectarDB();

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL]

const corsOptions ={
    origin: function(origin, callback){
        if (whitelist.includes(origin)) {
            // Puede consultar la API 你可以检查API
            callback(null, true)
        }else{
            // No esta permitido el req 要求不被允许
            callback(new Error("Error de Cors"))
        }
    }
}
app.use(cors(corsOptions))

//Routing 路由
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/emprendimiendos', emprendimiendoRoutes)


const PORT = process.env.PORT || 4000;
app.listen(4000, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)

});