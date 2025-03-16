from django.db import models

class User(models.Model):
    id = models.IntegerField(primary_key=True)
    email = models.EmailField(unique=True)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.email

class Product(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Review(models.Model):
    id = models.IntegerField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()

    def __str__(self):
        return f"Review by {self.user.email} on {self.product.name}"
