"""
URL configuration for django_CT project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from knox import views as knox_views
from tasks.views import *
from tasks import views
# from rest_framework import routers
# from tasks import views

# router = routers.DefaultRouter()
# router.register(r'carreras', views.CarreraView, 'carreras')
# router.register(r'alumnos', views.AlumnosView, 'alumnos')
# router.register(r'certificados', views.CertificadosView, 'certificados')
# router.register(r'titulados', views.TituladosView, 'titulados')
# router.register(r'planestudio', views.PlanEstudioView, 'planestudio')
# router.register(r'operaciones', views.OperacionesView, 'operaciones')
# router.register(r'rol', views.RolView, 'rol')
# router.register(r'usuarios', views.UsuariosView, 'usuarios')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', RegisterUser.as_view()),
    path('login/', LoginAPI.as_view()),
    path('user/', UserAPI.as_view()),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    path(r'pdf/', PruebaPDFView.as_view(), name='pdf_test'),
    path('data/', include('tasks.urls'))
]

