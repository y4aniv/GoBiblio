from functools import wraps
from flask import request, jsonify
from utils.orm import Session
from classes.session_token import SessionToken

def secure():
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            one_session_token = request.cookies.get('oneSessionToken')

            if not one_session_token:
                return jsonify({
                    'status': 'error',
                    'message': 'UNAUTHORIZED'
                }), 401
            
            session = Session()
            session_token = session.query(SessionToken).filter_by(id=one_session_token).first()

            if not session_token:
                return jsonify({
                    'status': 'error',
                    'message': 'UNAUTHORIZED'
                }), 401
            
            if session_token.is_expired():
                return jsonify({
                    'status': 'error',
                    'message': 'UNAUTHORIZED'
                }), 401
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator