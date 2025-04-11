from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.urls import reverse
import random

def generate_random_digits(n):
	return ''.join(str(random.randint(0, 9)) for _ in range(n))

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
		models.CharField(max_length=25),
	)
	description = models.TextField()
	availability = models.BooleanField(default=False)
	rating = models.FloatField(default=0)
	category = ArrayField(
		models.CharField(max_length=255),
		blank=True,
		default=list
	)
	price = models.FloatField(default=100, null=True)

	slug = models.SlugField(default = generate_random_digits(5), max_length=255, unique=True, primary_key=True, blank=True)

	def __str__(self):
		return self.slug

	def get_absolute_url(self):
		return reverse('product_detail', kwargs={'slug': self.slug})

