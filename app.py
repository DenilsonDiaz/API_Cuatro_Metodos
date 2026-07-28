from flask import Flask, jsonify, request

app = Flask(__name__)

estudiantes = [
    {
        "id": 1,
        "nombre": "Denilson",
        "carrera": "Ingeniería en Sistemas"
    },
    {
        "id": 2,
        "nombre": "Carlos",
        "carrera": "Administración"
    }
]


@app.route("/")
def inicio():
    return "API funcionando correctamente"


# GET: mostrar todos los estudiantes
@app.route("/estudiantes", methods=["GET"])
def obtener_estudiantes():
    return jsonify(estudiantes), 200


# POST: agregar un nuevo estudiante
@app.route("/estudiantes", methods=["POST"])
def agregar_estudiante():

    datos = request.get_json()

    nuevo_estudiante = {
        "id": len(estudiantes) + 1,
        "nombre": datos["nombre"],
        "carrera": datos["carrera"]
    }

    estudiantes.append(nuevo_estudiante)

    return jsonify({
        "mensaje": "Estudiante agregado correctamente",
        "estudiante": nuevo_estudiante
    }), 201


# PUT: actualizar un estudiante
@app.route("/estudiantes/<int:id>", methods=["PUT"])
def actualizar_estudiante(id):

    datos = request.get_json()

    for estudiante in estudiantes:

        if estudiante["id"] == id:

            estudiante["nombre"] = datos["nombre"]
            estudiante["carrera"] = datos["carrera"]

            return jsonify({
                "mensaje": "Estudiante actualizado correctamente",
                "estudiante": estudiante
            }), 200

    return jsonify({
        "mensaje": "Estudiante no encontrado"
    }), 404
# DELETE: eliminar un estudiante
@app.route("/estudiantes/<int:id>", methods=["DELETE"])
def eliminar_estudiante(id):

    for estudiante in estudiantes:

        if estudiante["id"] == id:
            estudiantes.remove(estudiante)

            return jsonify({
                "mensaje": "Estudiante eliminado correctamente"
            }), 200

    return jsonify({
        "mensaje": "Estudiante no encontrado"
    }), 404


# Esta parte siempre debe ir al final
if __name__ == "__main__":
    app.run(debug=True)

