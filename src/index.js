import app from './server.js';
import connection from './database.js';


connection();


export default (req, res) => {
  app(req, res);
};

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}