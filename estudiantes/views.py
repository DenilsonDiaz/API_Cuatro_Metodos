from rest_framework import viewsets
from .models import ContactoEmergencia, DireccionEstudiante, Estudiante
from .serializers import ContactoEmergenciaSerializer, DireccionEstudianteSerializer, EstudianteSerializer


class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.filter(eliminado=False)
    serializer_class = EstudianteSerializer


class DireccionEstudianteViewSet(viewsets.ModelViewSet):
    queryset = DireccionEstudiante.objects.filter(eliminado=False)
    serializer_class = DireccionEstudianteSerializer


class ContactoEmergenciaViewSet(viewsets.ModelViewSet):
    queryset = ContactoEmergencia.objects.filter(eliminado=False)
    serializer_class = ContactoEmergenciaSerializer
