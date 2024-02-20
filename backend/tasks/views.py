from django.forms import ValidationError
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
from collections import defaultdict
from datetime import datetime
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
from django.db.models.functions import ExtractYear
from django.db.models import Count
import json

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
                "token": token,
            }, status=status.HTTP_200_OK)
        # token_obj = AuthToken.objects.filter(user=user).first()
        # if token_obj:
        #     raise ValidationError("El usuario ya tiene una sesion abierta.")
        # else:
        #     data = UserSerializer(user, context=self.get_serializer_context()).data
        #     token = AuthToken.objects.create(user)[1]
        #     expiry = AuthToken.objects.get(user=user).expiry
        #     expiry_datetime = datetime.fromtimestamp(expiry.timestamp())
        #     return Response({
        #         "user": data,
        #         "token": token,
        #         "expires": expiry_datetime.isoformat(),
        #     }, status=status.HTTP_200_OK)

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class AlumnoViewSet(viewsets.ViewSet):
    def list(self, request, year):
        graduates = Alumnos.objects.filter(periodo_egreso__year=year)
        titles = Alumnos.objects.filter(titulo_fk__fecha_registro__year=year)

        graduates_data = []
        for graduate in graduates:
            graduates_data.append({
                'num_control': graduate.num_control,
                'name': graduate.nombre,
                'last_name1': graduate.apellidop,
                'last_name2': graduate.apellidom,
                'curp': graduate.CURP,
                'birth_date': graduate.fecha_nacimiento,
                'age' : ( datetime.now().year - graduate.fecha_nacimiento.year ),
                'gender': graduate.sexo,
                'career': graduate.carrera_fk.nombre_carrera,
                'certificate': "Si" if not graduate.certificado_fk is None else "No"
            })

        titles_data = []
        for title in titles:
            titles_data.append({
                'num_control': title.num_control,
                'name': title.nombre,
                'last_name1': title.apellidop,
                'last_name2': title.apellidom,
                'curp': title.CURP,
                'birth_date': title.fecha_nacimiento,
                'age' : ( datetime.now().year - title.fecha_nacimiento.year ),
                'gender': title.sexo,
                'career': title.carrera_fk.nombre_carrera,
                'study_plan': title.titulo_fk.clave_plan
            })

        return Response({
            'graduates': graduates_data,
            'titles': titles_data
        })

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
    queryset = Carreras.objects.order_by('id_carrera')
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

class CarrerasView(generics.ListAPIView):
    serializer_class = CarreraSerializer
    queryset = Carreras.objects.order_by('id_carrera')
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CarreraFilter



class GraduationView(APIView):
    def get(self, request, carrera_fk):
        # Obtener alumnos con título y que pertenecen a la carrera especificada
        alumnos = Alumnos.objects.filter(carrera_fk=carrera_fk, titulo_fk__isnull=False)
        alumnos_por_year = defaultdict(list)
        gen_counter = 1

        # Agrupar alumnos por el año de ingreso
        for alumno in alumnos:
            alumnos_por_year[alumno.periodo_ingreso.year].append(alumno)

        # Ordenar los datos por el año de ingreso
        sorted_data = sorted(alumnos_por_year.items(), key=lambda x: x[0])

        # Contar la cantidad de alumnos con título y la cantidad de alumnos que se graduaron en cada año
        summary = []
        sheets = []
        for year, alumnos_this_year in sorted_data:
            titles = len([alumno for alumno in alumnos_this_year if alumno.titulo_fk])
            graduates = len([alumno for alumno in alumnos_this_year if alumno.periodo_egreso]) 
            total = titles + graduates
            # Agregar el año, total, titles y graduates al summary
            summary.append({
                'year': year,
                'total': total,
                'titles': titles,
                'graduates': graduates
            })

            # Agregar solo los alumnos con título a la lista de estudiantes
            students = [
                {
                    'name': alumno.nombre,
                    'last_name1': alumno.apellidop,
                    'last_name2': alumno.apellidom,
                    'title_date': alumno.titulo_fk.fecha_registro.strftime('%Y-%m-%d')
                } for alumno in alumnos_this_year if alumno.titulo_fk
            ]

            # Agregar la información del año, la cantidad de alumnos y la lista de estudiantes a la lista de hojas
            sheets.append({
                'gen': gen_counter,
                'count': len(students),
                'year': year,
                'students': students
            })
            gen_counter += 1
        # Incrementar el contador gen_counter por cada año que se agregue


        # Devolver la respuesta en el formato deseado
        return Response({
            'summary': summary,
            'sheets': sheets
        })

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
    apellidom =filters.CharFilter(lookup_expr='icontains')
    num_control = filters.CharFilter(lookup_expr='icontains')
    sexo = filters.CharFilter(field_name='sexo',lookup_expr='in')
    sexo_not = filters.CharFilter(field_name='sexo', lookup_expr='in' ,exclude=True)
    CURP = filters.CharFilter(lookup_expr='icontains')
    periodo_ingreso = filters.CharFilter(lookup_expr='exact')
    periodo_egreso = filters.CharFilter(lookup_expr='exact')
    estado_nacimiento = filters.CharFilter(lookup_expr='icontains')
    fecha_nacimiento = filters.CharFilter(lookup_expr='icontains')
    carrera_fk = filters.CharFilter(method='filter_carrera_fk')
    certificado_fk = filters.NumberFilter(lookup_expr='exact')
    titulo_fk = filters.NumberFilter(lookup_expr='exact')
    certificado_fk_null = filters.BooleanFilter(field_name='certificado_fk', lookup_expr='isnull')
    titulo_fk_null = filters.BooleanFilter(field_name='titulo_fk', lookup_expr='isnull')
    nacimiento_max = django_filters.DateFilter(field_name='fecha_nacimiento', lookup_expr='lte')
    nacimiento_min = django_filters.DateFilter(field_name='fecha_nacimiento', lookup_expr='gte')
    registro_cert_max = django_filters.DateFilter(field_name='certificado_fk__fecha_registro', lookup_expr='lte')
    registro_cert_min = django_filters.DateFilter(field_name='certificado_fk__fecha_registro', lookup_expr='gte')
    registro_tit_max = django_filters.DateFilter(field_name='titulo_fk__fecha_registro', lookup_expr='lte')
    registro_tit_min = django_filters.DateFilter(field_name='titulo_fk__fecha_registro', lookup_expr='gte')

    def filter_carrera_fk(self, queryset, name, value):
        values = [int(val) for val in value.split(',')]
        return queryset.filter(**{name + '__in': values})

    order_by = filters.OrderingFilter(
        fields=(
            ('num_control', 'num_control'),
            ('nombre', 'nombre'),
            ('fecha_nacimiento', 'fecha_nacimiento'),
            ('apellidop', 'apellidop'),
            ('apellidom', 'apellidom'),
            ('periodo_ingreso', 'periodo_ingreso'),
            ('periodo_egreso', 'periodo_egreso'),
        )
    )

    class Meta:
        model = Alumnos
        fields = ['nombre','apellidop','apellidom','num_control','sexo', 'sexo_not','CURP','periodo_ingreso','periodo_egreso','estado_nacimiento','fecha_nacimiento','carrera_fk','certificado_fk','titulo_fk','certificado_fk_null','titulo_fk_null', 'registro_tit_min', 'registro_tit_max', 'registro_cert_min', 'registro_cert_max', 'nacimiento_min', 'nacimiento_max']

    
class AlumView(generics.ListAPIView):
    serializer_class = AlumnoSerializer
    queryset = Alumnos.objects.order_by('id_alumno')
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AlumnoFilter



class AlumnosView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = AlumnoSerializer
    queryset = Alumnos.objects.order_by('id_alumno')
    pagination_class = CustomPagination
    filter_backends = (filters.DjangoFilterBackend, SearchFilter)
    filterset_class = AlumnoFilter
    search_fields = ('nombre','apellidop','apellidom','num_control','sexo','CURP','periodo_ingreso','periodo_egreso','estado_nacimiento','fecha_nacimiento','carrera_fk','certificado_fk','titulo_fk')

    

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
        fields = ['num_folio','fecha_registro']


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















