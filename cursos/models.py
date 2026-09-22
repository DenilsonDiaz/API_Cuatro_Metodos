from django.db import models
from docentes.models import Docente
from principal.models import Aula, ModeloBase


class Curso(ModeloBase):
    codigo = models.CharField(max_length=15, unique=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    docente = models.ForeignKey(Docente, on_delete=models.PROTECT, related_name="cursos")
    creditos = models.PositiveSmallIntegerField()
    costo = models.DecimalField(max_digits=8, decimal_places=2)
    cupo_maximo = models.PositiveIntegerField()
    disponible = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.codigo} - {self.nombre}"


class Horario(ModeloBase):
    DIAS_SEMANA = [("LUNES", "Lunes"), ("MARTES", "Martes"), ("MIERCOLES", "Miércoles"), ("JUEVES", "Jueves"), ("VIERNES", "Viernes"), ("SABADO", "Sábado")]
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name="horarios")
    aula = models.ForeignKey(Aula, on_delete=models.PROTECT, related_name="horarios")
    dia = models.CharField(max_length=10, choices=DIAS_SEMANA)
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()

    def __str__(self):
        return f"{self.curso} - {self.dia}"


class MaterialCurso(ModeloBase):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name="materiales")
    titulo = models.CharField(max_length=150)
    descripcion = models.TextField(blank=True)
    enlace = models.URLField(blank=True)
    datos_adicionales = models.JSONField(default=dict, blank=True)
    obligatorio = models.BooleanField(default=False)

    def __str__(self):
        return self.titulo
