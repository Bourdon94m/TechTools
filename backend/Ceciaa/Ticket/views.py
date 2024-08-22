from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .models import Ticket
from .serializers import TicketSerializers
# Create your views here.

class TicketList(generics.ListAPIView):
    # Récupere tout les tickets
    queryset = Ticket.objects.all()
    # definie la class sérialisée
    serializer_class = TicketSerializers


class TicketById(generics.ListAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializers
    lookup_field = "ticket_id"

    def list(self, request, *args, **kwargs):
        ticket_id = self.kwargs.get(self.lookup_field)
        queryset = self.get_queryset().filter(ticket_id=ticket_id)
        
        if not queryset.exists():
            return Response({"message": "Aucun ticket trouvé avec cet ID."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)



class CreateTicket(generics.CreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializers
    