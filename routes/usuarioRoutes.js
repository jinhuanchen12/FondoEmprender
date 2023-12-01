import express from "express";
const router = express.Router();
import { 
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
} from "../controllers/usuarioController.js"
import checkAuth from "../middleware/checkAuth.js"

// Autenticacion, Registro y Confirmacion de Usuarios 用户认证、注册和确认
router.post('/', registrar); // Creacion de usuarios 创建用户
router.post('/login', autenticar)
router.get('/confirmar/:token', confirmar)
router.post('/olvide-password', olvidePassword)
/* router.get('/olvide-password/:token', comprobarToken)
router.post('/olvide-password/:token', nuevoPassword) */

router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)

export default router;