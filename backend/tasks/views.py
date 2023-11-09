from rest_framework import viewsets
from .serializer import *
from .models import *
# Create your views here.

class CarreraView(viewsets.ModelViewSet):
    serializer_class = CarreraSerializer
    queryset = Carreras.objects.all()

#------------------------------------------------

class AlumnosView(viewsets.ModelViewSet):
    serializer_class = AlumnoSerializer
    queryset = Alumnos.objects.all()

#------------------------------------------------

class PlanEstudioView(viewsets.ModelViewSet):
    serializer_class = PlanEtudioSerializer
    queryset = Plan_Estudio.objects.all()

#------------------------------------------------

class TituladosView(viewsets.ModelViewSet):
    serializer_class = TituladosSerializer
    queryset = Titulados.objects.all()

#------------------------------------------------

class CertificadosView(viewsets.ModelViewSet):
    serializer_class = CertificadosSerializer
    queryset = Certificados.objects.all()

#------------------------------------------------

class OperacionesView(viewsets.ModelViewSet):
    serializer_class = OperacionesSerializer
    queryset = Operaciones.objects.all()

#------------------------------------------------


class RolView(viewsets.ModelViewSet):
    serializer_class = RolSerializer
    queryset = Rol.objects.all()

#------------------------------------------------


class UsuariosView(viewsets.ModelViewSet):
    serializer_class = UsuariosSerializer
    queryset = Usuarios.objects.all()

#------------------------------------------------















