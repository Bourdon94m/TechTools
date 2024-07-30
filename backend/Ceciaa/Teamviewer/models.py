from django.db import models

# Create your models here.

class Client(models.Model):
    id = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=255, null=False, blank=False)
    lastname = models.CharField(max_length=255, null=False, blank=False)
    id_teamviewer = models.CharField(max_length=255, blank=True, null=False, help_text="Donne l'id Teamviewer du client")
    email = models.EmailField(blank=True, default="Non renseignée")
    has_teleassistance = models.BooleanField(default=False, help_text="Indique si le client est abonné au service de téléassistance")
    sub_start_date = models.DateField(blank=True, default="Unknown")
    sub_end_date = models.DateField(blank=True, default="Unknown")

    def __str__(self):
        return f"{self.firstname} {self.lastname}"
    
    