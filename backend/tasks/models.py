from django.db import models

# Create your models here.
class Carreras(models.Model):
    id_carrera = models.BigAutoField(primary_key=True,auto_created=True)
    nombre_carrera = models.CharField(max_length=45,blank=True, unique=True)
    def __str__(self):
        return self.nombre_carrera


class Titulados(models.Model):
    id_titulo = models.BigAutoField(primary_key=True,auto_created=True)
    num_titulo = models.IntegerField(blank=True, unique=True)
    clave_plan = models.CharField(max_length=20, blank=True)
    fecha_acto = models.DateField()
    fecha_registro = models.DateField()
    num_cedula = models.IntegerField(blank=True)
    observaciones = models.TextField(max_length=45, blank=True)
    def __str__(self):
        return self.num_titulo


class Certificados(models.Model):
    id_certificado = models.BigAutoField(primary_key=True,auto_created=True)
    num_folio = models.IntegerField(blank=True, unique=True)
    nombre_carrera = models.CharField(max_length=20, blank=True)
    fecha_registro = models.DateField()
    observaciones = models.TextField(max_length=45, blank=True)
    def __str__(self):
        return self.num_folio





class Alumnos(models.Model):
    id_alumno = models.BigAutoField(primary_key=True,auto_created=True)
    nombre = models.CharField(max_length=45, blank=True)
    apellidop = models.CharField(max_length=45, blank=True)
    apellidom = models.CharField(max_length=45, blank=True)
    carrera = models.CharField(max_length=45, blank=True)
    num_control = models.CharField(max_length=45, blank=True, unique=True)
    sexo = models.CharField(max_length=1, blank=True)
    CURP = models.CharField(max_length=45,blank=True)
    periodo_ingreso = models.DateField()
    periodo_egreso = models.DateField()
    estado_nacimiento = models.CharField(max_length=45, blank=True)
    fecha_nacimiento = models.DateField()
    carrera_fk = models.ForeignKey(Carreras, blank=True, null=True, on_delete=models.CASCADE)
    titulo_fk = models.ForeignKey(Titulados, blank=True, null=True, on_delete=models.CASCADE)
    certificado_fk = models.ForeignKey(Certificados, blank=True, null=True, on_delete=models.CASCADE)
    def __str__(self) -> str:
        return f"{self.nombre} {self.apellidop} {self.apellidom}"


class Plan_Estudio(models.Model):
    id_plan = models.BigAutoField(primary_key=True,auto_created=True)
    nombre_plan = models.CharField(max_length=45,blank=True, unique=True)
    def __str__(self):
        return self.nombre_plan



class Operaciones(models.Model):
    id_operacion = models.BigAutoField(primary_key=True,auto_created=True)
    nombre_operacion = models.CharField(max_length=45, blank=True, unique=True)
    def __str__(self):
        return self.nombre_operacion



class Rol(models.Model):
    id_rol = models.BigAutoField(primary_key=True,auto_created=True)
    nombre_rol = models.CharField(max_length=45, blank=True)
    operaciones = models.ManyToManyField(Operaciones)
    def __str__(self):
        return self.nombre_rol


class Usuarios(models.Model):
    id_usuario = models.BigAutoField(primary_key=True,auto_created=True)
    username = models.CharField(max_length=20, blank=True)
    password = models.CharField(max_length=20, blank=True)
    sal = models.CharField(max_length=45, blank=True)
    date_inicio = models.DateTimeField()
    token = models.CharField(max_length=45, blank=True)
    rol_fk = models.ForeignKey(Rol, on_delete=models.CASCADE)
    def __str__(self):
        return self.username







