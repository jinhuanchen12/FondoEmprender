import express from "express";
const router = express.Router();

import { 
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
} from "../controllers/usuarioController.js"

// Autenticacion, Registro y Confirmacion de Usuarios 用户认证、注册和确认
router.post('/', registrar); // Creacion de usuarios 创建用户
router.post("/login", autenticar)
router.get('/confirmar/:token', confirmar)
router.post('/olvide-password', olvidePassword)

export default router;