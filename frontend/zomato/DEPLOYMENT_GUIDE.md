# PWA Deployment Guide

## 🚀 Pre-Deployment Checklist

### Code Quality
- [ ] All files linted (`npm run lint`)
- [ ] No console errors or warnings
- [ ] No hardcoded development URLs
- [ ] Environment variables configured
- [ ] API endpoints updated for production
- [ ] Service worker properly caching

### PWA Requirements
- [ ] Manifest.json is valid
- [ ] Icon files exist (192x192, 512x512)
- [ ] App works offline
- [ ] Service worker registered
- [ ] HTTPS enabled
- [ ] Redirects to HTTPS
- [ ] manifest.json accessible
- [ ] Icons accessible

### Performance
- [ ] Lighthouse score ≥ 90 (all categories)
- [ ] FCP < 1.8s
- [ ] LCP < 2.5s
- [ ] Build size reasonable
- [ ] Images optimized
- [ ] Code splitting implemented

### Accessibility
- [ ] WCAG AA compliance
- [ ] Keyboard navigation works
- [ ] Color contrast verified
- [ ] Screen reader tested
- [ ] Focus indicators visible

## 🏗️ Build Configuration

### Vite Build Optimization
```bash
# Production build
npm run build

# Check build output
npm run preview
```

### Vite Config for PWA
```javascript
// vite.config.js already includes:
// - @vitejs/plugin-react for React optimization
// - Proper code splitting
// - Asset optimization
// - Service worker integration ready
```

## 🌐 Server Configuration

### HTTP Headers

#### Essential Headers for PWA
```
# Enable HTTPS
Strict-Transport-Security: max-age=31536000; includeSubDomains

# Cache Control - Long cache for versioned assets
Cache-Control: public, max-age=31536000, immutable
(for .js, .css files with hashes)

# Cache Control - No cache for HTML/manifest
Cache-Control: public, max-age=0, must-revalidate
(for index.html, manifest.json)

# Service Worker - No cache
Cache-Control: no-cache, no-store, must-revalidate
(for sw.js)

# Content Security Policy
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:

# MIME Types
Content-Type: application/json (for manifest.json)
```

### Nginx Configuration Example
```nginx
server {
    listen 443 ssl http2;
    server_name epicurean.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    root /var/www/html;
    index index.html;

    # Service Worker - No cache
    location = /sw.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Content-Type "application/javascript";
    }

    # Manifest - No cache
    location = /manifest.json {
        add_header Cache-Control "public, max-age=0, must-revalidate";
        add_header Content-Type "application/json";
    }

    # Index.html - No cache
    location = /index.html {
        add_header Cache-Control "public, max-age=0, must-revalidate";
    }

    # Assets with hash (can cache long-term)
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        expires 1y;
    }

    # SPA fallback - route to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Redirect HTTP to HTTPS
    error_page 497 https://$server_name$request_uri;
}

server {
    listen 80;
    server_name epicurean.com;
    return 301 https://$server_name$request_uri;
}
```

### Apache Configuration Example
```apache
<VirtualHost *:443>
    ServerName epicurean.com
    
    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/key.pem

    DocumentRoot /var/www/html

    <Directory /var/www/html>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    # Service Worker - No cache
    <Files "sw.js">
        Header set Cache-Control "no-cache, no-store, must-revalidate"
    </Files>

    # Manifest - No cache
    <Files "manifest.json">
        Header set Cache-Control "public, max-age=0, must-revalidate"
    </Files>

    # Index.html - No cache
    <Files "index.html">
        Header set Cache-Control "public, max-age=0, must-revalidate"
    </Files>

    # Assets with hash (long cache)
    <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>

    # HTTPS redirect
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</VirtualHost>

<VirtualHost *:80>
    ServerName epicurean.com
    Redirect / https://epicurean.com/
</VirtualHost>
```

## 📊 Production Environment Setup

### Domain & SSL
```bash
# Get SSL certificate using Let's Encrypt
certbot certonly --webroot -w /var/www/html -d epicurean.com

# Auto-renew
certbot renew --quiet && systemctl reload nginx
```

### CDN Integration
```javascript
// Update API and asset URLs in environment
// .env.production
VITE_API_URL=https://api.epicurean.com
VITE_ASSET_URL=https://cdn.epicurean.com
```

### Environment Variables
```bash
# Create .env.production
VITE_API_URL=https://api.epicurean.com
VITE_APP_NAME=Digital Epicurean
VITE_ANALYTICS_ID=UA-123456789-1
VITE_LOG_LEVEL=error
```

## 🔐 Security Checklist

### HTTPS/SSL
- [ ] SSL certificate valid and non-expired
- [ ] Redirect HTTP → HTTPS
- [ ] HSTS header set (min 1 year)
- [ ] TLS 1.2+ only

### Content Security
- [ ] CSP header configured
- [ ] No inline scripts
- [ ] No eval() or similar
- [ ] External scripts whitelisted
- [ ] Form submission validation

### Service Worker Security
- [ ] SW served over HTTPS
- [ ] SW validates API responses
- [ ] No credentials leaked in cache
- [ ] Sensitive data not cached

### Authentication
- [ ] Tokens stored securely
- [ ] CSRF protection enabled
- [ ] Rate limiting configured
- [ ] Input validation enforced

## 📈 Monitoring & Analytics

### Setup Analytics
```javascript
// src/utils/analytics.js
export const trackEvent = (category, action, label) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label
    })
  }
}
```

### Error Tracking
```javascript
// Implement error tracking
// Send errors to Sentry, LogRocket, etc.
```

### Performance Monitoring
```javascript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

## 🧪 Production Testing

### Monitor Deployment
```bash
# Test HTTPS
curl -I https://epicurean.com

# Check manifest
curl https://epicurean.com/manifest.json

# Check service worker
curl https://epicurean.com/sw.js

# Check security headers
curl -I https://epicurean.com | grep -i "security\|cache\|strict"
```

### Lighthouse Audit
```bash
# Run lighthouse in CI/CD
lighthouse https://epicurean.com --chrome-flags="--headless" --output=json
```

### Real User Monitoring
```javascript
// Monitor actual performance
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log(entry.name, entry.duration)
    }
  })
  observer.observe({ entryTypes: ['navigation', 'resource'] })
}
```

## 📦 Deployment Commands

### Local Build Testing
```bash
# Clean build
rm -rf dist/

# Build for production
npm run build

# Preview production build locally
npm run preview

# Check file sizes
du -sh dist/
find dist -type f -exec du -b {} + | sort -rn | head -20
```

### CI/CD Deployment
```bash
#!/bin/bash

# Install dependencies
npm ci

# Run linting
npm run lint

# Run tests
npm run test

# Build
npm run build

# Deploy to server
rsync -av dist/ user@server:/var/www/html/
```

## 🚨 Rollback Procedure

### If Deployment Fails
```bash
# Restore previous version
git revert HEAD
npm run build
rsync -av dist/ user@server:/var/www/html/

# Clear cache
curl -X PURGE https://epicurean.com/*
```

### Service Worker Issues
```javascript
// In Service Worker unregister script
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(reg => reg.unregister())
  })
}
```

## 📱 App Store Submission

### PWA App Store
- **PWA Builder**: pwabuilder.com (Windows, iOS, Android)
- **Google Play Store**: Requires native wrapper
- **Apple App Store**: Requires native wrapper

### Metadata Required
- App icon (512x512)
- Screenshots (mobile & tablet)
- App description
- Privacy policy
- Terms of service
- Contact email
- Website URL

## 📚 Deployment Checklist

- [ ] Build passes all tests
- [ ] Lighthouse audit ≥90
- [ ] No console errors
- [ ] SSL certificate valid
- [ ] DNS configured
- [ ] HTTPS redirect enabled
- [ ] Cache headers configured
- [ ] Service worker updating
- [ ] Manifest accessible
- [ ] Offline functionality works
- [ ] Analytics configured
- [ ] Error tracking enabled
- [ ] Database migrations applied
- [ ] Environment variables set
- [ ] Backups created
- [ ] Team notified

## 🔗 Useful Resources

- [Web.dev Deployment](https://web.dev/progressive-web-apps/)
- [MDN Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [OWASP Security](https://owasp.org/www-project-web-security-testing-guide/)
- [Let's Encrypt](https://letsencrypt.org/)
- [PWA Builder](https://www.pwabuilder.com/)

---

**Last Updated**: April 2026
**Version**: 1.0.0
**Deployment Ready**: ✅
