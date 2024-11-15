from flask import Flask, jsonify

from routes.auth.register import register
from routes.auth.me import me
from routes.auth.login import login
from utils.orm import Session

app = Flask(__name__)

app.register_blueprint(register)
app.register_blueprint(me)
app.register_blueprint(login)

@app.teardown_appcontext
def shutdown_session(exception=None) -> None:
    """
    Remove the session when the app context is shutdown
    """
    Session.remove()

@app.errorhandler(404)
def page_not_found(e) -> tuple[str, int]:
    """
    Return a JSON response when a 404 error is raised

    Returns:
        - A JSON response with a 404 status code
    """
    return jsonify({
        'status': 'error',
        'message': 'NOT_FOUND'
    }), 404

@app.errorhandler(405)
def method_not_allowed() -> tuple[str, int]:
    """
    Return a JSON response when a 405 error is raised

    Returns:
        - A JSON response with a 405 status code
    """
    return jsonify({
        'status': 'error',
        'message': 'METHOD_NOT_ALLOWED'
    }), 405

@app.errorhandler(500)
def internal_server_error() -> tuple[str, int]:
    """
    Return a JSON response when a 500 error is raised

    Returns:
        - A JSON response with a 500 status code
    """
    return jsonify({
        'status': 'error',
        'message': 'INTERNAL_SERVER_ERROR'
    }), 500

if __name__ == '__main__':
    app.debug = True
    app.run(host="0.0.0.0", port=5000)