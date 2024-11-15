from typing import Dict, Any, List
from flask import Blueprint, jsonify, request, current_app
from http import HTTPStatus
from utils.lib import find_missing_keys, check_data_type
from utils.orm import Session
from classes.user import User
from bcrypt import hashpw, gensalt
from classes.session_token import SessionToken
from datetime import datetime, timedelta
from utils.regex import regex
import re

register = Blueprint('register', __name__)

@register.route('/auth/register', methods=['POST'])
def post_register() -> tuple[Dict[str, Any], int]:
    """
    Register a new user

    Args:
        - firstName (str): The first name of the user
        - lastName (str): The last name of the user
        - email (str): The email of the user
        - password (str): The password of the user
    Returns:
        - 201: The user has been created
        - 400: The request is missing keys, has wrong types or the email already exists
    """
    required_fields = {
        'firstName': str,
        'lastName': str,
        'email': str,
        'password': str
    }
    data = {
        'firstName': request.json.get('firstName').strip(),
        'lastName': request.json.get('lastName').strip(),
        'email': request.json.get('email').lower().strip(),
        'password': request.json.get('password')
    }

    if missing := find_missing_keys(data, required_fields.keys()):
        return jsonify({
            'status': 'error',
            'message': 'MISSING_FIELDS',
            'data': missing
        }), HTTPStatus.BAD_REQUEST

    if wrong_types := check_data_type(data, required_fields):
        return jsonify({
            'status': 'error',
            'message': 'WRONG_DATA_TYPES',
            'data': wrong_types
        }), HTTPStatus.BAD_REQUEST
    
    if not re.match(regex['email'], data['email']):
        return jsonify({
            'status': 'error',
            'message': 'INVALID_EMAIL'
        }), HTTPStatus.BAD_REQUEST
    
    if not re.match(regex['password'], data['password']):
        return jsonify({
            'status': 'error',
            'message': 'INVALID_PASSWORD'
        }), HTTPStatus.BAD_REQUEST

    session = Session()
    if session.query(User).filter_by(email=data['email']).first():
        return jsonify({
            'status': 'error',
            'message': 'EMAIL_ALREADY_EXISTS'
        }), HTTPStatus.BAD_REQUEST

    user = User(
        first_name=data['firstName'],
        last_name=data['lastName'],
        email=data['email'],
        password=hashpw(data['password'].encode(), gensalt()).decode()
    ).save()

    response = jsonify({
        'status': 'success',
        'message': 'USER_CREATED',
        'data': {
            'id': user.id,
            'firstName': user.first_name,
            'lastName': user.last_name,
            'email': user.email
        }
    })

    session_token = SessionToken(user_id=user.id, expires_at=datetime.now() + timedelta(days=1)).save()
    response.set_cookie('oneSessionToken', session_token.id, expires=session_token.expires_at, httponly=True)

    return response, HTTPStatus.CREATED