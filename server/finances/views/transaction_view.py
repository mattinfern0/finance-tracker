from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response

from finances.serializers import TransactionSerializer
from finances.models import Transaction

from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_200_OK
)

import traceback

class TransactionViewSet(viewsets.ModelViewSet):
    """ 
    Get/edit transactions
    """
    serializer_class = TransactionSerializer

    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        print("Getting transacitions")
        userId = self.request.session.get('user_id')

        title = self.request.query_params.get('title', None)
        amount_min = self.request.query_params.get('amount-min', None)
        amount_max = self.request.query_params.get('amount-max', None)
        month = self.request.query_params.get('month', None)
        year = self.request.query_params.get('year', None)

        print(f"User Id: {userId}")
        print(f"Month: {month}")
        print(f"Year: {year}")

        result = Transaction.objects.all().filter(user=userId)


        # Allows filtering by month+year and year only
        if year is not None:
            result = result.filter(date__year=year)

            # month == -1 means don't filter for month
            if month is not None and month != '-1':
                result = result.filter(date__month=month)

        return result

    def create(self, request):
        print("Test")
        data = request.data

        # Insert session user id into data before validating
        data['user'] = self.request.session.get('user_id')

        serializer = self.get_serializer(data=data)
        print(data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            traceback.print_exc()
            raise e
        print("Is valid. Creating transaction")
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data

        # Don't update the user field
        data['user'] = instance.user.id

        serializer = self.get_serializer(instance, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_200_OK)