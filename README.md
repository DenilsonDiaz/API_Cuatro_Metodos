# API Cuatro Métodos

## Información del estudiante

**Nombre:** Denilson Yair Díaz López

**Curso:** Arquitectura de Sistemas

---

## Descripción

Este proyecto consiste en desarrollar una API REST utilizando **TypeScript** y **Express**, implementando los cuatro métodos HTTP principales:

- GET
- POST
- PUT
- DELETE

La información se almacena temporalmente en un arreglo en memoria, por lo que no es necesaria una base de datos.

---

# Tecnologías utilizadas

- Node.js
- TypeScript
- Express
- tsx
- Git
- GitHub
- Insomnia

---

# Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/DenilsonDiaz/API_Cuatro_Metodos.git
```

2. Entrar a la carpeta

```bash
cd API_Cuatro_Metodos
```

3. Cambiar a la rama de la tarea

```bash
git checkout hw-01
```

4. Instalar dependencias

```bash
npm install
```

5. Ejecutar el proyecto

```bash
npm run start
```

La API iniciará en:

```
http://localhost:3000
```

---

# Endpoints

## GET

Obtiene todos los estudiantes.

```
GET /estudiantes
```

---

## POST

Agrega un estudiante.

```
POST /estudiantes
```

Ejemplo:

```json
{
    "nombre":"Ana",
    "carrera":"Arquitectura"
}
```

---

## PUT

Actualiza un estudiante.

```
PUT /estudiantes/1
```

Ejemplo:

```json
{
    "nombre":"Denilson Yair",
    "carrera":"Ingeniería en Sistemas"
}
```

---

## DELETE

Elimina un estudiante.

```
DELETE /estudiantes/2
```

---

# Autor

Denilson Yair Díaz López
