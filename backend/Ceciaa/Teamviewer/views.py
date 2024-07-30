from django.shortcuts import render
from rest_framework import generics
from .models import Client
from .serializers import ClientSerializers
# Create your views here.

# CBV (Class-Based Views)

# Voir tous les users
class ClientListCreate(generics.ListAPIView):
    # Définit l'ensemble des objets à retourner (tous les CustomUser)
    queryset = Client.objects.all()
    # Spécifie le sérialiseur à utiliser pour formater les données
    serializer_class = ClientSerializers

class ClientCreate(generics.ListCreateAPIView):
    # Définit l'ensemble des objets à retourner (tous les CustomUser)
    queryset = Client.objects.all()
    # Spécifie le sérialiseur à utiliser pour formater les données
    serializer_class = ClientSerializers