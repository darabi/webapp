from flask import Blueprint, request
from flask_json import as_json
from backend.neo4j import get_db
from backend.config import env
from datetime import timedelta, datetime, timezone
import jwt

jwt_secret = env('JWT_SECRET_KEY')
jwt_algo = 'HS256'

auth_route = Blueprint('auth_route', __name__)

@auth_route.route("/api/auth/sign-in", methods=['POST'])
@as_json
def sign_in():
    uid = "XgbuVEXBU5gtSKdbQRP1Zbbby1i1"
    token = generate_jwt_token(uid)
    return {
        "uid": uid,
        "password": "admin",
        "role": "admin",
        "access_token": token,
        "user": {
            "displayName": "Kami Darabi",
            "photoURL": "assets/images/avatars/kami-darabi.jpg",
            "email": "admin@example.com",
            "settings": {
                "layout": {},
                "theme": {}
            },
            "shortcuts": [
            ],
            "loginRedirectUrl": "example"
        }
    }

@auth_route.route("/api/auth/sign-up", methods=['POST'])
def signup():
  data = request.get_json()
  return {}

def generate_jwt_token(uid):
    now = datetime.now(timezone.utc);
    payload = {
        "iat": now,
        "exp": now + timedelta(hours=2),
        "iss": 'Fuse',
        "id": uid
    }
    token = jwt.encode(payload, jwt_secret, jwt_algo)
    return token

