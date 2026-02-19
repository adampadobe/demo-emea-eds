/* eslint-disable no-restricted-globals */
// Minimal service worker for web push. Journey Optimizer sends to this origin.

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || data.subject || 'Notification';
  const options = {
    body: data.body || data.message || '',
    icon: data.icon || '/favicon.ico',
    tag: data.tag || 'default',
    data: data.url ? { url: data.url } : {},
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url;
  if (url) {
    event.waitUntil(clients.openWindow(url));
  }
});
