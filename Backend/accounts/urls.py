from django.urls import path
from .views import (
    CandidateSendOtpView,
    CandidateVerifyOtpView,
    CandidateLoginView,
    RecruiterSendOtpView,
    RecruiterVerifyOtpView,
    RecruiterLoginView,
    CandidateProfileView,
)

urlpatterns = [
    path("candidate/send-otp/", CandidateSendOtpView.as_view()),
    path("candidate/verify-otp/", CandidateVerifyOtpView.as_view()),
    path("candidate/login/", CandidateLoginView.as_view()),

    path("recruiter/send-otp/", RecruiterSendOtpView.as_view()),
    path("recruiter/verify-otp/", RecruiterVerifyOtpView.as_view()),
    path("recruiter/login/", RecruiterLoginView.as_view()),

    path("candidate/profile/", CandidateProfileView.as_view()),
]
