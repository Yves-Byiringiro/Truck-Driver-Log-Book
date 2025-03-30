from django.db import models
from django.contrib.postgres.fields import ArrayField
from .enums import DUTY_STATUSES


class LogBook(models.Model):

    driver_number = models.CharField(max_length=7, db_index=True, blank=False)
    driver_initials = models.CharField(max_length=2, blank=False)
    driver_signature = models.ImageField(blank=False)
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

    def __str__(self):
        return f"{self.driver_number} - {self.today_date}"

class LogEntry(models.Model):
    logbook = models.ForeignKey(LogBook, on_delete=models.CASCADE, related_name="entries")
    duty_status = models.CharField(max_length=3, choices=DUTY_STATUSES)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True) 
    location = models.CharField(max_length=250)
    odometer_start = models.PositiveIntegerField()
    odometer_end = models.PositiveIntegerField(null=True, blank=True)
    remarks = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.duty_status} - {self.start_time} ({self.logbook.driver_number})"
