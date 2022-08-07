from django.shortcuts import render
from django.http import HttpResponse
from .models import Producto


def index(request):
    pastel = Producto.objects.all()
    return render(request, "cake/index.html/", {"lista_pasteles": pastel})