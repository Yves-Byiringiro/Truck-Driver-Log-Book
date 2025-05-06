from django.contrib import admin
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm



class UserAdmin(BaseUserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'user_type')}
        ),
    )

    fieldsets = (
        (None, {'fields': ('password',)}),
        ('Personal info', {'fields': ('username', 'email', 'driver_number', 'driver_initials')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )

    list_display = ('username', 'email', 'driver_number', 'driver_initials', 'is_superuser')
    list_filter = ('is_superuser',)
    search_fields = ('username', 'email', 'driver_number', 'driver_initials', )
    ordering = ('username', 'email')

admin.site.register(CustomUser, UserAdmin)
