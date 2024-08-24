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
        super().save(*args, **kwargs)  

    def __str__(self):
        return f"Ticket {self.ticket_id}: {self.title}"

    class Meta:
        ordering = ['-creation_date']

class WeeklyTicketStats(models.Model):
    week_start = models.DateField(unique=True)
    ticket_count = models.IntegerField(default=0)

    @classmethod
    def get_current_week_stats(cls):
        today = timezone.now().date()
        start_of_week = today - timedelta(days=today.weekday())
        end_of_week = start_of_week + timedelta(days=6)
        
        # Récupérer les statistiques pour chaque jour de la semaine
        stats = cls.objects.filter(
            week_start__gte=start_of_week,
            week_start__lte=end_of_week
        ).order_by('week_start')
        
        daily_stats = []
        for day in range(7):
            current_day = start_of_week + timedelta(days=day)
            day_stats = stats.filter(week_start=current_day).first()
            daily_stats.append({
                'date': current_day.isoformat(),
                'ticket_count': day_stats.ticket_count if day_stats else 0
            })
        
        return {
            'week_number': start_of_week.isocalendar()[1],
            'daily_stats': daily_stats,
            'week_start': start_of_week.isoformat(),
            'week_end': end_of_week.isoformat()
        }

    @classmethod
    def increment_ticket_count(cls):
        today = timezone.now().date()
        
        # Vérifiez si une entrée pour le jour en cours existe
        day_stats, created = cls.objects.get_or_create(week_start=today)
        
        # Incrémentez le ticket_count
        day_stats.ticket_count += 1
        day_stats.save()

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

    