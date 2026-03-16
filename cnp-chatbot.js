(function() {
  'use strict';

  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Source+Sans+3:wght@300;400;500;600&display=swap';
  document.head.appendChild(font);

  var style = document.createElement('style');
  style.textContent = `
    :root {
      --cnp-purple: #6b21a8;
      --cnp-purple-dark: #4a0e7a;
      --cnp-purple-mid: #7c3aed;
      --cnp-pink: #c026a0;
      --cnp-pink-light: #e879d4;
      --cnp-gold: #f5c842;
      --cnp-gold-dark: #d4a017;
      --cnp-purple-pale: #f3e8ff;
      --cnp-cream: #fdf8ff;
      --cnp-white: #ffffff;
      --cnp-charcoal: #1e1033;
      --cnp-muted: #7c6a9a;
    }

    /* ── Animated Bubble ── */
    #cnp-bubble {
      position: fixed;
      bottom: 36px;
      right: 102px;
      background: white;
      border-radius: 20px 20px 4px 20px;
      padding: 10px 16px;
      box-shadow: 0 8px 32px rgba(107,33,168,0.2);
      border: 1.5px solid rgba(107,33,168,0.15);
      z-index: 999998;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: cnp-bubble-in 0.5s cubic-bezier(.34,1.56,.64,1) forwards;
      cursor: pointer;
      max-width: 220px;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    #cnp-bubble:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(107,33,168,0.28); }
    #cnp-bubble.cnp-bubble-hide {
      animation: cnp-bubble-out 0.3s ease forwards;
      pointer-events: none;
    }
    @keyframes cnp-bubble-in {
      from { opacity: 0; transform: translateX(20px) scale(0.85); }
      to   { opacity: 1; transform: translateX(0) scale(1); }
    }
    @keyframes cnp-bubble-out {
      from { opacity: 1; transform: translateX(0) scale(1); }
      to   { opacity: 0; transform: translateX(20px) scale(0.85); }
    }
    .cnp-bubble-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #7fff7f;
      flex-shrink: 0;
      animation: cnp-blink 2.2s ease-in-out infinite;
    }
    .cnp-bubble-text {
      font-family: 'Source Sans 3', sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: #4a0e7a;
      line-height: 1.3;
    }
    .cnp-bubble-text span {
      display: block;
      font-size: 11px;
      color: #7c6a9a;
      font-weight: 400;
      margin-top: 1px;
    }
    #cnp-bubble-close {
      position: absolute;
      top: -6px; right: -6px;
      width: 18px; height: 18px;
      border-radius: 50%;
      background: #e879d4;
      border: none;
      color: white;
      font-size: 10px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      line-height: 1;
      padding: 0;
    }
    #cnp-bubble::after {
      content: '';
      position: absolute;
      bottom: 10px;
      right: -8px;
      width: 0; height: 0;
      border-top: 8px solid transparent;
      border-bottom: 0px solid transparent;
      border-left: 8px solid white;
    }

    /* ── Toggle Button ── */
    #cnp-toggle {
      position: fixed; bottom: 28px; right: 28px;
      width: 64px; height: 64px; border-radius: 50%;
      background: linear-gradient(145deg, var(--cnp-purple), var(--cnp-pink));
      border: none; cursor: pointer;
      box-shadow: 0 8px 32px rgba(107,33,168,0.45);
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s;
      z-index: 999999; overflow: hidden;
    }
    #cnp-toggle:hover { transform: scale(1.1); box-shadow: 0 14px 40px rgba(192,38,160,0.5); }
    #cnp-toggle::before {
      content: ''; position: absolute; inset: -3px; border-radius: 50%;
      border: 2px solid var(--cnp-pink-light);
      animation: cnp-ripple 2.8s ease-out infinite; opacity: 0;
    }
    @keyframes cnp-ripple { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.6);opacity:0} }
    #cnp-toggle .cnp-chat-icon { transition: opacity 0.25s, transform 0.25s; }
    #cnp-toggle .cnp-close-icon { position:absolute; opacity:0; transform:rotate(-90deg) scale(0.7); transition:opacity .25s,transform .25s; }
    #cnp-toggle.open .cnp-chat-icon { opacity:0; transform:rotate(90deg) scale(0.7); }
    #cnp-toggle.open .cnp-close-icon { opacity:1; transform:rotate(0deg) scale(1); }

    /* ── Chat Window ── */
    #cnp-chat {
      position: fixed; bottom: 106px; right: 28px;
      width: 385px; max-width: calc(100vw - 40px);
      height: 480px; max-height: calc(100vh - 120px);
      background: var(--cnp-cream); border-radius: 18px;
      box-shadow: 0 24px 64px rgba(107,33,168,0.22);
      display: flex; flex-direction: column; overflow: hidden;
      z-index: 999998; opacity: 0; transform: translateY(18px) scale(0.97); pointer-events: none;
      transition: opacity .32s cubic-bezier(.4,0,.2,1), transform .38s cubic-bezier(.34,1.56,.64,1);
      border: 1px solid rgba(107,33,168,0.12);
      font-family: 'Source Sans 3', sans-serif;
    }
    #cnp-chat.cnp-visible { opacity:1; transform:translateY(0) scale(1); pointer-events:all; }

    .cnp-header {
      background: linear-gradient(135deg, #4a0e7a 0%, #6b21a8 50%, #c026a0 100%);
      padding: 16px 18px 0; color: #fff; flex-shrink: 0;
      position: relative; overflow: hidden;
    }
    .cnp-header::before {
      content:''; position:absolute; top:-50px; right:-50px;
      width:160px; height:160px; border-radius:50%;
      background:rgba(245,200,66,.08);
    }
    .cnp-header-top { display:flex; align-items:center; gap:12px; position:relative; z-index:1; }
    .cnp-logo-wrap {
      width:46px; height:46px; border-radius:10px;
      background:rgba(255,255,255,.15); border:1.5px solid rgba(245,200,66,.5);
      display:flex; align-items:center; justify-content:center;
      flex-shrink:0; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,.2);
    }
    .cnp-logo-wrap img { width:38px; height:38px; object-fit:contain; }
    .cnp-header-info h3 { font-family:'Lora',serif; font-size:15px; font-weight:600; letter-spacing:0.3px; }
    .cnp-header-info .cnp-tagline { font-size:11px; opacity:.75; margin-top:2px; font-weight:300; }
    .cnp-status-pill {
      display:inline-flex; align-items:center; gap:5px;
      background:rgba(255,255,255,.12); border:1px solid rgba(245,200,66,.35);
      border-radius:20px; padding:4px 10px; font-size:11px; font-weight:500;
      margin-top:10px; position:relative; z-index:1;
    }
    .cnp-status-dot { width:6px; height:6px; border-radius:50%; background:#7fff7f; animation:cnp-blink 2.2s ease-in-out infinite; }
    @keyframes cnp-blink { 0%,100%{opacity:1} 50%{opacity:.3} }
    .cnp-gold-bar { height:3px; background:linear-gradient(90deg,transparent,#f5c842,#d4a017,transparent); margin-top:12px; }

    .cnp-messages {
      flex:1; overflow-y:auto; padding:16px 14px;
      display:flex; flex-direction:column; gap:11px; scroll-behavior:smooth;
    }
    .cnp-messages::-webkit-scrollbar{width:4px}
    .cnp-messages::-webkit-scrollbar-thumb{background:#d8b4fe;border-radius:2px}
    .cnp-msg { display:flex; gap:8px; animation:cnp-msgIn .28s cubic-bezier(.34,1.56,.64,1); }
    @keyframes cnp-msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    .cnp-msg.cnp-user { flex-direction:row-reverse; }
    .cnp-msg-avatar {
      width:30px; height:30px; border-radius:50%;
      display:flex; align-items:center; justify-content:center;
      flex-shrink:0; margin-top:2px; overflow:hidden; font-size:10px; font-weight:700;
    }
    .cnp-msg.cnp-bot .cnp-msg-avatar { background:#f3e8ff; border:1.5px solid rgba(107,33,168,.2); padding:3px; }
    .cnp-msg.cnp-bot .cnp-msg-avatar img { width:100%; height:100%; object-fit:contain; }
    .cnp-msg.cnp-user .cnp-msg-avatar { background:linear-gradient(135deg,#6b21a8,#c026a0); color:#fff; }
    .cnp-msg-col { display:flex; flex-direction:column; max-width:90%; }
    .cnp-msg.cnp-user .cnp-msg-col { align-items:flex-end; }
    .cnp-msg-bubble { padding:10px 13px; border-radius:14px; font-size:13.5px; line-height:1.58; color:#1e1033; }
    .cnp-msg.cnp-bot .cnp-msg-bubble { background:#fff; border-radius:4px 14px 14px 14px; box-shadow:0 2px 10px rgba(107,33,168,.1); border:1px solid rgba(107,33,168,.08); }
    .cnp-msg.cnp-user .cnp-msg-bubble { background:linear-gradient(135deg,#6b21a8,#c026a0); color:#fff; border-radius:14px 4px 14px 14px; }
    .cnp-msg-time { font-size:10px; color:#7c6a9a; margin-top:3px; padding:0 4px; }

    .cnp-msg-bubble ul { padding-left:18px; margin:0; list-style:disc; }
    .cnp-msg-bubble ol { padding-left:18px; margin:0; list-style:decimal; }
    .cnp-msg-bubble li { margin:0; line-height:1.5; }
    .cnp-msg-bubble strong { font-weight:600; color:#4a0e7a; }
    .cnp-msg.cnp-user .cnp-msg-bubble strong { color:#fff; }
    .cnp-msg-bubble a { color:#6b21a8; text-decoration:underline; }
    .cnp-msg.cnp-user .cnp-msg-bubble a { color:#f5c842; }

    /* ── Course Series Buttons (Professional) ── */
    .cnp-series-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:10px; }
    .cnp-series-btn {
      background:linear-gradient(135deg,#f3e8ff,#fdf8ff);
      border:1.5px solid rgba(107,33,168,0.25); border-radius:12px;
      padding:12px 10px; cursor:pointer;
      font-family:'Source Sans 3',sans-serif; font-size:12px; font-weight:600;
      color:#4a0e7a; text-align:center; transition:all 0.2s; line-height:1.4;
    }
    .cnp-series-btn:hover { background:linear-gradient(135deg,#6b21a8,#c026a0); color:#fff; border-color:transparent; transform:translateY(-2px); box-shadow:0 4px 14px rgba(107,33,168,0.3); }
    .cnp-series-label { display:block; font-size:10px; font-weight:400; opacity:0.7; margin-top:3px; }

    .cnp-typing-dots { display:flex; align-items:center; gap:4px; padding:4px 2px; }
    .cnp-typing-dots span { width:7px; height:7px; border-radius:50%; background:#e879d4; animation:cnp-bounce 1.3s ease-in-out infinite; }
    .cnp-typing-dots span:nth-child(2){animation-delay:.16s}
    .cnp-typing-dots span:nth-child(3){animation-delay:.32s}
    @keyframes cnp-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-7px)}}

    .cnp-quick-replies { display:flex; flex-wrap:wrap; gap:6px; padding:2px 14px 10px; }
    .cnp-quick-btn {
      background:#fff; border:1.5px solid rgba(107,33,168,.25); color:#6b21a8;
      border-radius:20px; padding:5px 12px; font-size:12px;
      font-family:'Source Sans 3',sans-serif; cursor:pointer; font-weight:500; transition:all .2s;
    }
    .cnp-quick-btn:hover { background:linear-gradient(135deg,#6b21a8,#c026a0); color:#fff; border-color:transparent; transform:translateY(-1px); }

    .cnp-input-area { padding:10px 14px 14px; background:#fff; border-top:1px solid rgba(107,33,168,.1); flex-shrink:0; }
    .cnp-input-row {
      display:flex; align-items:flex-end; gap:8px;
      background:#fdf8ff; border:1.5px solid rgba(107,33,168,.2);
      border-radius:12px; padding:8px 8px 8px 14px; transition:border-color .2s,box-shadow .2s;
    }
    .cnp-input-row:focus-within { border-color:#7c3aed; box-shadow:0 0 0 3px rgba(124,58,237,.1); }
    #cnp-input {
      flex:1; border:none; background:transparent;
      font-family:'Source Sans 3',sans-serif; font-size:13.5px;
      color:#1e1033; resize:none; outline:none; max-height:88px; min-height:22px; line-height:1.5;
    }
    #cnp-input::placeholder { color:#c4a8e0; }
    #cnp-send-btn {
      width:36px; height:36px; border-radius:9px;
      background:linear-gradient(135deg,#6b21a8,#c026a0);
      border:none; cursor:pointer; display:flex; align-items:center; justify-content:center;
      flex-shrink:0; transition:transform .2s,box-shadow .2s,opacity .2s;
    }
    #cnp-send-btn:hover { transform:scale(1.08); box-shadow:0 4px 14px rgba(192,38,160,.45); }
    #cnp-send-btn:disabled { opacity:.35; cursor:not-allowed; transform:none; }
    .cnp-footer-bar { display:flex; align-items:center; justify-content:center; gap:5px; margin-top:7px; }
    .cnp-powered { font-size:10px; color:#b09cc8; letter-spacing:.3px; }
    .cnp-footer-dot { width:3px; height:3px; border-radius:50%; background:#d8b4fe; }

    @media(max-width:480px){
      #cnp-chat{right:10px;bottom:88px;width:calc(100vw - 20px)}
      #cnp-toggle{right:14px;bottom:14px}
      #cnp-bubble{right:90px;bottom:30px;max-width:180px;}
    }
  `;
  document.head.appendChild(style);

  var LOGO = 'https://www.nutritional-psychology.org/wp-content/uploads/2022/04/cnp-logo.png';
  var WEBHOOK = 'https://jahanworkspace.app.n8n.cloud/webhook/185d65c5-4a4d-4b2e-9ce2-3e3282a971b4/chat';
  var QUESTIONS = ['What is nutritional psychology?','How can I join CNP?','What courses do you offer?','Tell me about CNP research'];

  // ── CHANGE 1: Replaced number emojis with clean professional text labels ──
  var COURSE_SERIES = {
    'NP 100 Series': {
      label: 'NP 100 Series',
      sublabel: 'Introductory Certificate',
      courses: [
        { name: 'NP 110: Introduction to Nutritional Psychology Methods', url: 'https://www.nutritional-psychology.org/education/np-110/' },
        { name: 'NP 120 Part I: Microbes in our Gut', url: 'https://www.nutritional-psychology.org/np-120/np-120-part-1/' },
        { name: 'NP 120 Part II: The Gut Microbiota and Mental Health', url: 'https://www.nutritional-psychology.org/np-120/np-120-part-2/' },
        { name: 'NP 150 Part I: Mechanisms in the Diet-Mental Health Relationship', url: 'https://www.nutritional-psychology.org/education/np-150-part-1/' },
        { name: 'NP 150 Part II: Mechanisms in the DMHR (Continued)', url: 'https://www.nutritional-psychology.org/np-150/np-150-part-2/' },
      ]
    },
    'NP 300 Series': {
      label: 'NP 300 Series',
      sublabel: 'Advanced Certificate',
      courses: [
        { name: 'NP 300', url: 'https://www.nutritional-psychology.org/np-300/' },
        { name: 'NP 310', url: 'https://www.nutritional-psychology.org/np-310/' },
        { name: 'NP 320', url: 'https://www.nutritional-psychology.org/np-320/' },
      ]
    },
    'NP 500 Series': {
      label: 'NP 500 Series',
      sublabel: 'Professional Development',
      courses: [
        { name: 'NP 500', url: 'https://www.nutritional-psychology.org/np-500/' },
        { name: 'NP 510', url: 'https://www.nutritional-psychology.org/np-510/' },
      ]
    },
    'Special Programs': {
      label: 'Special Programs',
      sublabel: 'Micro-Degree & More',
      courses: [
        { name: 'NP-FMA Micro-Degree in Nutritional Psychology', url: 'https://www.nutritional-psychology.org/micro-degree/' },
      ]
    }
  };

  // ── Animated Bubble ──
  var bubble = document.createElement('div');
  bubble.id = 'cnp-bubble';
  bubble.innerHTML = `
    <button id="cnp-bubble-close" onclick="event.stopPropagation(); this.parentNode.classList.add('cnp-bubble-hide'); setTimeout(function(){document.getElementById('cnp-bubble').style.display='none'},300)">✕</button>
    <div class="cnp-bubble-dot"></div>
    <div class="cnp-bubble-text">
      💬 Ask CNP Assistant
      <span>Nutrition & Mental Health AI</span>
    </div>
  `;
  bubble.onclick = function() {
    openChat();
    bubble.classList.add('cnp-bubble-hide');
    setTimeout(function(){ bubble.style.display = 'none'; }, 300);
  };
  document.body.appendChild(bubble);

  setTimeout(function() {
    if (bubble.style.display !== 'none') {
      bubble.classList.add('cnp-bubble-hide');
      setTimeout(function(){ bubble.style.display = 'none'; }, 300);
    }
  }, 8000);

  var btn = document.createElement('button');
  btn.id = 'cnp-toggle';
  btn.setAttribute('aria-label','Open CNP chat');
  btn.innerHTML = `
    <svg class="cnp-chat-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
    <svg class="cnp-close-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>`;
  document.body.appendChild(btn);

  var win = document.createElement('div');
  win.id = 'cnp-chat';
  win.setAttribute('role','dialog');
  win.innerHTML = `
    <div class="cnp-header">
      <div class="cnp-header-top">
        <div class="cnp-logo-wrap">
          <img src="${LOGO}" alt="CNP" onerror="this.parentNode.textContent='🧠'"/>
        </div>
        <div class="cnp-header-info">
          <h3>CNP AI Assistant</h3>
          <div class="cnp-tagline">Center for Nutritional Psychology</div>
        </div>
      </div>
      <div class="cnp-status-pill">
        <div class="cnp-status-dot"></div>
        <span>Online · Ready to help</span>
      </div>
      <div class="cnp-gold-bar"></div>
    </div>
    <div class="cnp-messages" id="cnp-msgs"></div>
    <div class="cnp-quick-replies" id="cnp-quick"></div>
    <div class="cnp-input-area">
      <div class="cnp-input-row">
        <textarea id="cnp-input" placeholder="Ask about nutrition & mental health..." rows="1"></textarea>
        <button id="cnp-send-btn" aria-label="Send">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
      <div class="cnp-footer-bar">
        <span class="cnp-powered">Powered by AI</span>
        <div class="cnp-footer-dot"></div>
        <span class="cnp-powered">nutritional-psychology.org</span>
      </div>
    </div>`;
  document.body.appendChild(win);

  var quickDiv = document.getElementById('cnp-quick');
  var quickShown = true;
  QUESTIONS.forEach(function(q) {
    var b = document.createElement('button');
    b.className = 'cnp-quick-btn';
    b.textContent = q;
    b.onclick = function() { sendQuick(q); };
    quickDiv.appendChild(b);
  });

  var msgs    = document.getElementById('cnp-msgs');
  var input   = document.getElementById('cnp-input');
  var sendBtn = document.getElementById('cnp-send-btn');
  var isOpen  = false;

  var sessionId = sessionStorage.getItem('cnp_sid') || (function(){
    var id = 'cnp_' + Math.random().toString(36).substr(2,10) + '_' + Date.now();
    sessionStorage.setItem('cnp_sid', id);
    return id;
  })();

  addMsg('bot', "Hello! 👋 I'm the **CNP AI Assistant**. I can help you explore nutritional psychology, our courses, research, membership, and more.\n\nWhat would you like to know today?");

  function openChat() {
    isOpen = true;
    win.classList.add('cnp-visible');
    btn.classList.add('open');
    setTimeout(function(){ input.focus(); }, 300);
  }

  btn.addEventListener('click', function() {
    isOpen = !isOpen;
    win.classList.toggle('cnp-visible', isOpen);
    btn.classList.toggle('open', isOpen);
    if (isOpen) {
      bubble.classList.add('cnp-bubble-hide');
      setTimeout(function(){ bubble.style.display = 'none'; }, 300);
      setTimeout(function(){ input.focus(); }, 300);
    }
  });

  input.addEventListener('input', function() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 88) + 'px';
  });

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  sendBtn.addEventListener('click', sendMessage);

  function sendQuick(text) {
    quickDiv.style.display = 'none';
    quickShown = false;
    input.value = text;
    sendMessage();
  }

  async function sendMessage() {
    var text = input.value.trim();
    if (!text || sendBtn.disabled) return;
    if (quickShown) { quickDiv.style.display = 'none'; quickShown = false; }
    addMsg('user', text);
    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;
    var tid = addTyping();
    try {
      var res = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sendMessage', sessionId: sessionId, chatInput: text })
      });
      removeTyping(tid);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      var data = await res.json();
      var reply = data.output || data.text || data.message || data.response ||
        (Array.isArray(data) && (data[0]?.output || data[0]?.text)) ||
        'I apologize, I could not process your request.';
      if (reply.trim().includes('SHOW_COURSES')) {
        showCourseSeriesButtons();
      } else {
        addMsg('bot', reply);
      }
    } catch(err) {
      removeTyping(tid);
      addMsg('bot', '⚠️ Connection issue. Please try again.');
    }
    sendBtn.disabled = false;
    input.focus();
  }

  function showCourseSeriesButtons() {
    var wrap = document.createElement('div');
    wrap.className = 'cnp-msg cnp-bot';
    var avatar = document.createElement('div');
    avatar.className = 'cnp-msg-avatar';
    avatar.innerHTML = '<img src="' + LOGO + '" style="width:100%;height:100%;object-fit:contain" onerror="this.parentNode.textContent=\'🧠\'"/>';
    var col = document.createElement('div');
    col.className = 'cnp-msg-col';
    var bub = document.createElement('div');
    bub.className = 'cnp-msg-bubble';
    bub.innerHTML = '<strong>CNP Courses</strong><br>CNP offers 10 courses across 3 series plus special programs.<br>Select a series to explore:';
    var grid = document.createElement('div');
    grid.className = 'cnp-series-grid';
    Object.keys(COURSE_SERIES).forEach(function(seriesName) {
      var series = COURSE_SERIES[seriesName];
      var seriesBtn = document.createElement('button');
      seriesBtn.className = 'cnp-series-btn';
      // ── CHANGE 1: Clean professional labels, no number emojis ──
      seriesBtn.innerHTML = series.label + '<span class="cnp-series-label">' + series.sublabel + '</span>';
      seriesBtn.onclick = function() { showSeriesCourses(seriesName); };
      grid.appendChild(seriesBtn);
    });
    bub.appendChild(grid);
    var time = document.createElement('div');
    time.className = 'cnp-msg-time';
    time.textContent = new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    col.appendChild(bub); col.appendChild(time);
    wrap.appendChild(avatar); wrap.appendChild(col);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showSeriesCourses(seriesName) {
    var series = COURSE_SERIES[seriesName];
    addMsg('user', seriesName);
    var wrap = document.createElement('div');
    wrap.className = 'cnp-msg cnp-bot';
    var avatar = document.createElement('div');
    avatar.className = 'cnp-msg-avatar';
    avatar.innerHTML = '<img src="' + LOGO + '" style="width:100%;height:100%;object-fit:contain" onerror="this.parentNode.textContent=\'🧠\'"/>';
    var col = document.createElement('div');
    col.className = 'cnp-msg-col';
    var bub = document.createElement('div');
    bub.className = 'cnp-msg-bubble';
    // ── CHANGE 2: Heading only — no emoji, clean professional heading ──
    var html = '<strong>' + seriesName + '</strong><br><ul>';
    series.courses.forEach(function(course) {
      html += '<li><a href="' + course.url + '" target="_blank">' + course.name + '</a></li>';
    });
    html += '</ul><br><a href="https://www.nutritional-psychology.org/courses" target="_blank">View All CNP Courses</a>';
    bub.innerHTML = html;
    var time = document.createElement('div');
    time.className = 'cnp-msg-time';
    time.textContent = new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    col.appendChild(bub); col.appendChild(time);
    wrap.appendChild(avatar); wrap.appendChild(col);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function formatMessage(text) {
    if (/<[a-z][\s\S]*>/i.test(text)) {
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
      text = text.replace(/\n/g, '<br>');
      return text;
    }
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    var lines = text.split('\n');
    var html = [];
    var inUL = false;
    var inOL = false;
    lines.forEach(function(line) {
      var ulMatch = line.match(/^[\-\•]\s+(.+)/);
      var olMatch = line.match(/^\d+[\.\)]\s+(.+)/);
      if (ulMatch) {
        if (inOL) { html.push('</ol>'); inOL = false; }
        if (!inUL) { html.push('<ul>'); inUL = true; }
        html.push('<li>' + ulMatch[1] + '</li>');
      } else if (olMatch) {
        if (inUL) { html.push('</ul>'); inUL = false; }
        if (!inOL) { html.push('<ol>'); inOL = true; }
        html.push('<li>' + olMatch[1] + '</li>');
      } else {
        if (inUL) { html.push('</ul>'); inUL = false; }
        if (inOL) { html.push('</ol>'); inOL = false; }
        html.push(line.trim() === '' ? '<br>' : line + '<br>');
      }
    });
    if (inUL) html.push('</ul>');
    if (inOL) html.push('</ol>');
    return html.join('');
  }

  function addMsg(role, text) {
    var isBot = role === 'bot';
    var wrap = document.createElement('div');
    wrap.className = 'cnp-msg ' + (isBot ? 'cnp-bot' : 'cnp-user');
    var avatar = document.createElement('div');
    avatar.className = 'cnp-msg-avatar';
    if (isBot) avatar.innerHTML = '<img src="' + LOGO + '" style="width:100%;height:100%;object-fit:contain" onerror="this.parentNode.textContent=\'🧠\'"/>';
    else avatar.textContent = 'You';
    var col = document.createElement('div');
    col.className = 'cnp-msg-col';
    var bub = document.createElement('div');
    bub.className = 'cnp-msg-bubble';
    bub.innerHTML = formatMessage(text);
    var time = document.createElement('div');
    time.className = 'cnp-msg-time';
    time.textContent = new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    col.appendChild(bub); col.appendChild(time);
    wrap.appendChild(avatar); wrap.appendChild(col);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addTyping() {
    var id = 'cnp-typing-' + Date.now();
    var wrap = document.createElement('div');
    wrap.className = 'cnp-msg cnp-bot'; wrap.id = id;
    wrap.innerHTML = '<div class="cnp-msg-avatar"><img src="' + LOGO + '" style="width:100%;height:100%;object-fit:contain" onerror="this.parentNode.textContent=\'🧠\'"/></div><div class="cnp-msg-bubble" style="padding:12px 16px;"><div class="cnp-typing-dots"><span></span><span></span><span></span></div></div>';
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
    return id;
  }

  function removeTyping(id) {
    var el = document.getElementById(id);
    if (el) el.remove();
  }

})();
