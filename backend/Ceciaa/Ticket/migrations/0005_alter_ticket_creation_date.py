# Generated by Django 5.0.7 on 2024-09-03 20:06

import Ticket.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Ticket', '0004_alter_ticket_creation_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='creation_date',
            field=models.DateField(default=Ticket.models.date_format_mois_jour_annee),
        ),
    ]
