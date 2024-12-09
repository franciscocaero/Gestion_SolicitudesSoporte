import express from 'express';
import {
  crearSolicitudSoporte,
  cambiarEstadoSolicitud,
  verHistorialSolicitudes,
  filtrarSolicitudes,
  consultaTemporal
} from '../controllers/ControladorSolicitudSoporte.js';
import { body,validationResult } from 'express-validator';
import { verificarToken } from '../middlewares/VerificarToken.js';
import { verificarAdministrador, verificarRoles } from '../middlewares/VerificarRol.js';

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const router = express.Router();

router.post('/',[body('titulo').notEmpty().withMessage('El título es obligatorio'), body('descripcion').isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'), body('laboratorio').notEmpty().withMessage('Este campo es obligatorio'), body('equipo').isInt().withMessage('Se debe ingresar un número'), validarCampos], verificarToken, crearSolicitudSoporte);


router.patch(
  '/:id/estado',
  verificarToken,
  verificarRoles(['Administrador', 'Personal TICs']),
  cambiarEstadoSolicitud
);
router.get('/historial', verificarToken, verHistorialSolicitudes);
router.get('/filtrar', [body('codigoLaboratorio').optional().isString().withMessage('El código del laboratorio no es valido'), body('nombreUsuario').optional().isString().withMessage('El nombre del usuario no es valido'),validarCampos], verificarToken,verificarAdministrador, filtrarSolicitudes);
router.get('/consulta', verificarToken,verificarAdministrador, consultaTemporal);


export default router;
