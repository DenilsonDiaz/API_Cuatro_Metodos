from django.contrib import admin
from .models import Contrato, Docente, Especialidad

admin.site.register([Especialidad, Docente, Contrato])
