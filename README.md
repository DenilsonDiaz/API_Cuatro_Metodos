# API de Gestión Universitaria con Django

API REST desarrollada con Django y Django REST Framework para administrar información de una institución universitaria.

## Autor

**Denilson Yair Díaz López**

## Características

- Cinco aplicaciones de Django y 15 modelos.
- Identificadores UUID en todos los modelos.
- Eliminación lógica o *soft delete*.
- Fechas de creación, modificación y eliminación.
- Relaciones entre modelos y variedad de tipos de datos.
- API REST con operaciones GET, POST, PUT, PATCH y DELETE.
- Autenticación JWT obligatoria en todos los endpoints de la API.
- Migraciones iniciales y una segunda migración de cambios.
- SQLite local; no requiere configurar una base de datos externa.

## Aplicaciones y modelos

| Aplicación | Modelos |
|---|---|
| `principal` | Sede, Aula, PeriodoAcademico |
| `estudiantes` | Estudiante, DireccionEstudiante, ContactoEmergencia |
| `docentes` | Especialidad, Docente, Contrato |
| `cursos` | Curso, Horario, MaterialCurso |
| `inscripciones` | Inscripcion, Pago, Calificacion |

## Instrucciones de ejecución

### 1. Clonar el repositorio y seleccionar la rama

```powershell
git clone -b hw-03 https://github.com/DenilsonDiaz/API_Cuatro_Metodos.git
cd API_Cuatro_Metodos
```

### 2. Crear el ambiente virtual

```powershell
py -m venv myenv
```

### 3. Activar el ambiente virtual

```powershell
.\myenv\Scripts\Activate.ps1
```

### 4. Instalar dependencias

```powershell
python -m pip install -r requirements.txt
```

### 5. Configurar la clave de Django

```powershell
$env:DJANGO_SECRET_KEY = "CAMBIE_ESTA_CLAVE_POR_UNA_CLAVE_SEGURA"
```

La variable debe configurarse cada vez que se abra una nueva terminal.

### 6. Aplicar migraciones

```powershell
python manage.py migrate
```

### 7. Ejecutar el servidor

```powershell
python manage.py runserver
```

Abrir en el navegador: <http://127.0.0.1:8000/api/>

## Autenticación JWT

### 1. Crear un usuario administrador

```powershell
python manage.py createsuperuser
```

### 2. Obtener los tokens

Enviar una petición `POST` a:

```text
http://127.0.0.1:8000/api/token/
```

Contenido JSON:

```json
{
  "username": "admin",
  "password": "CONTRASEÑA_CREADA"
}
```

La respuesta contiene los tokens `access` y `refresh`.

### 3. Acceder a los endpoints protegidos

Agregar el siguiente encabezado a cada petición:

```text
Authorization: Bearer TOKEN_ACCESS
```

### 4. Renovar el token de acceso

Enviar una petición `POST` a `/api/token/refresh/`:

```json
{
  "refresh": "TOKEN_REFRESH"
}
```

### 5. Verificar un token

Enviar una petición `POST` a `/api/token/verify/`:

```json
{
  "token": "TOKEN_ACCESS"
}
```

El token de acceso dura 30 minutos y el token de renovación dura un día.

## Endpoints

### Autenticación

- `POST /api/token/`
- `POST /api/token/refresh/`
- `POST /api/token/verify/`

### Recursos protegidos

- `/api/sedes/`
- `/api/aulas/`
- `/api/periodos/`
- `/api/estudiantes/`
- `/api/direcciones/`
- `/api/contactos-emergencia/`
- `/api/especialidades/`
- `/api/docentes/`
- `/api/contratos/`
- `/api/cursos/`
- `/api/horarios/`
- `/api/materiales/`
- `/api/inscripciones/`
- `/api/pagos/`
- `/api/calificaciones/`

## Migraciones

Cada aplicación incluye su archivo `0001_initial.py`. La aplicación `principal` también contiene `0002_sede_correo_alter_sede_telefono.py`, que agrega el campo `correo` y modifica la longitud de `telefono`. Esto demuestra el flujo de cambios solicitado.

## Pruebas

```powershell
python manage.py test
```

Las pruebas verifican la autenticación JWT, la protección de endpoints, la renovación y validación de tokens, la creación con UUID y el funcionamiento del *soft delete*.
