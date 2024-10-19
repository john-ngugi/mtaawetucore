from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class KisiiReports(models.Model):
    lat = models.DecimalField(decimal_places=5,max_digits=7)
    lon = models.DecimalField(decimal_places=5,max_digits=7)
    grivance_description = models.TextField(blank=True)
    category_of_complaint = models.CharField(max_length=250)
    category_of_grivance = models.CharField(max_length=250)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
    status = models.CharField(max_length=100, choices=[('Pending', 'Pending'), ('Resolved', 'Resolved'), ('Closed', 'Closed')], default='Pending')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="KisiiReports")
    
    def __str__(self):
        return f'Kisii Report - {self.id}'
    
    class Meta:
        verbose_name = "Kisii Reports"
        verbose_name_plural = 'Kisii Reports' 
    
    