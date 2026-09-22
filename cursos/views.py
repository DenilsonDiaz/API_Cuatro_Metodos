from rest_framework import viewsets
from .models import Curso, Horario, MaterialCurso
from .serializers import CursoSerializer, HorarioSerializer, MaterialCursoSerializer


class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.filter(eliminado=False)
    serializer_class = CursoSerializer


class HorarioViewSet(viewsets.ModelViewSet):
    queryset = Horario.objects.filter(eliminado=False)
    serializer_class = HorarioSerializer


class MaterialCursoViewSet(viewsets.ModelViewSet):
    queryset = MaterialCurso.objects.filter(eliminado=False)
    serializer_class = MaterialCursoSerializer
