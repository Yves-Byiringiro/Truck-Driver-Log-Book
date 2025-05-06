# Define Models

from django.db import models
from django.contrib.postgres.fields import ArrayField
from authentication.models import User
from .enums import DUTY_STATUSES


class LogBook(models.Model):
    driver_number = models.CharField(max_length=7, db_index=True, blank=False)
    driver_initials = models.CharField(max_length=2, blank=False)
    co_driver_name = models.CharField(max_length=250, blank=True, null=True)
    home_operating_center_address = models.CharField(max_length=250)
    vehicle_number = models.CharField(max_length=5, blank=False)
    show_each_unit = models.CharField(max_length=8, blank=False)
    other_trailers = ArrayField(models.CharField(max_length=50), blank=True, default=list)
    shipper = models.CharField(max_length=250, blank=False)
    commodity = models.CharField(max_length=250, blank=False)
    load_no = models.CharField(max_length=12, blank=False)
    other_loads = ArrayField(models.CharField(max_length=50), blank=True, default=list)
    today_date = models.DateField(auto_now_add=True)
    user =  models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.driver_number} - {self.today_date}"

class LogBookEntry(models.Model):
    log_book = models.ForeignKey(LogBook, on_delete=models.CASCADE, related_name="log_entries")
    duty_status = models.CharField(max_length=3, choices=DUTY_STATUSES)
    start_time = models.TimeField(blank=False, null=False)
    end_time = models.TimeField(null=True, blank=True)
    location = models.CharField(max_length=250)
    odometer_start = models.PositiveIntegerField()
    odometer_end = models.PositiveIntegerField(null=True, blank=True)
    remarks = models.TextField(blank=False, null=False)

    def __str__(self):
        return f"{self.duty_status} - {self.start_time} ({self.logbook.driver_number})"
