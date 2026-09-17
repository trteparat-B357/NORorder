export function renderCustomerPage(): string {
  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>สั่งเครื่องดื่มออนไลน์ | Crafted Coffee & Tea Cafe</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Prompt', sans-serif; }
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  </style>
</head>
<body class="bg-amber-50/40 text-stone-800 min-h-screen pb-32">

  <!-- Header -->
  <header class="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-sm">
    <div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center text-xl shadow-md">
          ☕
        </div>
        <div>
          <h1 class="font-bold text-lg text-stone-900 leading-tight">Crafted Cafe</h1>
          <p class="text-xs text-amber-700 font-medium flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            เปิดรับออเดอร์ออนไลน์
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <a href="/dashboard" class="text-xs text-amber-900 bg-amber-100/80 hover:bg-amber-200 px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1">
          <span>⚙️</span> แดชบอร์ดร้าน
        </a>
      </div>
    </div>

    <!-- Category Tabs -->
    <div class="max-w-4xl mx-auto px-4 py-2 overflow-x-auto hide-scrollbar flex space-x-2 text-sm border-t border-amber-50">
      <button onclick="filterCategory(0)" id="cat-btn-0" class="cat-btn active px-4 py-1.5 rounded-full font-medium transition whitespace-nowrap bg-amber-800 text-white shadow-sm">
        ✨ ทั้งหมด
      </button>
      <div id="categoryTabs" class="flex space-x-2"></div>
    </div>
  </header>

  <!-- Banner -->
  <div class="max-w-4xl mx-auto px-4 mt-4">
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 text-white p-5 shadow-lg">
      <div class="relative z-10 max-w-sm">
        <span class="bg-amber-500/30 text-amber-200 text-xs px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold border border-amber-400/30">Fresh Brewed</span>
        <h2 class="text-2xl font-bold mt-2 leading-snug">เครื่องดื่มสกัดสด<br>ชงสดใหม่แก้วต่อแก้ว</h2>
        <p class="text-amber-100/80 text-xs mt-1">เลือกความหวาน ปรับน้ำแข็ง และท็อปปิ้งได้ตามชอบ</p>
      </div>
      <div class="absolute -right-6 -bottom-8 text-9xl opacity-20 select-none pointer-events-none">☕</div>
    </div>
  </div>

  <!-- Menu Grid -->
  <main class="max-w-4xl mx-auto px-4 mt-6">
    <div id="menuLoading" class="text-center py-16">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-700 mx-auto"></div>
      <p class="text-sm text-stone-500 mt-3">กำลังโหลดเมนูเครื่องดื่ม...</p>
    </div>

    <div id="menuGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 hidden">
      <!-- Cards rendered via JS -->
    </div>
  </main>

  <!-- Drink Customization Modal -->
  <div id="customModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom duration-200">
      
      <!-- Modal Header with Image -->
      <div class="relative h-48 bg-stone-100 flex-shrink-0">
        <img id="modalImg" src="" alt="" class="w-full h-full object-cover">
        <button onclick="closeModal()" class="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition">
          ✕
        </button>
      </div>

      <!-- Modal Content -->
      <div class="p-5 flex-1">
        <div class="flex justify-between items-start">
          <div>
            <h3 id="modalName" class="text-xl font-bold text-stone-900"></h3>
            <p id="modalDesc" class="text-xs text-stone-500 mt-1 line-clamp-2"></p>
          </div>
          <span id="modalBasePrice" class="text-lg font-bold text-amber-700 ml-2"></span>
        </div>

        <form id="customizeForm" class="mt-5 space-y-4">
          <!-- Temperature -->
          <div>
            <label class="block text-xs font-semibold text-stone-700 mb-2">ประเภทเครื่องดื่ม</label>
            <div class="grid grid-cols-3 gap-2 text-xs">
              <label class="cursor-pointer border rounded-xl p-2.5 text-center flex flex-col items-center gap-1 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-50/70 has-[:checked]:font-semibold has-[:checked]:text-amber-800">
                <input type="radio" name="temperature" value="เย็น" checked class="hidden" onchange="updateModalPrice()">
                <span>🧊 เย็น</span>
                <span class="text-[10px] text-stone-400">(ปกติ)</span>
              </label>
              <label class="cursor-pointer border rounded-xl p-2.5 text-center flex flex-col items-center gap-1 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-50/70 has-[:checked]:font-semibold has-[:checked]:text-amber-800">
                <input type="radio" name="temperature" value="ร้อน" class="hidden" onchange="updateModalPrice()">
                <span>☕ ร้อน</span>
                <span class="text-[10px] text-stone-400">(ราคาเดิม)</span>
              </label>
              <label class="cursor-pointer border rounded-xl p-2.5 text-center flex flex-col items-center gap-1 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-50/70 has-[:checked]:font-semibold has-[:checked]:text-amber-800">
                <input type="radio" name="temperature" value="ปั่น" class="hidden" onchange="updateModalPrice()">
                <span>🥤 ปั่น</span>
                <span class="text-[10px] text-amber-600 font-medium">(+10฿)</span>
              </label>
            </div>
          </div>

          <!-- Sweetness -->
          <div>
            <label class="block text-xs font-semibold text-stone-700 mb-2">ระดับความหวาน</label>
            <div class="grid grid-cols-4 gap-1.5 text-xs text-center">
              <label class="cursor-pointer border rounded-lg py-2 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-100 has-[:checked]:font-semibold has-[:checked]:text-amber-900">
                <input type="radio" name="sweetness" value="100% (ปกติ)" checked class="hidden">
                100%<br><span class="text-[10px] text-stone-400">ปกติ</span>
              </label>
              <label class="cursor-pointer border rounded-lg py-2 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-100 has-[:checked]:font-semibold has-[:checked]:text-amber-900">
                <input type="radio" name="sweetness" value="50% (หวานน้อย)" class="hidden">
                50%<br><span class="text-[10px] text-stone-400">หวานน้อย</span>
              </label>
              <label class="cursor-pointer border rounded-lg py-2 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-100 has-[:checked]:font-semibold has-[:checked]:text-amber-900">
                <input type="radio" name="sweetness" value="25% (หวานน้อยมาก)" class="hidden">
                25%<br><span class="text-[10px] text-stone-400">น้อยมาก</span>
              </label>
              <label class="cursor-pointer border rounded-lg py-2 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-100 has-[:checked]:font-semibold has-[:checked]:text-amber-900">
                <input type="radio" name="sweetness" value="0% (ไม่หวาน)" class="hidden">
                0%<br><span class="text-[10px] text-stone-400">ไม่หวาน</span>
              </label>
            </div>
          </div>

          <!-- Ice Level -->
          <div id="iceSection">
            <label class="block text-xs font-semibold text-stone-700 mb-2">ปริมาณน้ำแข็ง</label>
            <div class="grid grid-cols-3 gap-2 text-xs text-center">
              <label class="cursor-pointer border rounded-lg py-2 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-100 has-[:checked]:font-semibold has-[:checked]:text-amber-900">
                <input type="radio" name="ice" value="ปกติ" checked class="hidden">
                ปกติ
              </label>
              <label class="cursor-pointer border rounded-lg py-2 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-100 has-[:checked]:font-semibold has-[:checked]:text-amber-900">
                <input type="radio" name="ice" value="น้ำแข็งน้อย" class="hidden">
                น้ำแข็งน้อย
              </label>
              <label class="cursor-pointer border rounded-lg py-2 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-100 has-[:checked]:font-semibold has-[:checked]:text-amber-900">
                <input type="radio" name="ice" value="ไม่ใส่น้ำแข็ง" class="hidden">
                ไม่ใส่น้ำแข็ง
              </label>
            </div>
          </div>

          <!-- Toppings -->
          <div>
            <label class="block text-xs font-semibold text-stone-700 mb-2">เพิ่มท็อปปิ้ง (เลือกได้มากกว่า 1 อย่าง)</label>
            <div class="space-y-2 text-xs">
              <label class="flex items-center justify-between p-2.5 border rounded-xl hover:border-amber-600 cursor-pointer transition">
                <div class="flex items-center gap-2">
                  <input type="checkbox" name="toppings" value="ไข่มุกบราวน์ชูการ์ (+10฿)" data-price="10" onchange="updateModalPrice()" class="w-4 h-4 rounded text-amber-700 focus:ring-amber-500">
                  <span>🧋 ไข่มุกบราวน์ชูการ์เคี่ยว</span>
                </div>
                <span class="font-semibold text-amber-700">+10฿</span>
              </label>
              <label class="flex items-center justify-between p-2.5 border rounded-xl hover:border-amber-600 cursor-pointer transition">
                <div class="flex items-center gap-2">
                  <input type="checkbox" name="toppings" value="ว่านหางจระเข้ (+10฿)" data-price="10" onchange="updateModalPrice()" class="w-4 h-4 rounded text-amber-700 focus:ring-amber-500">
                  <span>🌱 ว่านหางจระเข้ในน้ำเชื่อม</span>
                </div>
                <span class="font-semibold text-amber-700">+10฿</span>
              </label>
              <label class="flex items-center justify-between p-2.5 border rounded-xl hover:border-amber-600 cursor-pointer transition">
                <div class="flex items-center gap-2">
                  <input type="checkbox" name="toppings" value="บุกคริสตัล (+15฿)" data-price="15" onchange="updateModalPrice()" class="w-4 h-4 rounded text-amber-700 focus:ring-amber-500">
                  <span>✨ บุกคริสตัลใสเคี้ยวกรุบ</span>
                </div>
                <span class="font-semibold text-amber-700">+15฿</span>
              </label>
            </div>
          </div>

          <!-- Special Note -->
          <div>
            <label class="block text-xs font-semibold text-stone-700 mb-1">หมายเหตุเพิ่มเติม</label>
            <input type="text" id="itemNotes" placeholder="เช่น ขอแยกน้ำแข็ง, หวานน้อยพิเศษ" class="w-full text-xs p-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500">
          </div>

          <!-- Quantity -->
          <div class="flex items-center justify-between pt-2 border-t">
            <span class="text-xs font-semibold text-stone-700">จำนวนแก้ว</span>
            <div class="flex items-center border border-stone-200 rounded-xl overflow-hidden">
              <button type="button" onclick="changeModalQty(-1)" class="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold">-</button>
              <span id="modalQty" class="px-4 py-1.5 font-bold text-sm">1</span>
              <button type="button" onclick="changeModalQty(1)" class="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold">+</button>
            </div>
          </div>
        </form>

        <!-- Add Button -->
        <div class="mt-5">
          <button type="button" onclick="addToCartFromModal()" class="w-full py-3 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-semibold rounded-2xl shadow-lg transition flex items-center justify-between px-5">
            <span>เพิ่มลงในตะกร้า</span>
            <span id="modalTotalPrice" class="font-bold">฿0</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Cart Bottom Bar -->
  <div id="cartBar" class="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-100 p-4 shadow-2xl transition-transform duration-300 transform translate-y-full">
    <div class="max-w-4xl mx-auto flex items-center justify-between gap-4">
      <div class="flex items-center gap-3 cursor-pointer" onclick="openCartModal()">
        <div class="relative bg-amber-700 text-white w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-md">
          🛍️
          <span id="cartBadge" class="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">0</span>
        </div>
        <div>
          <p class="text-xs text-stone-500">ยอดรวมทั้งหมด</p>
          <p id="cartBarTotal" class="text-xl font-extrabold text-amber-900">฿0</p>
        </div>
      </div>

      <button onclick="openCartModal()" class="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition flex items-center gap-2 text-sm">
        <span>ดูตะกร้า & สั่งเครื่องดื่ม</span>
        <span>→</span>
      </button>
    </div>
  </div>

  <!-- Full Cart / Checkout Drawer -->
  <div id="cartModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in duration-200">
      
      <!-- Drawer Header -->
      <div class="p-5 border-b flex items-center justify-between sticky top-0 bg-white z-10">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🛍️</span>
          <h3 class="text-lg font-bold text-stone-900">รายการสั่งเครื่องดื่ม</h3>
        </div>
        <button onclick="closeCartModal()" class="text-stone-400 hover:text-stone-700 text-xl font-bold p-1">✕</button>
      </div>

      <!-- Drawer Content -->
      <div class="p-5 flex-1 space-y-5">
        <!-- Order Items List -->
        <div id="cartItemsList" class="space-y-3 divide-y divide-stone-100">
          <!-- Filled by JS -->
        </div>

        <!-- Customer Form -->
        <div class="bg-amber-50/60 p-4 rounded-2xl border border-amber-100/80 space-y-3">
          <h4 class="font-bold text-xs uppercase text-amber-900 tracking-wider">ข้อมูลผู้สั่ง</h4>
          
          <div class="grid grid-cols-2 gap-2 text-xs">
            <label class="cursor-pointer border border-amber-200 rounded-xl p-2.5 text-center flex items-center justify-center gap-2 bg-white has-[:checked]:border-amber-700 has-[:checked]:bg-amber-700 has-[:checked]:text-white font-semibold transition">
              <input type="radio" name="orderType" value="takeaway" checked class="hidden" onchange="toggleOrderType()">
              <span>🥤 สั่งกลับบ้าน</span>
            </label>
            <label class="cursor-pointer border border-amber-200 rounded-xl p-2.5 text-center flex items-center justify-center gap-2 bg-white has-[:checked]:border-amber-700 has-[:checked]:bg-amber-700 has-[:checked]:text-white font-semibold transition">
              <input type="radio" name="orderType" value="dine_in" class="hidden" onchange="toggleOrderType()">
              <span>🍽️ ทานที่ร้าน</span>
            </label>
          </div>

          <div class="space-y-2 text-xs">
            <div>
              <label class="block text-stone-700 mb-1 font-medium">ชื่อลูกค้า <span class="text-red-500">*</span></label>
              <input type="text" id="custName" placeholder="เช่น คุณสมชาย หรือ นิคเนม" class="w-full p-2.5 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none">
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-stone-700 mb-1 font-medium">เบอร์โทรศัพท์ (ถ้ามี)</label>
                <input type="tel" id="custPhone" placeholder="08X-XXX-XXXX" class="w-full p-2.5 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none">
              </div>
              <div id="tableField" class="hidden">
                <label class="block text-stone-700 mb-1 font-medium">หมายเลขโต๊ะ <span class="text-red-500">*</span></label>
                <input type="text" id="tableNo" placeholder="เช่น 01, B2" class="w-full p-2.5 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none">
              </div>
            </div>

            <div>
              <label class="block text-stone-700 mb-1 font-medium">หมายเหตุถึงบาริสต้า</label>
              <input type="text" id="orderNotes" placeholder="เช่น ขอถุงแยกแก้ว, ชงด่วนได้ไหมครับ" class="w-full p-2.5 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none">
            </div>
          </div>
        </div>

        <!-- Total Breakdown -->
        <div class="pt-2 border-t space-y-1 text-sm">
          <div class="flex justify-between text-stone-500 text-xs">
            <span>จำนวนเครื่องดื่ม</span>
            <span id="cartTotalCups">0 แก้ว</span>
          </div>
          <div class="flex justify-between items-baseline pt-1">
            <span class="font-bold text-stone-800">ยอดชำระสุทธิ</span>
            <span id="cartDrawerTotal" class="text-2xl font-extrabold text-amber-800">฿0</span>
          </div>
        </div>

        <!-- Submit Button -->
        <button id="submitOrderBtn" onclick="submitOrder()" class="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-base rounded-2xl shadow-xl transition flex items-center justify-center gap-2">
          <span>ยืนยันการสั่งซื้อ</span>
          <span class="text-xl">✓</span>
        </button>
      </div>
    </div>
  </div>

  <script>
    let menuData = { categories: [], items: [] };
    let selectedItem = null;
    let selectedCategory = 0;
    let cart = [];
    let modalQty = 1;

    async function loadMenu() {
      try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        if (data.success) {
          menuData = data;
          renderCategories();
          renderMenuItems();
        }
      } catch (err) {
        console.error('Failed to load menu', err);
      } finally {
        document.getElementById('menuLoading').classList.add('hidden');
        document.getElementById('menuGrid').classList.remove('hidden');
      }
    }

    function renderCategories() {
      const container = document.getElementById('categoryTabs');
      container.innerHTML = menuData.categories.map(cat => \`
        <button onclick="filterCategory(\${cat.id})" id="cat-btn-\${cat.id}" class="cat-btn px-4 py-1.5 rounded-full font-medium transition whitespace-nowrap bg-white text-stone-600 hover:bg-amber-100 border border-stone-200">
          \${cat.icon || ''} \${cat.name.split('(')[0]}
        </button>
      \`).join('');
    }

    function filterCategory(catId) {
      selectedCategory = catId;
      document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('bg-amber-800', 'text-white', 'shadow-sm');
        btn.classList.add('bg-white', 'text-stone-600');
      });
      const activeBtn = document.getElementById(\`cat-btn-\${catId}\`);
      if (activeBtn) {
        activeBtn.classList.remove('bg-white', 'text-stone-600');
        activeBtn.classList.add('bg-amber-800', 'text-white', 'shadow-sm');
      }
      renderMenuItems();
    }

    function renderMenuItems() {
      const grid = document.getElementById('menuGrid');
      const filtered = selectedCategory === 0 
        ? menuData.items 
        : menuData.items.filter(i => i.category_id === selectedCategory);

      if (filtered.length === 0) {
        grid.innerHTML = \`<div class="col-span-full text-center py-12 text-stone-400">ยังไม่มีเมนูในหมวดหมู่นี้</div>\`;
        return;
      }

      grid.innerHTML = filtered.map(item => \`
        <div class="bg-white rounded-2xl overflow-hidden border border-amber-100 shadow-sm hover:shadow-md transition flex flex-col justify-between group \${item.is_available ? '' : 'opacity-60 grayscale'}">
          <div>
            <div class="relative h-44 overflow-hidden bg-stone-100">
              <img src="\${item.image_url}" alt="\${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
              \${!item.is_available ? \`<span class="absolute inset-0 bg-black/50 text-white flex items-center justify-center font-bold text-sm">สินค้าหมดชั่วคราว</span>\` : ''}
              <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-700 text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-sm">
                \${item.category_name || ''}
              </span>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-base text-stone-900 group-hover:text-amber-800 transition">\${item.name}</h3>
              <p class="text-xs text-stone-500 mt-1 line-clamp-2">\${item.description || ''}</p>
            </div>
          </div>
          <div class="p-4 pt-0 flex items-center justify-between">
            <span class="text-lg font-bold text-amber-700">฿\${item.price}</span>
            <button onclick="openCustomizeModal(\${item.id})" \${item.is_available ? '' : 'disabled'} class="bg-amber-700 hover:bg-amber-800 disabled:bg-stone-300 text-white px-3.5 py-1.5 rounded-xl font-medium text-xs shadow-sm transition flex items-center gap-1">
              <span>สั่งเครื่องดื่ม</span>
              <span>+</span>
            </button>
          </div>
        </div>
      \`).join('');
    }

    function openCustomizeModal(itemId) {
      selectedItem = menuData.items.find(i => i.id === itemId);
      if (!selectedItem) return;

      modalQty = 1;
      document.getElementById('modalQty').innerText = modalQty;
      document.getElementById('modalImg').src = selectedItem.image_url;
      document.getElementById('modalName').innerText = selectedItem.name;
      document.getElementById('modalDesc').innerText = selectedItem.description || '';
      document.getElementById('modalBasePrice').innerText = '฿' + selectedItem.price;
      document.getElementById('itemNotes').value = '';

      // Reset form options
      const form = document.getElementById('customizeForm');
      form.reset();
      updateModalPrice();

      document.getElementById('customModal').classList.remove('hidden');
    }

    function closeModal() {
      document.getElementById('customModal').classList.add('hidden');
    }

    function changeModalQty(delta) {
      modalQty = Math.max(1, modalQty + delta);
      document.getElementById('modalQty').innerText = modalQty;
      updateModalPrice();
    }

    function updateModalPrice() {
      if (!selectedItem) return;
      let unitPrice = selectedItem.price;

      // Frappe extra
      const temp = document.querySelector('input[name="temperature"]:checked')?.value;
      if (temp === 'ปั่น') unitPrice += 10;

      // Toppings extra
      document.querySelectorAll('input[name="toppings"]:checked').forEach(t => {
        unitPrice += Number(t.dataset.price || 0);
      });

      const total = unitPrice * modalQty;
      document.getElementById('modalTotalPrice').innerText = '฿' + total;
      return { unitPrice, total };
    }

    function addToCartFromModal() {
      if (!selectedItem) return;
      const { unitPrice } = updateModalPrice();

      const temp = document.querySelector('input[name="temperature"]:checked')?.value || 'เย็น';
      const sweetness = document.querySelector('input[name="sweetness"]:checked')?.value || '100% (ปกติ)';
      const ice = document.querySelector('input[name="ice"]:checked')?.value || 'ปกติ';
      
      const toppings = Array.from(document.querySelectorAll('input[name="toppings"]:checked'))
        .map(t => t.value)
        .join(', ');

      const itemNotes = document.getElementById('itemNotes').value.trim();

      cart.push({
        menu_item_id: selectedItem.id,
        item_name: selectedItem.name,
        quantity: modalQty,
        unit_price: unitPrice,
        temperature: temp,
        sweetness: sweetness,
        ice: ice,
        toppings: toppings || null,
        item_notes: itemNotes || null
      });

      closeModal();
      updateCartUI();
    }

    function updateCartUI() {
      const cartBar = document.getElementById('cartBar');
      const badge = document.getElementById('cartBadge');
      const barTotal = document.getElementById('cartBarTotal');

      const totalCups = cart.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cart.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);

      if (totalCups > 0) {
        cartBar.classList.remove('translate-y-full');
        badge.innerText = totalCups;
        barTotal.innerText = '฿' + totalPrice;
      } else {
        cartBar.classList.add('translate-y-full');
        closeCartModal();
      }
    }

    function openCartModal() {
      renderCartItems();
      document.getElementById('cartModal').classList.remove('hidden');
    }

    function closeCartModal() {
      document.getElementById('cartModal').classList.add('hidden');
    }

    function toggleOrderType() {
      const type = document.querySelector('input[name="orderType"]:checked').value;
      const tableField = document.getElementById('tableField');
      if (type === 'dine_in') {
        tableField.classList.remove('hidden');
      } else {
        tableField.classList.add('hidden');
      }
    }

    function removeCartItem(idx) {
      cart.splice(idx, 1);
      renderCartItems();
      updateCartUI();
    }

    function renderCartItems() {
      const container = document.getElementById('cartItemsList');
      const totalCups = cart.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cart.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);

      document.getElementById('cartTotalCups').innerText = totalCups + ' แก้ว';
      document.getElementById('cartDrawerTotal').innerText = '฿' + totalPrice;

      if (cart.length === 0) {
        container.innerHTML = '<p class="text-center text-stone-400 py-6 text-sm">ไม่มีรายการในตะกร้า</p>';
        return;
      }

      container.innerHTML = cart.map((item, idx) => \`
        <div class="py-3 flex justify-between items-start gap-2">
          <div class="flex-1">
            <h5 class="font-bold text-sm text-stone-900">\${item.item_name}</h5>
            <div class="text-[11px] text-stone-500 mt-0.5 space-y-0.5">
              <p>• \${item.temperature} | หวาน \${item.sweetness} | น้ำแข็ง \${item.ice}</p>
              \${item.toppings ? \`<p class="text-amber-700">• ท็อปปิ้ง: \${item.toppings}</p>\` : ''}
              \${item.item_notes ? \`<p class="text-stone-400">• โน้ต: \${item.item_notes}</p>\` : ''}
            </div>
            <p class="text-xs font-bold text-amber-800 mt-1">฿\${item.unit_price} × \${item.quantity} = ฿\${item.unit_price * item.quantity}</p>
          </div>
          <button onclick="removeCartItem(\${idx})" class="text-stone-400 hover:text-red-500 text-sm p-1">
            🗑️
          </button>
        </div>
      \`).join('');
    }

    async function submitOrder() {
      const name = document.getElementById('custName').value.trim();
      const phone = document.getElementById('custPhone').value.trim();
      const orderType = document.querySelector('input[name="orderType"]:checked').value;
      const tableNo = document.getElementById('tableNo').value.trim();
      const notes = document.getElementById('orderNotes').value.trim();

      if (!name) {
        alert('กรุณากรอกชื่อลูกค้า');
        document.getElementById('custName').focus();
        return;
      }

      if (orderType === 'dine_in' && !tableNo) {
        alert('กรณีทานที่ร้าน กรุณาระบุหมายเลขโต๊ะ');
        document.getElementById('tableNo').focus();
        return;
      }

      const btn = document.getElementById('submitOrderBtn');
      btn.disabled = true;
      btn.innerHTML = '<span>กำลังส่งออเดอร์...</span>';

      try {
        const payload = {
          customer_name: name,
          customer_phone: phone || null,
          order_type: orderType,
          table_no: tableNo || null,
          notes: notes || null,
          items: cart
        };

        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data.success && data.order) {
          // Redirect to tracking page
          window.location.href = '/order/' + data.order.order_code;
        } else {
          alert('เกิดข้อผิดพลาด: ' + (data.error || 'ไม่สามารถส่งออเดอร์ได้'));
          btn.disabled = false;
          btn.innerHTML = '<span>ยืนยันการสั่งซื้อ</span><span class="text-xl">✓</span>';
        }
      } catch (err) {
        alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
        btn.disabled = false;
        btn.innerHTML = '<span>ยืนยันการสั่งซื้อ</span><span class="text-xl">✓</span>';
      }
    }

    // Initialize
    loadMenu();
  </script>
</body>
</html>`;
}
