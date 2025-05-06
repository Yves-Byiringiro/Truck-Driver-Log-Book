from rest_framework import serializers
from .models import LogBook, LogBookEntry


class LogBookEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = LogBookEntry
        fields = "__all__"

class LogBookSerializer(serializers.ModelSerializer):
    driver_number = serializers.CharField(read_only=True)
    driver_initials = serializers.CharField(read_only=True)
    user = serializers.CharField(read_only=True)
    class Meta:
        model = LogBook
        fields = "__all__"

class LogBookEntriesSerializer(serializers.ModelSerializer):
    log_entries = LogBookEntrySerializer(many=True, read_only=True)
    class Meta:
        model = LogBook
        fields = "__all__"

