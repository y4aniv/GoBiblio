from flask import Flask, jsonify

from routes.auth.register import register

app = Flask(__name__)

app.register_blueprint(register)

@app.errorhandler(404)
def page_not_found(e):
    return jsonify({
        'status': 'error',
        'message': 'NOT_FOUND'
    }), 404

@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({
        'status': 'error',
        'message': 'METHOD_NOT_ALLOWED'
    }), 405

@app.errorhandler(500)
def internal_server_error(e):
    return jsonify({
        'status': 'error',
        'message': 'INTERNAL_SERVER_ERROR'
    }), 500

if __name__ == '__main__':
    app.debug = True
    app.run(host="0.0.0.0", port=5000)