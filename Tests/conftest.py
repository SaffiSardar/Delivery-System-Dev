import pytest
from fastapi.testclient import TestClient


#a formality,else it wont recognize some packages
import sys
import os
# Add the source folder to the sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../source')))

# Now you can import app from root.py
from Source.root import app

@pytest.fixture(scope="module")
def test_client():

    with TestClient(app) as client:
        yield client
