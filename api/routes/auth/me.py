from flask import Blueprint, jsonify, request
from utils.decorators import secure
from utils.orm import Session as session
from classes.session_token import SessionToken
from classes.user import User
from typing import Any, Dict
from http import HTTPStatus

me = Blueprint('me', __name__)

@me.route('/auth/me', methods=['GET'])
@secure()
def get_me() -> tuple[Dict[str, Any], int]:
    """
    Get the user's information

    Returns:
        - 200: The user's information
    """
    one_session_token = request.cookies.get('oneSessionToken')
    session_token = session.query(SessionToken).filter_by(id=one_session_token).first()
    user = session.query(User).filter_by(id=session_token.user_id).first()

    return jsonify({
        'status': 'success',
        'data': {
            'firstName': user.first_name,
            'lastName': user.last_name,
            'email': {
                'address': user.email,
                'verified': user.email_verified
            }
        }
    }), HTTPStatus.OK