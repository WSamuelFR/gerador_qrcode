document.addEventListener('DOMContentLoaded', () => {
  // Inicializa os ícones do Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Verifica se o acesso está sendo feito abrindo o arquivo localmente
  if (window.location.protocol === 'file:') {
    const warningBanner = document.getElementById('protocolWarning');
    if (warningBanner) {
      warningBanner.classList.remove('hidden');
    }
  }

  const qrCodeForm = document.getElementById('qrCodeForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');
  
  const resultContainer = document.getElementById('resultContainer');
  const qrCodeImage = document.getElementById('qrCodeImage');
  const downloadBtn = document.getElementById('downloadBtn');
  const linkInput = document.getElementById('link');

  let currentBlobUrl = null;

  function generateQRCode(event) {
    event.preventDefault();
    
    const link = linkInput.value.trim();
    if (!link) {
      alert('Por favor, insira um link válido.');
      return;
    }

    // Ativa estado de carregamento
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-flex';
    
    fetch('/generate_qr_code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ link: link })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Falha ao gerar o QR Code no servidor.');
      }
      return response.blob();
    })
    .then(blob => {
      // Evita vazamento de memória revogando a URL anterior
      if (currentBlobUrl) {
        URL.revokeObjectURL(currentBlobUrl);
      }

      currentBlobUrl = URL.createObjectURL(blob);
      qrCodeImage.src = currentBlobUrl;

      // Exibe o container com animação
      resultContainer.classList.remove('hidden');
      setTimeout(() => {
        resultContainer.classList.add('show');
        // Rola suavemente até o resultado em telas menores
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    })
    .catch(error => {
      console.error('Erro ao gerar o QR Code:', error);
      alert('Ocorreu um erro ao gerar o seu QR Code. Por favor, tente novamente.');
    })
    .finally(() => {
      // Restaura o estado original do botão
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoader.style.display = 'none';
    });
  }

  // Evento de Download do QR Code
  downloadBtn.addEventListener('click', () => {
    if (!currentBlobUrl) return;

    const downloadLink = document.createElement('a');
    downloadLink.href = currentBlobUrl;
    
    // Nome do arquivo baseado no domínio do link inserido, se possível
    let filename = 'qrcode.png';
    try {
      const urlObj = new URL(linkInput.value);
      const host = urlObj.hostname.replace('www.', '').split('.')[0];
      if (host) {
        filename = `qrcode-${host}.png`;
      }
    } catch (e) {
      // Se não for uma URL válida completa, usa o nome padrão
    }
    
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  });

  qrCodeForm.addEventListener('submit', generateQRCode);
});