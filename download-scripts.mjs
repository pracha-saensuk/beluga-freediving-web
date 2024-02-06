
    import fetch from 'node-fetch';
    import { promises as fs } from 'fs';
    import { dirname, join } from 'path';
    import { fileURLToPath } from 'url';
    
    const __dirname = dirname(fileURLToPath(import.meta.url));
    
    function getFileNameFromUrl(url) {
      const urlObject = new URL(url);
      const pathname = urlObject.pathname;
      return pathname.split('/').pop(); // Gets the last segment from the pathname
    }
    
    function downloadScript(downloadUrl){
      const fileName = getFileNameFromUrl(downloadUrl);
      const outputPath = join(__dirname, 'public', fileName); // Adjust the path as needed
      fetch(downloadUrl)
        .then(res => res.text())
        .then(async (jsContent) => {
            await fs.writeFile(outputPath, jsContent);
            console.log(`File downloaded and saved to ${outputPath}`);
        })
        .catch(err => console.error(err));

    }
    // downloadScript('https://connect.facebook.net/en_US/fbevents.js');
    // downloadScript('https://analytics.tiktok.com/i18n/pixel/events.js')
