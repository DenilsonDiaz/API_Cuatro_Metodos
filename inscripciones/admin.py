from django.contrib import admin
from .models import Calificacion, Inscripcion, Pago

admin.site.register([Inscripcion, Pago, Calificacion])
