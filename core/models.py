from django.contrib.postgres.fields import ArrayField
from django.db import models

class LogBook(models.Model):
    driver_number = models.CharField(max_length=7, db_index=True, required=True)
    driver_initials = models.CharField(max_length=2, required=True)
    driver_signature = models.ImageField(required=False)
    co_driver_name = models.CharField(max_length=250, required=False)
    home_operating_center_address = models.CharField(max_length=250, required=True)
    vehicle_number = models.CharField(max_length=5, required=True)
    show_each_unit = models.CharField(max_length=8, required=True)
    other_trailers = ArrayField(models.CharField(max_length=50), blank=True, default=list)
    shipper = models.CharField(max_length=250, required=True)
    commodity = models.CharField(max_length=250, required=True)
    load_no = models.CharField(max_length=12, required=True)
    other_loads = ArrayField(models.CharField(max_length=50), blank=True, default=list)
    today_date = models.DateField(auto_now_add=True)
