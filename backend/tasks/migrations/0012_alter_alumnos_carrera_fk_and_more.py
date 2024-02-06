# Generated by Django 4.2.7 on 2024-02-05 01:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0011_alter_alumnos_carrera_fk_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alumnos',
            name='carrera_fk',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='tasks.carreras'),
        ),
        migrations.AlterField(
            model_name='alumnos',
            name='certificado_fk',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='tasks.certificados'),
        ),
        migrations.AlterField(
            model_name='alumnos',
            name='titulo_fk',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='tasks.titulados'),
        ),
    ]