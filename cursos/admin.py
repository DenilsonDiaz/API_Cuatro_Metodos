from django.contrib import admin
from .models import Curso, Horario, MaterialCurso

admin.site.register([Curso, Horario, MaterialCurso])
