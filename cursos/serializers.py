from rest_framework import serializers
from .models import Curso, Horario, MaterialCurso


class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = "__all__"


class HorarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Horario
        fields = "__all__"


class MaterialCursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialCurso
        fields = "__all__"
