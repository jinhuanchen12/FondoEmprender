import express from 'express'

import {
    obtenerEmprendimiendos,
    nuevoEmprendimiendo,
    obtenerEmprendimiendo,
    editarEmprendimiendo,
    eliminarEmprendimiendo,
    obtenerProducto,
} from '../controllers/emprendimiendoController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

/*router.get('/', checkAuth, obtenerEmprendimientos)
router.post('/', checkAuth, nuevoEmprendimiento)*/

router
    .route('/')
    .get(checkAuth, obtenerEmprendimiendos)
    .post(checkAuth, nuevoEmprendimiendo)

    router
    .route('/:id')
    .get(checkAuth, obtenerEmprendimiendo)
    .put(checkAuth, editarEmprendimiendo)
    .delete(checkAuth, eliminarEmprendimiendo)

router.get('/productos/:id', checkAuth, obtenerProducto)



export default router