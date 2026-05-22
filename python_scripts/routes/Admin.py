from main import app
from helpers.JWTHandler import *
@app.get('/admin/generate_jwt/<user_id>')
def generate_jwt(user_id):
    return encode_jwt(user_id)

@app.get('/admin/test')
def test_api():
    try:
        decode_jwt()
    except Exception as e:
        return {'message': 'not authorized'},401
    return {'message': 'internal server error'},500
