from rest_framework import viewsets
from .models import Contrato, Docente, Especialidad
from .serializers import ContratoSerializer, DocenteSerializer, EspecialidadSerializer


class EspecialidadViewSet(viewsets.ModelViewSet):
    queryset = Especialidad.objects.filter(eliminado=False)
    serializer_class = EspecialidadSerializer


class DocenteViewSet(viewsets.ModelViewSet):
    queryset = Docente.objects.filter(eliminado=False)
    serializer_class = DocenteSerializer


class ContratoViewSet(viewsets.ModelViewSet):
    queryset = Contrato.objects.filter(eliminado=False)
    serializer_class = ContratoSerializer
