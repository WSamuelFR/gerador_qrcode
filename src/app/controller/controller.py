import io
import os
from flask import Flask, request, send_file, send_from_directory
from src.app.model.model import QRCodeGenerator

# Configura o caminho absoluto para a pasta 'public'
current_dir = os.path.dirname(os.path.abspath(__file__))
src_dir = os.path.dirname(os.path.dirname(current_dir))
public_dir = os.path.join(src_dir, 'public')

app = Flask(__name__, static_folder=public_dir, static_url_path='')

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/generate_qr_code', methods=['POST'])
def generate_qr_code():
    data = request.json
    link = data.get('link')

    if not link:
        return {'error': 'Link is required'}, 400

    # Gera a imagem do QR Code
    qr_code_image = QRCodeGenerator.generate_qr_code(link)
    
    # Salva a imagem em um buffer de memória (BytesIO)
    img_io = io.BytesIO()
    qr_code_image.save(img_io, 'PNG')
    img_io.seek(0)

    return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)