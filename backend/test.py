import requests
from datetime import datetime, timedelta
import json

# Configuración de Knox
KNOX_AUTH_URL = "http://localhost:8000/api/auth/login/"
KNOX_TOKEN_TTL = timedelta(hours=10)

# Configuración de Next-Auth
NEXTAUTH_URL = "http://localhost:3000/api/auth/session"

# Autenticar usuario con Knox
response = requests.post(KNOX_AUTH_URL, data=json.dumps({"username": "caden", "password": "carlos120"}), headers={"Content-Type": "application/json"})

# Obtener token y fecha de expiración de Knox
knox_token = response.cookies.get("next-auth.session-token")
knox_expires_at_header = response.headers.get("X-Knox-Token-Expires-At")
if knox_expires_at_header is None:
    # Asignar una fecha de expiración en el futuro como valor predeterminado
    knox_expires_at = datetime.now() + KNOX_TOKEN_TTL
else:
    knox_expires_at = datetime.fromisoformat(knox_expires_at_header[:-1])

# Autenticar usuario con Next-Auth
response = requests.post(NEXTAUTH_URL, headers={"Content-Type": "application/json"})

# Verificar que la respuesta es exitosa antes de decodificar el JSON
if response.status_code == 200:
    nextauth_session = response.json()
else:
    # Imprimir el contenido de la respuesta en la consola para verificar el error
    print("Error al autenticar usuario con Next-Auth:", response.content)
    nextauth_session = None

# Obtener fecha de expiración de Next-Auth
if nextauth_session is not None:
    nextauth_expires = nextauth_session["expires"]

# Verificar que las fechas de expiración son las mismas
if knox_expires_at == nextauth_expires:
    print("Las fechas de expiración de los tokens son las mismas")
else:
    print("Las fechas de expiración de los tokens no son las mismas")