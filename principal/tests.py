from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient

from .models import Sede


class SedeApiTests(TestCase):
    def setUp(self):
        self.cliente = APIClient()
        self.usuario = User.objects.create_user(
            username="admin_prueba",
            password="ClaveSegura123!",
        )
        respuesta = self.cliente.post(
            "/api/token/",
            {"username": "admin_prueba", "password": "ClaveSegura123!"},
            format="json",
        )
        self.access_token = respuesta.data["access"]
        self.refresh_token = respuesta.data["refresh"]

    def autenticar(self):
        self.cliente.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access_token}")

    def test_endpoint_rechaza_solicitud_sin_token(self):
        respuesta = self.cliente.get("/api/sedes/")

        self.assertEqual(respuesta.status_code, 401)

    def test_obtener_y_verificar_token(self):
        respuesta = self.cliente.post(
            "/api/token/verify/",
            {"token": self.access_token},
            format="json",
        )

        self.assertEqual(respuesta.status_code, 200)

    def test_renovar_token(self):
        respuesta = self.cliente.post(
            "/api/token/refresh/",
            {"refresh": self.refresh_token},
            format="json",
        )

        self.assertEqual(respuesta.status_code, 200)
        self.assertIn("access", respuesta.data)

    def test_crear_sede_con_uuid(self):
        self.autenticar()
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
        self.autenticar()
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
