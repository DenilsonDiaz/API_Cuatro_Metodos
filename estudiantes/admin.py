from django.contrib import admin
from .models import ContactoEmergencia, DireccionEstudiante, Estudiante

admin.site.register([Estudiante, DireccionEstudiante, ContactoEmergencia])
