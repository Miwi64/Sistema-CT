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
class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumnos
        fields = '__all__'
    
#---------------------------------------------------------------

class PlanEtudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan_Estudio
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



