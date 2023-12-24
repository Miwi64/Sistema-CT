# Generated by Django 4.2.7 on 2023-11-17 23:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0002_alter_alumnos_num_control_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alumnos',
            name='id_alumno',
            field=models.IntegerField(auto_created=True, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='carreras',
            name='id_carrera',
            field=models.IntegerField(auto_created=True, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='certificados',
            name='id_certificado',
            field=models.IntegerField(auto_created=True, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='operaciones',
            name='id_operacion',
            field=models.IntegerField(auto_created=True, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='plan_estudio',
            name='id_plan',
            field=models.IntegerField(auto_created=True, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='rol',
            name='id_rol',
            field=models.IntegerField(auto_created=True, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='titulados',
            name='id_titulo',
            field=models.IntegerField(auto_created=True, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='usuarios',
            name='id_usuario',
            field=models.IntegerField(auto_created=True, primary_key=True, serialize=False),
        ),
    ]