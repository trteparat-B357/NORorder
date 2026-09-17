export function renderDashboardPage(): string {
  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>แดชบอร์ดบาริสต้า | Crafted Cafe Dashboard</title>
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
<body class="bg-stone-100 text-stone-800 min-h-screen">

  <!-- Top Navbar -->
  <header class="bg-stone-900 text-white sticky top-0 z-30 shadow-md">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center text-xl shadow">
          ☕
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-bold text-base sm:text-lg text-white">Barista & Kitchen Dashboard</h1>
            <span class="bg-amber-500/20 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-amber-500/30">D1 Live</span>
          </div>
          <p class="text-xs text-stone-400">ร้าน Crafted Cafe • จัดการคิวและสถานะออเดอร์</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <!-- Audio Notification Toggle -->
        <button id="soundToggleBtn" onclick="toggleSound()" class="text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 border border-stone-700">
          <span id="soundIcon">🔔</span>
          <span id="soundText">เปิดเสียงเตือน</span>
        </button>

        <!-- Menu Management Button -->
        <button onclick="openMenuManageModal()" class="text-xs bg-amber-600 hover:bg-amber-500 text-white font-medium px-3 py-1.5 rounded-xl transition flex items-center gap-1 shadow">
          <span>📋</span> จัดการเมนู & แก้ไขราคา
        </button>

        <!-- Customer Store Link -->
        <a href="/" target="_blank" class="text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 px-3 py-1.5 rounded-xl transition border border-stone-700 hidden sm:flex items-center gap-1">
          <span>↗️</span> หน้าสั่งซื้อลูกค้า
        </a>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 py-6 space-y-6">

    <!-- KPI / Summary Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
      <!-- Total Orders -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-stone-500">ออเดอร์วันนี้</span>
          <span class="text-base">📝</span>
        </div>
        <p id="statTotalOrders" class="text-2xl font-extrabold text-stone-900 mt-2">0</p>
      </div>

      <!-- Total Revenue -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-stone-500">ยอดขายรวม</span>
          <span class="text-base">💰</span>
        </div>
        <p id="statTotalRev" class="text-2xl font-extrabold text-amber-700 mt-2">฿0</p>
      </div>

      <!-- Pending Queue -->
      <div class="bg-amber-50 p-4 rounded-2xl shadow-sm border border-amber-200">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-amber-800">รอรับออเดอร์</span>
          <span class="text-base">⏳</span>
        </div>
        <p id="statPending" class="text-2xl font-extrabold text-amber-700 mt-2">0</p>
      </div>

      <!-- Preparing Queue -->
      <div class="bg-blue-50 p-4 rounded-2xl shadow-sm border border-blue-200">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-blue-800">กำลังชง</span>
          <span class="text-base">☕</span>
        </div>
        <p id="statPreparing" class="text-2xl font-extrabold text-blue-700 mt-2">0</p>
      </div>

      <!-- Ready Queue -->
      <div class="bg-emerald-50 p-4 rounded-2xl shadow-sm border border-emerald-200 col-span-2 sm:col-span-1">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-emerald-800">พร้อมเสิร์ฟ</span>
          <span class="text-base">🎉</span>
        </div>
        <p id="statReady" class="text-2xl font-extrabold text-emerald-700 mt-2">0</p>
      </div>
    </div>

    <!-- Filter Tabs & Controls -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-stone-200 shadow-sm">
      <div class="flex space-x-1.5 overflow-x-auto hide-scrollbar text-xs">
        <button onclick="setFilter('active')" id="tab-active" class="tab-btn px-4 py-2 rounded-xl font-bold bg-amber-700 text-white shadow-sm transition whitespace-nowrap">
          ⚡ กำลังดำเนินการ (<span id="countActive">0</span>)
        </button>
        <button onclick="setFilter('pending')" id="tab-pending" class="tab-btn px-4 py-2 rounded-xl font-medium text-stone-600 hover:bg-stone-100 transition whitespace-nowrap">
          ⏳ รอรับ (<span id="countPending">0</span>)
        </button>
        <button onclick="setFilter('preparing')" id="tab-preparing" class="tab-btn px-4 py-2 rounded-xl font-medium text-stone-600 hover:bg-stone-100 transition whitespace-nowrap">
          ☕ กำลังชง (<span id="countPreparing">0</span>)
        </button>
        <button onclick="setFilter('ready')" id="tab-ready" class="tab-btn px-4 py-2 rounded-xl font-medium text-stone-600 hover:bg-stone-100 transition whitespace-nowrap">
          🎉 พร้อมเสิร์ฟ (<span id="countReady">0</span>)
        </button>
        <button onclick="setFilter('all')" id="tab-all" class="tab-btn px-4 py-2 rounded-xl font-medium text-stone-600 hover:bg-stone-100 transition whitespace-nowrap">
          📜 ทั้งหมด
        </button>
      </div>

      <div class="flex items-center justify-end gap-2 text-xs text-stone-500 px-2">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>ซิงก์ข้อมูลสดทุก 4 วินาที</span>
        <button onclick="loadDashboardData()" class="p-1 hover:text-stone-800 text-sm" title="รีเฟรชทันที">🔄</button>
      </div>
    </div>

    <!-- Orders Grid -->
    <div id="ordersGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Order Cards rendered via JS -->
    </div>

    <div id="noOrdersAlert" class="hidden text-center py-16 bg-white rounded-3xl border border-dashed border-stone-300">
      <span class="text-4xl">☕</span>
      <h3 class="text-base font-bold text-stone-700 mt-2">ยังไม่มีออเดอร์ในหมวดนี้</h3>
      <p class="text-xs text-stone-400 mt-1">เมื่อมีลูกค้าสั่งเครื่องดื่ม ออเดอร์จะปรากฏที่นี่โดยอัตโนมัติ</p>
    </div>

  </main>

  <!-- Menu Management & Price Edit Modal -->
  <div id="menuModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex items-center justify-center p-3 sm:p-4">
    <div class="bg-white w-full max-w-3xl rounded-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
      
      <!-- Modal Header -->
      <div class="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
        <div>
          <h3 class="font-bold text-base sm:text-lg text-stone-900 flex items-center gap-2">
            <span>📋</span> จัดการเมนูเครื่องดื่ม & แก้ไขราคา
          </h3>
          <p class="text-xs text-stone-500 mt-0.5">เพิ่มเมนูใหม่, แก้ไขราคา, ปรับรายละเอียด หรือเปิด/ปิดสต็อกสินค้า</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="openEditMenuModal(null)" class="bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow transition flex items-center gap-1.5">
            <span>➕</span> เพิ่มเมนูใหม่
          </button>
          <button onclick="closeMenuModal()" class="text-stone-400 hover:text-stone-700 text-xl font-bold w-8 h-8 rounded-lg flex items-center justify-center transition">✕</button>
        </div>
      </div>

      <!-- Category Filter Tabs inside Modal -->
      <div class="px-5 py-3 border-b border-stone-100 flex items-center gap-2 overflow-x-auto hide-scrollbar bg-white text-xs">
        <span class="text-stone-400 text-[11px] whitespace-nowrap">หมวดหมู่:</span>
        <button onclick="filterManageMenu(0)" id="mcat-0" class="mcat-btn px-3 py-1 rounded-full font-bold bg-amber-800 text-white shadow-sm transition whitespace-nowrap">
          ทั้งหมด
        </button>
        <button onclick="filterManageMenu(1)" id="mcat-1" class="mcat-btn px-3 py-1 rounded-full text-stone-600 bg-stone-100 hover:bg-stone-200 transition whitespace-nowrap">
          ☕ กาแฟ
        </button>
        <button onclick="filterManageMenu(2)" id="mcat-2" class="mcat-btn px-3 py-1 rounded-full text-stone-600 bg-stone-100 hover:bg-stone-200 transition whitespace-nowrap">
          🍵 ชา/มัทฉะ
        </button>
        <button onclick="filterManageMenu(3)" id="mcat-3" class="mcat-btn px-3 py-1 rounded-full text-stone-600 bg-stone-100 hover:bg-stone-200 transition whitespace-nowrap">
          🥛 นม/โกโก้
        </button>
        <button onclick="filterManageMenu(4)" id="mcat-4" class="mcat-btn px-3 py-1 rounded-full text-stone-600 bg-stone-100 hover:bg-stone-200 transition whitespace-nowrap">
          🍹 โซดา/ผลไม้
        </button>
      </div>

      <!-- Menu Items List -->
      <div class="p-5 overflow-y-auto flex-1 divide-y divide-stone-100 space-y-3" id="menuManageList">
        <!-- Rendered via JS -->
      </div>

    </div>
  </div>

  <!-- Add / Edit Menu Item Form Modal -->
  <div id="editMenuModal" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm hidden flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-md rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-150">
      
      <div class="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50 sticky top-0 z-10">
        <h4 id="editModalTitle" class="font-bold text-base text-stone-900">เพิ่มเมนูใหม่</h4>
        <button onclick="closeEditMenuModal()" class="text-stone-400 hover:text-stone-700 text-xl font-bold">✕</button>
      </div>

      <form id="menuItemForm" onsubmit="handleMenuFormSubmit(event)" class="p-5 space-y-4 text-xs">
        <input type="hidden" id="formMenuId" value="">

        <!-- Name -->
        <div>
          <label class="block font-semibold text-stone-700 mb-1">ชื่อเครื่องดื่ม <span class="text-red-500">*</span></label>
          <input type="text" id="formMenuName" required placeholder="เช่น ชาเขียวมัทฉะนมสดเย็น" class="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs">
        </div>

        <!-- Category & Price in 2 columns -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-semibold text-stone-700 mb-1">หมวดหมู่ <span class="text-red-500">*</span></label>
            <select id="formMenuCategory" required class="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs">
              <option value="1">☕ กาแฟสด</option>
              <option value="2">🍵 ชาและมัทฉะ</option>
              <option value="3">🥛 นมสดและช็อกโกแลต</option>
              <option value="4">🍹 อิตาเลียนโซดา & ผลไม้</option>
            </select>
          </div>

          <div>
            <label class="block font-bold text-amber-800 mb-1">ราคาจำหน่าย (บาท) <span class="text-red-500">*</span></label>
            <div class="relative">
              <span class="absolute left-3 top-2.5 text-stone-400 font-bold">฿</span>
              <input type="number" id="formMenuPrice" required min="0" step="1" placeholder="50" class="w-full pl-7 pr-3 p-2.5 bg-amber-50/50 border border-amber-300 font-bold text-amber-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-sm">
            </div>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="block font-semibold text-stone-700 mb-1">รายละเอียด / ส่วนผสม</label>
          <textarea id="formMenuDesc" rows="2" placeholder="รสชาติหอมเข้มข้น หวานมันลงตัว" class="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs"></textarea>
        </div>

        <!-- Image URL -->
        <div>
          <label class="block font-semibold text-stone-700 mb-1">ลิงก์รูปภาพ (Image URL)</label>
          <input type="url" id="formMenuImg" placeholder="https://images.unsplash.com/..." class="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs">
          <p class="text-[10px] text-stone-400 mt-1">หากเว้นว่าง ระบบจะใช้รูปภาพกาแฟเริ่มต้นให้อัตโนมัติ</p>
        </div>

        <!-- Availability Status Checkbox -->
        <div class="pt-2">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" id="formMenuAvailable" checked class="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500">
            <span class="font-semibold text-stone-800">พร้อมเปิดจำหน่ายทันที</span>
          </label>
        </div>

        <!-- Buttons -->
        <div class="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
          <button type="button" onclick="closeEditMenuModal()" class="px-4 py-2 text-stone-500 hover:text-stone-800 font-medium transition">
            ยกเลิก
          </button>
          <button type="submit" id="saveMenuBtn" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition flex items-center gap-1">
            <span>💾</span> บันทึกข้อมูลเมนู
          </button>
        </div>
      </form>

    </div>
  </div>

  <script>
    let currentFilter = 'active';
    let soundEnabled = false;
    let knownOrderIds = new Set();
    let isFirstLoad = true;

    // Beep synthesizer for new orders
    function playNewOrderSound() {
      if (!soundEnabled) return;
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.24);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } catch (e) {
        console.log('Audio autoplay prevented', e);
      }
    }

    function toggleSound() {
      soundEnabled = !soundEnabled;
      const icon = document.getElementById('soundIcon');
      const text = document.getElementById('soundText');
      const btn = document.getElementById('soundToggleBtn');
      if (soundEnabled) {
        icon.innerText = '🔔';
        text.innerText = 'เปิดเสียงแล้ว';
        btn.classList.add('bg-emerald-900', 'text-emerald-200', 'border-emerald-600');
        playNewOrderSound();
      } else {
        icon.innerText = '🔕';
        text.innerText = 'ปิดเสียงเตือน';
        btn.classList.remove('bg-emerald-900', 'text-emerald-200', 'border-emerald-600');
      }
    }

    function setFilter(filter) {
      currentFilter = filter;
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-amber-700', 'text-white', 'shadow-sm', 'font-bold');
        btn.classList.add('text-stone-600', 'font-medium');
      });
      const activeBtn = document.getElementById('tab-' + filter);
      if (activeBtn) {
        activeBtn.classList.remove('text-stone-600', 'font-medium');
        activeBtn.classList.add('bg-amber-700', 'text-white', 'shadow-sm', 'font-bold');
      }
      loadDashboardData();
    }

    async function loadDashboardData() {
      try {
        // 1. Fetch Stats
        const statsRes = await fetch('/api/admin/stats');
        const statsData = await statsRes.json();
        if (statsData.success && statsData.stats) {
          const s = statsData.stats;
          document.getElementById('statTotalOrders').innerText = s.total_orders;
          document.getElementById('statTotalRev').innerText = '฿' + Number(s.total_revenue).toLocaleString();
          document.getElementById('statPending').innerText = s.pending_count;
          document.getElementById('statPreparing').innerText = s.preparing_count;
          document.getElementById('statReady').innerText = s.ready_count;

          document.getElementById('countActive').innerText = s.pending_count + s.preparing_count + s.ready_count;
          document.getElementById('countPending').innerText = s.pending_count;
          document.getElementById('countPreparing').innerText = s.preparing_count;
          document.getElementById('countReady').innerText = s.ready_count;
        }

        // 2. Fetch Orders with filter
        const ordersRes = await fetch('/api/admin/orders?status=' + currentFilter);
        const ordersData = await ordersRes.json();
        if (ordersData.success) {
          renderOrders(ordersData.orders);

          // Check for brand new orders to play sound
          let hasNew = false;
          ordersData.orders.forEach(o => {
            if (!knownOrderIds.has(o.id)) {
              knownOrderIds.add(o.id);
              if (!isFirstLoad && o.status === 'pending') {
                hasNew = true;
              }
            }
          });
          if (hasNew) playNewOrderSound();
          isFirstLoad = false;
        }
      } catch (err) {
        console.error('Dashboard load error', err);
      }
    }

    function renderOrders(orders) {
      const grid = document.getElementById('ordersGrid');
      const emptyAlert = document.getElementById('noOrdersAlert');

      if (!orders || orders.length === 0) {
        grid.innerHTML = '';
        emptyAlert.classList.remove('hidden');
        return;
      }

      emptyAlert.classList.add('hidden');

      grid.innerHTML = orders.map(ord => {
        const statusConfig = {
          pending: { bg: 'bg-amber-50', border: 'border-amber-300', badge: 'bg-amber-500 text-white', label: 'รอรับออเดอร์', icon: '⏳' },
          preparing: { bg: 'bg-blue-50/70', border: 'border-blue-300', badge: 'bg-blue-600 text-white', label: 'กำลังชง', icon: '☕' },
          ready: { bg: 'bg-emerald-50', border: 'border-emerald-400', badge: 'bg-emerald-600 text-white', label: 'พร้อมเสิร์ฟ', icon: '🎉' },
          completed: { bg: 'bg-stone-50', border: 'border-stone-200', badge: 'bg-stone-600 text-white', label: 'เสร็จสิ้น', icon: '✓' },
          cancelled: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-600 text-white', label: 'ยกเลิก', icon: '✕' },
        }[ord.status] || { bg: 'bg-white', border: 'border-stone-200', badge: 'bg-stone-500 text-white', label: ord.status, icon: '•' };

        let formattedTime = '-';
        try {
          const rawDate = ord.created_at ? ord.created_at.replace(' ', 'T') : '';
          const d = new Date(rawDate);
          if (!isNaN(d.getTime())) {
            formattedTime = d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
          } else {
            formattedTime = ord.created_at ? ord.created_at.split(' ')[1] || ord.created_at : '-';
          }
        } catch (e) {
          formattedTime = ord.created_at || '-';
        }

        const ordNotes = ord.notes && ord.notes !== 'null' && ord.notes.trim() !== '' ? ord.notes : null;
        const ordTable = ord.table_no && ord.table_no !== 'null' ? ord.table_no : '-';
        const ordPhone = ord.customer_phone && ord.customer_phone !== 'null' ? ord.customer_phone : null;

        return \`
          <div class="rounded-3xl p-5 border-2 shadow-sm flex flex-col justify-between transition-all duration-200 \${statusConfig.bg} \${statusConfig.border}">
            
            <div>
              <!-- Header with Order Code & Badge -->
              <div class="flex items-start justify-between pb-3 border-b border-stone-200/70">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-2xl font-black text-stone-900 tracking-wider">#\${ord.order_code}</span>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full \${statusConfig.badge} flex items-center gap-1">
                      <span>\${statusConfig.icon}</span> \${statusConfig.label}
                    </span>
                  </div>
                  <p class="text-xs text-stone-500 mt-1">เวลาสั่ง: \${formattedTime} น.</p>
                </div>

                <div class="text-right">
                  <span class="text-[11px] font-bold px-2.5 py-1 rounded-lg \${ord.order_type === 'dine_in' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-900'}">
                    \${ord.order_type === 'dine_in' ? '🍽️ โต๊ะ ' + ordTable : '🥤 กลับบ้าน'}
                  </span>
                </div>
              </div>

              <!-- Customer Details -->
              <div class="py-2.5 flex items-center justify-between text-xs text-stone-600">
                <span class="font-semibold text-stone-800">👤 \${ord.customer_name}</span>
                \${ordPhone ? \`<span class="text-stone-500">📞 \${ordPhone}</span>\` : ''}
              </div>

              \${ordNotes ? \`
                <div class="bg-amber-100/70 border border-amber-300 text-amber-900 text-xs px-3 py-1.5 rounded-xl mb-3 font-medium">
                  💬 โน้ต: \${ordNotes}
                </div>
              \` : ''}

              <!-- Items List -->
              <div class="space-y-2 py-2">
                \${(ord.items || []).map(item => \`
                  <div class="bg-white/80 p-2.5 rounded-xl border border-stone-200/80 text-xs space-y-1">
                    <div class="flex justify-between font-bold text-stone-900">
                      <span>\${item.item_name}</span>
                      <span class="text-amber-800 font-extrabold">× \${item.quantity}</span>
                    </div>
                    <div class="flex flex-wrap gap-1 text-[10px]">
                      <span class="bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded font-medium">\${item.temperature}</span>
                      <span class="bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded font-medium">หวาน \${item.sweetness}</span>
                      <span class="bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded font-medium">\${item.ice}</span>
                      \${item.toppings ? \`<span class="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">\${item.toppings}</span>\` : ''}
                    </div>
                    \${item.item_notes ? \`<p class="text-[10px] text-stone-400 italic">" \${item.item_notes} "</p>\` : ''}
                  </div>
                \`).join('')}
              </div>
            </div>

            <!-- Bottom Actions -->
            <div class="pt-4 mt-2 border-t border-stone-200/70 space-y-2.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-stone-500">ยอดรวมทั้งสิ้น</span>
                <span class="text-base font-extrabold text-amber-900">฿\${ord.total_amount}</span>
              </div>

              <!-- Action buttons depending on state -->
              <div class="grid grid-cols-1 gap-2 pt-1">
                \${ord.status === 'pending' ? \`
                  <button onclick="updateOrderStatus(\${ord.id}, 'preparing')" class="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5">
                    <span>☕ เริ่มชงออเดอร์นี้</span>
                  </button>
                  <button onclick="updateOrderStatus(\${ord.id}, 'cancelled')" class="w-full py-1.5 text-stone-400 hover:text-red-600 text-[11px] font-medium transition text-center">
                    ยกเลิกออเดอร์
                  </button>
                \` : ''}

                \${ord.status === 'preparing' ? \`
                  <button onclick="updateOrderStatus(\${ord.id}, 'ready')" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-1.5 animate-pulse">
                    <span>🎉 ชงเสร็จแล้ว - พร้อมเสิร์ฟ</span>
                  </button>
                \` : ''}

                \${ord.status === 'ready' ? \`
                  <button onclick="updateOrderStatus(\${ord.id}, 'completed')" class="w-full py-2.5 bg-stone-800 hover:bg-black text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5">
                    <span>✓ ลูกค้ารับเครื่องดื่มแล้ว (ปิดงาน)</span>
                  </button>
                \` : ''}

                \${ord.status === 'completed' ? \`
                  <span class="text-center text-[11px] text-emerald-700 font-semibold py-1">เสร็จสิ้นแล้ว</span>
                \` : ''}

                \${ord.status === 'cancelled' ? \`
                  <span class="text-center text-[11px] text-red-600 font-semibold py-1">ยกเลิกแล้ว</span>
                \` : ''}
              </div>

            </div>

          </div>
        \`;
      }).join('');
    }

    async function updateOrderStatus(orderId, newStatus) {
      try {
        const res = await fetch('/api/admin/orders/' + orderId + '/status', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        const data = await res.json();
        if (data.success) {
          loadDashboardData();
        } else {
          alert('ผิดพลาด: ' + (data.error || 'ไม่สามารถอัปเดตได้'));
        }
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
      }
    }

    // ==========================================
    // Menu & Price Management (CRUD)
    // ==========================================
    let manageMenuItems = [];
    let manageSelectedCat = 0;

    async function openMenuManageModal() {
      try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        if (data.success) {
          manageMenuItems = data.items;
          renderManageMenuList();
          document.getElementById('menuModal').classList.remove('hidden');
        }
      } catch (err) {
        console.error('Failed to load menu for management', err);
      }
    }

    function closeMenuModal() {
      document.getElementById('menuModal').classList.add('hidden');
    }

    function filterManageMenu(catId) {
      manageSelectedCat = catId;
      document.querySelectorAll('.mcat-btn').forEach(b => {
        b.classList.remove('bg-amber-800', 'text-white', 'shadow-sm', 'font-bold');
        b.classList.add('text-stone-600', 'bg-stone-100');
      });
      const active = document.getElementById('mcat-' + catId);
      if (active) {
        active.classList.remove('text-stone-600', 'bg-stone-100');
        active.classList.add('bg-amber-800', 'text-white', 'shadow-sm', 'font-bold');
      }
      renderManageMenuList();
    }

    function renderManageMenuList() {
      const list = document.getElementById('menuManageList');
      const filtered = manageSelectedCat === 0
        ? manageMenuItems
        : manageMenuItems.filter(i => i.category_id === manageSelectedCat);

      if (filtered.length === 0) {
        list.innerHTML = '<p class="text-center text-stone-400 py-10 text-xs">ไม่มีเมนูในหมวดนี้</p>';
        return;
      }

      list.innerHTML = filtered.map(item => \`
        <div class="pt-3 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-stone-50/80 p-2 rounded-2xl transition">
          
          <!-- Image & Name & Description -->
          <div class="flex items-center gap-3">
            <img src="\${item.image_url}" alt="\${item.name}" class="w-12 h-12 rounded-xl object-cover bg-stone-100 border border-stone-200 shadow-sm flex-shrink-0">
            <div>
              <div class="flex items-center gap-2">
                <h5 class="font-bold text-xs sm:text-sm text-stone-900">\${item.name}</h5>
                <span class="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">
                  \${item.category_name || ''}
                </span>
              </div>
              <p class="text-[11px] text-stone-400 line-clamp-1 mt-0.5">\${item.description || '-'}</p>
            </div>
          </div>

          <!-- Price & Action Buttons -->
          <div class="flex items-center justify-between sm:justify-end gap-2 flex-wrap">
            
            <!-- Price Display & Quick Edit Button -->
            <div class="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
              <span class="text-xs font-bold text-amber-900">฿\${item.price}</span>
              <button onclick="quickEditPrice(\${item.id}, \${item.price}, '\${item.name}')" class="text-[11px] text-amber-700 hover:text-amber-900 font-semibold underline ml-1" title="เปลี่ยนราคา">
                แก้ไขราคา
              </button>
            </div>

            <!-- In Stock / Out of Stock Toggle -->
            <button onclick="toggleMenuItem(\${item.id})" class="text-xs px-2.5 py-1 rounded-xl font-bold transition \${item.is_available ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300' : 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-300'}">
              \${item.is_available ? '✓ พร้อมขาย' : '✕ ของหมด'}
            </button>

            <!-- Edit Details Button -->
            <button onclick="openEditMenuModal(\${item.id})" class="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-2.5 py-1 rounded-xl font-medium transition flex items-center gap-1 border border-stone-200">
              <span>✏️</span> แก้ไข
            </button>

            <!-- Delete Button -->
            <button onclick="deleteMenuItem(\${item.id}, '\${item.name}')" class="text-xs bg-stone-50 hover:bg-red-50 text-stone-400 hover:text-red-600 p-1.5 rounded-xl transition" title="ลบเมนูนี้">
              🗑️
            </button>

          </div>

        </div>
      \`).join('');
    }

    // Quick Edit Price
    async function quickEditPrice(id, currentPrice, name) {
      const newPriceStr = prompt('ระบุราคาใหม่สำหรับ "' + name + '" (บาท):', currentPrice);
      if (newPriceStr === null) return; // User cancelled

      const newPrice = Number(newPriceStr.trim());
      if (isNaN(newPrice) || newPrice < 0) {
        alert('กรุณากรอกตัวเลขราคาที่ถูกต้อง');
        return;
      }

      try {
        const res = await fetch('/api/admin/menu/' + id + '/price', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ price: newPrice })
        });
        const data = await res.json();
        if (data.success) {
          const item = manageMenuItems.find(i => i.id === id);
          if (item) item.price = newPrice;
          renderManageMenuList();
        } else {
          alert('เกิดข้อผิดพลาด: ' + (data.error || 'ไม่สามารถแก้ไขราคาได้'));
        }
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
      }
    }

    // Toggle stock availability
    async function toggleMenuItem(id) {
      try {
        const res = await fetch('/api/admin/menu/' + id + '/toggle', { method: 'PATCH' });
        const data = await res.json();
        if (data.success) {
          const item = manageMenuItems.find(i => i.id === id);
          if (item) item.is_available = data.is_available;
          renderManageMenuList();
        }
      } catch (err) {
        console.error(err);
      }
    }

    // Open Add or Edit Modal
    function openEditMenuModal(itemId) {
      const modal = document.getElementById('editMenuModal');
      const title = document.getElementById('editModalTitle');
      const form = document.getElementById('menuItemForm');
      form.reset();

      if (itemId) {
        // Edit Mode
        const item = manageMenuItems.find(i => i.id === itemId);
        if (!item) return;

        title.innerText = 'แก้ไขเมนู: ' + item.name;
        document.getElementById('formMenuId').value = item.id;
        document.getElementById('formMenuName').value = item.name;
        document.getElementById('formMenuCategory').value = item.category_id;
        document.getElementById('formMenuPrice').value = item.price;
        document.getElementById('formMenuDesc').value = item.description || '';
        document.getElementById('formMenuImg').value = item.image_url || '';
        document.getElementById('formMenuAvailable').checked = item.is_available === 1;
      } else {
        // Add Mode
        title.innerText = 'เพิ่มเมนูเครื่องดื่มใหม่';
        document.getElementById('formMenuId').value = '';
        document.getElementById('formMenuCategory').value = '1';
        document.getElementById('formMenuPrice').value = '50';
        document.getElementById('formMenuAvailable').checked = true;
      }

      modal.classList.remove('hidden');
    }

    function closeEditMenuModal() {
      document.getElementById('editMenuModal').classList.add('hidden');
    }

    // Handle Add / Edit Form Submission
    async function handleMenuFormSubmit(e) {
      e.preventDefault();
      const id = document.getElementById('formMenuId').value;
      const name = document.getElementById('formMenuName').value.trim();
      const categoryId = Number(document.getElementById('formMenuCategory').value);
      const price = Number(document.getElementById('formMenuPrice').value);
      const description = document.getElementById('formMenuDesc').value.trim();
      const imageUrl = document.getElementById('formMenuImg').value.trim();
      const isAvailable = document.getElementById('formMenuAvailable').checked ? 1 : 0;

      const payload = {
        name,
        category_id: categoryId,
        price,
        description,
        image_url: imageUrl || undefined,
        is_available: isAvailable
      };

      const saveBtn = document.getElementById('saveMenuBtn');
      saveBtn.disabled = true;
      saveBtn.innerText = 'กำลังบันทึก...';

      try {
        let res;
        if (id) {
          // Update existing
          res = await fetch('/api/admin/menu/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        } else {
          // Create new
          res = await fetch('/api/admin/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        }

        const data = await res.json();
        if (data.success) {
          closeEditMenuModal();
          // Reload menu
          await openMenuManageModal();
        } else {
          alert('เกิดข้อผิดพลาด: ' + (data.error || 'ไม่สามารถบันทึกได้'));
        }
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
      } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<span>💾</span> บันทึกข้อมูลเมนู';
      }
    }

    // Delete Menu Item
    async function deleteMenuItem(id, name) {
      if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบเมนู "' + name + '" ? (การลบจะไม่สามารถกู้คืนได้)')) {
        return;
      }

      try {
        const res = await fetch('/api/admin/menu/' + id, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          manageMenuItems = manageMenuItems.filter(i => i.id !== id);
          renderManageMenuList();
        } else {
          alert('ผิดพลาด: ' + (data.error || 'ไม่สามารถลบได้'));
        }
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
      }
    }

    // Auto-polling dashboard every 4s
    loadDashboardData();
    setInterval(loadDashboardData, 4000);
  </script>
</body>
</html>`;
}
