# Generated by Django 5.1.2 on 2024-10-30 08:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Kisii', '0003_userprofile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='residency',
            field=models.CharField(choices=[('Resident', 'Resident'), ('Non-resident', 'Non-resident')], max_length=20),
        ),
    ]