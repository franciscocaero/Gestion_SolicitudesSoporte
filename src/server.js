import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import usuarioRoutes from './routers/UsuarioRoutes.js';

dotenv.config();

const app = express();

app.use(cors()); 

app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

export default app;
