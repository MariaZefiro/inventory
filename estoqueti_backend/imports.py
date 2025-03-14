from flask import Flask, send_from_directory, request, abort
from flask_cors import CORS
from config import app_ip
import os

# Domínios permitidos 
ALLOWED_ORIGINS = ["http://localhost:3000", "http://10.1.254.74:3000"]

#LOGIN
from login import login_bp

# Lista dos blueprints para registro
blueprints = [
    login_bp
]