from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Producto


def index(request):
    pastel = Producto.objects.all()
    return render(request, "cake/index.html/", {"lista_pasteles": pastel})

def inicio(request):
    return render(request, "cake/inicio.html/")

def info(request):
    return render(request, "cake/info.html")

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

