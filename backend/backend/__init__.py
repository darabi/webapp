from flask import Flask, g
from flask_json import as_json, FlaskJSON, JsonError, json_response
from backend.config import env
from neo4j import GraphDatabase, basic_auth
from neo4j.graph import Graph, Node, Relationship

app = Flask(__name__)
app.config['SECRET_KEY'] = env('FLASK_SECRET_KEY')

json= FlaskJSON(app)

@json.encoder
def json_encode(obj):
    if isinstance(obj, Graph):
        return {
            "nodes": [json_encode(n) for n in obj.nodes],
            "edges": [json_encode(r) for r in obj.relationships],
        }
    elif isinstance(obj, Node):
        labels = list(obj.labels)
        return {
            "group": "nodes",
            "data": {
                "id": obj.element_id,
                "labels": labels,
                "label": labels[0] if len(labels) > 0 else "",
                "properties": {k:v for k,v in obj.items()}
            },
            "grabbable": True,
        }
    elif isinstance(obj, Relationship):
        return {
            "group": "edges",
            "data": {
                "id": obj.element_id,
                "type": obj.type,
                "properties": {k:v for k,v in obj.items()},
                "source": obj.start_node.element_id,
                "target": obj.end_node.element_id
            },
            "grabbable": True,
        }
    else:
        return super().default(obj)

driver = GraphDatabase.driver(env('NEO4J_URL'), auth=basic_auth(env('NEO4J_USER'), str(env('NEO4J_PASSWORD'))))

def get_db():
    if not hasattr(g, 'neo4j_db'):
        g.neo4j_db = driver.session(database=env('NEO4J_DATABASE'))
    return g.neo4j_db

@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'neo4j_db'):
        g.neo4j_db.close()

# @api.representation('application/json')
# def output_json(data, code, headers=None):
#     return json_response(data_=data, headers_=headers, status_=code)

@app.route("/api/movies")
@as_json
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

if __name__ == "__main__":
    app.run()
