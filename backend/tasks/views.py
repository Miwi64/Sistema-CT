from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from .serializer import *
from .models import *
from django.contrib.auth import login
from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
# Create your views here.

class LoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginView, self).post(request, format=None)



class CarreraFilter(filters.FilterSet):
    class Meta:
        model = Carreras
        fields = ['nombre_carrera']


class CarreraView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = CarreraSerializer
    queryset = Carreras.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CarreraFilter

    def create(self, request:Request, ):
        data = request.data.get('items', request.data)
        many = isinstance(data, list)
        print(data, many)
        serializer = self.get_serializer(data=data, many=many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, 
            status=status.HTTP_201_CREATED,
            headers=headers
        )
    @action(methods=["DELETE"], detail=False, )
    def delete(self, request:Request):
        delete_id = request.data.get('ids')
        delete_items = self.queryset.filter(id_operacion__in=delete_id)
        delete_items.delete()
        return Response( self.serializer_class(delete_items,many=True).data, status=status.HTTP_200_OK)
#------------------------------------------------
class AlumnoFilter(filters.FilterSet):
    class Meta:
        model = Alumnos
        fields = ['nombre','apellidop','apellidom','carrera','num_control','sexo','periodo_ingreso','periodo_egreso']


class AlumnosView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = AlumnoSerializer
    queryset = Alumnos.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AlumnoFilter

    def create(self, request:Request, ):
        data = request.data.get('items', request.data)
        many = isinstance(data, list)
        print(data, many)
        serializer = self.get_serializer(data=data, many=many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, 
            status=status.HTTP_201_CREATED,
            headers=headers
        )
    @action(methods=["DELETE"], detail=False, )
    def delete(self, request:Request):
        delete_id = request.data.get('ids')
        delete_items = self.queryset.filter(id_operacion__in=delete_id)
        delete_items.delete()
        return Response( self.serializer_class(delete_items,many=True).data, status=status.HTTP_200_OK)
#------------------------------------------------

class PlanFilter(filters.FilterSet):
    class Meta:
        model = Plan_Estudio
        fields = ['nombre_plan']


class PlanEstudioView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = PlanEtudioSerializer
    queryset = Plan_Estudio.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = PlanFilter

    def create(self, request:Request, ):
        data = request.data.get('items', request.data)
        many = isinstance(data, list)
        print(data, many)
        serializer = self.get_serializer(data=data, many=many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, 
            status=status.HTTP_201_CREATED,
            headers=headers
        )
    @action(methods=["DELETE"], detail=False, )
    def delete(self, request:Request):
        delete_id = request.data.get('ids')
        delete_items = self.queryset.filter(id_operacion__in=delete_id)
        delete_items.delete()
        return Response( self.serializer_class(delete_items,many=True).data, status=status.HTTP_200_OK)
#------------------------------------------------

class TitulosFilter(filters.FilterSet):
    class Meta:
        model = Titulados
        fields = ['num_titulo', 'clave_plan','fecha_acto','fecha_registro','num_cedula']


class TituladosView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = TituladosSerializer
    queryset = Titulados.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = TitulosFilter

    def create(self, request:Request, ):
        data = request.data.get('items', request.data)
        many = isinstance(data, list)
        print(data, many)
        serializer = self.get_serializer(data=data, many=many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, 
            status=status.HTTP_201_CREATED,
            headers=headers
        )
    @action(methods=["DELETE"], detail=False, )
    def delete(self, request:Request):
        delete_id = request.data.get('ids')
        delete_items = self.queryset.filter(id_operacion__in=delete_id)
        delete_items.delete()
        return Response( self.serializer_class(delete_items,many=True).data, status=status.HTTP_200_OK)
#------------------------------------------------

class CertificadosFilter(filters.FilterSet):
    class Meta:
        model = Certificados
        fields = ['num_folio','nombre_carrera','fecha_registro']


class CertificadosView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = CertificadosSerializer
    queryset = Certificados.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CertificadosFilter

    def create(self, request:Request, ):
        data = request.data.get('items', request.data)
        many = isinstance(data, list)
        print(data, many)
        serializer = self.get_serializer(data=data, many=many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, 
            status=status.HTTP_201_CREATED,
            headers=headers
        )
    @action(methods=["DELETE"], detail=False, )
    def delete(self, request:Request):
        delete_id = request.data.get('ids')
        delete_items = self.queryset.filter(id_operacion__in=delete_id)
        delete_items.delete()
        return Response( self.serializer_class(delete_items,many=True).data, status=status.HTTP_200_OK)
#------------------------------------------------

class OperacionesView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = OperacionesSerializer
    queryset = Operaciones.objects.all()

    def create(self, request:Request, ):
        data = request.data.get('items', request.data)
        many = isinstance(data, list)
        print(data, many)
        serializer = self.get_serializer(data=data, many=many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, 
            status=status.HTTP_201_CREATED,
            headers=headers
        )
    @action(methods=["DELETE"], detail=False, )
    def delete(self, request:Request):
        delete_id = request.data.get('ids')
        delete_items = self.queryset.filter(id_operacion__in=delete_id)
        delete_items.delete()
        return Response( self.serializer_class(delete_items,many=True).data, status=status.HTTP_200_OK)
#------------------------------------------------


class RolView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = RolSerializer
    queryset = Rol.objects.all()

    def create(self, request:Request, ):
        data = request.data.get('items', request.data)
        many = isinstance(data, list)
        print(data, many)
        serializer = self.get_serializer(data=data, many=many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, 
            status=status.HTTP_201_CREATED,
            headers=headers
        )
    @action(methods=["DELETE"], detail=False, )
    def delete(self, request:Request):
        delete_id = request.data.get('ids')
        delete_items = self.queryset.filter(id_operacion__in=delete_id)
        delete_items.delete()
        return Response( self.serializer_class(delete_items,many=True).data, status=status.HTTP_200_OK)
#------------------------------------------------


class UsuariosView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = UsuariosSerializer
    queryset = Usuarios.objects.all()

    def create(self, request:Request, ):
        data = request.data.get('items', request.data)
        many = isinstance(data, list)
        print(data, many)
        serializer = self.get_serializer(data=data, many=many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, 
            status=status.HTTP_201_CREATED,
            headers=headers
        )
    @action(methods=["DELETE"], detail=False, )
    def delete(self, request:Request):
        delete_id = request.data.get('ids')
        delete_items = self.queryset.filter(id_operacion__in=delete_id)
        delete_items.delete()
        return Response( self.serializer_class(delete_items,many=True).data, status=status.HTTP_200_OK)
#------------------------------------------------















