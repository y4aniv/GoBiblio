from flask import Blueprint, jsonify, request
from typing import Any, Dict
from utils.orm import Session as session
from classes.user import User
from classes.session_token import SessionToken
from http import HTTPStatus
from utils.lib import find_missing_keys, check_data_type
from utils.regex import regex
import re
from bcrypt import checkpw
from datetime import datetime, timedelta

login = Blueprint('login', __name__)

@login.route('/auth/login', methods=['POST'])
def post_login() -> tuple[Dict[str, Any], int]:
    """
    Login a user

    Args:
        - email (str): The email of the user
        - password (str): The password of the user
    Returns:
        - 200: The user has been logged in
        - 400: The request is missing keys, has wrong types or the email doesn't exist
        - 401: The password is incorrect
    """
    required_fields = {
        'email': str,
        'password': str
    }
    data = {
        'email': request.json.get('email').lower().strip(),
        'password': request.json.get('password')
    }

    if missing := find_missing_keys(request.json, required_fields.keys()):
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
    
    user = session.query(User).filter_by(email=data['email']).first()

    if not user or not checkpw(data['password'].encode(), user.password.encode()):
        return jsonify({
            'status': 'error',
            'message': 'INVALID_CREDENTIALS'
        }), HTTPStatus.UNAUTHORIZED
    
    response = jsonify({
        'status': 'success',
        'data': {}
    })

    session_token = SessionToken(user_id=user.id, expires_at=datetime.now() + timedelta(days=1)).save(session)
    response.set_cookie('oneSessionToken', session_token.id, expires=session_token.expires_at, httponly=True)

    return response, HTTPStatus.OK