import express from "express";
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("Desde API/USUARIOS");
});
router.get("/confirmar", (req, res)=>{
    res.send("CONFIRMANDO USUARIO");
});
router.post("/", (req, res)=>{
    res.send("Desde -POST - API/USUARIOS");
});
router.put("/", (req, res)=>{
    res.send("Desde -PUT - API/USUARIOS");
});
router.delete("/", (req, res)=>{
    res.send("Desde -DELETE - API/USUARIOS");
});

export default router;