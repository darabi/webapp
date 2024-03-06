import ast
import os
from dotenv import load_dotenv, find_dotenv
from logging.config import dictConfig

load_dotenv(find_dotenv())

def env(key, defaultValue=None, mandatory=True):
    """
    Searches for an env var and returns a Python native with the value, or the defaultValue argument, if the variable does not exist.

    If you do not supply defaultValue and mandatory is True (which is by default the case), then a RuntimeError is raised.
    """
    try:
        value = os.environ[key]
        return ast.literal_eval(value)
    except (SyntaxError, ValueError):
        return value
    except KeyError:
        if defaultValue or not mandatory:
            return defaultValue
        raise RuntimeError("Missing required env var '%s'" % key)

# configure logging

dictConfig({
    'version': 1,
    'formatters': {
        'default': {
            # 'format': '{asctime}: [{levelname}] [{name}] [{module}.{funcName} linenr: {lineno}]: {message}',
            'format': '[%(asctime)s] %(levelname)s in %(funcName)s %(lineno)d %(module)s: %(message)s',
        }
    },
    'handlers': {
        'wsgi': {
            'class': 'logging.StreamHandler',
            'stream': 'ext://flask.logging.wsgi_errors_stream',
            'formatter': 'default'
        }
    },
    'root': {
        'level': env('BACKEND_LOG_LEVEL'),
        'handlers': ['wsgi']
    }
})
