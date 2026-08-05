import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

const app = express();
const PORT = 3000;

app.use(express.json());

interface Estudiante {
    id: number;
    nombre: string;
    carrera: string;
}

let estudiantes: Estudiante[] = [
    {
        id: 1,
        nombre: "Denilson",
        carrera: "Ingeniería en Sistemas"
    },
    {
        id: 2,
        nombre: "Carlos",
        carrera: "Administración"
    }
];


const swaggerDocument = {
    openapi: "3.0.0",

    info: {
        title: "API de estudiantes",
        version: "1.0.0",
        description:
            "API desarrollada con TypeScript y Express para administrar estudiantes."
    },

    servers: [
        {
            url: `http://localhost:${PORT}`,
            description: "Servidor local"
        }
    ],

    tags: [
        {
            name: "Estudiantes",
            description: "Operaciones para administrar estudiantes"
        }
    ],

    components: {
        schemas: {
            Estudiante: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        example: 1
                    },
                    nombre: {
                        type: "string",
                        example: "Denilson"
                    },
                    carrera: {
                        type: "string",
                        example: "Ingeniería en Sistemas"
                    }
                }
            },

            EstudianteEntrada: {
                type: "object",
                required: ["nombre", "carrera"],
                properties: {
                    nombre: {
                        type: "string",
                        example: "Ana"
                    },
                    carrera: {
                        type: "string",
                        example: "Arquitectura"
                    }
                }
            }
        }
    },

    paths: {
        "/estudiantes": {
            get: {
                tags: ["Estudiantes"],
                summary: "Obtener todos los estudiantes",

                responses: {
                    "200": {
                        description: "Lista de estudiantes obtenida correctamente",

                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Estudiante"
                                    }
                                }
                            }
                        }
                    }
                }
            },

            post: {
                tags: ["Estudiantes"],
                summary: "Agregar un estudiante",

                requestBody: {
                    required: true,

                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/EstudianteEntrada"
                            }
                        }
                    }
                },

                responses: {
                    "201": {
                        description: "Estudiante agregado correctamente"
                    },

                    "400": {
                        description: "Datos incompletos"
                    }
                }
            }
        },

        "/estudiantes/{id}": {
            put: {
                tags: ["Estudiantes"],
                summary: "Actualizar completamente un estudiante",

                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        },
                        description: "ID del estudiante"
                    }
                ],

                requestBody: {
                    required: true,

                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/EstudianteEntrada"
                            }
                        }
                    }
                },

                responses: {
                    "200": {
                        description: "Estudiante actualizado correctamente"
                    },

                    "404": {
                        description: "Estudiante no encontrado"
                    }
                }
            },

            patch: {
                tags: ["Estudiantes"],
                summary: "Actualizar parcialmente un estudiante",

                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        },
                        description: "ID del estudiante"
                    }
                ],

                requestBody: {
                    required: true,

                    content: {
                        "application/json": {
                            schema: {
                                type: "object",

                                properties: {
                                    nombre: {
                                        type: "string",
                                        example: "Denilson Yair"
                                    },

                                    carrera: {
                                        type: "string",
                                        example: "Ingeniería en Sistemas"
                                    }
                                }
                            }
                        }
                    }
                },

                responses: {
                    "200": {
                        description: "Estudiante actualizado parcialmente"
                    },

                    "404": {
                        description: "Estudiante no encontrado"
                    }
                }
            },

            delete: {
                tags: ["Estudiantes"],
                summary: "Eliminar un estudiante",

                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        },
                        description: "ID del estudiante"
                    }
                ],

                responses: {
                    "200": {
                        description: "Estudiante eliminado correctamente"
                    },

                    "404": {
                        description: "Estudiante no encontrado"
                    }
                }
            }
        }
    }
};

/*
Ruta de documentación automática.
*/
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
        mensaje: "API funcionando correctamente",
        documentacion: `http://localhost:${PORT}/docs`
    });
});

app.get("/estudiantes", (req: Request, res: Response) => {
    return res.status(200).json(estudiantes);
});

app.post("/estudiantes", (req: Request, res: Response) => {
    const { nombre, carrera } = req.body;

    if (!nombre || !carrera) {
        return res.status(400).json({
            mensaje: "Los campos nombre y carrera son obligatorios"
        });
    }

    const nuevoId =
        estudiantes.length > 0
            ? Math.max(...estudiantes.map(estudiante => estudiante.id)) + 1
            : 1;

    const nuevoEstudiante: Estudiante = {
        id: nuevoId,
        nombre,
        carrera
    };

    estudiantes.push(nuevoEstudiante);

    return res.status(201).json({
        mensaje: "Estudiante agregado correctamente",
        estudiante: nuevoEstudiante
    });
});

app.put("/estudiantes/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nombre, carrera } = req.body;

    if (!nombre || !carrera) {
        return res.status(400).json({
            mensaje: "Los campos nombre y carrera son obligatorios"
        });
    }

    const estudiante = estudiantes.find(
        estudianteActual => estudianteActual.id === id
    );

    if (!estudiante) {
        return res.status(404).json({
            mensaje: "Estudiante no encontrado"
        });
    }

    estudiante.nombre = nombre;
    estudiante.carrera = carrera;

    return res.status(200).json({
        mensaje: "Estudiante actualizado",
        estudiante
    });
});

app.patch("/estudiantes/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const estudiante = estudiantes.find(
        estudianteActual => estudianteActual.id === id
    );

    if (!estudiante) {
        return res.status(404).json({
            mensaje: "Estudiante no encontrado"
        });
    }

    if (!req.body.nombre && !req.body.carrera) {
        return res.status(400).json({
            mensaje: "Debe enviar al menos un campo para actualizar"
        });
    }

    if (req.body.nombre) {
        estudiante.nombre = req.body.nombre;
    }

    if (req.body.carrera) {
        estudiante.carrera = req.body.carrera;
    }

    return res.status(200).json({
        mensaje: "Estudiante actualizado parcialmente",
        estudiante
    });
});

app.delete("/estudiantes/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const indice = estudiantes.findIndex(
        estudianteActual => estudianteActual.id === id
    );

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Estudiante no encontrado"
        });
    }

    const estudianteEliminado = estudiantes[indice];

    estudiantes.splice(indice, 1);

    return res.status(200).json({
        mensaje: "Estudiante eliminado correctamente",
        estudiante: estudianteEliminado
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}/docs`);
});