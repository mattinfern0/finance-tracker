from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Transaction(models.Model):
    title = models.CharField(max_length=200)
    amount = models.DecimalField(decimal_places=2, max_digits=8)
    date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tags = models.ManyToManyField('TransactionTag', related_name='transactions', blank=True)

# Defines a tag created by an individual user
class TransactionTag(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)