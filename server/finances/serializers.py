from rest_framework import serializers
from .models import Transaction, TransactionTag
import copy

class TransactionTagSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = TransactionTag
        fields = ['id', 'name', 'user']



class TransactionSerializer(serializers.ModelSerializer):
    '''
    When creating/updating, only TransactionTags that already exist in the db
    are added to the tags field
    '''
    tags = TransactionTagSerializer(many=True, required=False)

    class Meta:
        model = Transaction
        fields = ['id','title', 'amount', 'date', 'user', 'tags']

    def create(self, validated_data):
        without_tags = copy.copy(validated_data)
        without_tags.pop("tags", None)

        transaction = Transaction.objects.create(**without_tags)
        self._add_existing_tags(transaction, validated_data)
        return transaction

    def update(self, instance, validated_data):
        print(validated_data)
        print(type(validated_data))

        instance.title = validated_data.get('title', instance.title)
        instance.amount = validated_data.get('amount', instance.amount)
        instance.date = validated_data.get('date', instance.date)
        instance.user = validated_data.get('user', instance.user)

        
        instance.save()
        self._add_existing_tags(instance, validated_data)
        return instance


    def _add_existing_tags(self, instance, validated_data):
        instance.tags.clear()
        if 'tags' in validated_data and len(validated_data['tags']) > 0:
            update_tags = validated_data['tags']

            for tag in update_tags:
                print(tag)
                tag_id = tag['id']
                if TransactionTag.objects.filter(id=tag_id).exists():
                    instance.tags.add(TransactionTag.objects.get(id=tag_id))

            instance.save()
        return instance


        