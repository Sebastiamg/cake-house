from ast import Delete
from statistics import correlation
from django.db import models
from django.contrib.auth.models import User


class Producto(models.Model):
    imagen       =   models.CharField(max_length=200)
    titulo       =   models.CharField(max_length=100)
    precio       =   models.IntegerField()
    descripcion  =   models.CharField(max_length=200)
        
class Direccion(models.Model):
    username    = models.ForeignKey(User, on_delete= models.CASCADE, null=True, blank=True)
    nombre      = models.CharField(max_length=200)
    telefono    = models.IntegerField()
    correo      = models.EmailField()
    direccion   = models.CharField(max_length=500)
    entrega     = models.DateField()