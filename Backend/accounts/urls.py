from django.urls import path
from .views import CandidateSendOtpView, CandidateVerifyOtpView, RecruiterSendOtpView, RecruiterVerifyOtpView,CandidateLoginView,RecruiterLoginView

urlpatterns = [
    path("candidate/send-otp/", CandidateSendOtpView.as_view()),
    path("candidate/verify-otp/", CandidateVerifyOtpView.as_view()),
    path("recruiter/send-otp/", RecruiterSendOtpView.as_view()),
    path("recruiter/verify-otp/", RecruiterVerifyOtpView.as_view()),
    path('candidate/login/', CandidateLoginView.as_view(), name='candidate-login'),
    path('recruiter/login/', RecruiterLoginView.as_view(), name='recruiter-login'),
]
