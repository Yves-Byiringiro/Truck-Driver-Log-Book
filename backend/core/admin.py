# Register Models in ADMIN dahsboard

from django.contrib import admin
from .models import LogBook, LogBookEntry

admin.site.register(LogBook)
admin.site.register(LogBookEntry)
