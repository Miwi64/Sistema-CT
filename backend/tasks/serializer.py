from rest_framework import serializers
from .models import *

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password'])
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Details.")



###########################################################
class CarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carreras
        fields = '__all__'

#---------------------------------------------------------------

class TituladosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Titulados
        fields = '__all__'

#---------------------------------------------------------------

class CertificadosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificados
        fields = '__all__'

#---------------------------------------------------------------

class AlumnoSerializer(serializers.ModelSerializer):
    carrera_fk=serializers.PrimaryKeyRelatedField(read_only=True)
    nombre_carrera=serializers.CharField(source='carrera_fk.nombre_carrera',read_only=True)

    certificado_fk=serializers.PrimaryKeyRelatedField(read_only=True)
    num_folio=serializers.CharField(source='certificado_fk.num_folio',read_only=True)
    carrera_cert=serializers.CharField(source='certificado_fk.nombre_carrera',read_only=True)
    fecha_registro_cert=serializers.CharField(source='certificado_fk.fecha_registro',read_only=True)
    observaciones_cert=serializers.CharField(source='certificado_fk.observaciones',read_only=True)

    titulo_fk=serializers.PrimaryKeyRelatedField(read_only=True)
    num_titulo=serializers.CharField(source='titulo_fk.num_titulo',read_only=True)
    clave_plan=serializers.CharField(source='titulo_fk.clave_plan',read_only=True)
    fecha_acto=serializers.CharField(source='titulo_fk.fecha_acto',read_only=True)
    fecha_registro_tit=serializers.CharField(source='titulo_fk.fecha_registro',read_only=True)
    num_cedula=serializers.CharField(source='titulo_fk.num_cedula',read_only=True)
    observaciones_tit=serializers.CharField(source='titulo_fk.observaciones',read_only=True)


    class Meta:
        model = Alumnos
        fields = ['id_alumno',
                  'nombre',
                  'apellidop',
                  'apellidom',
                  'carrera',
                  'num_control',
                  'sexo',
                  'CURP',
                  'periodo_ingreso',
                  'periodo_egreso',
                  'estado_nacimiento',
                  'fecha_nacimiento',
                  'carrera_fk', 
                  'nombre_carrera', 
                  'certificado_fk','num_folio','carrera_cert','fecha_registro_cert','observaciones_cert',
                  'titulo_fk','num_titulo','clave_plan','fecha_acto','fecha_registro_tit','num_cedula','observaciones_tit',
                  ]
    
#---------------------------------------------------------------

class PlanEtudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan_Estudio
        fields = '__all__'

#---------------------------------------------------------------



class OperacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operaciones
        fields = '__all__'

#---------------------------------------------------------------

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'

#---------------------------------------------------------------

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'

#---------------------------------------------------------------



