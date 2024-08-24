from rest_framework import serializers
from .models import Ticket

class TicketSerializers(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['title', 'content', 'status']  # N'incluez pas ticket_id et creation_date ici