(function() {
  'use strict';

  // ── Fonts ──
  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Source+Sans+3:wght@300;400;500;600&display=swap';
  document.head.appendChild(font);

  // ── CSS ──
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
    .cnp-msg-col { display:flex; flex-direction:column; max-width:80%; }
    .cnp-msg.cnp-user .cnp-msg-col { align-items:flex-end; }
    .cnp-msg-bubble { padding:10px 13px; border-radius:14px; font-size:13.5px; line-height:1.58; color:#1e1033; }
    .cnp-msg.cnp-bot .cnp-msg-bubble { background:#fff; border-radius:4px 14px 14px 14px; box-shadow:0 2px 10px rgba(107,33,168,.1); border:1px solid rgba(107,33,168,.08); }
    .cnp-msg.cnp-user .cnp-msg-bubble { background:linear-gradient(135deg,#6b21a8,#c026a0); color:#fff; border-radius:14px 4px 14px 14px; }
    .cnp-msg-time { font-size:10px; color:#7c6a9a; margin-top:3px; padding:0 4px; }

    .cnp-msg-bubble ul { padding-left:18px; margin:5px 0; list-style:disc; }
    .cnp-msg-bubble ol { padding-left:18px; margin:5px 0; list-style:decimal; }
    .cnp-msg-bubble li { margin:3px 0; line-height:1.5; }
    .cnp-msg-bubble strong { font-weight:600; color:#4a0e7a; }
    .cnp-msg.cnp-user .cnp-msg-bubble strong { color:#fff; }
    .cnp-msg-bubble a { color:#6b21a8; text-decoration:underline; }
    .cnp-msg.cnp-user .cnp-msg-bubble a { color:#f5c842; }

    .cnp-typing-dots { display:flex; align-items:center; gap:4px; padding:4px 2px; }
    .cnp-typing-dots span { width:7px; height:7px; border-radius:50%; background:#e879d4; animation:cnp-bounce 1.3s ease-in-out infinite; }
    .cnp-typing-dots span:nth-child(2){animation-delay:.16s}
    .cnp-typing-dots span:nth-child(3){animation-delay:.32s}
    @keyframes cnp-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-7px)}}

    .cnp-quick-replies, .cnp-inline-quick { display:flex; flex-wrap:wrap; gap:6px; padding:2px 14px 10px; }
    .cnp-inline-quick { padding:4px 0 2px 38px; animation:cnp-msgIn .28s cubic-bezier(.34,1.56,.64,1); }
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
    }
  `;
  document.head.appendChild(style);

  // ── Config ──
  var LOGO = 'https://www.nutritional-psychology.org/wp-content/uploads/2022/04/cnp-logo.png';
  var WEBHOOK = 'https://jahanworkspace.app.n8n.cloud/webhook/185d65c5-4a4d-4b2e-9ce2-3e3282a971b4/chat';
  var QUESTIONS = ['What is nutritional psychology?','How can I join CNP?','What courses do you offer?','Tell me about CNP research'];

  // Toggle Button
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

  // Chat Window
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

  // ── Quick Replies (initial) ──
  var quickDiv = document.getElementById('cnp-quick');
  QUESTIONS.forEach(function(q) {
    var b = document.createElement('button');
    b.className = 'cnp-quick-btn';
    b.textContent = q;
    b.onclick = function() { sendQuick(q); };
    quickDiv.appendChild(b);
  });

  // ── State ──
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

  btn.addEventListener('click', function() {
    isOpen = !isOpen;
    win.classList.toggle('cnp-visible', isOpen);
    btn.classList.toggle('open', isOpen);
    if (isOpen) setTimeout(function(){ input.focus(); }, 300);
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
    document.querySelectorAll('.cnp-inline-quick').forEach(function(el){ el.remove(); });
    input.value = text;
    sendMessage();
  }

  async function sendMessage() {
    var text = input.value.trim();
    if (!text || sendBtn.disabled) return;
    addMsg('user', text);
    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;
    document.querySelectorAll('.cnp-inline-quick').forEach(function(el){ el.remove(); });
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
      addMsg('bot', reply);
      addInlineQuick();
    } catch(err) {
      removeTyping(tid);
      addMsg('bot', '⚠️ Connection issue. Please try again.');
    }
    sendBtn.disabled = false;
    input.focus();
  }

  // ── Format Message ──
  // Handles: HTML from n8n, **bold**, *italic*, bullet lists, numbered lists, newlines
  function formatMessage(text) {
    // If n8n already returned HTML, render it directly with minor fixes
    if (/<[a-z][\s\S]*>/i.test(text)) {
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
      text = text.replace(/\n/g, '<br>');
      return text;
    }

    // Bold & Italic
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Line-by-line processing for lists
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
    var bubble = document.createElement('div');
    bubble.className = 'cnp-msg-bubble';
    bubble.innerHTML = formatMessage(text);
    var time = document.createElement('div');
    time.className = 'cnp-msg-time';
    time.textContent = new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    col.appendChild(bubble); col.appendChild(time);
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

  function addInlineQuick() {
    var div = document.createElement('div');
    div.className = 'cnp-inline-quick';
    QUESTIONS.forEach(function(q) {
      var b = document.createElement('button');
      b.className = 'cnp-quick-btn';
      b.textContent = q;
      b.onclick = function() {
        document.querySelectorAll('.cnp-inline-quick').forEach(function(el){ el.remove(); });
        input.value = q; sendMessage();
      };
      div.appendChild(b);
    });
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

})();
