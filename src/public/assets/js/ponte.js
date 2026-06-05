const qrCodeForm = document.getElementById('qrCodeForm');
const qrCodeImage = document.getElementById('qrCodeImage');

function generateQRCode() {
  const link = document.querySelector('#link').value;
  
  if (!link) {
    alert('Por favor, insira um link.');
    return;
  }

  fetch('/generate_qr_code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ link: link })
  })
  .then(response => response.blob())
  .then(blob => {
    const imageUrl = URL.createObjectURL(blob);
    qrCodeImage.src = imageUrl;
  })
  .catch(error => {
    console.error('Erro ao gerar o QR code:', error);
    alert('Erro ao gerar o QR code.');
  });
}
qrCodeForm.addEventListener('submit', generateQRCode);