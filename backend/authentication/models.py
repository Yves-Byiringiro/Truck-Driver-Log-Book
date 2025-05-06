from django.db import models
from .utils import generate_driver_number, get_driver_initials
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)


class UserManager(BaseUserManager):
    """Manager for users."""

    def create(self, email, username, password=None, **extra_fields):
        """Create, save and return a new users."""
        if not email:
            raise ValueError('User must have an email address.')

        if not username:
            raise ValueError('User must have a username.')

        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)

        if not extra_fields.get('is_superuser'):
            extra_fields['driver_number'] = generate_driver_number()
            extra_fields['driver_initials'] = get_driver_initials(username)

        user = self.model(email=self.normalize_email(email), username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, username, password):
        """Create and return a new superuser."""
        extra_fields = {
            'is_staff': True,
            'is_superuser': True,
            'driver_number': 'ADMIN01',
            'driver_initials': 'AD'
        }
        return self.create(email, username, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """user in the system"""
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50, unique=True)
    driver_number = models.CharField(max_length=7)
    driver_initials = models.CharField(max_length=2)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
