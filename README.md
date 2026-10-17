# Hospital Yellow API

API REST para la gestión hospitalaria: pacientes, usuarios, médicos, enfermeros, citas, historias clínicas, medicamentos, autenticación y tareas de correo en cola.

El entorno local se ejecuta íntegramente con Docker Compose. La API, MongoDB y RabbitMQ viven en contenedores; no es necesario instalar Node.js, MongoDB ni RabbitMQ en el equipo anfitrión.

## Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) 4.x o Docker Engine con el plugin Docker Compose v2.
- Git para clonar el repositorio.
- Puertos libres: `4000` (API), `5672` (AMQP) y `15672` (panel de RabbitMQ).

Comprueba la instalación:

```bash
docker --version
docker compose version
```

## Instalación y arranque local

```bash
git clone https://github.com/JuanCrTo/hospital-b.git
cd hospital-b
cp .env.example .env
docker compose up --build -d
```

En el primer arranque Docker descarga las imágenes y construye la API. Comprueba que todos los servicios estén activos:

```bash
docker compose ps
docker compose logs -f api
```

Abre los siguientes servicios:

| Servicio | URL / acceso |
| --- | --- |
| API | <http://localhost:4000> |
| Swagger | <http://localhost:4000/api> |
| RabbitMQ Management | <http://localhost:15672> — usuario `hospital`, contraseña `hospital` |

MongoDB no se publica en el host: solo es accesible desde los contenedores, mediante `mongodb://mongodb:27017/hospital`. Esto evita depender de una instalación local y reduce la exposición del servicio.

Para detener el entorno sin borrar datos:

```bash
docker compose down
```

Para detenerlo y borrar la base de datos y el estado de RabbitMQ (acción irreversible):

```bash
docker compose down -v
```

## Configuración

`.env.example` contiene una configuración funcional para Docker. Copia ese archivo a `.env` antes del primer arranque. Compose configura automáticamente las conexiones internas:

```dotenv
MONGO_URI=mongodb://mongodb:27017/hospital
RABBITMQ_URL=amqp://hospital:hospital@rabbitmq:5672
PORT=4000
```

No uses `localhost` en `MONGO_URI` o `RABBITMQ_URL`: dentro del contenedor de la API, `localhost` se refiere a la propia API, no a MongoDB o RabbitMQ.

Antes de usar la aplicación fuera de desarrollo, cambia ambos secretos JWT:

```dotenv
JWT_ACCESS_SECRET=un-secreto-largo-y-unico
SECRET_KEY_RESET_PASSWORD=otro-secreto-largo-y-unico
```

Las variables siguientes son opcionales para levantar la API, pero se necesitan para las funcionalidades indicadas:

| Variable | Uso |
| --- | --- |
| `MAILGUN_API_KEY`, `MAILGUN_DOMAIN` | Entrega real de correos de bienvenida y recuperación. Sin ellas, la API inicia, pero los mensajes encolados no se envían. |
| `GOOGLE_MAPS_API_KEY` | Geocodificación de ubicaciones. |
| `LOCAL_URL`, `LOCAL_URL_2` | Orígenes permitidos por CORS para los frontends locales. |
| `MAILGUN_URL`, `MAILGUN_URL_AND_DOMAIN` | Parámetros conservados para la integración de Mailgun. |
| `EMAIL_QUEUE`, `PDF_QUEUE` | Parámetros de cola reservados por la configuración existente. |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Credenciales previstas para almacenamiento de medios. |

`.env` no se versiona. Nunca subas claves reales al repositorio.

## Operación con Docker

Reconstruir tras modificar dependencias, el `Dockerfile` o código de la API:

```bash
docker compose up --build -d
```

Ver registros de todos los servicios:

```bash
docker compose logs -f
```

Abrir una terminal en la imagen de la API:

```bash
docker compose run --rm --no-deps api sh
```

## Arquitectura de contenedores

```text
Navegador / cliente HTTP
          │ :4000
          ▼
     API NestJS (api)
       ├── MongoDB (mongodb, red interna)
       └── RabbitMQ (rabbitmq, red interna)
                    └── panel de administración :15672
```

La imagen de la API usa una compilación multi-etapa: instala y compila TypeScript en la etapa de construcción, y la imagen final conserva únicamente las dependencias de producción y `dist/`. Los volúmenes nombrados `mongodb_data` y `rabbitmq_data` preservan los datos entre reinicios.

## Desarrollo sin Docker

El flujo recomendado es Docker. Si eliges ejecutar NestJS desde el host, necesitas Node.js 20+, MongoDB y RabbitMQ accesibles desde el host, además de ajustar `MONGO_URI` y `RABBITMQ_URL` a sus direcciones host. Después:

```bash
npm ci
npm run start:dev
```

## Tecnologías

- NestJS y TypeScript
- MongoDB con Mongoose
- RabbitMQ para trabajos asíncronos
- JWT para autenticación
- Swagger en `/api`
- Mailgun para correo transaccional
