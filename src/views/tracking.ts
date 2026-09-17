export function renderTrackingPage(orderCode: string): string {
  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ติดตามสถานะออเดอร์ #${orderCode} | Crafted Cafe</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Prompt', sans-serif; }
    @keyframes pulse-ring {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 15px rgba(217, 119, 6, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(217, 119, 6, 0); }
    }
    .pulse-amber { animation: pulse-ring 2s infinite cubic-bezier(0.4, 0, 0.6, 1); }
    
    @keyframes pulse-ready {
      0% { transform: scale(0.98); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.8); }
      70% { transform: scale(1.02); box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
      100% { transform: scale(0.98); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }
    .pulse-ready { animation: pulse-ready 1.8s infinite cubic-bezier(0.4, 0, 0.6, 1); }
  </style>
</head>
<body class="bg-stone-50 text-stone-800 min-h-screen py-8 px-4 flex flex-col items-center justify-start">

  <div class="w-full max-w-md space-y-5">
    
    <!-- Top Nav -->
    <div class="flex items-center justify-between">
      <a href="/" class="text-xs text-amber-800 hover:text-amber-900 bg-amber-100/70 hover:bg-amber-100 px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1">
        <span>←</span> สั่งเพิ่ม / หน้าแรก
      </a>
      <span class="text-[11px] text-stone-400 flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        อัปเดตอัตโนมัติทุก 3 วินาที
      </span>
    </div>

    <!-- Main Status Card -->
    <div id="statusCard" class="bg-white rounded-3xl p-6 shadow-xl border border-stone-100 text-center transition-all duration-300">
      
      <!-- Order Code Header -->
      <div class="inline-block bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full mb-3">
        <p class="text-xs font-semibold text-amber-900">หมายเลขออเดอร์ของคุณ</p>
      </div>
      <h1 class="text-5xl font-extrabold text-stone-900 tracking-wider">#${orderCode}</h1>
      
      <p id="customerGreet" class="text-sm text-stone-500 mt-2 font-medium">กำลังโหลดข้อมูล...</p>

      <!-- Dynamic Status Badge & Icon -->
      <div class="my-6">
        <div id="statusIconWrap" class="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl shadow-md transition-all duration-500 bg-amber-100 text-amber-800">
          ⏳
        </div>
        <h2 id="statusTitle" class="text-2xl font-bold mt-4 text-stone-900">กำลังตรวจสอบสถานะ</h2>
        <p id="statusSubtitle" class="text-xs text-stone-500 mt-1 max-w-xs mx-auto">ระบบกำลังเชื่อมต่อไปยังบาริสต้า...</p>
      </div>

      <!-- Stepper Progress Bar -->
      <div class="mt-8 pt-6 border-t border-stone-100">
        <div class="grid grid-cols-4 gap-2 text-center relative">
          <!-- Connector line -->
          <div class="absolute top-4 left-6 right-6 h-1 bg-stone-100 -z-0">
            <div id="progressLine" class="h-full bg-amber-600 transition-all duration-500" style="width: 15%;"></div>
          </div>

          <!-- Step 1: Pending -->
          <div class="relative z-10 flex flex-col items-center">
            <div id="step-node-pending" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-amber-600 text-white shadow">
              1
            </div>
            <span class="text-[10px] mt-1.5 font-medium text-stone-600">รับออเดอร์</span>
          </div>

          <!-- Step 2: Preparing -->
          <div class="relative z-10 flex flex-col items-center">
            <div id="step-node-preparing" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-stone-200 text-stone-500">
              2
            </div>
            <span class="text-[10px] mt-1.5 font-medium text-stone-500">กำลังชง</span>
          </div>

          <!-- Step 3: Ready -->
          <div class="relative z-10 flex flex-col items-center">
            <div id="step-node-ready" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-stone-200 text-stone-500">
              3
            </div>
            <span class="text-[10px] mt-1.5 font-medium text-stone-500">พร้อมเสิร์ฟ</span>
          </div>

          <!-- Step 4: Completed -->
          <div class="relative z-10 flex flex-col items-center">
            <div id="step-node-completed" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-stone-200 text-stone-500">
              4
            </div>
            <span class="text-[10px] mt-1.5 font-medium text-stone-500">เรียบร้อย</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Ready Alert Banner (Hidden by default, shown when Ready) -->
    <div id="readyBanner" class="hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-5 rounded-3xl shadow-xl pulse-ready text-center">
      <span class="text-3xl">🎉</span>
      <h3 class="text-xl font-bold mt-1">เครื่องดื่มพร้อมเสิร์ฟแล้ว!</h3>
      <p id="pickupNote" class="text-xs text-emerald-100 mt-1">กรุณาแจ้งหมายเลข <strong class="underline font-extrabold text-white">#${orderCode}</strong> ที่เคาน์เตอร์เพื่อรับเครื่องดื่ม</p>
    </div>

    <!-- Order Items Summary Card -->
    <div class="bg-white rounded-3xl p-5 shadow-sm border border-stone-100">
      <div class="flex items-center justify-between pb-3 border-b border-stone-100">
        <h4 class="font-bold text-sm text-stone-800">รายละเอียดเครื่องดื่ม</h4>
        <span id="orderTypeBadge" class="text-[11px] px-2.5 py-0.5 rounded-full font-semibold bg-stone-100 text-stone-600">
          -
        </span>
      </div>

      <div id="itemsContainer" class="py-3 space-y-3 divide-y divide-stone-50">
        <!-- Rendered via JS -->
      </div>

      <div class="pt-3 border-t border-stone-100 flex justify-between items-baseline">
        <span class="text-xs font-medium text-stone-500">ยอดชำระ</span>
        <span id="totalAmountText" class="text-xl font-bold text-amber-800">฿0</span>
      </div>
    </div>

    <!-- Help / Footer -->
    <div class="text-center text-xs text-stone-400 pt-2">
      <p>มีข้อสงสัยหรือต้องการแก้ไขออเดอร์ กรุณาติดต่อบาริสต้าที่หน้าเคาน์เตอร์</p>
    </div>

  </div>

  <script>
    const orderCode = '${orderCode}';
    let previousStatus = null;
    let hasPlayedSound = false;

    // Optional audio chime on ready
    function playBeep() {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
      } catch (e) {
        console.log('Audio not allowed yet without user interaction');
      }
    }

    async function fetchStatus() {
      try {
        const res = await fetch('/api/orders/' + orderCode);
        const data = await res.json();
        if (data.success && data.order) {
          updateUI(data.order);
        } else {
          document.getElementById('statusTitle').innerText = 'ไม่พบข้อมูลออเดอร์';
          document.getElementById('statusSubtitle').innerText = data.error || '';
        }
      } catch (err) {
        console.error('Fetch status error', err);
      }
    }

    function updateUI(order) {
      document.getElementById('customerGreet').innerText = 
        'ผู้สั่ง: ' + order.customer_name + (order.table_no ? ' (โต๊ะ ' + order.table_no + ')' : '');

      const typeBadge = document.getElementById('orderTypeBadge');
      if (order.order_type === 'dine_in') {
        typeBadge.innerText = '🍽️ ทานที่ร้าน (โต๊ะ ' + (order.table_no || '-') + ')';
        typeBadge.className = 'text-[11px] px-2.5 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-700';
      } else {
        typeBadge.innerText = '🥤 สั่งกลับบ้าน';
        typeBadge.className = 'text-[11px] px-2.5 py-0.5 rounded-full font-semibold bg-amber-50 text-amber-800';
      }

      document.getElementById('totalAmountText').innerText = '฿' + order.total_amount;

      // Render items
      if (order.items && order.items.length > 0) {
        const itemsContainer = document.getElementById('itemsContainer');
        itemsContainer.innerHTML = order.items.map(item => \`
          <div class="pt-2 first:pt-0 flex justify-between items-start text-xs">
            <div>
              <p class="font-bold text-stone-800">\${item.item_name} × \${item.quantity}</p>
              <p class="text-stone-500 text-[11px] mt-0.5">
                \${item.temperature} | หวาน \${item.sweetness} | \${item.ice}
                \${item.toppings ? ' | <span class="text-amber-700 font-medium">' + item.toppings + '</span>' : ''}
              </p>
              \${item.item_notes ? '<p class="text-stone-400 text-[10px]">โน้ต: ' + item.item_notes + '</p>' : ''}
            </div>
            <span class="font-semibold text-stone-700">฿\${item.unit_price * item.quantity}</span>
          </div>
        \`).join('');
      }

      const status = order.status;
      const statusIconWrap = document.getElementById('statusIconWrap');
      const statusTitle = document.getElementById('statusTitle');
      const statusSubtitle = document.getElementById('statusSubtitle');
      const readyBanner = document.getElementById('readyBanner');
      const progressLine = document.getElementById('progressLine');

      // Reset nodes
      const nodes = ['pending', 'preparing', 'ready', 'completed'];
      nodes.forEach(n => {
        const el = document.getElementById('step-node-' + n);
        el.className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-stone-200 text-stone-500';
      });

      statusIconWrap.classList.remove('pulse-amber', 'pulse-ready');

      if (status === 'pending') {
        statusIconWrap.innerHTML = '📋';
        statusIconWrap.className = 'w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl shadow-md bg-amber-100 text-amber-800';
        statusTitle.innerText = 'ได้รับออเดอร์แล้ว';
        statusSubtitle.innerText = 'ออเดอร์ถูกส่งไปยังบาริสต้าแล้ว รอเริ่มชงสักครู่ครับ';
        progressLine.style.width = '15%';
        setNodeActive('pending');
        readyBanner.classList.add('hidden');
      } 
      else if (status === 'preparing') {
        statusIconWrap.innerHTML = '☕';
        statusIconWrap.className = 'w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl shadow-lg bg-amber-500 text-white pulse-amber';
        statusTitle.innerText = 'กำลังดำเนินการชง...';
        statusSubtitle.innerText = 'บาริสต้ากำลังตั้งใจปรุงเครื่องดื่มสูตรพิเศษให้คุณ';
        progressLine.style.width = '48%';
        setNodeDone('pending');
        setNodeActive('preparing');
        readyBanner.classList.add('hidden');
      } 
      else if (status === 'ready') {
        statusIconWrap.innerHTML = '🎉';
        statusIconWrap.className = 'w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl shadow-xl bg-emerald-500 text-white pulse-ready';
        statusTitle.innerText = 'พร้อมเสิร์ฟแล้ว!';
        statusSubtitle.innerText = 'เครื่องดื่มของคุณชงเสร็จเรียบร้อยแล้ว เชิญรับได้เลยครับ';
        progressLine.style.width = '78%';
        setNodeDone('pending');
        setNodeDone('preparing');
        setNodeActive('ready');
        readyBanner.classList.remove('hidden');

        if (previousStatus !== 'ready' && !hasPlayedSound) {
          playBeep();
          hasPlayedSound = true;
        }
      } 
      else if (status === 'completed') {
        statusIconWrap.innerHTML = '✅';
        statusIconWrap.className = 'w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl bg-stone-100 text-emerald-600';
        statusTitle.innerText = 'รับเครื่องดื่มเรียบร้อย';
        statusSubtitle.innerText = 'ขอบคุณที่ใช้บริการ ขอให้มีความสุขกับเครื่องดื่มแก้วโปรดครับ';
        progressLine.style.width = '100%';
        nodes.forEach(n => setNodeDone(n));
        readyBanner.classList.add('hidden');
      } 
      else if (status === 'cancelled') {
        statusIconWrap.innerHTML = '✕';
        statusIconWrap.className = 'w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl bg-red-100 text-red-600';
        statusTitle.innerText = 'ออเดอร์นี้ถูกยกเลิก';
        statusSubtitle.innerText = 'หากมีข้อสงสัย กรุณาติดต่อบาริสต้าที่เคาน์เตอร์';
        readyBanner.classList.add('hidden');
      }

      previousStatus = status;
    }

    function setNodeActive(name) {
      const el = document.getElementById('step-node-' + name);
      el.className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-amber-600 text-white shadow-md ring-4 ring-amber-100';
    }

    function setNodeDone(name) {
      const el = document.getElementById('step-node-' + name);
      el.className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-emerald-600 text-white shadow';
      el.innerHTML = '✓';
    }

    // Initial fetch + interval polling every 3s
    fetchStatus();
    setInterval(fetchStatus, 3000);
  </script>
</body>
</html>`;
}
