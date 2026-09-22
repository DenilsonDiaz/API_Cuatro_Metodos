import uuid

from django.db import models
from django.utils import timezone


class ModeloBase(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    eliminado = models.BooleanField(default=False)
    fecha_eliminacion = models.DateTimeField(null=True, blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    def delete(self, using=None, keep_parents=False):
        self.eliminado = True
        self.fecha_eliminacion = timezone.now()
        self.save()

    def restaurar(self):
        self.eliminado = False
        self.fecha_eliminacion = None
        self.save()

    class Meta:
        abstract = True


class Sede(ModeloBase):
    nombre = models.CharField(max_length=100)
    direccion = models.TextField()
    telefono = models.CharField(max_length=20)
    correo = models.EmailField(blank=True)
    activa = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre


class Aula(ModeloBase):
    sede = models.ForeignKey(Sede, on_delete=models.CASCADE, related_name="aulas")
    codigo = models.CharField(max_length=20)
    capacidad = models.PositiveIntegerField()
    piso = models.SmallIntegerField(default=1)
    tiene_proyector = models.BooleanField(default=False)

    def __str__(self):
        return self.codigo


class PeriodoAcademico(ModeloBase):
    nombre = models.CharField(max_length=100)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre
