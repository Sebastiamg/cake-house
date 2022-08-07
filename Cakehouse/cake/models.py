from django.db import models


class Producto(models.Model):
    imagen       =   models.CharField(max_length=200)
    titulo       =   models.CharField(max_length=100)
    precio       =   models.IntegerField()
    descripcion  =   models.CharField(max_length=200)
        