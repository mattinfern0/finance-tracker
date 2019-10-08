from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response

from finances.serializers import TransactionSerializer
from finances.models import Transaction

from rest_framework.status import (
    HTTP_201_CREATED
)

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
        return self.queryset.filter(user=userId)

    def create(self, request):
        data = request.data

        # Insert session user id into data before validating
        data['user'] = self.request.session.get('user_id')

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=HTTP_201_CREATED, headers=headers)

    def update(self, request):
        print('Update request')