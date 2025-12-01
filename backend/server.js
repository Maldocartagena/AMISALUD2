const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


// Opción 1: Usando archivo de credenciales (RECOMENDADO)
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Opción 2: Usando variables de entorno
/*
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
});
*/

// Referencia a Firestore
const db = admin.firestore();

console.log('✅ Conectado a Firebase Firestore');

// ========================================
// MIDDLEWARES
// ========================================

app.use(cors());
app.use(express.json());
app.use(express.static('../components')); // Sirve archivos HTML

// ========================================
// ENDPOINT DE PRUEBA
// ========================================

app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Backend funcionando correctamente',
        firebase: 'Conectado a Firestore'
    });
});

// ========================================
// REGISTRO DE PACIENTES
// ========================================

app.post('/api/registro', async (req, res) => {
    try {
        const { 
            nombre, 
            rut, 
            correo, 
            telefono,
            contrasena,
            fechaNacimiento,
            direccion,
            region,
            comuna,
            prevision
        } = req.body;

        // 1. Validar campos obligatorios
        if (!nombre || !rut || !correo || !telefono || !contrasena) {
            return res.status(400).json({ 
                success: false, 
                message: 'Faltan campos obligatorios' 
            });
        }

        // 2. Verificar si el correo ya existe
        const existeCorreo = await db.collection('usuarios')
            .where('correo', '==', correo)
            .get();
        
        if (!existeCorreo.empty) {
            return res.status(400).json({ 
                success: false, 
                message: 'El correo ya está registrado' 
            });
        }

        // 3. Verificar si el RUT ya existe
        const existeRut = await db.collection('usuarios')
            .where('rut', '==', rut)
            .get();
        
        if (!existeRut.empty) {
            return res.status(400).json({ 
                success: false, 
                message: 'El RUT ya está registrado' 
            });
        }

        // 4. Hashear contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // 5. Crear documento en Firestore
        const nuevoUsuario = {
            nombre: nombre,
            rut: rut,
            correo: correo,
            contrasena: hashedPassword,
            rol: 'paciente',
            telefono: telefono,
            fechaNacimiento: fechaNacimiento || null,
            direccion: direccion || '',
            region: region || '',
            comuna: comuna || '',
            prevision: prevision || '',
            estado: 'activo',
            fotoPerfil: '',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('usuarios').add(nuevoUsuario);

        console.log('✅ Paciente registrado:', docRef.id);

        // 6. Responder al frontend
        res.status(201).json({ 
            success: true, 
            message: 'Usuario registrado exitosamente',
            userId: docRef.id
        });

    } catch (error) {
        console.error('❌ Error en registro de paciente:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al registrar usuario',
            error: error.message
        });
    }
});

// ========================================
// REGISTRO DE MÉDICOS
// ========================================

app.post('/api/registro-medico', async (req, res) => {
    try {
        const { 
            nombre, 
            rut, 
            correo, 
            telefono,
            contrasena,
            especialidad,
            registroMedico,
            centroSaludId,
            centroSaludNombre
        } = req.body;

        // 1. Validar campos obligatorios
        if (!nombre || !rut || !correo || !telefono || !contrasena || 
            !especialidad || !registroMedico || !centroSaludId) {
            return res.status(400).json({ 
                success: false, 
                message: 'Faltan campos obligatorios para registro de médico' 
            });
        }

        // 2. Verificar si el correo ya existe
        const existeCorreo = await db.collection('medicos')
            .where('correo', '==', correo)
            .get();
        
        if (!existeCorreo.empty) {
            return res.status(400).json({ 
                success: false, 
                message: 'El correo ya está registrado' 
            });
        }

        // 3. Verificar si el RUT ya existe
        const existeRut = await db.collection('medicos')
            .where('rut', '==', rut)
            .get();
        
        if (!existeRut.empty) {
            return res.status(400).json({ 
                success: false, 
                message: 'El RUT ya está registrado' 
            });
        }

        // 4. Verificar si el registro médico ya existe
        const existeRegistro = await db.collection('medicos')
            .where('registroMedico', '==', registroMedico)
            .get();
        
        if (!existeRegistro.empty) {
            return res.status(400).json({ 
                success: false, 
                message: 'El registro médico ya está en uso' 
            });
        }

        // 5. Hashear contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // 6. Crear documento en Firestore
        const nuevoMedico = {
            nombre: nombre,
            rut: rut,
            correo: correo,
            contrasena: hashedPassword,
            rol: 'medico',
            telefono: telefono,
            especialidad: especialidad,
            subespecialidad: '',
            registroMedico: registroMedico,
            centroSaludId: centroSaludId,
            centroSaludNombre: centroSaludNombre,
            horarioAtencion: {
                lunes: [],
                martes: [],
                miercoles: [],
                jueves: [],
                viernes: [],
                sabado: [],
                domingo: []
            },
            duracionConsulta: 30,
            fotoPerfil: '',
            biografia: '',
            añosExperiencia: 0,
            titulos: [],
            idiomas: ['Español'],
            atencionOnline: false,
            estado: 'activo',
            calificacion: 0,
            totalReviews: 0,
            totalConsultas: 0,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('medicos').add(nuevoMedico);

        console.log('✅ Médico registrado:', docRef.id);

        // 7. Responder al frontend
        res.status(201).json({ 
            success: true, 
            message: 'Médico registrado exitosamente',
            medicoId: docRef.id
        });

    } catch (error) {
        console.error('❌ Error en registro de médico:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al registrar médico',
            error: error.message
        });
    }
});

// ========================================
// LOGIN (PARA PACIENTES Y MÉDICOS)
// ========================================

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Faltan credenciales' 
            });
        }

        // 1. Buscar en colección de usuarios (pacientes)
        const usuarioQuery = await db.collection('usuarios')
            .where('correo', '==', username)
            .get();

        if (!usuarioQuery.empty) {
            const usuario = usuarioQuery.docs[0].data();
            const userId = usuarioQuery.docs[0].id;

            // Verificar contraseña
            const passwordValida = await bcrypt.compare(password, usuario.contrasena);

            if (!passwordValida) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Contraseña incorrecta' 
                });
            }

            // Login exitoso
            return res.json({ 
                success: true, 
                message: 'Login exitoso',
                usuario: {
                    id: userId,
                    nombre: usuario.nombre,
                    correo: usuario.correo,
                    rut: usuario.rut,
                    rol: usuario.rol,
                    telefono: usuario.telefono
                }
            });
        }

        // 2. Si no es paciente, buscar en médicos
        const medicoQuery = await db.collection('medicos')
            .where('correo', '==', username)
            .get();

        if (!medicoQuery.empty) {
            const medico = medicoQuery.docs[0].data();
            const medicoId = medicoQuery.docs[0].id;

            // Verificar contraseña
            const passwordValida = await bcrypt.compare(password, medico.contrasena);

            if (!passwordValida) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Contraseña incorrecta' 
                });
            }

            // Login exitoso
            return res.json({ 
                success: true, 
                message: 'Login exitoso',
                usuario: {
                    id: medicoId,
                    nombre: medico.nombre,
                    correo: medico.correo,
                    rut: medico.rut,
                    rol: medico.rol,
                    telefono: medico.telefono,
                    especialidad: medico.especialidad
                }
            });
        }

        // 3. No se encontró el usuario
        return res.status(401).json({ 
            success: false, 
            message: 'Usuario no encontrado' 
        });

    } catch (error) {
        console.error('❌ Error en login:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error en el servidor',
            error: error.message
        });
    }
});

// ========================================
// OBTENER LISTA DE MÉDICOS
// ========================================

app.get('/api/medicos', async (req, res) => {
    try {
        const medicosSnapshot = await db.collection('medicos')
            .where('estado', '==', 'activo')
            .orderBy('calificacion', 'desc')
            .get();

        const medicos = [];
        medicosSnapshot.forEach(doc => {
            medicos.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.json({ 
            success: true, 
            medicos: medicos 
        });

    } catch (error) {
        console.error('❌ Error al obtener médicos:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener médicos',
            error: error.message
        });
    }
});

// ========================================
// OBTENER ESPECIALIDADES
// ========================================

app.get('/api/especialidades', async (req, res) => {
    try {
        const especialidadesSnapshot = await db.collection('especialidades')
            .where('activa', '==', true)
            .orderBy('orden', 'asc')
            .get();

        const especialidades = [];
        especialidadesSnapshot.forEach(doc => {
            especialidades.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.json({ 
            success: true, 
            especialidades: especialidades 
        });

    } catch (error) {
        console.error('❌ Error al obtener especialidades:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener especialidades',
            error: error.message
        });
    }
});

// ========================================
// MANEJO DE ERRORES 404
// ========================================

app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'Ruta no encontrada' 
    });
});

// ========================================
// INICIAR SERVIDOR
// ========================================

app.listen(PORT, () => {
    console.log('');
    console.log('🚀 ========================================');
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📡 API disponible en http://localhost:${PORT}/api`);
    console.log('🔥 Firebase Firestore: Conectado');
    console.log('🚀 ========================================');
    console.log('');
});