from django.shortcuts import render
from rest_framework import generics
from .models import Client
from .serializers import ClientSerializers
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import subprocess
import json

# Create your views here.

# CBV (Class-Based Views)

# Voir tous les users
class ClientListCreate(generics.ListAPIView):
    # Définit l'ensemble des objets à retourner (tous les CustomUser)
    queryset = Client.objects.all()
    # Spécifie le sérialiseur à utiliser pour formater les données
    serializer_class = ClientSerializers

# Crée un User
class ClientCreate(generics.CreateAPIView):
    # Définit l'ensemble des objets à retourner (tous les CustomUser)
    queryset = Client.objects.all()
    # Spécifie le sérialiseur à utiliser pour formater les données
    serializer_class = ClientSerializers

class ClientByID(generics.RetrieveUpdateAPIView):
    # Je récupere tous les clients teamviewer
    queryset = Client.objects.all()
    # ma classe sérialisée
    serializer_class = ClientSerializers
    # ce qui me permet de get avec la pk
    lookup_field = "firstname"

class ClientDeleteById(generics.DestroyAPIView):
    queryset = Client.objects.all()

    serializer_class = ClientSerializers

    lookup_field = "id"


@require_http_methods(["POST","GET"])
@csrf_exempt # Permet de ne pas avoir besoin du csrf token
def open_teamviewer(request):
    data = json.loads(request.body) # on récupére le body en format json
    id_teamviewer = data.get('id') # on get id venant du body

    try:
        subprocess.Popen(f"C:\Program Files\TeamViewer\TeamViewer.exe --id {id_teamviewer}") # Ouvre teamviewer avec id
        return JsonResponse({'message': 'TeamViewer lancé avec succès'}, status=200)
    except Exception as e:
        error_message = f"Erreur lors du lancement de TeamViewer: {str(e)}"
        print(error_message)  # Pour le log du serveur
        return JsonResponse({"error": error_message}, status=500)