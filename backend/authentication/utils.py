import random
import string

def generate_driver_number(length=7):
    """Generate a random alphanumeric driver number (7 characters)."""
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))


def get_driver_initials(username):
    """Get the first two characters of the username as initials."""
    return username[:2].upper()