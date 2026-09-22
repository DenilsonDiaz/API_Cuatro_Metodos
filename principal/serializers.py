from rest_framework import serializers
from .models import Aula, PeriodoAcademico, Sede


class SedeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sede
        fields = "__all__"


class AulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aula
        fields = "__all__"


class PeriodoAcademicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeriodoAcademico
        fields = "__all__"
