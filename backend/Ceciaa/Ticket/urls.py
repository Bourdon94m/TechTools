from django.urls import path, include
from . import views

urlpatterns = [
    path('ticket/all', views.TicketList.as_view()),
    path('ticket/<int:ticket_id>', views.TicketById.as_view()),
    path('ticket/new-ticket', views.CreateTicket.as_view()),
]