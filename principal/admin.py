from django.contrib import admin
from .models import Aula, PeriodoAcademico, Sede

admin.site.register([Sede, Aula, PeriodoAcademico])
