from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.core.validators import MinLengthValidator, ValidationError
from django.db.utils import IntegrityError

from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import permissions
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication

from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_401_UNAUTHORIZED,
)

# Allow these views to bypass csrf
class NoCSRFAuth(SessionAuthentication):
    def enforce_csrf(self, request):
        return

@csrf_exempt
@ensure_csrf_cookie
@api_view(["POST"])
@authentication_classes((NoCSRFAuth,))
@permission_classes((AllowAny,))
def loginUser(request):
    username = request.data.get("username")
    password = request.data.get("password")

    currentUser = authenticate(username=username, password=password)

    if request.session._session:
        print('Already storing a session')

    if not currentUser:
        return Response(
            {'message': 'Invalid credentials'},
            status=HTTP_401_UNAUTHORIZED
        )
    else:
        login(request, currentUser)
        request.session['user_id'] = currentUser.id
        return Response(
            {'message': 'Successfully logged in'},
            status=HTTP_200_OK
        )

@csrf_exempt
@api_view(["GET"])
def logoutUser(request):
    logout(request)
    res = Response(
        {'message': 'Successfully logged out'},
        status=HTTP_200_OK
    )
    res.delete_cookie('csrftoken')
    return res

class UserView(APIView):
    ''' 
    Handles creating/deleting users
    '''

    authentication_classes = (NoCSRFAuth,)

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
                {'message': 'Username & password must be at least 8 characters'}, 
                status=HTTP_400_BAD_REQUEST
            )

        try:
            User.objects.create_user(username=username, password=password)
        except (ValidationError, IntegrityError) as error:
            print(type(error))
            errorMessage = str(error)
            print(errorMessage)
            responseMessage = errorMessage
            if (errorMessage == 'UNIQUE constraint failed: auth_user.username'):
                responseMessage = "That username is already taken"
            return Response (
                {'message': responseMessage},
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
        logout(user)
        del request.session['user_id']
        request.session.modified = True
        return Response(status=HTTP_200_OK)