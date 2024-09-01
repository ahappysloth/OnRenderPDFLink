window.function = function() {
  const customCSS = `
    body {
      margin: 0!important;
    }
  
    button#download {
      position: fixed;
      z-index: 10;
      border-radius: 0.5rem;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.5rem;
      color: #0d0d0d;
      border: none;
      font-family: 'Inter', sans-serif;
      padding: 0px 12px;
      height: 32px;
      background: #ffffff;
      top: 8px;
      right: 8px;
      box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 1px 2.5px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  
    button#download:hover {
      background: #f5f5f5;
      box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.06), 0 6px 12px -3px rgba(0, 0, 0, 0.1);
    }
  
    button#download.downloading {
      color: #ea580c;
    }
  
    button#download.done {
      color: #16a34a;
    }
  
    ::-webkit-scrollbar {
      width: 5px;
      background-color: rgb(0 0 0 / 8%);
    }
  
    ::-webkit-scrollbar-thumb {
      background-color: rgb(0 0 0 / 32%);
      border-radius: 4px;
    }
  `;

  // Function to get URL parameter
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Function to load PDF content
  function loadPdfContent() {
    const pdfContent = getUrlParameter('PDF');
    if (pdfContent) {
      document.getElementById('content').innerHTML = pdfContent;
      document.getElementById('download').addEventListener('click', function() {
        const element = document.getElementById('content');
        const button = this;
        button.innerText = 'Downloading...';
        button.className = 'downloading';
    
        const opt = {
          margin: 0,
          filename: 'file.pdf',
          html2canvas: {
            useCORS: true,
            scale: 1.5
          },
          jsPDF: {
            unit: 'px',
            orientation: 'portrait',
            format: [1240, 1754],
            hotfixes: ['px_scaling']
          }
        };
    
        html2pdf().set(opt).from(element).toPdf().get('pdf').then(function(pdf) {
          button.innerText = 'Done 🎉';
          button.className = 'done';
          setTimeout(function() { 
            button.innerText = 'Download';
            button.className = ''; 
          }, 2000);
        }).save();
      });
    }
  }

  // Load PDF content when the window loads
  window.onload = loadPdfContent;
};
