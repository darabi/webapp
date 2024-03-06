from flask import Flask, g
from flask_json import as_json, FlaskJSON, JsonError, json_response
from neo4j.graph import Graph, Node, Relationship
from backend.config import env

# api routes
from backend.auth import auth_route
from backend.questionnaire import questionnaire_route

static_folder = env('BACKEND_STATIC_DIR')
app = Flask(__name__, static_folder=static_folder, static_url_path='')

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

# register our api routes
app.register_blueprint(auth_route)
app.register_blueprint(questionnaire_route)

# catch all route for serving static content
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if path != "" and os.path.exists(dir_path.joinpath(static_folder, path)):
        if path.count("/") > 1:
            [path, filename] = path.rsplit("/", maxsplit=1)
            return send_from_directory(dir_path.joinpath(static_folder, path), filename)
        else:
            filename = path
            return send_from_directory(dir_path.joinpath(static_folder), filename)
    else:
        return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run()
