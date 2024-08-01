from django.shortcuts import render
from rest_framework import generics
from .models import CustomUser
from .serializers import UserSerializers
from rest_framework.views import APIView #JWT
from rest_framework.response import Response #JWT
from rest_framework.permissions import IsAuthenticated #JWT
# Create your views here.

# CBV (Class-Based Views)

# Voir tous les users
class CustomUserListCreate(generics.ListAPIView):
    # Définit l'ensemble des objets à retourner (tous les CustomUser)
    queryset = CustomUser.objects.all()
    # Spécifie le sérialiseur à utiliser pour formater les données
    serializer_class = UserSerializers

# Crée un user avec la request POST
class CustomUserCreate(generics.CreateAPIView):
    # Définit l'ensemble des objets (utilisé pour la méthode GET)
    queryset = CustomUser.objects.all()
    # Spécifie le sérialiseur pour la création et la lecture
    serializer_class = UserSerializers
    # Indique d'utiliser tous les champs du modèle (peut être omis si défini dans le sérialiseur)
    fields = '__all__'

# Get un user avec son Id
class CustomUserById(generics.RetrieveAPIView):
    # Définit l'ensemble des objets à partir duquel filtrer
    queryset = CustomUser.objects.all()
    # Spécifie le sérialiseur pour formater les données
    serializer_class = UserSerializers
    # Indique le champ à utiliser pour la recherche (ici, la primary key)
    lookup_field = "pk"

class CustomeUserByFirstname(generics.RetrieveAPIView):
    # Définit l'ensemble des objets à partir duquel filtrer
    queryset = CustomUser.objects.all()
    # Spécifie le sérialiseur pour formater les données
    serializer_class = UserSerializers
    # Indique le champ à utiliser pour la recherche (ici, le first_name)
    lookup_field = "first_name"


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Vous etes authentifié!"})