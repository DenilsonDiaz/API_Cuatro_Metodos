from rest_framework import viewsets
from .models import Calificacion, Inscripcion, Pago
from .serializers import CalificacionSerializer, InscripcionSerializer, PagoSerializer


class InscripcionViewSet(viewsets.ModelViewSet):
    queryset = Inscripcion.objects.filter(eliminado=False)
    serializer_class = InscripcionSerializer


class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.filter(eliminado=False)
    serializer_class = PagoSerializer


class CalificacionViewSet(viewsets.ModelViewSet):
    queryset = Calificacion.objects.filter(eliminado=False)
    serializer_class = CalificacionSerializer
