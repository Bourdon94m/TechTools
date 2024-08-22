from django.test import TestCase
from .models import Ticket
# Create your tests here.


class TicketTestCase(TestCase):
    def setUp(self):
        Ticket.objects.create(
            title="Test Ticket",
            content="This is a test ticket",
        )

    def test_ticket_creation(self):
        ticket = Ticket.objects.get(title="Test Ticket")
        self.assertEqual(ticket.content, "This is a test ticket")