from django.urls import path, include
from rest_framework import routers
from tasks import views

# api versioning

router = routers.DefaultRouter()
router.register(r'carreras', views.CarreraView, 'carreras')
router.register(r'alumnos', views.AlumnosView, 'alumnos')
router.register(r'certificados', views.CertificadosView, 'certificados')
router.register(r'titulados', views.TituladosView, 'titulados')
router.register(r'planestudio', views.PlanEstudioView, 'planestudio')
router.register(r'operaciones', views.OperacionesView, 'operaciones')
router.register(r'rol', views.RolView, 'rol')
router.register(r'usuarios', views.UsuariosView, 'usuarios')


urlpatterns = [
    path("api/v1/", include(router.urls))
]











