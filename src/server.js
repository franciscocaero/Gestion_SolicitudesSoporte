import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import usuarioRoutes from './routers/UsuarioRoutes.js';
import laboratorioRoutes from './routers/LaboratorioRoutes.js';
import solicitudSoporteRoutes from './routers/SolicitudSoporteRoutes.js';
import ObservacionRoutes from './routers/ObservacionRoutes.js';
import notaRoutes from './routers/NotaRoutes.js';
import GestionUsuarioRoutes from './routers/GestionUsuarioRoutes.js';

dotenv.config();

const app = express();

app.use(cors()); 


app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/laboratorios', laboratorioRoutes);
app.use('/api/soporte', solicitudSoporteRoutes);
app.use('/api/observaciones', ObservacionRoutes);
app.use('/api/notas', notaRoutes);
app.use('/api/gestion', GestionUsuarioRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

export default app;
