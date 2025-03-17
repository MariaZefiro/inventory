from flask import Flask, send_from_directory, request, abort
from flask_cors import CORS
from config import app_ip
import os

# Domínios permitidos 
ALLOWED_ORIGINS = ["http://localhost:3000", "http://10.1.254.74:3000"]

#LOGIN
from login import login_bp

#ADAPTADORES
from adaptadores.list_adaptadores import list_adaptadores_bp

#ARMAZENAMENTO
from armazenamento.list_armazenamento import list_armazenamento_bp

#CABOS
from cabos.list_cabos import list_cabos_bp

#DESKTOPS
from desktops.list_desktops import list_desktops_bp

# Lista dos blueprints para registro
blueprints = [
    login_bp,
    list_adaptadores_bp,
    list_armazenamento_bp,
    list_cabos_bp,
    list_desktops_bp
]