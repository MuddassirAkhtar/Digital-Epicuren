#!/usr/bin/env python3
"""
Convert CODEBASE_DOCUMENTATION.html to PDF using weasyprint
"""

try:
    from weasyprint import HTML, CSS
    import os
    
    html_file = 'CODEBASE_DOCUMENTATION.html'
    pdf_file = 'CODEBASE_DOCUMENTATION.pdf'
    
    if not os.path.exists(html_file):
        print(f"❌ Error: {html_file} not found")
        exit(1)
    
    print(f"📄 Converting {html_file} to PDF...")
    
    # Convert HTML to PDF
    HTML(html_file).write_pdf(pdf_file)
    
    print(f"✅ PDF generated successfully: {pdf_file}")
    print(f"📊 File size: {os.path.getsize(pdf_file) / 1024:.2f} KB")
    
except ImportError:
    print("⚠️ weasyprint not installed. Attempting to install...")
    import subprocess
    subprocess.check_call(['pip', 'install', 'weasyprint'])
    print("🔄 Please run this script again")
    
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)
