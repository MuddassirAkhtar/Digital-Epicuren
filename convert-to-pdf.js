const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Read HTML file
    const htmlPath = 'file://' + path.resolve(__dirname, 'CODEBASE_DOCUMENTATION.html');
    
    await page.goto(htmlPath, { waitUntil: 'networkidle2' });
    
    // Generate PDF
    await page.pdf({
      path: 'CODEBASE_DOCUMENTATION.pdf',
      format: 'A4',
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      },
      printBackground: true,
      preferCSSPageSize: true
    });
    
    console.log('✅ PDF generated successfully: CODEBASE_DOCUMENTATION.pdf');
    await browser.close();
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    process.exit(1);
  }
})();
