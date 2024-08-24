from django.test import TestCase
from django.utils import timezone
from datetime import timedelta
from .models import Ticket, WeeklyTicketStats

class TicketModelTest(TestCase):
    def test_ticket_creation(self):
        ticket = Ticket.objects.create(title="Test Ticket", content="This is a test ticket")
        print(f"Created ticket: {ticket}")
        self.assertEqual(ticket.status, 'open')
        self.assertTrue(isinstance(ticket.creation_date, timezone.datetime))
    
    def test_ticket_str_representation(self):
        ticket = Ticket.objects.create(title="Test Ticket", content="This is a test ticket")
        print(f"Ticket string representation: {str(ticket)}")
        self.assertEqual(str(ticket), f"Ticket {ticket.ticket_id}: Test Ticket")

class WeeklyTicketStatsTest(TestCase):
    def setUp(self):
        self.today = timezone.now().date()
        self.start_of_week = self.today - timedelta(days=self.today.weekday())

    def test_increment_ticket_count(self):
        WeeklyTicketStats.increment_ticket_count()
        stats = WeeklyTicketStats.objects.get(week_start=self.start_of_week)
        print(f"Weekly stats after increment: {stats.week_start}, Count: {stats.ticket_count}")
        self.assertEqual(stats.ticket_count, 1)

    def test_get_current_week_stats(self):
        WeeklyTicketStats.increment_ticket_count()
        stats = WeeklyTicketStats.get_current_week_stats()
        print(f"Current week stats: {stats.week_start}, Count: {stats.ticket_count}")
        self.assertEqual(stats.week_start, self.start_of_week)
        self.assertEqual(stats.ticket_count, 1)

    def test_get_current_month_stats(self):
        for i in range(5):
            WeeklyTicketStats.increment_ticket_count()
            print(f"Incrementing ticket count: {i+1}")
        stats = WeeklyTicketStats.get_current_month_stats()
        print(f"Current month stats: {stats}")
        self.assertEqual(stats['ticket_count'], 5)

    def test_get_past_months_stats(self):
        # Créer des données pour les 3 derniers mois
        for i in range(3):
            month_start = (self.today - timedelta(days=30*i)).replace(day=1)
            stats = WeeklyTicketStats.objects.create(week_start=month_start, ticket_count=10*(i+1))
            print(f"Created stats for month: {stats.week_start}, Count: {stats.ticket_count}")
        
        stats = WeeklyTicketStats.get_past_months_stats(num_months=3)
        print(f"Past months stats: {stats}")
        self.assertEqual(len(stats), 3)
        self.assertEqual(stats[0]['ticket_count'], 10)
        self.assertEqual(stats[2]['ticket_count'], 30)

    def test_get_yearly_stats(self):
        # Créer des données pour les 2 dernières années
        for i in range(2):
            year_start = timezone.datetime(self.today.year - i, 1, 1).date()
            stats = WeeklyTicketStats.objects.create(week_start=year_start, ticket_count=100*(i+1))
            print(f"Created stats for year: {stats.week_start.year}, Count: {stats.ticket_count}")
        
        stats = WeeklyTicketStats.get_yearly_stats(num_years=2)
        print(f"Yearly stats: {stats}")
        self.assertEqual(len(stats), 2)
        self.assertEqual(stats[0]['ticket_count'], 100)
        self.assertEqual(stats[1]['ticket_count'], 200)