from django.db import models

# Create your models here.

class Review(models.Model):
	product_id = models.IntegerField(primary_key=True)
	user_id = models.IntegerField()
	title = models.TextField()
	rating = models.FloatField(default=0.0)
	#username = models.CharField(max_length=255)

	created_at = models.DateTimeField(auto_now = True)

	def __str__(self):
		return self.product_id