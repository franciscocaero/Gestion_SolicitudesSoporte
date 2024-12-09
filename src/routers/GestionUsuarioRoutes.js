import express from 'express';
import { crearUsuarios, eliminarUsuario } from '../controllers/ControladorGestionUsuario.js';
import { verificarToken } from '../middlewares/VerificarToken.js';
import { verificarAdministrador } from '../middlewares/VerificarRol.js';


const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
const router = express.Router();

router.use(verificarToken, verificarAdministrador);

router.post('/crear',[body('usuarios').isArray().withMessage('Se debe proporcionar una lista de usuarios válida.'), body('usuarios.*.email').isEmail().withMessage('El correo electrónica debe ser válido.')], [validarCampos], crearUsuarios);
router.delete('/eliminar/:id', eliminarUsuario);

export default router;
