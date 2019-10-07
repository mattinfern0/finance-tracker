from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Transaction(models.Model):
    title = models.CharField()
    amount = models.DecimalField()
    date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
