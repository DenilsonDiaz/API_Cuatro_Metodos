import express, { NextFunction, Request, Response } from "express";

const app = express();
const PORT = 3000;
const LIMITE_LIBROS = 100;
const LIMITE_PRESTADOS = 0.8;

app.use(express.json());

interface Libro {
    id: number;
    titulo: string;
    autor: string;
    prestado: boolean;
}

let libros: Libro[] = [
    { id: 1, titulo: "La tentativa del león y el éxito de su empresa", autor: "Fray Matías de Córdova", prestado: false },
    { id: 2, titulo: "El Señor Presidente", autor: "Miguel Ángel Asturias", prestado: true },
    { id: 3, titulo: "La hija del Adelantado", autor: "José Milla y Vidaurre", prestado: false }
];

function validarJson(req: Request, res: Response, next: NextFunction) {
    if (!req.is("application/json")) {
        return res.status(415).json({
            estado: "Error",
            mensaje: "El cuerpo de la solicitud debe enviarse en formato JSON"
        });
    }

    next();
}

function datosLibroValidos(titulo: unknown, autor: unknown, prestado: unknown) {
    return (
        typeof titulo === "string" && titulo.trim().length > 0 &&
        typeof autor === "string" && autor.trim().length > 0 &&
        typeof prestado === "boolean"
    );
}

app.get("/", (_req: Request, res: Response) => {
    return res.status(200).json({
        mensaje: "API de Biblioteca Digital funcionando correctamente",
        endpoints: ["/books", "/health/fitness"]
    });
});

app.get("/books", (_req: Request, res: Response) => {
    return res.status(200).json(libros);
});

app.get("/books/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const libro = libros.find(libroActual => libroActual.id === id);

    if (!libro) {
        return res.status(404).json({ mensaje: "Libro no encontrado" });
    }

    return res.status(200).json(libro);
});

app.post("/books", validarJson, (req: Request, res: Response) => {
    const { titulo, autor, prestado } = req.body;

    if (!datosLibroValidos(titulo, autor, prestado)) {
        return res.status(400).json({
            mensaje: "Los campos titulo, autor y prestado son obligatorios"
        });
    }

    const nuevoId = libros.length > 0
        ? Math.max(...libros.map(libro => libro.id)) + 1
        : 1;

    const nuevoLibro: Libro = {
        id: nuevoId,
        titulo: titulo.trim(),
        autor: autor.trim(),
        prestado
    };

    libros.push(nuevoLibro);
    return res.status(201).json({
        mensaje: "Libro agregado correctamente",
        libro: nuevoLibro
    });
});

app.put("/books/:id", validarJson, (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const indice = libros.findIndex(libro => libro.id === id);
    const { titulo, autor, prestado } = req.body;

    if (indice === -1) {
        return res.status(404).json({ mensaje: "Libro no encontrado" });
    }

    if (!datosLibroValidos(titulo, autor, prestado)) {
        return res.status(400).json({
            mensaje: "Los campos titulo, autor y prestado son obligatorios"
        });
    }

    libros[indice] = {
        id,
        titulo: titulo.trim(),
        autor: autor.trim(),
        prestado
    };

    return res.status(200).json({
        mensaje: "Libro actualizado correctamente",
        libro: libros[indice]
    });
});

app.patch("/books/:id", validarJson, (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const libro = libros.find(libroActual => libroActual.id === id);
    const { titulo, autor, prestado } = req.body;

    if (!libro) {
        return res.status(404).json({ mensaje: "Libro no encontrado" });
    }

    if (titulo === undefined && autor === undefined && prestado === undefined) {
        return res.status(400).json({
            mensaje: "Debe enviar al menos un campo para actualizar"
        });
    }

    if (
        (titulo !== undefined && (typeof titulo !== "string" || titulo.trim().length === 0)) ||
        (autor !== undefined && (typeof autor !== "string" || autor.trim().length === 0)) ||
        (prestado !== undefined && typeof prestado !== "boolean")
    ) {
        return res.status(400).json({ mensaje: "Los datos enviados no son válidos" });
    }

    if (titulo !== undefined) libro.titulo = titulo.trim();
    if (autor !== undefined) libro.autor = autor.trim();
    if (prestado !== undefined) libro.prestado = prestado;

    return res.status(200).json({
        mensaje: "Libro actualizado parcialmente",
        libro
    });
});

app.delete("/books/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const indice = libros.findIndex(libro => libro.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensaje: "Libro no encontrado" });
    }

    const [libroEliminado] = libros.splice(indice, 1);
    return res.status(200).json({
        mensaje: "Libro eliminado correctamente",
        libro: libroEliminado
    });
});

app.get("/health/fitness", (_req: Request, res: Response) => {
    const totalLibros = libros.length;
    const librosPrestados = libros.filter(libro => libro.prestado).length;
    const ratioPrestados = totalLibros === 0 ? 0 : librosPrestados / totalLibros;
    const capacidadValida = totalLibros <= LIMITE_LIBROS;
    const ratioValido = ratioPrestados < LIMITE_PRESTADOS;
    const saludable = capacidadValida && ratioValido;

    return res.status(saludable ? 200 : 503).json({
        estado: saludable ? "Healthy" : "Degradación de Calidad",
        metricas: {
            librosTotales: totalLibros,
            librosPrestados,
            porcentajePrestados: Number((ratioPrestados * 100).toFixed(2)),
            limiteCapacidad: LIMITE_LIBROS,
            limitePorcentajePrestados: 80
        },
        restricciones: {
            capacidad: capacidadValida ? "Cumple" : "No cumple",
            proporcionPrestados: ratioValido ? "Cumple" : "No cumple"
        }
    });
});

app.use((error: SyntaxError, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof SyntaxError && "body" in error) {
        return res.status(400).json({
            estado: "Error",
            mensaje: "El cuerpo contiene un JSON no válido"
        });
    }

    next(error);
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
