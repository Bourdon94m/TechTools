"""
URL configuration for Ceciaa project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('teamviewer/all', views.ClientListCreate.as_view(), name="all-client"),
    path('teamviewer/create', views.ClientCreate.as_view(), name="create-client"),
    path('teamviewer/delete/<int:id>', views.ClientDeleteById.as_view()),
    path('teamviewer/firstname/<str:firstname>', views.ClientByID.as_view()),
    path('open-teamviewer/', views.open_teamviewer, name='open_teamviewer'),

    
]
