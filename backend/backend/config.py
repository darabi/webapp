import ast
import os
from dotenv import load_dotenv, find_dotenv

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
