from django.urls import path
from .views import LogBookView

urlpatterns = [
    path('create-log-book', LogBookView.as_view()),
]