from rest_framework import serializers
from .models import Contrato, Docente, Especialidad


class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidad
        fields = "__all__"


class DocenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Docente
        fields = "__all__"


class ContratoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contrato
        fields = "__all__"
