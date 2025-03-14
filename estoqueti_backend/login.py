from flask import Blueprint, request, jsonify
from ldap3 import Server, Connection, SIMPLE, ALL  
from config import ad_server
from db import get_connection, close_connection
import secrets
import hashlib

login_bp = Blueprint('login_bp', __name__)

# Endpoint unificado para autenticação de login
@login_bp.route('/login', methods=['POST'])
def login():
    conn = get_connection()
    if not conn:
        return jsonify({"error": "Falha na conexão com o banco de dados"}), 500

    try:
        data = request.json
        username = data.get('username')
        senha = data.get('senha')

        if not username or not senha:
            return jsonify({"error": "Usuário e senha são obrigatórios"}), 400  

        cursor = conn.cursor()
        cursor.execute("SELECT id, usuario, nome, senha, isAdmin FROM usuarios WHERE usuario = %s", (username,))
        user = cursor.fetchone()

        if user:
            user_id, usuario, display_name, hashed_password, is_admin = user
            sha256_hashed_password = hashlib.sha256(senha.encode('utf-8')).hexdigest()

            if sha256_hashed_password == hashed_password:
                return jsonify({
                    "success": True,
                    "message": "Login realizado com sucesso",
                    "id": user_id, 
                    "usuario": usuario, 
                    "nome_completo": display_name,
                    "tipo": "admin" if is_admin else "membro"
                }), 200
            else:
                return jsonify({"error": "Usuário ou senha incorretos"}), 401
        else:
            return jsonify({"error": "Usuário ou senha incorretos"}), 401
    except Exception as e:
        conn.rollback()
        print(f"Erro durante o login: {e}") 
        return jsonify({"error": "Ocorreu um erro durante o login"}), 500
    finally:
        close_connection(conn)