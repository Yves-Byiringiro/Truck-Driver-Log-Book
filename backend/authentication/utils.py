import random
import string
import pathlib
import datetime
import uuid
import random
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken


# Method for getting JWT Tokens
def get_tokens_for_user(user):

    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "expires_at": str(timezone.now().astimezone() + refresh.access_token.lifetime),
    }


def generate_driver_number(length=7):
    """Generate a random alphanumeric driver number (7 characters)."""
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))


def get_driver_initials(username):
    """Get the first two characters of the username as initials."""
    return username[:2].upper()