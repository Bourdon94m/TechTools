from django.urls import path, include
from . import views

urlpatterns = [
    path('ticket/all', views.TicketList.as_view()),
    path('ticket/<int:ticket_id>', views.TicketById.as_view()),
    path('ticket/update/<int:ticket_id>', views.UpdateTicketByID.as_view()),
    path('ticket/new-ticket', views.CreateTicket.as_view()),
    path('ticket/stats/current-week/', views.CurrentWeekStatsView.as_view(), name='current-week-stats'),
    path('ticket/stats/current-month/', views.CurrentMonthStatsView.as_view(), name='current-month-stats'),
    path('ticket/stats/past-months/', views.PastMonthsStatsView.as_view(), name='past-months-stats'),
    path('ticket/stats/yearly/', views.YearlyStatsView.as_view(), name='yearly-stats'),
    
]