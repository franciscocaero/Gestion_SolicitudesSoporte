import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Usuario from './models/Usuario.js'; 
import connection from './database.js';

dotenv.config();

const seedUsers = async () => {
  try {
    await connection();

    const usuarios = [
      {
        nombre: 'Roberto',
        apellido: 'Palacios',
        email: 'juantic@gmail.com',
        password: await bcrypt.hash('tics', 10), // Contraseña encriptada
        rol: 'PersonalTICs',
      },
      {
        nombre: 'María',
        apellido: 'Fernandez',
        email: 'docente@gmail.com',
        password: await bcrypt.hash('docente', 10), // Contraseña encriptada
        rol: 'Docente',
      },
      {
        nombre: 'Juan',
        apellido: 'Cruz',
        email: 'ayudante@gmail.com',
        password: await bcrypt.hash('ayudante', 10), // Contraseña encriptada
        rol: 'AyudanteServicios',
      },
      {
        nombre: 'Ana',
        apellido: 'Martínez',
        email: 'pasante@gmail.com',
        password: await bcrypt.hash('pasante', 10), // Contraseña encriptada
        rol: 'Pasante',
      },
      {
        nombre: 'William',
        apellido: 'Nasimba',
        email: 'admin@gmail.com',
        password: await bcrypt.hash('admin', 10), // Contraseña encriptada
        rol: 'Administrador',
      },
    ];

    await Usuario.deleteMany();
    await Usuario.insertMany(usuarios);
    console.log('Usuarios de prueba creados exitosamente.');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error al crear usuarios de prueba:', error);
    process.exit(1);
  }
};

seedUsers();
