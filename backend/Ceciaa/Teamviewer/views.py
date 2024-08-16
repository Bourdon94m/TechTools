from django.shortcuts import get_object_or_404, render
from rest_framework import generics, status
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.response import Response
from .models import Client
from .serializers import ClientSerializers
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import subprocess
import json
import re

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
    lookup_field = "id"

class ClientDeleteById(generics.DestroyAPIView):
    # Je récupere tous les clients teamviewer
    queryset = Client.objects.all()
    # ma classe sérialisée
    serializer_class = ClientSerializers
    # ce qui me permet de delete avec id
    lookup_field = "id"

class ClientDeleteByName(generics.DestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializers

    def get_object(self):
        queryset = self.get_queryset()
        firstname = self.kwargs.get('firstname')
        lastname = self.kwargs.get('lastname')
        
        if not firstname or not lastname:
            raise ValidationError({"error": "Les paramètres 'firstname' et 'lastname' sont requis."})
        
        # Filtrer les clients par prénom et nom
        matching_clients = queryset.filter(firstname=firstname, lastname=lastname)
        
        # Vérifier le nombre de clients correspondants
        if matching_clients.count() == 0:
            raise ValidationError({"error": "Aucun client trouvé avec ce prénom et ce nom."})
        elif matching_clients.count() > 1:
            # Si plusieurs clients correspondent, on ne supprime pas et on renvoie une erreur
            raise ValidationError({
                "error": "Plusieurs clients correspondent à ces critères. Veuillez fournir plus d'informations.",
                "matching_clients": ClientSerializers(matching_clients, many=True).data
            })
        
        # Si un seul client correspond, on le retourne
        obj = matching_clients.first()
        self.check_object_permissions(self.request, obj)
        return obj

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response({"message": "Client supprimé avec succès."}, status=status.HTTP_204_NO_CONTENT)
        except ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
    
     
        


@require_http_methods(["POST","GET"])
@csrf_exempt # Permet de ne pas avoir besoin du csrf token
def open_teamviewer(request):
    data = json.loads(request.body) # on récupére le body en format json
    id_teamviewer = data.get('id') # on get id venant du body

    id_teamviewer_clean = re.sub(r'\s', '', id_teamviewer)

    try:
        subprocess.Popen(f"C:\Program Files\TeamViewer\TeamViewer.exe --id {id_teamviewer_clean}") # Ouvre teamviewer avec id
        return JsonResponse({'message': 'TeamViewer lancé avec succès'}, status=200)
    except Exception as e:
        error_message = f"Erreur lors du lancement de TeamViewer: {str(e)}"
        print(error_message)  # Pour le log du serveur
        return JsonResponse({"error": error_message}, status=500)