from flask import Flask, request, send_file 

# Existing code remains unchanged
from src.app.model.model import QRCodeGenerator

app = Flask(__name__)

@app.route('/generate_qr_code', methods=['POST'])
def generate_qr_code():
    data = request.json
    link = data.get('link')

    if not link:
        return {'error': 'Link is required'}, 400

    qr_code_image = QRCodeGenerator.generate_qr_code(link)
    
    # Save the image to a temporary file and send it back as a response
    temp_file_path = "temp_qrcode.png"
    qr_code_image.save(temp_file_path)

    return send_file(temp_file_path, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)