import Emprendimiento from "../models/Emprendimiento.js"

const obtenerEmprendimientos = async (req, res) =>{
    const emprendimientos = await Emprendimiento.find().where('creador').equals(req.usuario)
    res.json(emprendimientos)
}

const nuevoEmprendimiento = async (req, res) =>{
    const emprendimiento = new Emprendimiento(req.body)
    emprendimiento.creador = req.usuario._id
    try {
        const emprendimientoAlmacenado = await emprendimiento.save()
        res.json(emprendimientoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const obtenerEmprendimiento = async (req, res) =>{
    const { id } = req.params
    const emprendimiento = await Emprendimiento.findById(id)

    if (!emprendimiento) {
        const error = new Error("No encontrado")
        return res.status(404).json({msg: error.message})
    }

    if (emprendimiento.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion No Valido")
        return res.status(401).json({msg: error.message})
        
    }
    
    res.json(emprendimiento)
}

const editarEmprendimiento = async (req, res) =>{
    const { id } = req.params
    const emprendimiento = await Emprendimiento.findById(id)

    if (!emprendimiento) {
        const error = new Error("No encontrado")
        return res.status(404).json({msg: error.message})
    }

    if (emprendimiento.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion No Valido")
        return res.status(401).json({msg: error.message})
    }
    emprendimiento.titulo = req.body.titulo || emprendimiento.titulo
    emprendimiento.telefono = req.body.telefono || emprendimiento.telefono
    emprendimiento.direccion = req.body.direccion || emprendimiento.direccion
    emprendimiento.descripcion = req.body.descripcion || emprendimiento.descripcion
    emprendimiento.imagen = req.body.imagen || emprendimiento.imagen
    emprendimiento.beneficiario = req.body.beneficiario || emprendimiento.beneficiario
    emprendimiento.presupuestos = req.body.presupuestos || emprendimiento.presupuestos

    try {
        const emprendimientoAlmacenado = await emprendimiento.save()
        res.json(emprendimientoAlmacenado)
    } catch (error) {
        console.log(error)
        
    }
}

const eliminarEmprendimiento = async (req, res) =>{
    const { id } = req.params
    const emprendimiento = await Emprendimiento.findById(id)

    if (!emprendimiento) {
        const error = new Error("No encontrado")
        return res.status(404).json({msg: error.message})
    }

    if (emprendimiento.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion No Valido")
        return res.status(401).json({msg: error.message})
    }

    try {
        await emprendimiento.deleteOne()
        res.json({msg: "Emprendimiento Eliminado"})
    } catch (error) {
        console.log(error)
    }
}

const obtenerProductos = async (req, res) =>{}


export {
    obtenerEmprendimientos,
    nuevoEmprendimiento,
    obtenerEmprendimiento,
    editarEmprendimiento,
    eliminarEmprendimiento,
    obtenerProductos,
}

