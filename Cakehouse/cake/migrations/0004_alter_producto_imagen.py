# Generated by Django 4.1 on 2022-08-16 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cake', '0003_direccion_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='imagen',
            field=models.CharField(max_length=1000),
        ),
    ]
