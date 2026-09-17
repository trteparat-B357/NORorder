-- Seed initial categories and menu items
INSERT INTO categories (id, name, icon, sort_order) VALUES
(1, 'กาแฟสด (Coffee)', '☕', 1),
(2, 'ชาและมัทฉะ (Tea & Matcha)', '🍵', 2),
(3, 'นมสดและช็อกโกแลต (Milk & Cocoa)', '🥛', 3),
(4, 'อิตาเลียนโซดา & ผลไม้ (Soda & Refreshers)', '🍹', 4);

INSERT INTO menu_items (category_id, name, description, price, image_url, is_available) VALUES
-- กาแฟ
(1, 'เอสเพรสโซ่เย็น (Iced Espresso)', 'กาแฟช็อตเข้มข้น หอมมันกลมกล่อม สไตล์ไทย', 55.0, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80', 1),
(1, 'อเมริกาโน่ (Americano)', 'กาแฟดำอาราบิก้า 100% สกัดสด หอมกรุ่น ดื่มง่าย', 50.0, 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&auto=format&fit=crop&q=80', 1),
(1, 'ลาเต้ (Caffe Latte)', 'กาแฟผสมนมสดนุ่มละมุน ดื่มง่าย', 60.0, 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&auto=format&fit=crop&q=80', 1),
(1, 'คาราเมลมัคคิอาโต้ (Caramel Macchiato)', 'กาแฟนมราดซอสคาราเมลหอมหวานเข้มข้น', 65.0, 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&auto=format&fit=crop&q=80', 1),

-- ชา & มัทฉะ
(2, 'ชาไทยพรีเมียม (Thai Tea Latte)', 'ใบชาไทยแท้คัดพิเศษ หอมเข้มข้น หวานมันลงตัว', 50.0, 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&auto=format&fit=crop&q=80', 1),
(2, 'อุจิมัทฉะลาเต้ (Uji Matcha Latte)', 'มัทฉะแท้เกรดพรีเมียมจากเมืองอุจิ ญี่ปุ่น เข้มข้น หอมกลิ่นชาเขียวแท้', 75.0, 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&auto=format&fit=crop&q=80', 1),
(2, 'ชาพีชเลมอน (Peach Lemon Tea)', 'ชาดำผสมเนื้อพีชและเลมอนสด เปรี้ยวอมหวาน สดชื่นคลายร้อน', 60.0, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&auto=format&fit=crop&q=80', 1),

-- นม & โกโก้
(3, 'นมสดบราวน์ชูการ์ (Brown Sugar Fresh Milk)', 'นมสดแท้ 100% ราดไซรัปน้ำตาลทรายแดงเคี่ยวเข้มข้น', 65.0, 'https://images.unsplash.com/photo-1558857563-b371b6eb1b12?w=400&auto=format&fit=crop&q=80', 1),
(3, 'ดาร์กโกโก้เข้มข้น (Dark Cocoa)', 'ผงโกโก้สวิสแท้ เข้มข้นสะใจ สำหรับสายช็อกโกแลตเลิฟเวอร์', 60.0, 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&auto=format&fit=crop&q=80', 1),

-- โซดา & รีเฟรชเชอร์
(4, 'ยูซุฮันนี่โซดา (Yuzu Honey Soda)', 'ส้มยูซุแท้ผสมน้ำผึ้งป่าและโซดาซ่าสดชื่น', 65.0, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&auto=format&fit=crop&q=80', 1),
(4, 'สตรอว์เบอร์รี่เลมอนเนด (Strawberry Lemonade)', 'เนื้อสตรอว์เบอร์รี่สด ผสมน้ำมะนาวแท้ สดชื่นตื่นเต็มตา', 60.0, 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&auto=format&fit=crop&q=80', 1);

-- เพิ่มตัวอย่างออเดอร์สำหรับทดสอบ Dashboard
INSERT INTO orders (id, order_code, customer_name, customer_phone, order_type, table_no, total_amount, status, notes, created_at) VALUES
(1, 'A101', 'คุณสมชาย', '081-234-5678', 'dine_in', '03', 115.0, 'preparing', 'ขอแก้วแยกน้ำแข็ง', datetime('now', '-10 minutes')),
(2, 'A102', 'คุณแพรว', '089-987-6543', 'takeaway', NULL, 60.0, 'ready', 'ใส่ถุงหิ้ว', datetime('now', '-5 minutes')),
(3, 'A103', 'คุณธนกฤต', '086-555-1234', 'takeaway', NULL, 75.0, 'pending', 'รีบหน่อยนะครับ', datetime('now', '-1 minute'));

INSERT INTO order_items (order_id, menu_item_id, item_name, quantity, unit_price, temperature, sweetness, ice, toppings, item_notes) VALUES
(1, 1, 'เอสเพรสโซ่เย็น (Iced Espresso)', 1, 55.0, 'เย็น', '50% (หวานน้อย)', 'ปกติ', 'ไข่มุกบราวชูการ์ (+10)', 'หวานน้อย'),
(1, 2, 'ชาไทยพรีเมียม (Thai Tea Latte)', 1, 50.0, 'เย็น', '100% (ปกติ)', 'ปกติ', NULL, NULL),
(2, 6, 'ชาพีชเลมอน (Peach Lemon Tea)', 1, 60.0, 'เย็น', '25% (หวานน้อยมาก)', 'ปกติ', 'ว่านหางจระเข้ (+10)', NULL),
(3, 4, 'อุจิมัทฉะลาเต้ (Uji Matcha Latte)', 1, 75.0, 'เย็น', '50% (หวานน้อย)', 'น้ำแข็งน้อย', NULL, NULL);
