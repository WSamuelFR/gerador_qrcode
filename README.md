# 📱 Gerador de QR Code Premium

Um gerador de QR Code moderno, rápido e elegante, construído com **Python (Flask)** no backend e uma interface responsiva **Dark Glassmorphism** no frontend. A aplicação converte links fornecidos pelo usuário em imagens de QR Code instantaneamente, com opção de download local.

---

## ✨ Principais Funcionalidades

* **Design Premium (Glassmorphic):** Visual moderno e atraente com modo escuro, efeitos de vidro fosco, sombras profundas e degradês vibrantes.
* **Animações de Fundo Dinâmicas:** Efeito flutuante de luzes neon no fundo da página, criando uma experiência interativa refinada.
* **Processamento 100% em Memória:** O backend não salva arquivos físicos temporários no servidor. Toda a geração e envio do QR Code é processada na memória do sistema (`io.BytesIO`), garantindo alta performance e segurança.
* **Download Inteligente:** Botão integrado para baixar a imagem gerada em formato PNG. O arquivo é nomeado automaticamente com base no domínio do link inserido (ex: `qrcode-google.png`).
* **Proteção contra Acesso Local (CORS):** Um detector de protocolo inteligente avisa o usuário caso ele abra o arquivo HTML diretamente no navegador (via protocolo `file://`), orientando-o a acessar pelo servidor local para evitar erros de restrição de segurança.

---

## 🛠️ Tecnologias Utilizadas

### Backend
* **Python 3**
* **Flask** (Servidor web e rotas)
* **qrcode** & **Pillow** (Geração da imagem do QR Code)

### Frontend
* **HTML5** & **CSS3** (Estilização vanilla personalizada)
* **JavaScript** (AJAX, controle do DOM e downloads)
* **Lucide Icons** (Ícones modernos baseados em vetores)
* **Google Fonts (Outfit)** (Tipografia contemporânea)

---

## 📁 Estrutura de Diretórios

```text
gerador_qrcode/
├── src/
│   ├── app/
│   │   ├── controller/
│   │   │   └── controller.py   # Inicialização do Flask, rotas e lógica de arquivos estáticos
│   │   └── model/
│   │       └── model.py        # Wrapper de negócio para geração do QR Code usando 'qrcode'
│   └── public/
│       ├── assets/
│       │   ├── css/
│       │   │   └── style.css   # Definição do design system (Glassmorphism e animações)
│       │   └── js/
│       │       └── ponte.js    # Controle de requisições, download local e validação
│       └── index.html          # Página principal da aplicação
├── venv/                       # Ambiente virtual Python
├── LICENSE                     # Licença do projeto
└── README.md                   # Documentação do projeto
```

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* Ter o **Python 3.x** instalado em sua máquina.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/WSuelFR/gerador_qrcode.git
   cd gerador_qrcode
   ```

2. **Ative o ambiente virtual (`venv`):**
   * **No Windows (PowerShell):**
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   * **No Windows (Prompt de Comando):**
     ```cmd
     .\venv\Scripts\activate.bat
     ```
   * **No Linux / macOS:**
     ```bash
     source venv/bin/activate
     ```

3. **Instale as dependências (caso não estejam configuradas):**
   ```bash
   pip install Flask qrcode pillow flask-cors
   ```

4. **Inicie o servidor Flask:**
   ```bash
   python -m src.app.controller.controller
   ```

5. **Acesse a aplicação:**
   Abra o seu navegador de preferência e entre no endereço:
   👉 **[http://127.0.0.1:5000](http://127.0.0.1:5000)**

---

## 📄 Licença

Este projeto está licenciado sob os termos da licença MIT. Veja o arquivo [LICENSE](file:///d:/Meu_conteudo/gerador_qrcode/LICENSE) para mais detalhes.
