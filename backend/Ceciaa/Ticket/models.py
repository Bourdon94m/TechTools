from django.db import models

class Ticket(models.Model):
    STATUS_CHOICES = [
        ('open', 'Ouvert'),
        ('in_progress', 'En cours'),
        ('closed', 'Fermé'),
    ]
 

    ticket_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, blank=False,  null=False)
    content = models.TextField(help_text="Contenu principal du ticket", blank=False,  null=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Ticket {self.ticket_id}: {self.title}"

    class Meta:
        ordering = ['-creation_date']