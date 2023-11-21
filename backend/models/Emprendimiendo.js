import mongoose from "mongoose";

const empredimiendosSchema = mongoose.Schema({
    titulo:{
        type: String,
        trim: true,
        required: true,
    },
    telefono:{
        type: String,
        trim: true,
        required: true,
    },
    direccion: {
        type: String,
        trim: true,
        required: true,
    },
    descripcion:{
        type: String,
        trim: true,
        required: true,
    },
    imagen: {
        type: String,
        trim: true,
        required: true,
    },
    beneficiario: {
        type: String,
        trim: true,
        required: true,
    },
    presupuestos: {
        type: String,
        trim: true,
        required: true,
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
    },
    /*colaboradores:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Usuario",
        }
    ],*/
},{
     timestamps: true,

})

const Emprendimiendo = mongoose.model('Emprendimiendo', empredimiendosSchema)

export default Emprendimiendo