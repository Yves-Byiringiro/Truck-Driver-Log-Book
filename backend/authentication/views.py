
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from .serializers import LoginSerializer, UserInfoSerializer, RegisterSerializer
from .utils import get_tokens_for_user
from .models import CustomUser


class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        try:
            if serializer.is_valid():
                username = serializer.data.get('username')
                password = serializer.data.get('password')

                user = authenticate(username=username, password=password)
                if user is not None:
                    user_info = UserInfoSerializer(user)
                    tokens = get_tokens_for_user(user)

                    return Response({
                        "tokens":tokens,
                        "user": user_info.data,
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Oops! Invalid username or password."}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RegisterView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            try:
                username = serializer.validated_data.get('username')
                email = serializer.validated_data.get('email')
                password = serializer.validated_data.get('password')

                username_exists = CustomUser.objects.filter(username=username).exists()
                email_exists = CustomUser.objects.filter(email=email).exists()

                if username_exists:
                    return Response({"error": "User with this username already registered"}, status=status.HTTP_409_CONFLICT)

                if email_exists:
                    return Response({"error": "User with this email already registered"}, status=status.HTTP_409_CONFLICT)

                user = CustomUser.objects.create(username=username, email=email, password=password)
                serialized_user = UserInfoSerializer(user).data

                tokens = get_tokens_for_user(user)

                return Response({
                    "tokens": tokens,
                    "user": serialized_user,
                }, status=status.HTTP_201_CREATED)

            except Exception as e:
                return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
