from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Permission(models.Model):
    code = models.CharField(max_length=100, unique=True)  # Например, "view_users", "edit_messages"
    description = models.TextField(blank=True, null=True)
    roles = models.ManyToManyField(Role, related_name="permissions")

    def __str__(self):
        return self.code


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email обязателен")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Хеширует пароль
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        # Создаём суперпользователя с ролью "superadmin"
        superadmin_role, _ = Role.objects.get_or_create(name="superadmin")
        extra_fields.setdefault("role", superadmin_role)

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, null=True, blank=True)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Оставляем, но теперь он зависит от роли
    created_at = models.DateTimeField(auto_now_add=True)

    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True)

    groups = models.ManyToManyField(
        "auth.Group", related_name="users_app_users", blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission", related_name="users_app_permissions", blank=True
    )

    objects = UserManager()

    USERNAME_FIELD = "email"

    def has_permission(self, permission_code):
        """Проверяет, есть ли у пользователя конкретное право"""
        if self.role:
            return self.role.permissions.filter(code=permission_code).exists()
        return False

    def __str__(self):
        return self.email
