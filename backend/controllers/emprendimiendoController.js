import Emprendimiendo from "../models/Emprendimiendo.js"


const obtenerEmprendimiendos = async (req, res) => {
    try {
        const emprendimiendos = await Emprendimiendo.find({ creador: req.usuario._id });
        res.json(emprendimiendos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener emprendimientos' });
    }
};

const nuevoEmprendimiendo = async (req, res) => {
    const emprendimiendo = new Emprendimiendo(req.body)
    emprendimiendo.creador = req.usuario._id

    try {
        const emprendimiendoAlmacenado = await emprendimiendo.save()
        res.json(emprendimiendoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const obtenerEmprendimiendo = async (req, res) =>{
    const { id } = req.params
    const emprendimiendo = await Emprendimiendo.findById(id)
    if (!emprendimiendo) {
        const error = new Error("No encontrado")
        return res.status(404).json({msg: error.message})
    }
    if (console.log(emprendimiendo.creador.toString() === req.usuario._id.toString())) {
        const error = new Error("Accion no Valida")
        return res.status(401).json({msg: error.message})
    }


    res.json(emprendimiendo)
}

const editarEmprendimiendo = async (req, res) =>{
    const { id } = req.params
    const emprendimiendo = await 
    
    
    Emprendimiendo.findById(id)
    if (!emprendimiendo) {
        const error = new Error("No encontrado")
        return res.status(404).json({msg: error.message})
    }
    if (console.log(emprendimiendo.creador.toString() === req.usuario._id.toString())) {
        const error = new Error("Accion no Valida")
        return res.status(401).json({msg: error.message})
    }
    emprendimiendo.titulo = req.body.titulo || emprendimiendo.titulo
    emprendimiendo.telefono = req.body.telefono || emprendimiendo.telefono
    emprendimiendo.direccion = req.body.direccion || emprendimiendo.direccion
    emprendimiendo.descripcion = req.body.descripcion || emprendimiendo.descripcion
    emprendimiendo.imagen = req.body.imagen || emprendimiendo.imagen
    emprendimiendo.beneficiario = req.body.beneficiario || emprendimiendo.beneficiario
    emprendimiendo.presupuestos= req.body.presupuestos || emprendimiendo.presupuestos

    try {
        const emprendimiendoAlmacenado = await emprendimiendo.save()
        res.json(emprendimiendoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const eliminarEmprendimiendo = async (req, res) =>{
    const { id } = req.params
    const emprendimiendo = await Emprendimiendo.findById(id)
    if (!emprendimiendo) {
        const error = new Error("No encontrado")
        return res.status(404).json({msg: error.message})
    }
    if (console.log(emprendimiendo.creador.toString() === req.usuario._id.toString())) {
        const error = new Error("Accion no Valida")
        return res.status(401).json({msg: error.message})
    }

    try {
        await emprendimiendo.deleteOne()
        res.json({msg: "Emprendimiendo Eliminado"})
    } catch (error) {
        console.log(error)
    }
}

const obtenerProductos = async (req, res) =>{}

export{
    obtenerEmprendimiendos,
    nuevoEmprendimiendo,
    obtenerEmprendimiendo,
    editarEmprendimiendo,
    eliminarEmprendimiendo,
    obtenerProductos,
    
}