import express from 'express';
import { login, cambiarPassword } from '../controllers/ControladorUsuario.js';

const router = express.Router();

router.post('/login', login);
router.post('/cambiar-password', cambiarPassword);

export default router;
