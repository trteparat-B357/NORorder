import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { Bindings } from './types';
import { api } from './routes/api';
import { renderCustomerPage } from './views/customer';
import { renderTrackingPage } from './views/tracking';
import { renderDashboardPage } from './views/dashboard';

const app = new Hono<{ Bindings: Bindings }>();

// Middleware
app.use('*', logger());
app.use('/api/*', cors());

// Mount API routes
app.route('/api', api);

// 1. Customer Storefront (Order placement)
app.get('/', (c) => {
  return c.html(renderCustomerPage());
});

// 2. Customer Real-time Order Tracking
app.get('/order/:code', (c) => {
  const code = c.req.param('code');
  return c.html(renderTrackingPage(code));
});

// 3. Barista & Store Owner Live Dashboard
app.get('/dashboard', (c) => {
  return c.html(renderDashboardPage());
});

// 404 Fallback
app.notFound((c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="th">
    <head>
      <meta charset="UTF-8">
      <title>404 ไม่พบหน้านี้</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-stone-50 flex items-center justify-center min-h-screen font-sans text-center p-4">
      <div>
        <h1 class="text-6xl font-black text-amber-700">404</h1>
        <p class="text-lg text-stone-600 mt-2">ไม่พบหน้าที่คุณต้องการ</p>
        <a href="/" class="mt-4 inline-block bg-amber-700 text-white px-5 py-2.5 rounded-xl font-medium">กลับหน้าหลัก</a>
      </div>
    </body>
    </html>
  `, 404);
});

export default app;
