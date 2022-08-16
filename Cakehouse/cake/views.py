from pickletools import read_uint1
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from .models import Producto, Direccion
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.models import User


def index(request):
    pastel = Producto.objects.all()
    return render(request, "cake/index.html/", {"lista_pasteles": pastel})

def inicio(request):
    return render(request, "cake/inicio.html/")

def info(request):
    return render(request, "cake/info.html")

def pedido(request):
    
    if request.user.is_authenticated:
        lista_productos = Producto.objects.all()
        user1 = User.objects.get(pk = request.user.id)
        # user1 = get_object_or_404(User, pk = request.user.id)
        facturas = user1.direccion_set.all()
        # facturas = Direccion.objects.all()
        return render(request, "cake/pedidos.html", {"lista": lista_productos, "facturas": facturas})
    else:
        return render(request, "cake/pedidos.html")
    # return render(request, "cake/pedidos.html", {"lista": lista_productos, "facturas": facturas})

@login_required()
@permission_required("cake.can_add")
def gestion(request):
    lista_productos = Producto.objects.all()
    return render(request, "cake/administrador.html", {"Productos": lista_productos})

def nuevo(request):
    Producto(imagen=request.POST["imagen"], titulo=request.POST["titulo"], precio=request.POST["precio"], descripcion=request.POST["desc"]).save()
    # return HttpResponse("producto creado con éxito")
    return redirect("/cake/gestion/")

def eliminado(request, producto_id):
    producto = Producto.objects.get(pk=producto_id)
    producto.delete()
    return redirect("/cake/gestion/")

def actualizar(request, producto_id):
    producto = Producto.objects.get(pk = producto_id)
    producto.imagen = request.POST["imagen"]
    producto.titulo = request.POST["titulo"]
    producto.precio = request.POST["precio"]
    producto.descripcion = request.POST["desc"]
    producto.save()    
    return redirect("/cake/gestion/")
    # return HttpResponse("hola")
    # return render(request, "cake/administrador.html", {"pList": producto_lista })

# def login(request):
#     return render(request, "cake/login.html")

def registro(request):
    if request.method == "POST":
        datos = UserCreationForm(request.POST)
        if datos.is_valid():
            user = datos.save()
            login(request, user)
            return redirect("/cake/")
        else:
            return HttpResponse("Usuario o Contraseña incorrectas")
    form = UserCreationForm()
    return render(request, "cake/registro.html", {"form": form})

def cerrarSesion(request):
    logout(request)
    return redirect("/cake/inicio/")

def direccion(request):
    user = User.objects.get(pk = request.user.id)
    user.direccion_set.create(nombre=request.POST["nombre"], telefono=request.POST["telefono"], correo=request.POST["correo"], direccion=request.POST["direccion"], entrega=request.POST["entrega"])
    user.save()
    # Direccion().save()
    return redirect("/cake/pedidos/")

def eliminarFactura(request, factura_id):
    factura = get_object_or_404(Direccion ,pk = factura_id)
    factura.delete()
    return redirect("/cake/pedidos/")

def actualizarFactura(request, factura_id):
    factura = Direccion.objects.get(pk = factura_id)
    
    # if request.method == "POST":
 
    factura.nombre    = request.POST["nombre"] 
    factura.telefono  = request.POST["telefono"]     
    factura.correo    = request.POST["correo"] 
    factura.direccion = request.POST["direccion"]     
    factura.entrega   = request.POST["entrega"] 
    factura.save()
    return redirect("/cake/pedidos/")
    # return render(request, "cake/pedidos.html/", {"factura": factura})