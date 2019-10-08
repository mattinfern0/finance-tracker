from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

from finances.serializers import TransactionSerializer
from finances.models import Transaction

class TransactionViewSet(viewsets.ModelViewSet):
    """ 
    Get/edit transactions
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        userId = self.request.session.get('user_id')
        return self.queryset.filter(id=userId)