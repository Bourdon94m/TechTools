from django.db import models
from django.utils import timezone
from django.db.models import Sum, Count
from datetime import timedelta

class Ticket(models.Model):
    STATUS_CHOICES = [
        ('open', 'Ouvert'),
        ('in_progress', 'En cours'),
        ('closed', 'Fermé'),
    ]

    ticket_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, blank=False, null=False)
    content = models.TextField(help_text="Contenu principal du ticket", blank=False, null=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    creation_date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.pk:  # Utiliser pk au lieu de ticket_id pour la vérification
            WeeklyTicketStats.increment_ticket_count()
        super().save(*args, **kwargs)  # Correction de *kwargs

    def __str__(self):
        return f"Ticket {self.ticket_id}: {self.title}"

    class Meta:
        ordering = ['-creation_date']

class WeeklyTicketStats(models.Model):
    week_start = models.DateField(unique=True)
    ticket_count = models.IntegerField(default=0)

    
    @classmethod
    def increment_ticket_count(cls):
        current_week_stats = cls.get_current_week_stats()
        current_week_stats.ticket_count += 1
        current_week_stats.save()

    @classmethod
    def get_current_week_stats(cls):
        today = timezone.now().date()
        start_of_week = today - timedelta(days=today.weekday())
        stats, _ = cls.objects.get_or_create(week_start=start_of_week)
        return stats

    @classmethod
    def get_current_month_stats(cls):
        today = timezone.now().date()
        start_of_month = today.replace(day=1)
        end_of_month = (start_of_month + timedelta(days=32)).replace(day=1) - timedelta(days=1)
        
        total_tickets = cls.objects.filter(
            week_start__gte=start_of_month,
            week_start__lte=end_of_month
        ).aggregate(Sum('ticket_count'))['ticket_count__sum'] or 0
        
        return {
            'month': start_of_month.strftime('%Y-%m'),
            'ticket_count': total_tickets
        }

    @classmethod
    def get_past_months_stats(cls, num_months=6):
        today = timezone.now().date()
        months = []
        for i in range(num_months):
            start_of_month = (today.replace(day=1) - timedelta(days=i*30)).replace(day=1)
            end_of_month = (start_of_month + timedelta(days=32)).replace(day=1) - timedelta(days=1)
            
            total_tickets = cls.objects.filter(
                week_start__gte=start_of_month,
                week_start__lte=end_of_month
            ).aggregate(Sum('ticket_count'))['ticket_count__sum'] or 0
            
            months.append({
                'month': start_of_month.strftime('%Y-%m'),
                'ticket_count': total_tickets
            })
        return months

    @classmethod
    def get_yearly_stats(cls, num_years=5):
        today = timezone.now().date()
        years = []
        for i in range(num_years):
            year = today.year - i
            start_of_year = timezone.datetime(year, 1, 1).date()
            end_of_year = timezone.datetime(year, 12, 31).date()
            
            total_tickets = cls.objects.filter(
                week_start__gte=start_of_year,
                week_start__lte=end_of_year
            ).aggregate(Sum('ticket_count'))['ticket_count__sum'] or 0
            
            years.append({
                'year': year,
                'ticket_count': total_tickets
            })
        return years

    