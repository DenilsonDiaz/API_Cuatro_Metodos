import express, { Request, Response } from "express";

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

app.get("/", (req: Request, res: Response) => {
    res.json({ mensaje: "API funcionando correctamente" });
});

app.get("/estudiantes", (req: Request, res: Response) => {
    res.status(200).json(estudiantes);
});

app.post("/estudiantes", (req: Request, res: Response) => {

    const { nombre, carrera } = req.body;

    if (!nombre || !carrera) {
        return res.status(400).json({
            mensaje: "Los campos nombre y carrera son obligatorios"
        });
    }

    const nuevoEstudiante: Estudiante = {
        id: estudiantes.length + 1,
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

    const estudiante = estudiantes.find(e => e.id === id);

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

    const estudiante = estudiantes.find(e => e.id === id);

    if (!estudiante) {
        return res.status(404).json({
            mensaje: "Estudiante no encontrado"
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

    const indice = estudiantes.findIndex(e => e.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Estudiante no encontrado"
        });
    }

    estudiantes.splice(indice,1);

    return res.status(200).json({
        mensaje:"Estudiante eliminado correctamente"
    });

});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});