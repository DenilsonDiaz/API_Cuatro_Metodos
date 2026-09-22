from django.test import TestCase
from rest_framework.test import APIClient

from .models import Sede


class SedeApiTests(TestCase):
    def setUp(self):
        self.cliente = APIClient()

    def test_crear_sede_con_uuid(self):
        respuesta = self.cliente.post(
            "/api/sedes/",
            {
                "nombre": "Sede Central",
                "direccion": "Quetzaltenango",
                "telefono": "77660000",
                "correo": "central@umes.edu.gt",
                "activa": True,
            },
            format="json",
        )

        self.assertEqual(respuesta.status_code, 201)
        self.assertIn("id", respuesta.data)

    def test_delete_realiza_eliminacion_logica(self):
        sede = Sede.objects.create(
            nombre="Sede de prueba",
            direccion="Quetzaltenango",
            telefono="77660000",
        )

        respuesta = self.cliente.delete(f"/api/sedes/{sede.id}/")
        sede.refresh_from_db()

        self.assertEqual(respuesta.status_code, 204)
        self.assertTrue(sede.eliminado)
        self.assertIsNotNone(sede.fecha_eliminacion)
