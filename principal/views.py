from rest_framework import viewsets
from .models import Aula, PeriodoAcademico, Sede
from .serializers import AulaSerializer, PeriodoAcademicoSerializer, SedeSerializer


class SedeViewSet(viewsets.ModelViewSet):
    queryset = Sede.objects.filter(eliminado=False)
    serializer_class = SedeSerializer


class AulaViewSet(viewsets.ModelViewSet):
    queryset = Aula.objects.filter(eliminado=False)
    serializer_class = AulaSerializer


class PeriodoAcademicoViewSet(viewsets.ModelViewSet):
    queryset = PeriodoAcademico.objects.filter(eliminado=False)
    serializer_class = PeriodoAcademicoSerializer
