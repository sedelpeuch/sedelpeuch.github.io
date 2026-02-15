---
title: "Python : pytest"
description: "Maîtrisez pytest, le framework de testing le plus populaire en Python. Fixtures, parametrization, mocking et bonnes pratiques."
tags: [scripting, devops]
---

Pytest est le framework de testing le plus populaire en Python. Il offre une syntaxe simple, des fonctionnalités puissantes et une grande flexibilité pour écrire des tests de qualité.

<!--truncate-->

## Installation et Configuration

### Installer pytest

```bash
pip install pytest
```

Ou avec uv :

```bash
uv pip install pytest
```

### Structure basique

```
project/
├── src/
│   └── mymodule.py
├── tests/
│   ├── __init__.py
│   ├── test_mymodule.py
│   └── conftest.py
└── pytest.ini
```

## Tests Simples

### Première fonction

```python
# src/calculator.py
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b
```

### Écrire des tests

```python
# tests/test_calculator.py
from src.calculator import add, multiply

def test_add():
    assert add(2, 3) == 5

def test_add_negative():
    assert add(-1, 1) == 0

def test_multiply():
    assert multiply(3, 4) == 12
```

### Lancer les tests

```bash
# Tous les tests
pytest

# Fichier spécifique
pytest tests/test_calculator.py

# Test spécifique
pytest tests/test_calculator.py::test_add

# Verbose
pytest -v

# Avec couverture
pytest --cov=src
```

## Assertions

### Assertions de base

```python
def test_assertions():
    # Égalité
    assert 1 == 1

    # Inégalité
    assert 1 != 2

    # Comparaisons
    assert 5 > 3
    assert 3 <= 3

    # Vérité
    assert True
    assert not False

    # Contenance
    assert "hello" in "hello world"
    assert 1 in [1, 2, 3]
```

### Messages personnalisés

```python
def test_with_message():
    result = add(2, 3)
    assert result == 5, f"Expected 5, got {result}"
```

### Assertions sur les exceptions

```python
import pytest

def divide(a, b):
    if b == 0:
        raise ValueError("Division by zero")
    return a / b

def test_division_by_zero():
    with pytest.raises(ValueError):
        divide(10, 0)

    # Vérifier le message
    with pytest.raises(ValueError, match="Division by zero"):
        divide(10, 0)
```

## Fixtures

Les fixtures fournissent des données/ressources réutilisables pour les tests.

### Fixture simple

```python
import pytest

@pytest.fixture
def sample_data():
    return {"name": "John", "age": 30}

def test_with_fixture(sample_data):
    assert sample_data["name"] == "John"
    assert sample_data["age"] == 30
```

### Fixture avec setup/teardown

```python
@pytest.fixture
def database():
    # Setup
    db = create_connection()
    yield db  # Le test s'exécute ici
    # Teardown
    db.close()

def test_database_query(database):
    result = database.query("SELECT * FROM users")
    assert len(result) > 0
```

### Fixtures conftest.py (partage)

Les fixtures dans `conftest.py` sont disponibles pour tous les tests du projet.

```python
# tests/conftest.py
import pytest

@pytest.fixture(scope="session")
def app():
    """Partagée pour toute la session de test"""
    return create_app()

@pytest.fixture(scope="module")
def client(app):
    """Partagée pour tout le module"""
    return app.test_client()

@pytest.fixture(scope="function")
def temp_file():
    """Nouvelle instance pour chaque test (par défaut)"""
    file = open("temp.txt", "w")
    yield file
    file.close()
```

## Parametrization

Tester une fonction avec plusieurs jeux de données.

### @pytest.mark.parametrize

```python
@pytest.mark.parametrize("input,expected", [
    (2, 4),
    (3, 9),
    (5, 25),
    (-2, 4),
])
def test_square(input, expected):
    assert input ** 2 == expected
```

### Parametrization multiple

```python
@pytest.mark.parametrize("a,b,expected", [
    (2, 3, 5),
    (0, 0, 0),
    (-1, 1, 0),
    (10, -5, 5),
])
def test_add_multiple(a, b, expected):
    assert add(a, b) == expected
```

### Combinaison avec fixtures

```python
@pytest.mark.parametrize("username", ["alice", "bob", "charlie"])
def test_user_creation(client, username):
    response = client.post("/users", json={"name": username})
    assert response.status_code == 201
```

## Mocking avec unittest.mock

Remplacer des dépendances pour isoler le code testé.

### Mock simple

```python
from unittest.mock import patch, MagicMock
import requests

def fetch_data(url):
    response = requests.get(url)
    return response.json()

@patch('requests.get')
def test_fetch_data(mock_get):
    mock_get.return_value.json.return_value = {"name": "John"}
    result = fetch_data("http://example.com/api/user")
    assert result["name"] == "John"
```

### Mock avec side_effect

```python
@patch('requests.get')
def test_fetch_data_error(mock_get):
    mock_get.side_effect = requests.ConnectionError("Connection failed")

    with pytest.raises(requests.ConnectionError):
        fetch_data("http://example.com/api/user")
```

### Vérifier les appels

```python
@patch('requests.get')
def test_api_called_correctly(mock_get):
    mock_get.return_value.json.return_value = {}
    fetch_data("http://example.com/user/1")

    # Vérifier l'appel
    mock_get.assert_called_once_with("http://example.com/user/1")
    assert mock_get.call_count == 1
```

## pytest-mock (recommandé)

Plugin qui simplifie le mocking.

```bash
pip install pytest-mock
```

```python
def test_with_mocker(mocker):
    mock_get = mocker.patch('requests.get')
    mock_get.return_value.json.return_value = {"status": "ok"}

    result = fetch_data("http://example.com")
    assert result["status"] == "ok"
```

## Marqueurs (Markers)

Organiser et filtrer les tests.

### Marqueurs intégrés

```python
@pytest.mark.skip(reason="Non implémenté")
def test_feature_new():
    pass

@pytest.mark.skipif(sys.version_info < (3, 9), reason="Python 3.9+")
def test_new_feature():
    pass

@pytest.mark.xfail(reason="Bug connu")
def test_buggy_feature():
    assert False  # Attendu d'échouer
```

### Marqueurs personnalisés

```python
# pytest.ini
[pytest]
markers =
    slow: tests lents
    integration: tests d'intégration
    db: tests utilisant la base de données

# Tests
@pytest.mark.slow
def test_heavy_computation():
    pass

@pytest.mark.integration
def test_api_integration():
    pass

# Exécution
# pytest -m slow
# pytest -m "not slow"
# pytest -m "integration or db"
```

## Plugins Utiles

### pytest-cov (Couverture)

```bash
pip install pytest-cov
```

```bash
pytest --cov=src --cov-report=html
```

### pytest-asyncio (Tests async)

```bash
pip install pytest-asyncio
```

```python
@pytest.mark.asyncio
async def test_async_function():
    result = await async_add(2, 3)
    assert result == 5
```

### pytest-timeout (Timeout)

```bash
pip install pytest-timeout
```

```bash
pytest --timeout=10  # 10 secondes
```

```python
@pytest.mark.timeout(5)
def test_performance():
    pass
```

## Structure d'un Bon Test

### AAA Pattern (Arrange, Act, Assert)

```python
def test_user_registration():
    # Arrange - Préparer les données
    user_data = {
        "username": "alice",
        "email": "alice@example.com",
        "password": "secure123"
    }

    # Act - Exécuter l'action
    user = register_user(user_data)

    # Assert - Vérifier le résultat
    assert user.username == "alice"
    assert user.email == "alice@example.com"
    assert user.is_active is True
```

## Configuration avancée

### pytest.ini

```ini
[pytest]
minversion = 7.0
addopts = -v --strict-markers --tb=short
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
```

### pyproject.toml

```toml
[tool.pytest.ini_options]
minversion = "7.0"
addopts = "-v --strict-markers --tb=short"
testpaths = ["tests"]
pythonpath = ["."]
```

## Bonnes Pratiques

✅ **À faire**
- Nommer les tests clairement : `test_<fonction>_<condition>`
- Un test = une responsabilité
- Utiliser des fixtures plutôt que du setup/teardown
- Tester les cas normaux et les edge cases
- Viser 80%+ de couverture de code
- Garder les tests rapides

❌ **À éviter**
- Tests dépendants l'un de l'autre
- Tests flaky (non-déterministes)
- Assertions multiples et sans rapport
- Tests trop complexes
- Ignorer les erreurs

## Exemple Complet

```python
# src/user_service.py
class UserService:
    def __init__(self, db):
        self.db = db

    def create_user(self, username, email):
        if not username or not email:
            raise ValueError("Username and email required")

        user = {"username": username, "email": email}
        self.db.insert(user)
        return user

# tests/test_user_service.py
import pytest
from unittest.mock import MagicMock
from src.user_service import UserService

@pytest.fixture
def mock_db():
    return MagicMock()

@pytest.fixture
def service(mock_db):
    return UserService(mock_db)

@pytest.mark.parametrize("username,email", [
    ("alice", "alice@example.com"),
    ("bob", "bob@example.com"),
])
def test_create_user(service, mock_db, username, email):
    user = service.create_user(username, email)
    assert user["username"] == username
    assert user["email"] == email
    mock_db.insert.assert_called_once()

def test_create_user_missing_username(service):
    with pytest.raises(ValueError, match="Username and email required"):
        service.create_user("", "test@example.com")

def test_create_user_missing_email(service):
    with pytest.raises(ValueError, match="Username and email required"):
        service.create_user("alice", "")
```

## Conclusion

Pytest est un outil puissant pour écrire des tests maintenables et fiables. Avec les fixtures, parametrization et mocking, vous pouvez couvrir n'importe quel scénario. Investir dans une bonne suite de tests paie rapidement en termes de confiance et de refactoring sécurisé !
