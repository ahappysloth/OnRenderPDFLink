<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML to PDF</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    function getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    function loadPdfContent() {
      const pdfContent = getUrlParameter('PDF');
      if (pdfContent) {
        document.getElementById('content').innerHTML = pdfContent;
        setTimeout(function () {
          window.print();
        }, 500); // 1000 milliseconds = 1 second
      }
    }
  </script>
</head>

<body onload="loadPdfContent()">
  <div id="content"></div>
</body>

</html>
