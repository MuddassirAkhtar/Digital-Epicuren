// Service Worker for Digital Epicurean PWA
const CACHE_NAME = 'digital-epicurean-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg'
]

// Installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
      })
      .catch(err => console.log('Cache installation failed:', err))
  )
  self.skipWaiting()
})

// Activation
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch Event - Network First Strategy for API, Cache First for assets
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Skip Cross-Origin Requests
  if (url.origin !== location.origin) {
    return
  }

  // API calls - Network first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone and cache successful responses
          if (response && response.status === 200) {
            const responseClone = response.clone()
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseClone)
            })
          }
          return response
        })
        .catch(() => {
          // Return cached response if network fails
          return caches.match(request)
        })
    )
    return
  }

  // Assets - Cache first
  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          return response
        }
        return fetch(request)
          .then(response => {
            if (!response || response.status !== 200 || response.type === 'error') {
              return response
            }
            const responseClone = response.clone()
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseClone)
            })
            return response
          })
      })
      .catch(() => {
        // Return offline page if available
        return caches.match('/')
      })
  )
})

// Push Notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from Digital Epicurean',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    tag: 'notification',
    requireInteraction: false
  }

  event.waitUntil(
    self.registration.showNotification('Digital Epicurean', options)
  )
})

// Notification Click
self.addEventListener('notificationclick', event => {
  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i]
        if (client.url === '/' && 'focus' in client) {
          return client.focus()
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/')
      }
    })
  )
})

// Background Sync for Offline Actions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-orders') {
    event.waitUntil(syncOrders())
  }
})

async function syncOrders() {
  try {
    // Sync logic will go here
    console.log('Syncing orders...')
  } catch (error) {
    console.error('Sync failed:', error)
  }
}
