from rest_framework.decorators import action
from rest_framework import viewsets, generics
from rest_framework import status
from rest_framework.renderers import JSONRenderer
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
from knox.models import AuthToken

from django.views.generic import View
from django.http import HttpResponse, JsonResponse
import os
from django.conf import settings
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from django.contrib.staticfiles import finders

from django.db import connections
#from mysql.connector import Error, query
from django.db.models import OuterRef, CharField, Value as V
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
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user



#Pruebas de PDF
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



class MyView(View):
    serializer_class = AlumnoSerializer
    def get(self, request):
        resultados = Alumnos.objects\
            .select_related('carrera_fk')\
            .all()
        alumnos = AlumnoSerializer(resultados, many=True)
        return JsonResponse(alumnos.data, safe=False)

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















