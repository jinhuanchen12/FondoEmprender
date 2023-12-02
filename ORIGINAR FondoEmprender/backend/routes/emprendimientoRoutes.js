import express from "express"

import {
    obtenerEmprendimientos,
    nuevoEmprendimiento,
    obtenerEmprendimiento,
    editarEmprendimiento,
    eliminarEmprendimiento,
    obtenerProductos,
} from '../controllers/emprendimientoController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

/*router.get('/', checkAuth, obtenerEmprendimientos)
router.post('/', checkAuth, nuevoEmprendimiento) */

router
    .route('/')
    .get(checkAuth, obtenerEmprendimientos)
    .post(checkAuth, nuevoEmprendimiento)

    router
    .route('/:id')
    .get(checkAuth, obtenerEmprendimiento)
    .put(checkAuth, editarEmprendimiento)
    .delete(checkAuth, eliminarEmprendimiento)

router.get('/productos/:id', checkAuth, obtenerProductos)

export default  router