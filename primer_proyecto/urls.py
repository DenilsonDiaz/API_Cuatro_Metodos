from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from cursos.views import CursoViewSet, HorarioViewSet, MaterialCursoViewSet
from docentes.views import ContratoViewSet, DocenteViewSet, EspecialidadViewSet
from estudiantes.views import ContactoEmergenciaViewSet, DireccionEstudianteViewSet, EstudianteViewSet
from inscripciones.views import CalificacionViewSet, InscripcionViewSet, PagoViewSet
from principal.views import AulaViewSet, PeriodoAcademicoViewSet, SedeViewSet

router = DefaultRouter()
router.register("sedes", SedeViewSet)
router.register("aulas", AulaViewSet)
router.register("periodos", PeriodoAcademicoViewSet)
router.register("estudiantes", EstudianteViewSet)
router.register("direcciones", DireccionEstudianteViewSet)
router.register("contactos-emergencia", ContactoEmergenciaViewSet)
router.register("especialidades", EspecialidadViewSet)
router.register("docentes", DocenteViewSet)
router.register("contratos", ContratoViewSet)
router.register("cursos", CursoViewSet)
router.register("horarios", HorarioViewSet)
router.register("materiales", MaterialCursoViewSet)
router.register("inscripciones", InscripcionViewSet)
router.register("pagos", PagoViewSet)
router.register("calificaciones", CalificacionViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]
