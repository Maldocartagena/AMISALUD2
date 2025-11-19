// Instalar dependencias: npm install express pg cors bcrypt dotenv

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'minsal_db',
    password: process.env.DB_PASSWORD || 'tu_contraseña',
    port: process.env.DB_PORT || 5432,
});

// Verificar conexión a la base de datos
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error al conectar a PostgreSQL:', err.stack);
    }
    console.log('✅ Conectado a PostgreSQL exitosamente');
    release();
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('../components')); // Para servir archivos HTML estáticos

// Endpoint de prueba
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend funcionando correctamente' });
});

// Endpoint de login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar usuario por correo o RUT
        const query = 'SELECT * FROM usuarios WHERE correo = $1 OR rut = $1';
        const result = await pool.query(query, [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ 
                success: false, 
                message: 'Usuario no encontrado' 
            });
        }

        const usuario = result.rows[0];

        // Verificar contraseña
        // Si usas bcrypt para passwords hasheadas:
        const passwordValida = await bcrypt.compare(password, usuario.contrasena);
        
        // Si guardas passwords en texto plano (NO RECOMENDADO en producción):
        // const passwordValida = password === usuario.contrasena;

        if (!passwordValida) {
            return res.status(401).json({ 
                success: false, 
                message: 'Contraseña incorrecta' 
            });
        }

        // Login exitoso - NO enviar la contraseña al cliente
        res.json({ 
            success: true, 
            message: 'Login exitoso',
            usuario: {
                id: usuario.id,
                correo: usuario.correo,
                nombre: usuario.nombre,
                rut: usuario.rut
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error en el servidor' 
        });
    }
});

// Endpoint de registro
app.post('/api/registro', async (req, res) => {
    const { correo, rut, contrasena, nombre } = req.body;

    try {
        // Verificar si el correo o RUT ya existe
        const checkQuery = 'SELECT * FROM usuarios WHERE correo = $1 OR rut = $2';
        const checkResult = await pool.query(checkQuery, [correo, rut]);

        if (checkResult.rows.length > 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'El correo o RUT ya está registrado' 
            });
        }

        // Hashear contraseña (RECOMENDADO)
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Insertar nuevo usuario
        const query = `
            INSERT INTO usuarios (correo, rut, contrasena, nombre) 
            VALUES ($1, $2, $3, $4) 
            RETURNING id, correo, nombre, rut
        `;
        
        const result = await pool.query(query, [correo, rut, hashedPassword, nombre]);

        res.status(201).json({ 
            success: true, 
            message: 'Usuario registrado exitosamente',
            usuario: result.rows[0]
        });

    } catch (error) {
        console.error('Error en registro:', error);
        
        // Manejar errores específicos de PostgreSQL
        if (error.code === '23505') { // Código de error para duplicados
            return res.status(400).json({ 
                success: false, 
                message: 'El correo o RUT ya está registrado' 
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: 'Error al registrar usuario' 
        });
    }
});

// Endpoint para obtener información del usuario (opcional)
app.get('/api/usuario/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'SELECT id, correo, nombre, rut, created_at FROM usuarios WHERE id = $1';
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Usuario no encontrado' 
            });
        }

        res.json({ 
            success: true, 
            usuario: result.rows[0]
        });

    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error en el servidor' 
        });
    }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'Ruta no encontrada' 
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📡 API disponible en http://localhost:${PORT}/api`);
});