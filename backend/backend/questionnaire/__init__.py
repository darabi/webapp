from flask import Blueprint, request, session
from flask_json import as_json
from backend.neo4j import get_db
from backend.config import env
import copy
import logging

questionnaire_route = Blueprint('questionnaire_route', __name__)

@questionnaire_route.route("/api/questionnaire/movies", methods=['GET'])
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

@questionnaire_route.route("/api/questionnaire/assessments", methods=['GET'])
@as_json
def assessment_list():
    return [
        {
            "id": 513,
            "name": "Depression"
        },
        {
            "id": 170,
            "name": "Adjustment Disorder"
        },
        {
            "id": 267,
            "name": "Back pain complicated"
        },
        {
            "id": 3369,
            "name": "Back pain uncomplicated"
        }
    ]

@questionnaire_route.route("/api/questionnaire/assessment/<id>", methods=['GET'])
@as_json
def assessment_by_id(id):
    if (not 'questionnaires' in session):
        logging.debug("Creating session var questionnaires")
        session['questionnaires'] = []
    qstnrs = session['questionnaires']
    found = assessments[id];

    if not any(q.get('id') == int(id) for q in qstnrs):
        logging.debug(f"Adding assessment {id}, it is not present in the session")
        qstnrs.append(copy.deepcopy(found))

    return found

assessments = {
    "513": {
        "id": 513,
        "name": "Depression",
        "schema": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "minLength": 1
                },
                "description": {
                    "title": "Long Description",
                    "type": "string"
                },
                "done": {
                    "type": "boolean"
                },
                "due_date": {
                    "type": "string",
                    "format": "date"
                },
                "rating": {
                    "type": "integer",
                    "maximum": 5
                },
                "recurrence": {
                    "type": "string",
                    "enum": ["Never", "Daily", "Weekly", "Monthly"]
                },
                "recurrence_interval": {
                    "type": "integer"
                }
            },
            "required": ["name", "due_date"]
        },
        "uischema": {
            "type": "VerticalLayout",
            "elements": [
                {
                    "type": "Control",
                    "label": "Completed",
                    "scope": "#/properties/done"
                },
                {
                    "type": "Control",
                    "scope": "#/properties/name"
                },
                {
                    "type": "HorizontalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "scope": "#/properties/due_date"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/rating"
                        }
                    ]
                },
                {
                    "type": "HorizontalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "scope": "#/properties/recurrence"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/recurrence_interval",
                            "rule": {
                                "effect": "HIDE",
                                "condition": {
                                    "type": "LEAF",
                                    "scope": "#/properties/recurrence",
                                    "expectedValue": "Never"
                                }
                            }
                        }
                    ]
                },
                {
                    "type": "Control",
                    "scope": "#/properties/description",
                    "options": {
                        "multi": True
                    }
                }
            ]
        },
        "data": {}
    },
    "170": {
        "id": 170,
        "name": "Adjustment Disorder",
        "schema": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "minLength": 1
                },
                "description": {
                    "title": "Long Description",
                    "type": "string"
                },
                "done": {
                    "type": "boolean"
                },
                "due_date": {
                    "type": "string",
                    "format": "date"
                },
                "rating": {
                    "type": "integer",
                    "maximum": 5
                },
                "recurrence": {
                    "type": "string",
                    "enum": ["Never", "Daily", "Weekly", "Monthly"]
                },
                "recurrence_interval": {
                    "type": "integer"
                }
            },
            "required": ["name", "due_date"]
        },
        "uischema": {
            "type": "VerticalLayout",
            "elements": [
                {
                    "type": "Control",
                    "label": "Completed",
                    "scope": "#/properties/done"
                },
                {
                    "type": "Control",
                    "scope": "#/properties/name"
                },
                {
                    "type": "HorizontalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "scope": "#/properties/due_date"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/rating"
                        }
                    ]
                },
                {
                    "type": "HorizontalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "scope": "#/properties/recurrence"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/recurrence_interval",
                            "rule": {
                                "effect": "HIDE",
                                "condition": {
                                    "type": "LEAF",
                                    "scope": "#/properties/recurrence",
                                    "expectedValue": "Never"
                                }
                            }
                        }
                    ]
                },
                {
                    "type": "Control",
                    "scope": "#/properties/description",
                    "options": {
                        "multi": True
                    }
                }
            ]
        },
        "data": {}
    },
    "267": {
        "id": 267,
        "name": "Back pain complicated",
        "schema": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "minLength": 1
                },
                "description": {
                    "title": "Long Description",
                    "type": "string"
                },
                "done": {
                    "type": "boolean"
                },
                "due_date": {
                    "type": "string",
                    "format": "date"
                },
                "rating": {
                    "type": "integer",
                    "maximum": 5
                },
                "recurrence": {
                    "type": "string",
                    "enum": ["Never", "Daily", "Weekly", "Monthly"]
                },
                "recurrence_interval": {
                    "type": "integer"
                }
            },
            "required": ["name", "due_date"]
        },
        "uischema": {
            "type": "VerticalLayout",
            "elements": [
                {
                    "type": "Control",
                    "label": "Completed",
                    "scope": "#/properties/done"
                },
                {
                    "type": "Control",
                    "scope": "#/properties/name"
                },
                {
                    "type": "HorizontalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "scope": "#/properties/due_date"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/rating"
                        }
                    ]
                },
                {
                    "type": "HorizontalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "scope": "#/properties/recurrence"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/recurrence_interval",
                            "rule": {
                                "effect": "HIDE",
                                "condition": {
                                    "type": "LEAF",
                                    "scope": "#/properties/recurrence",
                                    "expectedValue": "Never"
                                }
                            }
                        }
                    ]
                },
                {
                    "type": "Control",
                    "scope": "#/properties/description",
                    "options": {
                        "multi": True
                    }
                }
            ]
        },
        "data": {}
    },
    "3369": {
        "id": 3369,
        "name": "Backpain uncomplicated",
        "schema": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "minLength": 1
                },
                "description": {
                    "title": "Long Description",
                    "type": "string"
                },
                "done": {
                    "type": "boolean"
                },
                "due_date": {
                    "type": "string",
                    "format": "date"
                },
                "rating": {
                    "type": "integer",
                    "maximum": 5
                },
                "recurrence": {
                    "type": "string",
                    "enum": ["Never", "Daily", "Weekly", "Monthly"]
                },
                "recurrence_interval": {
                    "type": "integer"
                }
            },
            "required": ["name", "due_date"]
        },
        "uischema": {
            "type": "VerticalLayout",
            "elements": [
                {
                    "type": "Control",
                    "label": "Completed",
                    "scope": "#/properties/done"
                },
                {
                    "type": "Control",
                    "scope": "#/properties/name"
                },
                {
                    "type": "HorizontalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "scope": "#/properties/due_date"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/rating"
                        }
                    ]
                },
                {
                    "type": "HorizontalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "scope": "#/properties/recurrence"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/recurrence_interval",
                            "rule": {
                                "effect": "HIDE",
                                "condition": {
                                    "type": "LEAF",
                                    "scope": "#/properties/recurrence",
                                    "expectedValue": "Never"
                                }
                            }
                        }
                    ]
                },
                {
                    "type": "Control",
                    "scope": "#/properties/description",
                    "options": {
                        "multi": True
                    }
                }
            ]
        },
        "data": {}
    }
}
