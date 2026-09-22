from django.db import models
from principal.models import ModeloBase


class Estudiante(ModeloBase):
    carnet = models.CharField(max_length=20, unique=True)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    fecha_nacimiento = models.DateField()
    promedio = models.FloatField(default=0)
    becado = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"


class DireccionEstudiante(ModeloBase):
    estudiante = models.OneToOneField(Estudiante, on_delete=models.CASCADE, related_name="direccion")
    departamento = models.CharField(max_length=50)
    municipio = models.CharField(max_length=50)
    direccion = models.TextField()
    codigo_postal = models.CharField(max_length=10, null=True, blank=True)

    def __str__(self):
        return f"Dirección de {self.estudiante}"


class ContactoEmergencia(ModeloBase):
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, related_name="contactos_emergencia")
    nombre = models.CharField(max_length=100)
    parentesco = models.CharField(max_length=50)
    telefono = models.CharField(max_length=15)
    prioridad = models.PositiveSmallIntegerField(default=1)

    def __str__(self):
        return f"{self.nombre} - {self.estudiante}"
