# from django.db import models
# #from django.contrib.auth.models import User
# from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin
# from uuid import uuid4

# from django.untils.timezone import now


# from django.contrib.auth.hashers import	 check_password, make_password

# # Create your models here.

# class CustomUserManager(BaseUserManager):
# 	def create_user(self, email, password=None, **extra_fields):
# 		"""Создание обычного пользователя."""
# 		if not email:
# 			raise ValueError("Email должен быть указан")
# 		email = self.normalize_email(email)
# 		user = self.model(email=email, **extra_fields) #, hashed_password = make_password(password),
# 		user.set_password(password)
# 		user.save(using=self._db)
# 		return user

# 	def create_superuser(self, email, password=None, **extra_fields):
# 		"""Создание суперпользователя."""
# 		extra_fields.setdefault("is_staff", True)
# 		extra_fields.setdefault("is_superuser", True)

# 		if not extra_fields.get("is_staff"):
# 			raise ValueError("Суперпользователь должен иметь is_staff=True.")
# 		if not extra_fields.get("is_superuser"):
# 			raise ValueError("Суперпользователь должен иметь is_superuser=True.")

# 		return self.create_user(email, password, **extra_fields)


# class AuthUser(AbstractUser, PermissionsMixin):
# 	id = models.AutoField(primary_key=True)
# 	user_id = models.UUIDField(default=uuid4, editable=False)
# 	email = models.EmailField(unique=True)
# 	hashed_password = models.CharField(max_length=255)
# 	created_at = models.DateTimeField(auto_now_add=True)
# 	updated_at = models.DateTimeField(auto_now=True)

# 	username = None

# 	objects = CustomUserManager()

# 	USERNAME_FIELD = 'email'
# 	REQUIRED_FIELDS = []

# 	def __str__(self):
# 		return self.email

# 	def check_password(self, raw_password):
# 		return check_password(raw_password, self.hashed_password)


# class AuthToken(models.Model):
# 	user_id = models.IntergerField()
# 	refresh_token = models.TextField(null=True, blank=True)
# 	expires_at = models.DateTimeField()
# 	created_at = models.DateTimeField(default=now)

# 	def is_expired(self):
# 		return self.expires_at < now()

# pbkdf2_sha256$870000$56TiCpPBkyzZWZqU1a4te2$F0RnGoEeO4sZs6sUS+FIJO6yt9Dm+ltSUg+ce0ZsKYk=