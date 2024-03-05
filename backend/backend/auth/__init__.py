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


def movie_list():
    def get_movie_list(tx):
        result = tx.run(
            '''
            MATCH (movie:Movie)-[relation]-(person:Person) RETURN movie, relation, person
            '''
        )
        return result.graph()
    db = get_db()
    graph = db.read_transaction(get_movie_list)
    return graph
    # return [ record.data() for record in result]


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

# // Define token header
# const header = {
# 	alg: 'HS256',
# 	typ: 'JWT'
# };
# // Calculate the issued at and expiration dates
# const date = new Date();
# const iat = Math.floor(date.getTime() / 1000);
# const exp = Math.floor(date.setDate(date.getDate() + 7) / 1000);
# // Define token payload
# const payload = {
# 	iat,
# 	iss: 'Fuse',
# 	exp,
# 	...tokenPayload
# };
# // Stringify and encode the header
# const stringifiedHeader = Utf8.parse(JSON.stringify(header));
# const encodedHeader = base64url(stringifiedHeader);
# // Stringify and encode the payload
# const stringifiedPayload = Utf8.parse(JSON.stringify(payload));
# const encodedPayload = base64url(stringifiedPayload);
# // Sign the encoded header and mock-api
# let signature = `${encodedHeader}.${encodedPayload}`;
# // @ts-ignore
# signature = HmacSHA256(signature, jwtSecret);
# // @ts-ignore
# signature = base64url(signature);
# // Build and return the token
# return `${encodedHeader}.${encodedPayload}.${signature}`;

