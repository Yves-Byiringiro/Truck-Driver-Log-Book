from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response


class LogBookView(APIView):
    def post(self, request):
        

        return Response("Log book created successfully")
