from django.db import models

# Create your models here.

class Order(models.Model):
	user_id = models.IntegerField()
	product_id = models.IntegerField()
	status = models.CharField(max_length=25)
	total_price = models.FloatField()
	quantity = models.IntegerField()

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.id

	