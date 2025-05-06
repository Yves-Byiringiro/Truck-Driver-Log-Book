#Define paths

from django.urls import path
from .views import LogBookView, LogBookEntryView

urlpatterns = [
    path('log-book/', LogBookView.as_view()),
    path('log-book/<int:id>/', LogBookView.as_view()),
    path('log-entry/', LogBookEntryView.as_view()),
    path('log-entry/<int:id>/', LogBookEntryView.as_view()),
    path('log-book/entries/<int:logbook_id>/', LogBookEntryView.as_view()),
]