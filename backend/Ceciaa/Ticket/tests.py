from django.test import TestCase
from django.utils import timezone
from datetime import timedelta, datetime
from .models import Ticket, WeeklyTicketStats


class TicketModelTest(TestCase):
    def test_ticket_creation(self):
        ticket = Ticket.objects.create(
            title='Test Ticket',
            content='This is a test ticket',
            status='open'
        )
        self.assertEqual(ticket.title, 'Test Ticket')
        self.assertEqual(ticket.content, 'This is a test ticket')
        self.assertEqual(ticket.status, 'open')
        self.assertIsNotNone(ticket.creation_date)

    def test_ticket_increment_count(self):
        ticket = Ticket.objects.create(
            title='Test Ticket',
            content='This is a test ticket',
            status='open'
        )
        initial_count = WeeklyTicketStats.objects.get_current_week_stats()['daily_stats'][0]['ticket_count']
        ticket.save()
        updated_count = WeeklyTicketStats.objects.get_current_week_stats()['daily_stats'][0]['ticket_count']
        self.assertEqual(updated_count, initial_count + 1)

    def test_weekly_ticket_stats(self):
        today = timezone.now().date()
        start_of_week = today - timedelta(days=today.weekday())
        end_of_week = start_of_week + timedelta(days=6)

        stats = WeeklyTicketStats.objects.create(
            week_start=start_of_week,
            ticket_count=5
        )

        self.assertEqual(stats.week_start, start_of_week)
        self.assertEqual(stats.ticket_count, 5)

        current_week_stats = WeeklyTicketStats.get_current_week_stats()
        self.assertEqual(current_week_stats['week_number'], start_of_week.isocalendar()[1])
        self.assertEqual(current_week_stats['week_start'], start_of_week.isoformat())
        self.assertEqual(current_week_stats['week_end'], end_of_week.isoformat())
        self.assertEqual(current_week_stats['daily_stats'][0]['ticket_count'], 5)

class WeeklyTicketStatsModelTest(TestCase):
    def test_increment_ticket_count(self):
        today = timezone.now().date()
        stats = WeeklyTicketStats.objects.create(
            week_start=today,
            ticket_count=5
        )
        stats.increment_ticket_count()
        updated_stats = WeeklyTicketStats.objects.get(week_start=today)
        self.assertEqual(updated_stats.ticket_count, 6)

    def test_get_current_month_stats(self):
        today = timezone.now().date()
        start_of_month = today.replace(day=1)
        end_of_month = (start_of_month + timedelta(days=32)).replace(day=1) - timedelta(days=1)

        stats = WeeklyTicketStats.objects.create(
            week_start=start_of_month,
            ticket_count=10
        )

        current_month_stats = WeeklyTicketStats.get_current_month_stats()
        self.assertEqual(current_month_stats['month'], start_of_month.strftime('%Y-%m'))
        self.assertEqual(current_month_stats['ticket_count'], 10)

    def test_get_past_months_stats(self):
        today = timezone.now().date()
        start_of_month = today.replace(day=1)
        end_of_month = (start_of_month + timedelta(days=32)).replace(day=1) - timedelta(days=1)

        stats = WeeklyTicketStats.objects.create(
            week_start=start_of_month,
            ticket_count=10
        )

        past_months_stats = WeeklyTicketStats.get_past_months_stats(num_months=2)
        self.assertEqual(len(past_months_stats), 2)
        self.assertEqual(past_months_stats[0]['month'], start_of_month.strftime('%Y-%m'))
        self.assertEqual(past_months_stats[0]['ticket_count'], 10)

    def test_get_yearly_stats(self):
        today = timezone.now().date()
        year = today.year
        start_of_year = timezone.datetime(year, 1, 1).date()
        end_of_year = timezone.datetime(year, 12, 31).date()

        stats = WeeklyTicketStats.objects.create(
            week_start=start_of_year,
            ticket_count=50
        )

        yearly_stats = WeeklyTicketStats.get_yearly_stats(num_years=2)
        self.assertEqual(len(yearly_stats), 2)
        self.assertEqual(yearly_stats[0]['year'], year)
        self.assertEqual(yearly_stats[0]['ticket_count'], 50)

class TicketCreationTest(TestCase):
    def test_ticket_creation_today(self):
        today = timezone.now().date()
        ticket = Ticket.objects.create(title="Test Ticket", content="Content for test ticket", creation_date=today)
        self.assertEqual(ticket.creation_date.date(), today)

    def test_ticket_creation_yesterday(self):
        yesterday = timezone.now().date() - datetime.timedelta(days=1)
        ticket = Ticket.objects.create(title="Test Ticket", content="Content for test ticket", creation_date=yesterday)
        self.assertEqual(ticket.creation_date.date(), yesterday)

    def test_ticket_creation_before_yesterday(self):
        before_yesterday = timezone.now().date() - datetime.timedelta(days=2)
        ticket = Ticket.objects.create(title="Test Ticket", content="Content for test ticket", creation_date=before_yesterday)
        self.assertEqual(ticket.creation_date.date(), before_yesterday)

    def test_ticket_creation_last_month(self):
        today = timezone.now().date()
        last_month = today.replace(day=1) - datetime.timedelta(days=1)
        ticket = Ticket.objects.create(title="Test Ticket", content="Content for test ticket", creation_date=last_month)
        self.assertEqual(ticket.creation_date.date(), last_month)

    def test_ticket_creation_last_year(self):
        today = timezone.now().date()
        last_year = today.replace(year=today.year - 1)
        ticket = Ticket.objects.create(title="Test Ticket", content="Content for test ticket", creation_date=last_year)
        self.assertEqual(ticket.creation_date.date(), last_year)

    def test_ticket_creation_old_years(self):
        today = timezone.now().date()
        old_year = today.replace(year=today.year - 5)
        ticket = Ticket.objects.create(title="Test Ticket", content="Content for test ticket", creation_date=old_year)
        self.assertEqual(ticket.creation_date.date(), old_year)

class WeeklyTicketStatsTest(TestCase):
    def test_increment_ticket_count(self):
        today = timezone.now().date()
        WeeklyTicketStats.increment_ticket_count()
        stats = WeeklyTicketStats.objects.get(week_start=today)
        self.assertEqual(stats.ticket_count, 1)

    def test_get_current_week_stats(self):
        today = timezone.now().date()
        start_of_week = today - datetime.timedelta(days=today.weekday())
        end_of_week = start_of_week + datetime.timedelta(days=6)

        # Create tickets for the current week
        for i in range(7):
            date = start_of_week + datetime.timedelta(days=i)
            Ticket.objects.create(title=f"Test Ticket {i}", content="Content for test ticket", creation_date=date)

        stats = WeeklyTicketStats.get_current_week_stats()
        self.assertEqual(stats['week_number'], start_of_week.isocalendar()[1])
        self.assertEqual(stats['week_start'], start_of_week.isoformat())
        self.assertEqual(stats['week_end'], end_of_week.isoformat())
        self.assertEqual(len(stats['daily_stats']), 7)
        for day_stat in stats['daily_stats']:
            self.assertEqual(day_stat['ticket_count'], 1)