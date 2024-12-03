import express from 'express';
import { login, cambiarPassword } from '../controllers/UsuarioController.js';

const router = express.Router();

router.post('/login', login);
router.post('/cambiar-password', cambiarPassword);

export default router;
