from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path("inicio/", views.inicio, name="inicio"),
    path("info", views.info, name="info"),
    path("gestion/", views.gestion, name="gestion"),
    path("nuevoProducto/", views.nuevo, name="nuevo"),
    path("eliminado/<int:producto_id>/", views.eliminado, name="eliminado"),
    path("actualizado/<int:producto_id>/", views.actualizar, name="actualizar")
]