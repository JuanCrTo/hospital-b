# 🏥 Hospital Yellow API

API RESTful para la gestión hospitalaria. Permite administrar pacientes, doctores, enfermeros, envío de correos automatizados, documentación Swagger, colas de trabajo y más.

🔗 [🔍 Ver Documentación Swagger desplegada](https://hospital-b-prod.up.railway.app/api)

---

## 🧑‍💻 Proyecto en Producción

- 🔧 **Backend desplegado en Railway**
  - Usando **Serverless MongoDB (Cold Starts)**
- 🛢️ **Base de datos MongoDB en Railway**
  - Usando **Serverless MongoDB (Cold Starts)**
- 🔐 JWT configurado y Swagger protegido
- 🐇 **RabbitMQ desplegado en CloudAMQP**
  - Utilizado para la gestión de colas

---

## 📦 Tecnologías Usadas

- **Backend Framework:** [NestJS](https://nestjs.com/)
- **Lenguaje:** TypeScript
- **Base de Datos:** MongoDB (Mongoose ODM)
- **Autenticación:** JWT
- **Colas de Trabajo:** RabbitMQ
- **Correo:** Mailgun
- **Media Storage:** Cloudinary (en desarrollo)
- **Documentación:** Swagger
- **Despliegue:**
  - Backend y Base de Datos: Railway
  - Colas de Trabajo: CloudAMQP (RabbitMQ)


---

## 🧩 Arquitectura

- Arquitectura modular siguiendo principios de Clean Architecture.
- Separación clara entre controladores, servicios, DTOs, modelos y validaciones.
- Uso de pipes y guards para lógica transversal.

---

## 📂 Estructura del Proyecto

```bash
hospital-api/
├── src/
│   ├── auth/                  # Módulo de autenticación
│   │   ├── dto/
│   │   ├── interfaces/
│   │   ├── auth.controller.ts
│   │   ├── auth.guard.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   │   └── jwt-reset.module.ts
│   │
│   ├── decorators/                # Módulo de decoradores
│   │   ├── apiAuthResponse.decorator.ts
│   │   ├── isPastDate.decorator.ts
│   │   └── public.decorator.ts
│   │
│   ├── doctor/                # Módulo de doctores
│   │   ├── dto/
│   │   ├── interfaces/
│   │   ├── model/
│   │   ├── doctor.controller.ts
│   │   ├── doctor.module.ts
│   │   └── doctor.service.ts
│   │
│   ├── email/                  # Envío de correos
│   │   ├── interfaces/
│   │   ├── email.consumer.ts   # RabbitMQ consumer
│   │   ├── email.module.ts
│   │   ├── email.service.ts
│   │
│   ├── nurse/                # Módulo de enfermeros
│   │   ├── dto/
│   │   ├── interfaces/
│   │   ├── model/
│   │   ├── nurse.controller.ts
│   │   ├── nurse.module.ts
│   │   └── nurse.service.ts
│   │
│   ├── patient/               # Módulo de pacientes
│   │   ├── dto/
│   │   ├── interfaces/
│   │   ├── model/
│   │   ├── patient.controller.ts
│   │   ├── patient.cron.ts
│   │   ├── patient.module.ts
│   │   └── patient.service.ts
│   │
│   ├── rabbitmq/                   # Manejo de colas con RabbitMQ
│   │   ├── rabbitmq.module.ts
│   │   ├── rabbitmq.service.ts
│   │
│   ├── user/               # Módulo de usuarios
│   │   ├── dto/
│   │   ├── enums/
│   │   ├── interfaces/
│   │   ├── model/
│   │   ├── user.controller.ts
│   │   ├── user.module.ts
│   │   └── user.service.ts
│   │
│   ├── utils/                   # Funciones auxiliares
│   │   ├── utils.ts
│   │
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md

```

---

## 🔐 Autenticación

- Autenticación basada en JWT.
- Middleware y guards personalizados para proteger rutas según el rol del usuario.
- Soporte para recuperación de contraseña con tokens seguros.

---

## 📬 Mailgun + RabbitMQ

- Emails de bienvenida y recuperación de contraseña automatizadas.
- RabbitMQ gestiona las colas de envío asíncrono.

---

## 🧾 Documentación Swagger

La API está completamente documentada usando Swagger:
- Contiene descripciones, modelos y autorización con JWT.
- Estructura uniforme para respuestas HTTP (`statusCode`, `message`, `data`, `errors`).

🔗 [🔍 Ver Documentación Swagger desplegada](https://hospital-b-prod.up.railway.app/api)

---

## 📄 Ejemplo de Respuesta Estandarizada

🧪 Esta funcionalidad está en proceso de implementación. El objetivo es que todas las respuestas de la API sigan una estructura base coherente y predecible, facilitando el consumo desde el frontend, la documentación en Swagger y la trazabilidad de errores y logs.

### 🔧 Estado actual:
Actualmente, algunos endpoints ya siguen esta estructura, pero **no está aplicado de forma global** con un interceptor ni en todos los módulos.

### 🧾 Ejemplo en Swagger  (previsto)
```typescript
@ApiResponse({
  status: 200,
  description: 'Operación exitosa',
  type: SuccessResponseDto,
})
@ApiResponse({
  status: 400,
  description: 'Error de validación',
  type: ErrorResponseDto,
})
@ApiResponse({
  status: 500,
  description: 'Error interno del servidor',
  type: InternalErrorDto,
})

```

### 🧾 DTOs de Respuesta
```typescript
export class SuccessResponseDto {
  statusCode: number;
  message: string;
  data: any;
  meta?: any;
}

export class ErrorResponseDto {
  statusCode: number;
  message: string;
  errors?: string[];
}

export class InternalErrorDto {
  statusCode: number;
  message: string;
  debug?: any;
}

```

> 💡 Esta estandarización se encuentra listada en el 📍Roadmap como una mejora pendiente y se integrará en versiones futuras del proyecto.

---

## 🚀 Cómo Ejecutar Localmente

Sigue estos pasos para ejecutar el backend de la API de Hospitales en tu entorno local:

### 1. 🔁 Clonar el repositorio

```bash
git clone https://github.com/JuanCrTo/hospital-b.git
```

### 2. 📦 Instalar dependencias
npm install

### 3. 🛠️ Crear archivo de entorno
* Copia el archivo .env.example y crea el archivo .env
* Edita el archivo .env con tus variables reales (MongoDB, JWT, Mailgun, RabbitMQ, etc.).

### 4. 🧪 Verificar dependencias externas
Asegúrate de tener ejecutando o configurado correctamente:

* 🐇 RabbitMQ (puede estar en CloudAMQP o local)
* 🍃 MongoDB (local o desplegado)
* Mailgun y Cloudinary si vas a probar envíos de correo y subida de archivos

### 5. 🚦 Levantar el servidor en modo desarrollo
```bash
npm run start:dev
```

### 6. 📲 Probar la API
* Abre Postman o tu cliente HTTP favorito
* Usa la URL base: `http://localhost:4000`
* Accede a la documentación Swagger:
http://localhost:4000/api


### 7. ✅ Comprobación
Si todo está bien:

* Swagger debería cargar en /api
* Los endpoints deberían responder correctamente
* Si usas colas (RabbitMQ), asegúrate que esté activa la conexión

---

## 🌍 Despliegue

- El backend y la base de datos MongoDB están desplegados en **Railway** (1 vCPU y 3 GB de RAM).
- Railway maneja automáticamente el certificado **HTTPS**.
- Configurado con **CORS**, acceso con **JWT**, documentación Swagger.
- Las colas de trabajo con **RabbitMQ** están gestionadas desde **CloudAMQP**.

---

## 🗺️ Roadmap

Este roadmap detalla las funcionalidades actuales del proyecto y las mejoras planificadas para versiones futuras. Su propósito es guiar el desarrollo continuo y demostrar la planificación técnica a largo plazo.

### ✅ MVP Completo

- [x] CRUD para Doctores, Enfermeros y Pacientes
- [x] Autenticación basada en JWT
- [x] Envío de correos con Mailgun mediante colas RabbitMQ
- [x] Documentación completa con Swagger
- [x] Despliegue de Backend en Railway
- [x] Despliegue de Base de Datos MongoDB en Railway
- [x] Variables de entorno gestionadas mediante `.env`
- [x] Integración con servicios externos de Google Maps para ubicación de pacientes

### 🚧 Mejoras en Proceso

- [ ] Estandarización de todas las respuestas HTTP (estructura uniforme para 200, 201, 400, 404, 500, etc.)
- [ ] Integración completa de cookies seguras con CSRF protection
- [ ] Logs detallados para trazabilidad de accesos y acciones críticas
- [ ] Agregado de configuración para protección contra ataques brute-force y rate limiting
- [ ] Limpieza y optimización del código (refactor de controladores y servicios)

---

### 📦 Funcionalidades Avanzadas Futuras

- [ ] Exportación automática de historiales médicos en PDF
- [ ] Soporte multirol (SuperAdministrador y Administrador)
- [ ] Dashboard de estadísticas para gestión hospitalaria
- [ ] Gestión de archivos adjuntos (documentación médica) con Cloudinary

---

## 👨‍💼 Objetivo del Proyecto
Este proyecto fue construido con el propósito de mostrar habilidades avanzadas en backend:

* ✅ Arquitectura limpia y mantenible
* ✅ Buenas prácticas de desarrollo
* ✅ Despliegue real y funcional en la nube
* ✅ Seguridad, modularidad y escalabilidad

---