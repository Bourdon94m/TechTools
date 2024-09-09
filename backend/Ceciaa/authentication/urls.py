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
    path('users/all', views.CustomUserListCreate.as_view(), name="all-users"),
    path('users/delete/all', views.CustomUserDeleteAll.as_view(), name="delete-all-users"),
    path('users/<int:pk>/', views.CustomUserById.as_view(), name="usersId"),
    path('users/<str:first_name>/', views.CustomeUserByFirstname.as_view(), name="usersFirstname"),
    path('users/create', views.CustomUserCreate.as_view(), name="usersCreate"),
    path('api/token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', views.CustomTokenRefreshView.as_view(), name='token-refresh'),
    path('api/register/', views.RegisterView.as_view(), name='token_register'),
]
