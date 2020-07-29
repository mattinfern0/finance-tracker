from rest_framework import serializers
from .models import Transaction, UserTag

class UserTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTag
        fields = ['id', 'name', 'user']

class TransactionSerializer(serializers.ModelSerializer):
    tags = UserTagSerializer(many=True, read_only=True)

    class Meta:
        model = Transaction
        fields = ['id','title', 'amount', 'date', 'user', 'tags']
        