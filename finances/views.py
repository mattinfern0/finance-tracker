from rest_framework import viewsets
from finances.serializers import TransactionSerializer
from finances.models import Transaction

# Create your views here.
class TransactionViewSet(viewsets.ModelViewSet):
    """ 
    Get/edit transactions
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer