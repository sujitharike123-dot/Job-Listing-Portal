from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.utils import timezone
from django.conf import settings
from rest_framework.permissions import AllowAny

from .models import Candidate, Recruiter, EmailOTP
from .serializers import CandidateSerializer


# -------------------------------------------------------
# CANDIDATE SEND OTP
# -------------------------------------------------------
class CandidateSendOtpView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"error": "Email is required"}, status=400)

        if Candidate.objects.filter(email=email).exists():
            return Response({"error": "Account already exists, please sign in"}, status=400)

        otp = get_random_string(6, "0123456789")
        EmailOTP.objects.update_or_create(
            email=email,
            defaults={"otp": otp, "valid_until": timezone.now() + timezone.timedelta(minutes=10)}
        )

        send_mail(
            "Your OTP Code",
            f"Your OTP is {otp}",
            settings.DEFAULT_FROM_EMAIL,
            [email]
        )

        return Response({"message": "OTP sent successfully"}, status=200)


# -------------------------------------------------------
# CANDIDATE VERIFY OTP + REGISTER
# -------------------------------------------------------
class CandidateVerifyOtpView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")
        username = request.data.get("username")
        password = request.data.get("password", "")
        mobile_number = request.data.get("mobile_number")

        if not all([email, otp, username, mobile_number]):
            return Response({"error": "Required fields missing"}, status=400)

        try:
            otp_obj = EmailOTP.objects.get(email=email)
        except EmailOTP.DoesNotExist:
            return Response({"error": "OTP not sent"}, status=400)

        if not otp_obj.is_valid() or otp_obj.otp != otp:
            return Response({"error": "Invalid or expired OTP"}, status=400)

        Candidate.objects.get_or_create(
            email=email,
            defaults={
                "username": username,
                "password": password,
                "mobile_number": mobile_number
            }
        )

        otp_obj.delete()
        return Response({"message": "Candidate registered successfully"}, status=200)


# -------------------------------------------------------
# RECRUITER SEND OTP
# -------------------------------------------------------
class RecruiterSendOtpView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"error": "Email is required"}, status=400)

        if Recruiter.objects.filter(email=email).exists():
            return Response({"error": "Account already exists"}, status=400)

        otp = get_random_string(6, "0123456789")
        EmailOTP.objects.update_or_create(
            email=email,
            defaults={"otp": otp, "valid_until": timezone.now() + timezone.timedelta(minutes=10)}
        )

        send_mail(
            "Your OTP Code",
            f"Your OTP is {otp}",
            settings.DEFAULT_FROM_EMAIL,
            [email]
        )

        return Response({"message": "OTP sent successfully"}, status=200)


# -------------------------------------------------------
# RECRUITER VERIFY OTP + REGISTER
# -------------------------------------------------------
class RecruiterVerifyOtpView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")
        username = request.data.get("username")
        password = request.data.get("password", "")
        mobile_number = request.data.get("mobile_number")
        organization_name = request.data.get("organization_name")

        if not all([email, otp, username, mobile_number, organization_name]):
            return Response({"error": "All fields required"}, status=400)

        try:
            otp_obj = EmailOTP.objects.get(email=email)
        except EmailOTP.DoesNotExist:
            return Response({"error": "OTP not sent"}, status=400)

        if not otp_obj.is_valid() or otp_obj.otp != otp:
            return Response({"error": "Invalid OTP"}, status=400)

        Recruiter.objects.get_or_create(
            email=email,
            defaults={
                "username": username,
                "password": password,
                "mobile_number": mobile_number,
                "organization_name": organization_name
            }
        )

        otp_obj.delete()
        return Response({"message": "Recruiter registered successfully"}, status=200)


# -------------------------------------------------------
# CANDIDATE LOGIN
# -------------------------------------------------------
class CandidateLoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not all([email, password]):
            return Response({"error": "Email and password required"}, status=400)

        try:
            candidate = Candidate.objects.get(email=email)
        except Candidate.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=400)

        if candidate.password != password:
            return Response({"error": "Invalid credentials"}, status=400)

        return Response({"message": "Login successful"}, status=200)


# -------------------------------------------------------
# RECRUITER LOGIN
# -------------------------------------------------------
class RecruiterLoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not all([email, password]):
            return Response({"error": "Email and password required"}, status=400)

        try:
            recruiter = Recruiter.objects.get(email=email)
        except Recruiter.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=400)

        if recruiter.password != password:
            return Response({"error": "Invalid credentials"}, status=400)

        return Response({"message": "Login successful"}, status=200)


# -------------------------------------------------------
# CANDIDATE PROFILE VIEW
# -------------------------------------------------------
class CandidateProfileView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request):
        email = request.GET.get("email")
        if not email:
            return Response({"error": "Email required"}, status=400)

        try:
            candidate = Candidate.objects.get(email=email)
        except Candidate.DoesNotExist:
            return Response({"error": "Candidate not found"}, status=404)

        serializer = CandidateSerializer(candidate)
        return Response(serializer.data, status=200)

  