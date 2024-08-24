from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .models import Ticket, WeeklyTicketStats
from rest_framework.views import APIView
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

    
    


"""
Aggregate ticket counts by time periods.

These methods return ticket counts for different time intervals 
(week, month, year). The data is formatted for easy integration 
with frontend charting libraries, facilitating trend analysis 
and resource planning.

Usage:
- In API views to supply data for frontend charts
- For periodic reporting on ticket activity
- To analyze performance trends
"""

class CurrentWeekStatsView(APIView):
    def get(self, request):
        stats = WeeklyTicketStats.get_current_week_stats()
        return Response(stats)

class CurrentMonthStatsView(APIView):
    def get(self, request):
        stats = WeeklyTicketStats.get_current_month_stats()
        return Response(stats)

class PastMonthsStatsView(APIView):
    def get(self, request):
        num_months = int(request.GET.get('months', 3))
        stats = WeeklyTicketStats.get_past_months_stats(num_months)
        return Response(stats)

class YearlyStatsView(APIView):
    def get(self, request):
        num_years = int(request.GET.get('years', 1))
        stats = WeeklyTicketStats.get_yearly_stats(num_years)
        return Response(stats)