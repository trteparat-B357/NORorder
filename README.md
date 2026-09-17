# ☕ Drink Ordering System (Hono.js + Cloudflare D1 + Wrangler)

ระบบสั่งเครื่องดื่มออนไลน์สำหรับร้านคาเฟ่/ร้านเครื่องดื่ม ที่มีระบบติดตามสถานะออเดอร์สำหรับลูกค้า และแดชบอร์ดรับออเดอร์สำหรับบาริสต้าหรือเจ้าของร้าน ทำงานบน **Cloudflare Workers** ร่วมกับฐานข้อมูลไร้เซิร์ฟเวอร์ **Cloudflare D1** ด้วย **Hono.js**

---

## ✨ ฟีเจอร์หลัก (Key Features)

1. **สำหรับลูกค้า (Customer Storefront & Customization)**:
   - สั่งซื้อเครื่องดื่มผ่านเว็บบนมือถือหรือแท็บเล็ตได้ทันที
   - ปรับแต่งเครื่องดื่มตามใจชอบ:
     - ประเภทเครื่องดื่ม: ร้อน, เย็น, ปั่น (+10฿)
     - ระดับความหวาน: 0%, 25%, 50%, 100%
     - ปริมาณน้ำแข็ง: ไม่ใส่น้ำแข็ง, น้ำแข็งน้อย, ปกติ
     - ท็อปปิ้ง: ไข่มุกบราวน์ชูการ์, ว่านหางจระเข้, บุกคริสตัล
     - หมายเหตุพิเศษถึงบาริสต้า
   - เลือกระบุ "สั่งกลับบ้าน" หรือ "ทานที่ร้าน (ระบุเลขโต๊ะ)"
   - ระบบตะกร้าสินค้า (Cart Drawer) คำนวณยอดเงินรวมอัตโนมัติ

2. **ระบบติดตามสถานะออเดอร์แบบเรียลไทม์ (Live Order Tracking)**:
   - ลูกค้าได้รับรหัสออเดอร์จำง่าย เช่น `#A101`
   - แอนิเมชัน Stepper แสดงสถานะ:
     1. 📋 ได้รับออเดอร์แล้ว (Pending)
     2. ☕ กำลังชง / กำลังดำเนินการ (Preparing)
     3. 🎉 พร้อมเสิร์ฟ / รับเครื่องดื่มได้ (Ready)
     4. ✅ รับสินค้าเรียบร้อย (Completed)
   - อัปเดตสถานะอัตโนมัติทุก 3 วินาที (ไม่ต้องกดรีเฟรชหน้าจอ)
   - มีระบบเสียงแจ้งเตือนและแสงกระพริบเมื่อเครื่องดื่มพร้อมเสิร์ฟ

3. **แดชบอร์ดบาริสต้า / เจ้าของร้าน (Barista & Kitchen Dashboard)**:
   - บอร์ดแสดงรายการออเดอร์แบบเรียลไทม์ (Auto-refresh ทุก 4 วินาที)
   - ปุ่มเปลี่ยนสถานะในคลิกเดียว:
     - กด `[เริ่มชง]` -> เปลี่ยนเป็น `preparing`
     - กด `[ชงเสร็จแล้ว - พร้อมเสิร์ฟ]` -> เปลี่ยนเป็น `ready`
     - กด `[ลูกค้ารับแล้ว]` -> เปลี่ยนเป็น `completed`
   - สรุปตัวเลขสถิติประจำวัน: ยอดขายรวม, จำนวนออเดอร์ทั้งหมด, คิวที่รอชง
   - ระบบเสียงเตือนเมื่อมีออเดอร์ใหม่เข้ามา (Audio Alert Toggle)
   - **ระบบจัดการเมนู & แก้ไขราคาแบบเต็มรูปแบบ (Menu CRUD & Price Management)**:
     - ➕ เพิ่มเมนูเครื่องดื่มใหม่ (ระบุชื่อ, หมวดหมู่, ราคา, รายละเอียด, รูปภาพ)
     - ✏️ **แก้ไขราคาได้ทันที (Quick Price Edit)** ในคลิกเดียว
     - 📝 แก้ไขข้อมูลเมนู (เปลี่ยนชื่อ, คำอธิบาย, รูปภาพ, หมวดหมู่)
     - 🗑️ ลบเมนูออกจากร้าน (Delete menu item)
     - 🔄 เปิด/ปิดการขายสินค้าชั่วคราว (Toggle In-Stock / Out-of-Stock)

---

## 🛠️ โครงสร้างโปรเจกต์ (Project Structure)

```
drink-order-app/
├── schema.sql         # โครงสร้างตาราง D1 Database (categories, menu_items, orders, order_items)
├── seed.sql           # ข้อมูลเริ่มต้นเมนูเครื่องดื่มและตัวอย่างออเดอร์
├── wrangler.toml      # การตั้งค่า Cloudflare Workers และ D1 Binding (DB)
├── package.json       # รายการ Library และ Scripts
├── tsconfig.json      # การตั้งค่า TypeScript
└── src/
    ├── index.ts       # Main Hono App & Router
    ├── types.ts       # Interface & Bindings
    ├── routes/
    │   └── api.ts     # REST API สำหรับ Menu, Orders, Admin Actions, Stats
    └── views/
        ├── customer.ts    # หน้าเว็บสำหรับลูกค้าสั่งซื้อ (/)
        ├── tracking.ts    # หน้าติดตามสถานะออเดอร์ (/order/:code)
        └── dashboard.ts   # หน้าแดชบอร์ดบาริสต้า (/dashboard)
```

---

## 🚀 วิธีติดตั้งและรันในเครื่อง (Local Development)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. สร้างตารางและใส่ข้อมูลเริ่มต้นลง Local D1 Database
```bash
# สร้าง Schema
npm run db:init

# ใส่ข้อมูลตัวอย่างเมนูและออเดอร์
npm run db:seed

# หรือรันคำสั่งเดียว
npm run db:setup
```

### 3. รันเซิร์ฟเวอร์จำลองในเครื่อง
```bash
npm run dev
```
หลังจากรันคำสั่ง สามารถเปิดเบราว์เซอร์ได้ที่:
- **หน้าสั่งเครื่องดื่มของลูกค้า**: `http://localhost:8787/`
- **หน้าแดชบอร์ดบาริสต้า**: `http://localhost:8787/dashboard`
- **หน้าติดตามออเดอร์ตัวอย่าง**: `http://localhost:8787/order/A101`

---

## ☁️ วิธีการ Deploy ขึ้น Cloudflare Workers & D1 Production

### 1. ล็อกอิน Wrangler เข้าสู่บัญชี Cloudflare
```bash
npx wrangler login
```

### 2. สร้าง D1 Database บน Cloudflare
```bash
npx wrangler d1 create drink-db
```
เมื่อสร้างเสร็จ Wrangler จะแสดงข้อมูล `database_name` และ `database_id` ให้นำค่าที่ได้มาอัปเดตในไฟล์ `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "drink-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" # นำ ID จาก Cloudflare มาใส่ที่นี่
```

### 3. รัน Migration สู่ Cloudflare D1 Production
```bash
npx wrangler d1 execute drink-db --file=./schema.sql
npx wrangler d1 execute drink-db --file=./seed.sql
```

### 4. สั่ง Deploy ขึ้น Cloudflare Workers ทันที!
```bash
npx wrangler deploy
```
คุณจะได้ URL สำหรับเปิดใช้งานจริงทั่วโลก (เช่น `https://drink-order-app.<your-account>.workers.dev`) ทันที พร้อมความเร็วสูงและไม่มีค่าใช้จ่ายเซิร์ฟเวอร์บน Cloudflare Free Tier!
#   N O R o r d e r  
 #   N O R o r d e r  
 