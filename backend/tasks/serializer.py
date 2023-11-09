from rest_framework import serializers
from .models import *


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



