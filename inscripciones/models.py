from django.db import models
from cursos.models import Curso
from estudiantes.models import Estudiante
from principal.models import ModeloBase, PeriodoAcademico


class Inscripcion(ModeloBase):
    ESTADOS = [("PENDIENTE", "Pendiente"), ("ACTIVA", "Activa"), ("FINALIZADA", "Finalizada"), ("CANCELADA", "Cancelada")]
    estudiante = models.ForeignKey(Estudiante, on_delete=models.PROTECT, related_name="inscripciones")
    curso = models.ForeignKey(Curso, on_delete=models.PROTECT, related_name="inscripciones")
    periodo = models.ForeignKey(PeriodoAcademico, on_delete=models.PROTECT, related_name="inscripciones")
    estado = models.CharField(max_length=15, choices=ESTADOS, default="PENDIENTE")
    porcentaje_asistencia = models.FloatField(default=0)

    def __str__(self):
        return f"{self.estudiante} - {self.curso}"

    class Meta:
        constraints = [models.UniqueConstraint(fields=["estudiante", "curso", "periodo"], name="inscripcion_unica")]


class Pago(ModeloBase):
    METODOS_PAGO = [("EFECTIVO", "Efectivo"), ("TARJETA", "Tarjeta"), ("TRANSFERENCIA", "Transferencia")]
    inscripcion = models.ForeignKey(Inscripcion, on_delete=models.CASCADE, related_name="pagos")
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    metodo = models.CharField(max_length=20, choices=METODOS_PAGO)
    fecha_pago = models.DateTimeField()
    referencia = models.CharField(max_length=100, null=True, blank=True)
    confirmado = models.BooleanField(default=False)

    def __str__(self):
        return f"Pago de {self.inscripcion}"


class Calificacion(ModeloBase):
    inscripcion = models.OneToOneField(Inscripcion, on_delete=models.CASCADE, related_name="calificacion")
    nota_parcial = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    nota_final = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    aprobado = models.BooleanField(default=False)
    observaciones = models.TextField(blank=True)

    def __str__(self):
        return f"Calificación de {self.inscripcion}"
