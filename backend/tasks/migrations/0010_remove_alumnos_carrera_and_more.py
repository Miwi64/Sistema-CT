# Generated by Django 4.2.7 on 2024-02-03 01:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0009_alter_alumnos_num_control'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alumnos',
            name='carrera',
        ),
        migrations.RemoveField(
            model_name='certificados',
            name='nombre_carrera',
        ),
    ]
