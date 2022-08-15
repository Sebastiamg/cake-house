from django.contrib import admin
from django.urls import path
from . import views
from django.contrib.auth.views import LoginView

urlpatterns = [
    path('', views.index, name="index"),
    path("inicio/", views.inicio, name="inicio"),
    path("info", views.info, name="info"),
    path("pedidos/", views.pedido, name="pedido"),
    path("gestion/", views.gestion, name="gestion"),
    path("nuevoProducto/", views.nuevo, name="nuevo"),
    path("eliminado/<int:producto_id>/", views.eliminado, name="eliminado"),
    path("actualizado/<int:producto_id>/", views.actualizar, name="actualizar"),
    path("registro/", views.registro, name="registro"),
    path("login/", LoginView.as_view(template_name="cake/login.html"), name="login"),
    path("logOut/", views.cerrarSesion, name="cerrarSesion"),
    path("direccion/", views.direccion, name="direccion"),
    path("eliminarDirecion/<int:factura_id>", views.eliminarFactura, name="eliminarFactura")
]