from typing import Dict, Any, List
from flask import Blueprint, jsonify, request, current_app
from http import HTTPStatus
from utils.lib import find_missing_keys, check_data_type
from utils.orm import Session
from classes.user import User
from bcrypt import hashpw, gensalt

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

    if missing := find_missing_keys(request.json, required_fields.keys()):
        return jsonify({
            'status': 'error',
            'message': 'MISSING_FIELDS',
            'data': missing
        }), HTTPStatus.BAD_REQUEST

    if wrong_types := check_data_type(request.json, required_fields):
        return jsonify({
            'status': 'error',
            'message': 'WRONG_DATA_TYPES',
            'data': wrong_types
        }), HTTPStatus.BAD_REQUEST

    session = Session()
    if session.query(User).filter_by(email=request.json['email']).first():
        return jsonify({
            'status': 'error',
            'message': 'EMAIL_ALREADY_EXISTS'
        }), HTTPStatus.BAD_REQUEST

    user = User(
        first_name=request.json['firstName'],
        last_name=request.json['lastName'],
        email=request.json['email'],
        password=hashpw(request.json['password'].encode(), gensalt()).decode()
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

    return response, HTTPStatus.CREATED