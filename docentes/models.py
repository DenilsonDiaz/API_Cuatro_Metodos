from django.db import models
from principal.models import ModeloBase


class Especialidad(ModeloBase):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    codigo = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return self.nombre


class Docente(ModeloBase):
    especialidad = models.ForeignKey(Especialidad, on_delete=models.PROTECT, related_name="docentes")
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    telefono = models.CharField(max_length=15)
    fecha_contratacion = models.DateField()
    salario = models.DecimalField(max_digits=10, decimal_places=2)
    tiempo_completo = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"


class Contrato(ModeloBase):
    TIPOS_CONTRATO = [("TEMPORAL", "Temporal"), ("INDEFINIDO", "Indefinido"), ("SERVICIOS", "Servicios profesionales")]
    docente = models.ForeignKey(Docente, on_delete=models.CASCADE, related_name="contratos")
    tipo = models.CharField(max_length=20, choices=TIPOS_CONTRATO)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField(null=True, blank=True)
    horas_semanales = models.PositiveSmallIntegerField(default=20)
    documento_url = models.URLField(blank=True)

    def __str__(self):
        return f"{self.docente} - {self.tipo}"
