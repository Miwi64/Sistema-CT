from rest_framework.decorators import action
from rest_framework import viewsets, generics, exceptions
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from django_filters import rest_framework as filters
from .serializer import *
from .models import *
from django.contrib.auth import login
from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from knox.models import AuthToken
from django.utils import timezone
from django.utils.timezone import timedelta
from rest_framework.views import APIView
from django.views.generic import View
from django.http import HttpResponse, JsonResponse
import os
from django.conf import settings
from django.http import HttpResponse
from django.template.loader import get_template
from django.contrib.staticfiles import finders
import django_filters
from django.db import connections
#from mysql.connector import Error, query
from django.db.models import OuterRef, CharField, Value as V
from rest_framework.pagination import PageNumberPagination
# Create your views here.

#Creacion de usuarios usando knox
class RegisterUser(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        data = UserSerializer(user, context=self.get_serializer_context()).data
        token = AuthToken.objects.create(user)[1]
        return Response({
            "user": data,
            "token": token
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user



""" #Pruebas de PDF
class PruebaPDFView(View): 
    def get(self, request, *args, **kwargs):
        try: 
            template = get_template('test.html')
            context = {'title': 'Prueba de PDF'}
            html = template.render(context)
            response = HttpResponse(content_type='application/pdf')
            #response['Content-Disposition'] = 'attachment; filename="report.pdf"'
            pisa_status = pisa.CreatePDF(
                html, dest=response)
            if pisa_status.err:
                return HttpResponse('We had some errors <pre>' + html + '</pre>')
            return response
        except: 
            pass
        return HttpResponse('Error')
 """


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
        fields = ['id_carrera','nombre_carrera']


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
<<<<<<< HEAD
class AlumnoFilter(filters.FilterSet):
    class Meta:
        model = Alumnos
        fields = ['nombre','apellidop','apellidom','carrera','num_control','sexo','periodo_ingreso','periodo_egreso', 'titulo_fk', 'certificado_fk']
=======
>>>>>>> 00cbf7e361dc75fc207c82b7bda27642d5a95743



class SearchViewAlumCert(APIView):
    def post(self, request, format=None):
        data = request.data
        search_term_1 = data.get('num_folio')
        search_term_2 = data.get('num_control')

        if search_term_1 and search_term_2:
            results_1 = Certificados.objects.filter(num_folio=search_term_1)
            results_2 = Alumnos.objects.filter(num_control=search_term_2)

            if results_1.exists() or results_2.exists():
                return Response({'error': 'A record with the provided search term already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'message': 'No records found.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Both search terms are required.'}, status=status.HTTP_400_BAD_REQUEST)



class SearchViewAlumTit(APIView):
    def post(self, request, format=None):
        data = request.data
        search_term_1 = data.get('num_titulo')
        search_term_2 = data.get('num_control')

        if search_term_1 and search_term_2:
            results_1 = Titulados.objects.filter(num_titulo=search_term_1)
            results_2 = Alumnos.objects.filter(num_control=search_term_2)

            if results_1.exists() or results_2.exists():
                return Response({'error': 'A record with the provided search term already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'message': 'No records found.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Both search terms are required.'}, status=status.HTTP_400_BAD_REQUEST)

class CustomPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'limit'
    def get_paginated_response(self, data):
        return Response({
            'total_count': self.page.paginator.count,
            'current_page': self.page.number,
            'page_size': self.page.paginator.per_page,
            'total_pages': self.page.paginator.num_pages,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'first': 'http://localhost:8000/data/api/v1/alumnos/',
            'last': 'http://localhost:8000/data/api/v1/alumnos/?page=last',
            'results': data
        })


def titulos(request):
    if request is None:
        return Titulados.objects.none()
    return Titulados.objects.all()


class AlumnoFilter(filters.FilterSet):
    nombre = filters.CharFilter(lookup_expr='icontains')
    apellidop = filters.CharFilter(lookup_expr='icontains')
    apellidop =filters.CharFilter(lookup_expr='icontains')
    carrera = filters.CharFilter(field_name='carrera' ,lookup_expr='in')
    carrera_not = filters.CharFilter(field_name='carrera', lookup_expr='in', exclude=True)
    num_control = filters.CharFilter(lookup_expr='icontains')
    sexo = filters.CharFilter(field_name='sexo',lookup_expr='in')
    sexo_not = filters.CharFilter(field_name='sexo', lookup_expr='in' ,exclude=True)
    CURP = filters.CharFilter(lookup_expr='icontains')
    periodo_ingreso = filters.CharFilter(lookup_expr='exact')
    periodo_egreso = filters.CharFilter(lookup_expr='exact')
    estado_nacimiento = filters.CharFilter(lookup_expr='icontains')
    fecha_nacimiento = filters.CharFilter(lookup_expr='icontains')
    carrera_fk = filters.NumberFilter(lookup_expr='exact')
    certificado_fk = filters.NumberFilter(lookup_expr='exact')
    titulo_fk = filters.NumberFilter(lookup_expr='exact')

    certificado_fk_null = filters.BooleanFilter(field_name='certificado_fk', lookup_expr='isnull')
    titulo_fk_null = filters.BooleanFilter(field_name='titulo_fk', lookup_expr='isnull')

    class Meta:
        model = Alumnos
        fields = ['nombre','apellidop','apellidom','carrera','num_control','sexo', 'sexo_not','CURP','periodo_ingreso','periodo_egreso','estado_nacimiento','fecha_nacimiento','carrera_fk','certificado_fk','titulo_fk','certificado_fk_null','titulo_fk_null']

    

class AlumnosView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = AlumnoSerializer
    queryset = Alumnos.objects.order_by('id_alumno')
    pagination_class = CustomPagination
    filter_backends = (filters.DjangoFilterBackend, SearchFilter)
    filterset_class = AlumnoFilter
    search_fields = ('nombre','apellidop','apellidom','carrera','num_control','sexo','CURP','periodo_ingreso','periodo_egreso','estado_nacimiento','fecha_nacimiento','carrera_fk','certificado_fk','titulo_fk')

    

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


class LastTitleEntryView(generics.RetrieveAPIView):
    queryset=Titulados.objects.all()
    serializer_class = TituladosSerializer
    lookup_field = 'id_titulo'

    def get_object(self):
        ultima_instancia = self.queryset.last()
        if not ultima_instancia:
            raise exceptions.NotFound
        return ultima_instancia

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


class LastCertificateEntryView(generics.RetrieveAPIView):
    queryset=Certificados.objects.all()
    serializer_class = CertificadosSerializer
    lookup_field = 'id_certificado'

    def get_object(self):
        ultima_instancia = self.queryset.last()
        if not ultima_instancia:
            raise exceptions.NotFound
        return ultima_instancia
    



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















