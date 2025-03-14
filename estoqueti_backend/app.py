from imports import *

app = Flask(__name__)
CORS(app)

@app.before_request
def validate_origin():
    # Validação de origem para todas as outras requisições
    origin = request.headers.get("Origin")
    if origin not in ALLOWED_ORIGINS:
        abort(403)  # Bloqueia requisições de origens não permitidas

# Registrar Blueprints após a criação do app
for blueprint in blueprints:
    app.register_blueprint(blueprint, url_prefix='/api')

# Rota para servir arquivos de imagem
@app.route('/uploads/<path:filename>')
def upload_file(filename):
    return send_from_directory(os.path.join(app.root_path, 'uploads'), filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)