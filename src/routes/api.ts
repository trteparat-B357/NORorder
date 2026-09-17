import { Hono } from 'hono';
import { Bindings, CreateOrderPayload, MenuItem, Order, OrderItem, OrderStatus } from '../types';

export const api = new Hono<{ Bindings: Bindings }>();

// Helper function to generate an order code (e.g. A104, A105)
async function generateOrderCode(db: D1Database): Promise<string> {
  const todayPrefix = String.fromCharCode(65 + (new Date().getDate() % 26)); // A-Z cycling by day
  const result = await db
    .prepare("SELECT id FROM orders ORDER BY id DESC LIMIT 1")
    .first<{ id: number }>();
  
  const nextId = (result?.id || 0) + 1;
  const numSuffix = (100 + (nextId % 900)).toString(); // 100 - 999
  return `${todayPrefix}${numSuffix}`;
}

// 1. GET /api/menu - Get all categories and menu items
api.get('/menu', async (c) => {
  try {
    const categories = await c.env.DB
      .prepare('SELECT * FROM categories ORDER BY sort_order ASC')
      .all();

    const items = await c.env.DB
      .prepare(`
        SELECT m.*, c.name as category_name 
        FROM menu_items m 
        LEFT JOIN categories c ON m.category_id = c.id
        ORDER BY c.sort_order ASC, m.id ASC
      `)
      .all();

    return c.json({
      success: true,
      categories: categories.results,
      items: items.results,
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// 2. POST /api/orders - Customer places a new order
api.post('/orders', async (c) => {
  try {
    const body = await c.req.json<CreateOrderPayload>();

    if (!body.customer_name || !body.items || body.items.length === 0) {
      return c.json({ success: false, error: 'กรุณากรอกข้อมูลลูกค้าและเลือกเครื่องดื่มอย่างน้อย 1 รายการ' }, 400);
    }

    // Calculate total amount
    let total = 0;
    for (const item of body.items) {
      total += Number(item.unit_price) * Number(item.quantity);
    }

    const orderCode = await generateOrderCode(c.env.DB);

    // Insert order
    const orderInsert = await c.env.DB
      .prepare(`
        INSERT INTO orders (order_code, customer_name, customer_phone, order_type, table_no, total_amount, status, notes)
        VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)
      `)
      .bind(
        orderCode,
        body.customer_name.trim(),
        body.customer_phone?.trim() || null,
        body.order_type || 'takeaway',
        body.table_no?.trim() || null,
        total,
        body.notes?.trim() || null
      )
      .run();

    const orderId = orderInsert.meta.last_row_id;

    // Batch insert items
    const itemStatements = body.items.map((item) => {
      return c.env.DB
        .prepare(`
          INSERT INTO order_items (order_id, menu_item_id, item_name, quantity, unit_price, temperature, sweetness, ice, toppings, item_notes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)
        .bind(
          orderId,
          item.menu_item_id || null,
          item.item_name,
          item.quantity,
          item.unit_price,
          item.temperature || 'เย็น',
          item.sweetness || '100%',
          item.ice || 'ปกติ',
          item.toppings || null,
          item.item_notes || null
        );
    });

    await c.env.DB.batch(itemStatements);

    return c.json({
      success: true,
      message: 'สร้างออเดอร์เรียบร้อยแล้ว',
      order: {
        id: orderId,
        order_code: orderCode,
        total_amount: total,
        status: 'pending',
      },
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// 3. GET /api/orders/:code - Customer tracks order status
api.get('/orders/:code', async (c) => {
  try {
    const code = c.req.param('code').trim().toUpperCase();

    const order = await c.env.DB
      .prepare('SELECT * FROM orders WHERE UPPER(order_code) = ?')
      .bind(code)
      .first<Order>();

    if (!order) {
      return c.json({ success: false, error: 'ไม่พบหมายเลขออเดอร์นี้' }, 404);
    }

    const items = await c.env.DB
      .prepare('SELECT * FROM order_items WHERE order_id = ?')
      .bind(order.id)
      .all<OrderItem>();

    return c.json({
      success: true,
      order: {
        ...order,
        items: items.results,
      },
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// 4. GET /api/admin/orders - Barista / Owner gets order list with filter
api.get('/admin/orders', async (c) => {
  try {
    const statusFilter = c.req.query('status'); // e.g. 'all', 'active', 'pending', etc.

    let query = 'SELECT * FROM orders';
    const params: any[] = [];

    if (statusFilter && statusFilter !== 'all') {
      if (statusFilter === 'active') {
        query += " WHERE status IN ('pending', 'preparing', 'ready')";
      } else {
        query += ' WHERE status = ?';
        params.push(statusFilter);
      }
    }

    query += ' ORDER BY CASE status WHEN \'pending\' THEN 1 WHEN \'preparing\' THEN 2 WHEN \'ready\' THEN 3 ELSE 4 END, created_at DESC LIMIT 100';

    const ordersResult = await c.env.DB.prepare(query).bind(...params).all<Order>();
    const orders = ordersResult.results;

    if (orders.length > 0) {
      const orderIds = orders.map((o) => o.id);
      // Fetch all items for these orders
      const placeholders = orderIds.map(() => '?').join(',');
      const itemsResult = await c.env.DB
        .prepare(`SELECT * FROM order_items WHERE order_id IN (${placeholders})`)
        .bind(...orderIds)
        .all<OrderItem>();

      const itemsByOrderId: Record<number, OrderItem[]> = {};
      for (const item of itemsResult.results) {
        if (!itemsByOrderId[item.order_id!]) {
          itemsByOrderId[item.order_id!] = [];
        }
        itemsByOrderId[item.order_id!].push(item);
      }

      for (const ord of orders) {
        ord.items = itemsByOrderId[ord.id] || [];
      }
    }

    return c.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// 5. PATCH /api/admin/orders/:id/status - Update order status
api.patch('/admin/orders/:id/status', async (c) => {
  try {
    const orderId = Number(c.req.param('id'));
    const { status } = await c.req.json<{ status: OrderStatus }>();

    const validStatuses: OrderStatus[] = ['pending', 'preparing', 'ready', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return c.json({ success: false, error: 'สถานะไม่ถูกต้อง' }, 400);
    }

    await c.env.DB
      .prepare('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .bind(status, orderId)
      .run();

    return c.json({
      success: true,
      message: `อัปเดตสถานะเป็น ${status} เรียบร้อยแล้ว`,
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// 6. PATCH /api/admin/menu/:id/toggle - Toggle item availability (In stock / Out of stock)
api.patch('/admin/menu/:id/toggle', async (c) => {
  try {
    const id = Number(c.req.param('id'));
    const current = await c.env.DB
      .prepare('SELECT is_available FROM menu_items WHERE id = ?')
      .bind(id)
      .first<{ is_available: number }>();

    if (!current) {
      return c.json({ success: false, error: 'ไม่พบเมนูนี้' }, 404);
    }

    const nextState = current.is_available === 1 ? 0 : 1;
    await c.env.DB
      .prepare('UPDATE menu_items SET is_available = ? WHERE id = ?')
      .bind(nextState, id)
      .run();

    return c.json({
      success: true,
      is_available: nextState,
      message: nextState === 1 ? 'เปิดจำหน่ายเมนูแล้ว' : 'ปิดจำหน่ายเมนูชั่วคราวแล้ว',
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// 7. POST /api/admin/menu - Create a new menu item
api.post('/admin/menu', async (c) => {
  try {
    const body = await c.req.json<{
      category_id: number;
      name: string;
      description?: string;
      price: number;
      image_url?: string;
      is_available?: number;
    }>();

    if (!body.name || body.name.trim() === '') {
      return c.json({ success: false, error: 'กรุณาระบุชื่อเมนู' }, 400);
    }
    if (body.price === undefined || body.price === null || isNaN(Number(body.price)) || Number(body.price) < 0) {
      return c.json({ success: false, error: 'กรุณาระบุราคาที่ถูกต้อง' }, 400);
    }
    if (!body.category_id) {
      return c.json({ success: false, error: 'กรุณาเลือกหมวดหมู่' }, 400);
    }

    const defaultImg = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&auto=format&fit=crop&q=80';
    const imageUrl = body.image_url?.trim() || defaultImg;
    const isAvailable = body.is_available === 0 ? 0 : 1;

    const result = await c.env.DB
      .prepare(`
        INSERT INTO menu_items (category_id, name, description, price, image_url, is_available)
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      .bind(
        body.category_id,
        body.name.trim(),
        body.description?.trim() || '',
        Number(body.price),
        imageUrl,
        isAvailable
      )
      .run();

    return c.json({
      success: true,
      message: 'เพิ่มเมนูใหม่เรียบร้อยแล้ว',
      id: result.meta.last_row_id,
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// 8. PUT /api/admin/menu/:id - Update menu item details and price
api.put('/admin/menu/:id', async (c) => {
  try {
    const id = Number(c.req.param('id'));
    const body = await c.req.json<{
      category_id?: number;
      name?: string;
      description?: string;
      price?: number;
      image_url?: string;
      is_available?: number;
    }>();

    const existing = await c.env.DB
      .prepare('SELECT * FROM menu_items WHERE id = ?')
      .bind(id)
      .first<MenuItem>();

    if (!existing) {
      return c.json({ success: false, error: 'ไม่พบเมนูนี้' }, 404);
    }

    const name = body.name !== undefined ? body.name.trim() : existing.name;
    const price = body.price !== undefined ? Number(body.price) : existing.price;
    const categoryId = body.category_id !== undefined ? Number(body.category_id) : existing.category_id;
    const description = body.description !== undefined ? body.description.trim() : existing.description;
    const imageUrl = body.image_url !== undefined ? body.image_url.trim() : existing.image_url;
    const isAvailable = body.is_available !== undefined ? Number(body.is_available) : existing.is_available;

    if (!name) {
      return c.json({ success: false, error: 'ชื่อเมนูต้องไม่ว่างเปล่า' }, 400);
    }
    if (isNaN(price) || price < 0) {
      return c.json({ success: false, error: 'ราคาต้องเป็นตัวเลขที่ถูกต้อง' }, 400);
    }

    await c.env.DB
      .prepare(`
        UPDATE menu_items 
        SET category_id = ?, name = ?, description = ?, price = ?, image_url = ?, is_available = ?
        WHERE id = ?
      `)
      .bind(categoryId, name, description, price, imageUrl, isAvailable, id)
      .run();

    return c.json({
      success: true,
      message: 'อัปเดตข้อมูลเมนูและราคาเรียบร้อยแล้ว',
      item: {
        id,
        category_id: categoryId,
        name,
        description,
        price,
        image_url: imageUrl,
        is_available: isAvailable,
      },
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// 9. PATCH /api/admin/menu/:id/price - Quick update price only
api.patch('/admin/menu/:id/price', async (c) => {
  try {
    const id = Number(c.req.param('id'));
    const { price } = await c.req.json<{ price: number }>();

    if (price === undefined || isNaN(Number(price)) || Number(price) < 0) {
      return c.json({ success: false, error: 'กรุณาระบุราคาที่ถูกต้อง' }, 400);
    }

    const res = await c.env.DB
      .prepare('UPDATE menu_items SET price = ? WHERE id = ?')
      .bind(Number(price), id)
      .run();

    if (res.meta.changes === 0) {
      return c.json({ success: false, error: 'ไม่พบเมนูนี้' }, 404);
    }

    return c.json({
      success: true,
      message: `อัปเดตราคาเป็น ฿${price} เรียบร้อยแล้ว`,
      price: Number(price),
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// 10. DELETE /api/admin/menu/:id - Delete menu item
api.delete('/admin/menu/:id', async (c) => {
  try {
    const id = Number(c.req.param('id'));

    const res = await c.env.DB
      .prepare('DELETE FROM menu_items WHERE id = ?')
      .bind(id)
      .run();

    if (res.meta.changes === 0) {
      return c.json({ success: false, error: 'ไม่พบเมนูที่ต้องการลบ' }, 404);
    }

    return c.json({
      success: true,
      message: 'ลบเมนูเรียบร้อยแล้ว',
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// 7. GET /api/admin/stats - Quick dashboard overview numbers
api.get('/admin/stats', async (c) => {
  try {
    const stats = await c.env.DB
      .prepare(`
        SELECT 
          COUNT(CASE WHEN status != 'cancelled' THEN 1 END) as total_orders,
          COALESCE(SUM(CASE WHEN status != 'cancelled' THEN total_amount ELSE 0 END), 0) as total_revenue,
          COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count,
          COUNT(CASE WHEN status = 'preparing' THEN 1 END) as preparing_count,
          COUNT(CASE WHEN status = 'ready' THEN 1 END) as ready_count
        FROM orders
        WHERE date(created_at, 'localtime') = date('now', 'localtime')
      `)
      .first<{
        total_orders: number;
        total_revenue: number;
        pending_count: number;
        preparing_count: number;
        ready_count: number;
      }>();

    return c.json({
      success: true,
      stats: stats || {
        total_orders: 0,
        total_revenue: 0,
        pending_count: 0,
        preparing_count: 0,
        ready_count: 0,
      },
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});
