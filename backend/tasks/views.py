from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from .serializer import *
from .models import *
# Create your views here.

class CarreraFilter(filters.FilterSet):
    class Meta:
        model = Carreras
        fields = ['nombre_carrera']


class CarreraView(viewsets.ModelViewSet):
    serializer_class = CarreraSerializer
    queryset = Carreras.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CarreraFilter

#------------------------------------------------
class AlumnoFilter(filters.FilterSet):
    class Meta:
        model = Alumnos
        fields = ['nombre','apellidop','apellidom','carrera','num_control','sexo','periodo_ingreso','periodo_egreso']


class AlumnosView(viewsets.ModelViewSet):
    serializer_class = AlumnoSerializer
    queryset = Alumnos.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AlumnoFilter
#------------------------------------------------

class PlanFilter(filters.FilterSet):
    class Meta:
        model = Plan_Estudio
        fields = ['nombre_plan']


class PlanEstudioView(viewsets.ModelViewSet):
    serializer_class = PlanEtudioSerializer
    queryset = Plan_Estudio.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = PlanFilter
#------------------------------------------------

class TitulosFilter(filters.FilterSet):
    class Meta:
        model = Titulados
        fields = ['num_titulo', 'clave_plan','fecha_acto','fecha_registro','num_cedula']


class TituladosView(viewsets.ModelViewSet):
    serializer_class = TituladosSerializer
    queryset = Titulados.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = TitulosFilter
#------------------------------------------------

class CertificadosFilter(filters.FilterSet):
    class Meta:
        model = Certificados
        fields = ['num_folio','nombre_carrera','fecha_registro']


class CertificadosView(viewsets.ModelViewSet):
    serializer_class = CertificadosSerializer
    queryset = Certificados.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CertificadosFilter
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















