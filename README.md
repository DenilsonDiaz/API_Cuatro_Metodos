# API REST - Biblioteca Digital

## Información del estudiante

**Nombre:** Denilson Yair Díaz López

**Carnet:** 202308106

**Curso:** Arquitectura de Sistemas

## Descripción

API REST desarrollada con TypeScript y Express para gestionar libros de una biblioteca digital. Los datos se almacenan temporalmente en memoria.

Además del CRUD de libros, incluye una función de aptitud arquitectónica que comprueba estas condiciones:

- La biblioteca no debe superar los 100 libros.
- El porcentaje de libros prestados debe ser menor al 80 %.

Cuando ambas condiciones se cumplen, `/health/fitness` devuelve `Healthy` con código 200. Si alguna no se cumple, devuelve `Degradación de Calidad` con código 503.

## Instalación y ejecución

```bash
npm install
npm run start
```

Servidor local:

```text
http://localhost:3000
```

## Estructura de un libro

```json
{
  "titulo": "Clean Architecture",
  "autor": "Robert C. Martin",
  "prestado": false
}
```

## Endpoints

| Método | Ruta | Función |
|---|---|---|
| GET | `/books` | Lista todos los libros |
| GET | `/books/:id` | Obtiene un libro por su ID |
| POST | `/books` | Agrega un libro; requiere JSON |
| PUT | `/books/:id` | Reemplaza todos los datos de un libro |
| PATCH | `/books/:id` | Actualiza uno o más campos |
| DELETE | `/books/:id` | Elimina un libro |
| GET | `/health/fitness` | Evalúa la salud arquitectónica |

## Ejemplo del reporte de salud

```json
{
  "estado": "Healthy",
  "metricas": {
    "librosTotales": 3,
    "librosPrestados": 1,
    "porcentajePrestados": 33.33,
    "limiteCapacidad": 100,
    "limitePorcentajePrestados": 80
  },
  "restricciones": {
    "capacidad": "Cumple",
    "proporcionPrestados": "Cumple"
  }
}
```
