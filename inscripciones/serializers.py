from rest_framework import serializers
from .models import Calificacion, Inscripcion, Pago


class InscripcionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inscripcion
        fields = "__all__"


class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = "__all__"


class CalificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calificacion
        fields = "__all__"
