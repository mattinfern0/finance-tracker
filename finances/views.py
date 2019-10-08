from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.core.validators import MinLengthValidator, ValidationError
from django.db.utils import IntegrityError

from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from finances.serializers import TransactionSerializer
from finances.models import Transaction

from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_401_UNAUTHORIZED,
)

# Create your views here.
class TransactionViewSet(viewsets.ModelViewSet):
    """ 
    Get/edit transactions
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def get_queryset(self):
        userId = self.request.session.get('user_id')

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def signup(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if username is None or password is None:
        return Response (
            {'message': 'Username and/or password is missing'}, 
            status=HTTP_400_BAD_REQUEST
        )

    if len(username) < 8 or len(password) < 8:
        return Response (
            {'message': 'Invalid username and/or password'}, 
            status=HTTP_400_BAD_REQUEST
        )

    User.objects.create_user(username=username, password=password)

    return Response (
        {'message': 'Successfully created user'},
        status=HTTP_200_OK
    )

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if username is None or password is None:
        return Response(
            {'message': 'Username and/or password is missing.'},
            status=HTTP_400_BAD_REQUEST
        )

    currentUser = authenticate(username=username, password=password)

    if not currentUser:
        return Response(
            {'message': 'Invalid credentials'},
            status=HTTP_404_NOT_FOUND
        )
    else:
        request.session['user_id'] = currentUser.id
        return Response(
            {'message': 'Successfully logged in'},
            status=HTTP_200_OK
        )

class UserView(APIView):
    ''' 
    Handles creating/deleting users
    '''

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if username is None or password is None:
            return Response (
                {'message': 'Username and/or password is missing'}, 
                status=HTTP_400_BAD_REQUEST
            )

        if len(username) < 8 or len(password) < 8:
            return Response (
                {'message': 'Invalid username and/or password'}, 
                status=HTTP_400_BAD_REQUEST
            )

        try:
            User.objects.create_user(username=username, password=password)
        except (ValidationError, IntegrityError) as error:
            return Response (
                {'message': str(error)},
                status=HTTP_400_BAD_REQUEST
            )

        return Response (
            {'message': 'Successfully created user'},
            status=HTTP_200_OK
        )

    def delete(self, request):
        userId = request.session.get('user_id')

        if userId == None:
            return Response(status=HTTP_401_UNAUTHORIZED)

        User.objects.filter(id=userId).delete()
        del request.session['user_id']
        request.session.modified = True
        return Response(status=HTTP_200_OK)