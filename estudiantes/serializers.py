from rest_framework import serializers
from .models import ContactoEmergencia, DireccionEstudiante, Estudiante


class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = "__all__"


class DireccionEstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = DireccionEstudiante
        fields = "__all__"


class ContactoEmergenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactoEmergencia
        fields = "__all__"
