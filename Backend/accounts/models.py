from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Candidate(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50, blank=True)
    mobile_number = models.CharField(max_length=15)
    profile_image = models.ImageField(upload_to="profiles/", null=True, blank=True)
    resume = models.FileField(upload_to="resumes/", null=True, blank=True)

    def __str__(self):
        return self.email

class Recruiter(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50, blank=True)
    mobile_number = models.CharField(max_length=15)
    organization_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.organization_name} - {self.email}"

class EmailOTP(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    valid_until = models.DateTimeField()

    def is_valid(self):
        from django.utils import timezone
        return timezone.now() < self.valid_until

    def save(self, *args, **kwargs):
        from django.utils import timezone
        from datetime import timedelta
        if not self.valid_until:
            self.valid_until = timezone.now() + timedelta(minutes=10)
        super().save(*args, **kwargs)
