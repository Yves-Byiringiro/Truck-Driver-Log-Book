from datetime import datetime, date, time
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import LogBook, LogBookEntry
from .serializers import LogBookSerializer, LogBookEntrySerializer


class LogBookView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id):
        try:
            logbook = LogBook.objects.get(id=id)
            logbook_serialized = LogBookSerializer(logbook).data
            return Response(logbook_serialized, status=status.HTTP_200_OK)
        except LogBook.DoesNotExist:
            return Response({"error": "Logbook not found."}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        serializer = LogBookSerializer(data=request.data)
        if serializer.is_valid():
            try:
                today = date.today()
                user = request.user
                driver_number = user.driver_number
                driver_initials = user.driver_initials

                if LogBook.objects.filter(driver_number=driver_number, today_date=today).exists():
                    return Response({"error": "A logbook for this driver already exists today."}, status=status.HTTP_400_BAD_REQUEST)

                if driver_number == serializer.data.get('co_driver_name'):
                    return Response({"error": "Co-driver name can not be the same as driver number."}, status=status.HTTP_400_BAD_REQUEST)

                new_logbook = LogBook.objects.create(
                    user=request.user,
                    driver_number=driver_number,
                    driver_initials=driver_initials,
                    **serializer.validated_data
                )
                new_logbook_serialized = LogBookSerializer(new_logbook).data
                return Response(new_logbook_serialized, status=status.HTTP_201_CREATED)
            except:
                return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)





























class LogBookEntryView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = LogBookEntrySerializer(data=request.data)
        if serializer.is_valid():
            try:
                logbook_id = serializer.data.get('log_book')
                duty_status = serializer.data.get('duty_status')
                start_time = serializer.data.get('start_time')

                logbook = LogBook.objects.get(id=logbook_id)

                open_entry = logbook.log_entries.filter(end_time__isnull=True).first()
                if open_entry:
                    return Response({"error": "Previous log book entry must have an end time before creating a new one."}, status=status.HTTP_400_BAD_REQUEST)

                start_time_obj = datetime.strptime(start_time, "%H:%M:%S").time()
                start_time_datetime = datetime.combine(datetime.today(), start_time_obj)
                end_of_day = datetime.combine(datetime.today(), time(23, 59, 59))
                remaining_time = end_of_day - start_time_datetime

                remaining_hours = remaining_time.seconds // 3600
                remaining_minutes = (remaining_time.seconds % 3600) // 60

                new_logbook_entry = LogBookEntry.objects.create(
                    log_book=logbook,
                    duty_status=duty_status,
                    start_time=start_time,
                    location=serializer.data.get('location'),
                    odometer_start=serializer.data.get('odometer_start'),
                    odometer_end=serializer.data.get('odometer_end'),
                    remarks=serializer.data.get('remarks')
                )
                response_data = LogBookEntrySerializer(new_logbook_entry).data
                response_data["remaining_time"] = {
                    "hours": remaining_hours,
                    "minutes": remaining_minutes
                }
                return Response(response_data, status=status.HTTP_201_CREATED)

            except LogBook.DoesNotExist:
                return Response({"error": "Logbook not found."}, status=status.HTTP_404_NOT_FOUND)

            except Exception as e:
                return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        try:
            logbook_entry = LogBookEntry.objects.get(id=id)

            end_time = request.data.get("end_time")
            odometer_end = request.data.get("odometer_end")

            if end_time is None or odometer_end is None:
                return Response(
                    {"error": "Both 'end_time' and 'odometer_end' are required."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            data = {
                "end_time": end_time,
                "odometer_end": odometer_end,
            }

            serializer = LogBookEntrySerializer(logbook_entry, data=data, partial=True)

            if serializer.is_valid():
                end_time = serializer.validated_data.get('end_time', logbook_entry.end_time)
                odometer_end = serializer.validated_data.get('odometer_end', logbook_entry.odometer_end)

                if logbook_entry.start_time and end_time and logbook_entry.start_time >= end_time:
                    return Response(
                        {"error": "End time must be greater than start time."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                if logbook_entry.odometer_start and odometer_end and logbook_entry.odometer_start >= odometer_end:
                    return Response(
                        {"error": "End odometer must be greater than start odometer."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        except LogBookEntry.DoesNotExist:
            return Response({"error": "Logbook entry not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request, logbook_id):
        try:
            logbook = LogBook.objects.get(id=logbook_id)
            serializer = LogBookSerializer(logbook)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except LogBook.DoesNotExist:
            return Response({"error": "Logbook not found."}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
