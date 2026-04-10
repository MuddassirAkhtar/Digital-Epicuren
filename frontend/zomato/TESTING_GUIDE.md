# Responsive & PWA Testing Guide

## 📐 Responsive Design Testing

### Device Breakpoints to Test
| Device | Resolution | Breakpoint | Browser |
|--------|-----------|-----------|---------|
| iPhone SE | 375 x 667 | xs/sm | Safari |
| iPhone 12 | 390 x 844 | sm | Safari |
| iPhone 13 Pro | 390 x 844 | sm | Safari |
| iPhone 14 Pro Max | 430 x 932 | sm | Safari |
| Galaxy S21 | 360 x 800 | xs | Chrome |
| Galaxy S22 Ultra | 440 x 900 | sm | Chrome |
| iPad (10.2") | 810 x 1080 | md | Safari |
| iPad Pro (12.9") | 1024 x 1366 | lg | Safari |
| Desktop | 1920 x 1080 | xl/2xl | Chrome/Firefox |

### Testing Checklist

#### Mobile (xs - 640px)
- [ ] Text is readable without zooming
- [ ] Touch targets are minimum 44x44px
- [ ] Form inputs are easily tappable
- [ ] No horizontal scrolling (except for certain content)
- [ ] Safe area padding respected on notch devices
- [ ] Buttons don't overlap text
- [ ] Logo and branding visible
- [ ] Social buttons stack vertically on extra small screens

#### Tablet (sm - md: 640px - 1024px)
- [ ] Layout adapts to landscape orientation
- [ ] Touch targets remain adequate
- [ ] Two-column layouts work if appropriate
- [ ] Images scale correctly
- [ ] Form fields are grouped logically
- [ ] Spacing is appropriate for larger screen

#### Desktop (lg+: 1024px+)
- [ ] Content width is constrained (max-width)
- [ ] Hover states work properly
- [ ] Mouse cursor changes appropriately
- [ ] Layout is balanced for wide screens
- [ ] No excessive white space

### Testing Tools
```bash
# Chrome DevTools
- Open DevTools (F12)
- Click Device Toolbar (Ctrl+Shift+M)
- Select specific devices from dropdown
- Test touch emulation

# Firefox DevTools
- Open DevTools (F12)
- Click Responsive Design Mode (Ctrl+Shift+M)
- Test different screen sizes

# Online Tools
- Responsively App: responsively.app
- BrowserStack: browserstack.com
- LambdaTest: lambdatest.com
```

## 📱 PWA Testing

### Installation Testing
#### Mobile (iOS)
```
1. Open in Safari
2. Tap Share button
3. Select "Add to Home Screen"
4. App should launch fullscreen (standalone mode)
5. No browser UI visible
```

#### Mobile (Android)
```
1. Open in Chrome
2. Tap menu (three dots)
3. Select "Install app" or "Add to Home Screen"
4. App should appear on home screen
5. Launch fullscreen without browser UI
```

#### Desktop (Windows)
```
1. Open in Edge or Chrome
2. Click install icon in address bar
3. App should install to Start Menu
4. Launch in app window (not browser)
```

### Offline Functionality
```
1. Load app while online
2. Go to DevTools > Network
3. Set throttling to "Offline"
4. Refresh or navigate
5. App should load cached content
6. Display offline indicator (implement)
7. Queue actions for sync (implement)
```

### Service Worker Debugging
```
1. Open DevTools
2. Go to Application > Service Workers
3. Verify SW is registered and active
4. Check status: "activated and running"
5. View SW source code
6. Trigger unregister to test reset
```

### Cache Storage
```
1. DevTools > Application > Cache Storage
2. Expand "digital-epicurean-vX" cache
3. Verify cached URLs are present
4. Check if assets load from cache
5. Monitor cache size growth
```

### Manifest Verification
```
1. DevTools > Application > Manifest
2. Verify all required fields:
   - name
   - short_name
   - icon (at least 192x192, 512x512)
   - display: "standalone"
   - start_url: "/"
   - theme_color
   - background_color
3. Test web app install banners
4. Verify shortcuts work
```

## 🎨 Visual Regression Testing

### Browser Consistency
Test on:
- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+ (macOS)
- [ ] Safari on iOS
- [ ] Edge 90+
- [ ] Samsung Internet

### Visual Elements
- [ ] Colors match brand guidelines
- [ ] Spacing is consistent with 4px grid
- [ ] Typography renders correctly
- [ ] Icons display properly
- [ ] Gradients appear smooth
- [ ] Shadows have proper depth

### Testing Tools
```bash
# Visual Regression
- Chromatic: chromatic.com
- Percy: percy.io
- BackstopJS: garris.github.io/BackstopJS/
```

## ♿ Accessibility Testing

### Keyboard Navigation
```
1. Tab through form fields
2. Enter to submit forms
3. Escape to close modals
4. Arrow keys for menus
5. All interactive elements accessible
```

### Screen Reader Testing
```
1. Windows: NVDA (free)
2. macOS: VoiceOver (built-in)
3. iOS: VoiceOver (built-in)
4. Android: TalkBack (built-in)

Test:
- Form labels read correctly
- Button purpose is clear
- Error messages announce
- Navigation structure logical
```

### Color Contrast
```
All text must meet WCAG AA standards:
- Normal text: 4.5:1 ratio
- Large text (18pt+): 3:1 ratio

Use tools:
- WebAIM Contrast Checker: webaim.org/resources/contrastchecker/
- DevTools: Lighthouse audit
```

### Focus Management
- [ ] Focus indicators visible
- [ ] Focus order is logical
- [ ] No keyboard traps
- [ ] Skip links present (if needed)
- [ ] Modal focus trapped (when open)

## 🚀 Performance Testing

### Lighthouse Audit
```
1. DevTools > Lighthouse
2. Click "Analyze page load"
3. Check scores:
   - Performance: 90+
   - Accessibility: 90+
   - Best Practices: 90+
   - PWA: 90+
   - SEO: 90+
```

### Load Time Testing
```
Target metrics:
- FCP (First Contentful Paint): < 1.8s
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1
- FID (First Input Delay): < 100ms
```

### Testing Tools
```bash
# Google PageSpeed Insights
- pagespeed.web.dev

# WebPageTest
- webpagetest.org

# GTmetrix
- gtmetrix.com

# Chrome DevTools
- Performance tab
- Network tab with throttling
```

## 🔍 Cross-Browser Testing

### Manual Testing Checklist
```
❏ Chrome - macOS
❏ Chrome - Windows
❏ Chrome - Linux
❏ Firefox - macOS
❏ Firefox - Windows
❏ Firefox - Linux
❏ Safari - macOS
❏ Safari - iOS
❏ Edge - Windows
❏ Samsung Internet - Android
```

### Test Scenarios
1. **Login Page**
   - Form submission
   - Validation errors
   - Show/hide password
   - Social login buttons
   - Link navigation

2. **Register Page**
   - All form fields
   - User type selection
   - Password confirmation
   - Terms acceptance
   - Social signup

3. **Navigation**
   - All links work
   - No 404 errors
   - Back button behavior
   - PWA shortcuts work

## 📋 Pre-Release Checklist

### Before Production Deploy
- [ ] All responsive breakpoints tested
- [ ] Mobile performance audit passed (90+)
- [ ] PWA installable on iOS and Android
- [ ] Offline functionality works
- [ ] Accessibility audit passed (90+)
- [ ] No console errors
- [ ] Service worker caching verified
- [ ] Manifest validates
- [ ] Dynamic content loads correctly
- [ ] Forms submit properly
- [ ] Error states handled
- [ ] Loading states display
- [ ] Touch interactions work
- [ ] Safe areas respected
- [ ] Browser compatibility verified

## 🐛 Common Issues & Solutions

### Issue: Page zooms on input focus (iOS)
**Solution**: Input font-size must be ≥16px

### Issue: Responsive layout breaks at certain sizes
**Solution**: Check Tailwind breakpoints, test with actual device

### Issue: Touch targets too small
**Solution**: Ensure min-h-[44px] min-w-[44px] on buttons

### Issue: Safe area not respected
**Solution**: Verify viewport-fit=cover in meta tag

### Issue: Service worker not updating
**Solution**: Hard refresh (Ctrl+Shift+R), clear cache, unregister SW

### Issue: PWA won't install
**Solution**: Check manifest validity, ensure HTTPS, verify icons

## 📊 Testing Automation

### Automated Tests Setup
```bash
# Run automated tests
npm run test

# Visual regression testing
npm run test:visual

# Performance testing
npm run test:perf

# Accessibility testing
npm run test:a11y
```

## 📞 Support Resources

- [Web.dev PWA Testing](https://web.dev/pwa-checklist/)
- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Tailwind Responsive](https://tailwindcss.com/docs/responsive-design)
- [WCAG Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated**: April 2026
**Version**: 1.0.0
