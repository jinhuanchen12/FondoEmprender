import mongoose from 'mongoose'

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    token:{
        type: String
    },
    confirmado: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
}
);
const USuario = mongoose.model("Usuario", usuarioSchema)
export default USuario;