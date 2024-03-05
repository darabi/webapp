from flask import g
from neo4j import GraphDatabase, basic_auth
from backend.config import env

driver = GraphDatabase.driver(env('NEO4J_URL'), auth=basic_auth(env('NEO4J_USER'), str(env('NEO4J_PASSWORD'))))

def get_db():
    if not hasattr(g, 'neo4j_db'):
        g.neo4j_db = driver.session(database=env('NEO4J_DATABASE'))
    return g.neo4j_db
