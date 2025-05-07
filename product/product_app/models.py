from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.urls import reverse
import random
from storages.backends.s3boto3 import S3Boto3Storage

def generate_random_digits():
    return ''.join([str(random.randint(0, 9)) for _ in range(5)])

# Create your models here.

class Category(models.Model):
	title = models.SlugField(max_length = 255, unique=True)
	tag = ArrayField(
		models.CharField(max_length=255)
	)

	def get_absolute_url(self):
		return reverse('category_detail', kwargs={'slug': self.title})
	

class Product(models.Model):
	title = models.CharField(max_length = 255)
	size = ArrayField(
		models.CharField(max_length=25, null=True),
		blank=True,
		default=list
	)
	description = models.TextField()
	image = models.ImageField(upload_to="products/", storage=S3Boto3Storage())
	availability = models.BooleanField(default=False)
	rating = models.FloatField(default=0)
	category = ArrayField(
		models.CharField(max_length=255, null=True),
		blank=True,
		default=list
	)
	price = models.FloatField(default=100, null=True)
	# originalPrice

	slug = models.SlugField(default = generate_random_digits, max_length=255, unique=True, primary_key=True, blank=True)

	is_deleted = models.BooleanField(default=False)

	def __str__(self):
		return self.slug

	def get_absolute_url(self):
		return reverse('product_detail', kwargs={'slug': self.slug})

