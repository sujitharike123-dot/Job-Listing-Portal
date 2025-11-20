import random
from django.core.mail import send_mail
from .models import EmailOTP

def send_otp(email):
    otp = str(random.randint(100000, 999999))
    EmailOTP.objects.create(email=email, otp=otp)
    send_mail(
        subject="Your OTP Code",
        message=f"Your OTP is {otp}. It will expire in 10 minutes.",
        from_email="noreply@yourdomain.com",
        recipient_list=[email],
    )
