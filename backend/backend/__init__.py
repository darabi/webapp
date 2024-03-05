from flask import Flask, g
from flask_json import as_json, FlaskJSON, JsonError, json_response
from neo4j.graph import Graph, Node, Relationship
from backend.config import env
from backend.auth import auth_route

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

@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'neo4j_db'):
        g.neo4j_db.close()

# @api.representation('application/json')
# def output_json(data, code, headers=None):
#     return json_response(data_=data, headers_=headers, status_=code)

app.register_blueprint(auth_route)


if __name__ == "__main__":
    app.run()
