const htmlToPdf = async ({ pdfUrl, fileName }) => {
    return new Promise((resolve, reject) => {
        fetch(pdfUrl)
            .then(response => response.text())
            .then(htmlContent => {
                const element = document.createElement('div');
                element.innerHTML = htmlContent;

                const opt = {
                    filename: fileName || 'document.pdf',
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                };

                html2pdf().from(element).set(opt).outputPdf('datauristring').then(pdfUrl => {
                    resolve(pdfUrl);
                }).catch(error => {
                    reject(error);
                });
            });
    });
};

export default htmlToPdf;
