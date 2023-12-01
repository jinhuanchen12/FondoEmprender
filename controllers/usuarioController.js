import Usuario from "../Models/Usuario.js";
import generaId from "../helpers/generaId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {

    //Enviar registros duplicados 
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({email})

    if (existeUsuario) {
        const error = new Error("Usuario ya Existe")
        return res.status(400).json({ msg: error.message })
    }

    console.log(existeUsuario)
    try {
        const usuario = new Usuario(req.body)
        usuario.token = generaId()
        const usuarioAlmacenado = await usuario.save()
        res.json(usuarioAlmacenado)
    } catch (error) {
        console.log(error)
    }

};
const autenticar = async (req, res) => {

    const { email, password} = req.body
    //Comprobar si el usuario existe
    const usuario = await Usuario.findOne({email})
    if (!usuario) {
        const error = new Error("El Usuario no existe")
        return res.status(404).json({msg: error.message})
    }

    //Comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
        const error = new Error("Tu cuenta no ha sido confirmada")
        return res.status(403).json({msg: error.message})
    }
    //Comprobar su password
    if (await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email:usuario.email,
            token: generarJWT(usuario._id),
        })
    }else{
        const error = new Error("El Password es Incorrecto")
        return res.status(403).json({msg: error.message})
    }
}
const confirmar = async (req, res) =>{
    const{ token } = req.params
    const usuarioConfirmar = await Usuario.findOne({token})
    if (!usuarioConfirmar) {
        const error = new Error("Token no valido")
        return res.status(403).json({msg: error.message})
     }

     try {
        usuarioConfirmar.confirmado = true
        usuarioConfirmar.token = ""
        await usuarioConfirmar.save()
        res.json({msg: 'Usuario Confirmado Correctamente'})
        
    } catch (error) {
        console.log(error)
    } 
}
const olvidePassword = async (req, res) =>{
    const { email } = req.body
    const usuario = await Usuario.findOne({email})
    if (!usuario) {
        const error = new Error("El Usuario no existe")
        return res.status(404).json({msg: error.message})
    }

    try {
        usuario.token = generaId()
        await usuario.save()

        // enviar el email de nueva confirmacion 发送新的确认电子邮件
        /*emailOlvidePasswor({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })*/

        res.json({msg: 'Hemos enviado un email con las instrucciones'})
    } catch (error) {
        console.log(error)
    }
}
const comprobarToken = async (req, res) =>{
    const { token } = req.params

    const tokenValido = await Usuario.findOne({ token })
    if (tokenValido) {
        res.json({msg: "Token valido y el usuario existe"})
    }else {
        const error = new Error("Token no valido")
        return res.status(404).json({msg: error.message})
    }
}
const nuevoPassword = async (req, res) =>{
    const { token } = req.params
    const { password } = req.body

    const usuario = await Usuario.findOne({ token })
    if (usuario) {
        usuario.password = password
        usuario.token = ''
        try {
            await usuario.save()
            res.json({msg: "Password Modificado Correctamente"})
        } catch (error) {
            console.log(error)
        }
    }else {
        const error = new Error("Token no valido")
        return res.status(404).json({msg: error.message})
    }
}





export { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword };

