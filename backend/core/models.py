from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_verified_local = models.BooleanField(default=False)
    risk_tolerance = models.CharField(max_length=20, default='medium')
    location_preference = models.CharField(max_length=100, blank=True)

class Alert(models.Model):
    ALERT_TYPES = (
        ('SAFETY', 'Safety'),
        ('WEATHER', 'Weather'),
        ('EVENT', 'Event'),
        ('CROWD', 'Crowd Density'),
    )
    SEVERITY_LEVELS = (
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),
        ('CRITICAL', 'Critical'),
    )
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    alert_type = models.CharField(max_length=20, choices=ALERT_TYPES)
    severity = models.CharField(max_length=20, choices=SEVERITY_LEVELS, default='LOW')
    location_name = models.CharField(max_length=200)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='alerts')
    is_official = models.BooleanField(default=False)

class MicroReview(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    location_name = models.CharField(max_length=200)
    category = models.CharField(max_length=50, default='Hidden Gem')
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    upvotes = models.IntegerField(default=0)