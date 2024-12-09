import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

export const login = async (req, res) => {
  const { email, password } = req.body; 

  try {

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const passwordValida = await usuario.compararPassword(password);

    if (!passwordValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }


    const token = jwt.sign(
      {
        id: usuario._id,
        rol: usuario.rol, 
        email: usuario.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};


export const cambiarPassword = async (req, res) => {
  const { email, antContraseña, nuevaContraseña, confirmarContraseña } = req.body; // Eliminamos rol

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const passwordValida = await usuario.compararPassword(antContraseña);

    if (!passwordValida) {
      return res.status(401).json({ message: 'Contraseña actual incorrecta' });
    }

    if (nuevaContraseña !== confirmarContraseña) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }
    usuario.password = nuevaContraseña;
    await usuario.save();

    res.json({
      message: 'Contraseña actualizada exitosamente',
      email: usuario.email,
    });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
