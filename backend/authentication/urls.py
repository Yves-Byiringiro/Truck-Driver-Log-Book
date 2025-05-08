from django.urls import path
from .views import LoginView, RegisterView, AuthenticateView

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('register/', RegisterView.as_view()),
    path('authenticate/', AuthenticateView.as_view()),
]