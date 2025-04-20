from rest_framework import serializers
from .models import LogBook, LogBookEntry


class LogBookEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = LogBookEntry
        fields = "__all__"
        
class LogBookSerializer(serializers.ModelSerializer):
    entries = LogBookEntrySerializer(many=True, read_only=True)
    class Meta:
        model = LogBook
        fields = "__all__"

