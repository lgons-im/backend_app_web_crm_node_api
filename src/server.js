import express from 'express';
import pg from 'pg';

const { Pool } = pg;
const app = express();

app.use(express.json());

// 1. Configuración de la base de datos Neon (con SSL requerido por Render)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Probar la conexión
pool.connect()
  .then(() => console.log(' Conectado a la base de datos Neon PostgreSQL'))
  .catch(err => console.error('Error de conexión a la BD:', err));

// Ruta básica para verificar que la API responde
app.get('/', (req, res) => {
  res.send('La API del CRM está funcionando correctamente.');
});

// 2. Configuración del puerto y host (Requerido para que Render no tire la app)
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Escuchar en todas las interfaces de red

app.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
