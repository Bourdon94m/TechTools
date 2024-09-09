from django.shortcuts import render
from rest_framework import generics
from .models import CustomUser
from django.contrib.auth.hashers import make_password # hashage 
from .serializers import UserSerializers
from rest_framework.views import APIView #JWT
from rest_framework.response import Response #JWT
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView #JWT
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer #JWT
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError  #JWT


from django.contrib.auth import authenticate
from rest_framework import status # Rest Framework
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

class CustomUserDeleteAll(APIView):
    
    # On override la méthode pour supprimer tous les Utilisateurs si ca part en couille
    def delete(self, request):
        CustomUser.objects.all().delete()
        return Response({"message": "Tout les élements ont été supprimées !"},  status=status.HTTP_204_NO_CONTENT)
    
    


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        print("Received data:", request.data)
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        print("Authenticated user:", user)
        if user is not None:
            response = super().post(request, *args, **kwargs)
            print("Response:", response.data)
            return response
        else:
            print("Authentication failed")
            return Response({"detail": "No active account found with the given credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializers(data=request.data)
        if serializer.is_valid():
            # Hachage du mot de passe avant de sauvegarder
            validated_data = serializer.validated_data
            validated_data['password'] = make_password(validated_data['password'])
            user = serializer.create(validated_data)
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)