(function() {
  'use strict';

  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Source+Sans+3:wght@300;400;500;600&display=swap';
  document.head.appendChild(font);

  var style = document.createElement('style');
  style.textContent = `
    :root {
      --cnp-purple:#6b21a8;--cnp-purple-dark:#4a0e7a;--cnp-purple-mid:#7c3aed;
      --cnp-pink:#c026a0;--cnp-pink-light:#e879d4;--cnp-gold:#f5c842;
      --cnp-gold-dark:#d4a017;--cnp-purple-pale:#f3e8ff;--cnp-cream:#fdf8ff;
      --cnp-white:#ffffff;--cnp-charcoal:#1e1033;--cnp-muted:#7c6a9a;
    }
    /* ── Bubble ── */
    #cnp-bubble {
      position:fixed;bottom:36px;right:102px;background:white;
      border-radius:20px 20px 4px 20px;padding:10px 16px;
      box-shadow:0 8px 32px rgba(107,33,168,0.2);border:1.5px solid rgba(107,33,168,0.15);
      z-index:999998;display:flex;align-items:center;gap:8px;
      animation:cnp-bubble-in 0.6s cubic-bezier(.34,1.56,.64,1) forwards,cnp-bubble-wiggle 0.6s ease-in-out 1.2s 1;
      cursor:pointer;max-width:220px;transition:box-shadow 0.2s,transform 0.2s;
    }
    #cnp-bubble:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(107,33,168,0.28);}
    #cnp-bubble.cnp-bubble-hide{animation:cnp-bubble-out 0.3s ease forwards;pointer-events:none;}
    @keyframes cnp-bubble-in{from{opacity:0;transform:translateX(20px) scale(0.85)}to{opacity:1;transform:translateX(0) scale(1)}}
    @keyframes cnp-bubble-out{from{opacity:1;transform:translateX(0) scale(1)}to{opacity:0;transform:translateX(20px) scale(0.85)}}
    @keyframes cnp-bubble-wiggle{
      0%{transform:translateX(0) rotate(0deg)}15%{transform:translateX(-4px) rotate(-2deg)}
      30%{transform:translateX(4px) rotate(2deg)}45%{transform:translateX(-3px) rotate(-1.5deg)}
      60%{transform:translateX(3px) rotate(1.5deg)}75%{transform:translateX(-2px) rotate(-1deg)}
      90%{transform:translateX(2px) rotate(1deg)}100%{transform:translateX(0) rotate(0deg)}
    }
    .cnp-bubble-dot{width:8px;height:8px;border-radius:50%;background:#7fff7f;flex-shrink:0;animation:cnp-blink 2.2s ease-in-out infinite;}
    .cnp-bubble-text{font-family:'Source Sans 3',sans-serif;font-size:13px;font-weight:500;color:#4a0e7a;line-height:1.3;}
    .cnp-bubble-text span{display:block;font-size:11px;color:#7c6a9a;font-weight:400;margin-top:1px;}
    #cnp-bubble-close{position:absolute;top:-6px;right:-6px;width:18px;height:18px;border-radius:50%;background:#e879d4;border:none;color:white;font-size:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;}
    #cnp-bubble::after{content:'';position:absolute;bottom:10px;right:-8px;width:0;height:0;border-top:8px solid transparent;border-left:8px solid white;}

    /* ── Toggle Button ── */
    #cnp-toggle {
      position:fixed;bottom:28px;right:28px;width:64px;height:64px;border-radius:50%;
      background:linear-gradient(145deg,var(--cnp-purple),var(--cnp-pink));border:none;cursor:pointer;
      box-shadow:0 8px 32px rgba(107,33,168,0.45);display:flex;align-items:center;justify-content:center;
      transition:transform 0.3s cubic-bezier(.34,1.56,.64,1),box-shadow 0.3s;z-index:999999;overflow:visible;
      animation:cnp-btn-entrance 0.7s cubic-bezier(.34,1.56,.64,1) forwards,cnp-btn-attention 4s ease-in-out 3s infinite;
    }
    #cnp-toggle:hover{transform:scale(1.12);box-shadow:0 16px 44px rgba(192,38,160,0.6);animation:none;}
    #cnp-toggle::before,#cnp-toggle::after{content:'';position:absolute;inset:0;border-radius:50%;border:2px solid rgba(232,121,212,0.7);animation:cnp-ripple 2.8s ease-out infinite;opacity:0;pointer-events:none;}
    #cnp-toggle::after{border-color:rgba(107,33,168,0.5);animation:cnp-ripple 2.8s ease-out 1.4s infinite;}
    #cnp-toggle.open::before,#cnp-toggle.open::after{animation:none;opacity:0;}
    #cnp-unread-badge{position:absolute;top:-2px;right:-2px;width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,#ef4444,#dc2626);border:2px solid white;color:white;font-size:9px;font-weight:700;font-family:'Source Sans 3',sans-serif;display:none;align-items:center;justify-content:center;z-index:1;animation:cnp-badge-pop 0.4s cubic-bezier(.34,1.56,.64,1);}
    #cnp-unread-badge.visible{display:flex;}
    @keyframes cnp-badge-pop{from{transform:scale(0)}to{transform:scale(1)}}
    @keyframes cnp-btn-entrance{0%{opacity:0;transform:scale(0) rotate(-180deg)}70%{transform:scale(1.15) rotate(8deg)}85%{transform:scale(0.95) rotate(-4deg)}100%{opacity:1;transform:scale(1) rotate(0deg)}}
    @keyframes cnp-btn-attention{
      0%,100%{transform:scale(1) rotate(0deg);box-shadow:0 8px 32px rgba(107,33,168,0.45)}
      10%{transform:scale(1.08) rotate(-8deg);box-shadow:0 12px 36px rgba(192,38,160,0.55)}
      20%{transform:scale(1.08) rotate(8deg);box-shadow:0 12px 36px rgba(192,38,160,0.55)}
      30%{transform:scale(1.08) rotate(-5deg)}40%{transform:scale(1.08) rotate(5deg)}
      50%{transform:scale(1.05) rotate(0deg);box-shadow:0 10px 34px rgba(107,33,168,0.5)}
      60%,90%{transform:scale(1) rotate(0deg);box-shadow:0 8px 32px rgba(107,33,168,0.45)}
    }
    @keyframes cnp-ripple{0%{transform:scale(1);opacity:0.65}100%{transform:scale(1.9);opacity:0}}
    #cnp-toggle .cnp-chat-icon{transition:opacity 0.25s,transform 0.25s;}
    #cnp-toggle .cnp-close-icon{position:absolute;opacity:0;transform:rotate(-90deg) scale(0.7);transition:opacity .25s,transform .25s;}
    #cnp-toggle.open .cnp-chat-icon{opacity:0;transform:rotate(90deg) scale(0.7);}
    #cnp-toggle.open .cnp-close-icon{opacity:1;transform:rotate(0deg) scale(1);}

    /* ── Chat Window ── */
    #cnp-chat{
      position:fixed;bottom:106px;right:28px;width:385px;max-width:calc(100vw - 40px);
      height:520px;max-height:calc(100vh - 120px);background:var(--cnp-cream);border-radius:18px;
      box-shadow:0 24px 64px rgba(107,33,168,0.22);display:flex;flex-direction:column;overflow:hidden;
      z-index:999998;opacity:0;transform:translateY(18px) scale(0.97);pointer-events:none;
      transition:opacity .32s cubic-bezier(.4,0,.2,1),transform .38s cubic-bezier(.34,1.56,.64,1);
      border:1px solid rgba(107,33,168,0.12);font-family:'Source Sans 3',sans-serif;
    }
    #cnp-chat.cnp-visible{opacity:1;transform:translateY(0) scale(1);pointer-events:all;}

    /* ── Header ── */
    .cnp-header{background:linear-gradient(135deg,#4a0e7a 0%,#6b21a8 50%,#c026a0 100%);padding:16px 18px 0;color:#fff;flex-shrink:0;position:relative;overflow:hidden;}
    .cnp-header::before{content:'';position:absolute;top:-50px;right:-50px;width:160px;height:160px;border-radius:50%;background:rgba(245,200,66,.08);}
    .cnp-header-top{display:flex;align-items:center;gap:12px;position:relative;z-index:1;}
    .cnp-logo-wrap{width:46px;height:46px;border-radius:10px;background:rgba(255,255,255,.15);border:1.5px solid rgba(245,200,66,.5);display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.2);}
    .cnp-logo-wrap img{width:38px;height:38px;object-fit:contain;}
    .cnp-header-info h3{font-family:'Lora',serif;font-size:15px;font-weight:600;letter-spacing:0.3px;}
    .cnp-header-info .cnp-tagline{font-size:11px;opacity:.75;margin-top:2px;font-weight:300;}
    .cnp-status-pill{display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,.12);border:1px solid rgba(245,200,66,.35);border-radius:20px;padding:4px 10px;font-size:11px;font-weight:500;position:relative;z-index:1;}
    .cnp-header-bottom{display:flex;align-items:center;gap:8px;margin-top:10px;position:relative;z-index:1;}
    .cnp-status-dot{width:6px;height:6px;border-radius:50%;background:#7fff7f;animation:cnp-blink 2.2s ease-in-out infinite;}
    @keyframes cnp-blink{0%,100%{opacity:1}50%{opacity:.3}}
    .cnp-gold-bar{height:3px;background:linear-gradient(90deg,transparent,#f5c842,#d4a017,transparent);margin-top:12px;}

    /* ── History Banner ── */
    #cnp-history-banner{background:linear-gradient(135deg,#f3e8ff,#fdf8ff);border-bottom:1px solid rgba(107,33,168,0.1);padding:10px 14px;display:none;align-items:center;gap:8px;flex-shrink:0;}
    #cnp-history-banner.visible{display:flex;}
    .cnp-history-text{flex:1;font-size:12px;color:#4a0e7a;font-weight:500;line-height:1.4;}
    .cnp-history-text span{display:block;font-size:10.5px;color:#7c6a9a;font-weight:400;margin-top:1px;}
    .cnp-history-btn{padding:5px 11px;border-radius:20px;font-size:11px;font-weight:600;font-family:'Source Sans 3',sans-serif;cursor:pointer;transition:all 0.2s;border:none;flex-shrink:0;}
    #cnp-hist-yes{background:linear-gradient(135deg,#6b21a8,#c026a0);color:#fff;}
    #cnp-hist-yes:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(107,33,168,0.3);}
    #cnp-hist-no{background:rgba(107,33,168,0.08);color:#7c6a9a;}
    #cnp-hist-no:hover{background:rgba(107,33,168,0.15);}

    /* ── Messages ── */
    .cnp-messages{flex:1;overflow-y:auto;padding:16px 14px;display:flex;flex-direction:column;gap:11px;scroll-behavior:smooth;}
    .cnp-messages::-webkit-scrollbar{width:4px}
    .cnp-messages::-webkit-scrollbar-thumb{background:#d8b4fe;border-radius:2px}
    .cnp-msg{display:flex;gap:8px;animation:cnp-msgIn .28s cubic-bezier(.34,1.56,.64,1);}
    @keyframes cnp-msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    .cnp-msg.cnp-user{flex-direction:row-reverse;}
    .cnp-msg-avatar{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;overflow:hidden;font-size:10px;font-weight:700;}
    .cnp-msg.cnp-bot .cnp-msg-avatar{background:#f3e8ff;border:1.5px solid rgba(107,33,168,.2);padding:3px;}
    .cnp-msg.cnp-bot .cnp-msg-avatar img{width:100%;height:100%;object-fit:contain;}
    .cnp-msg.cnp-user .cnp-msg-avatar{background:linear-gradient(135deg,#6b21a8,#c026a0);color:#fff;}
    .cnp-msg-col{display:flex;flex-direction:column;max-width:90%;position:relative;}
    .cnp-msg.cnp-user .cnp-msg-col{align-items:flex-end;}
    .cnp-msg-bubble{padding:10px 13px;border-radius:14px;font-size:13.5px;line-height:1.58;color:#1e1033;position:relative;}
    .cnp-msg.cnp-bot .cnp-msg-bubble{background:#fff;border-radius:4px 14px 14px 14px;box-shadow:0 2px 10px rgba(107,33,168,.1);border:1px solid rgba(107,33,168,.08);}
    .cnp-msg.cnp-user .cnp-msg-bubble{background:linear-gradient(135deg,#6b21a8,#c026a0);color:#fff;border-radius:14px 4px 14px 14px;}
    .cnp-msg-time{font-size:10px;color:#7c6a9a;margin-top:3px;padding:0 4px;}
    .cnp-msg-bubble ul{padding-left:18px;margin:0;list-style:disc}
    .cnp-msg-bubble ol{padding-left:18px;margin:0;list-style:decimal}
    .cnp-msg-bubble li{margin:0;line-height:1.5}
    .cnp-msg-bubble strong{font-weight:600;color:#4a0e7a}
    .cnp-msg.cnp-user .cnp-msg-bubble strong{color:#fff}
    .cnp-msg-bubble a{color:#6b21a8;text-decoration:underline}
    .cnp-msg.cnp-user .cnp-msg-bubble a{color:#f5c842}

    /* ── Copy Button (top-right on hover) ── */
    .cnp-copy-btn {
      position:absolute;top:-10px;right:-6px;
      display:none;align-items:center;gap:3px;
      padding:3px 8px;border-radius:10px;
      background:#fff;border:1px solid rgba(107,33,168,0.2);
      color:#7c6a9a;font-size:10px;font-family:'Source Sans 3',sans-serif;
      cursor:pointer;font-weight:500;transition:all 0.2s;
      box-shadow:0 2px 8px rgba(107,33,168,0.12);
      white-space:nowrap;z-index:10;
    }
    .cnp-msg-col:hover .cnp-copy-btn{display:flex;}
    .cnp-copy-btn:hover{background:#f3e8ff;color:#4a0e7a;border-color:rgba(107,33,168,0.35);}
    .cnp-copy-btn.copied{background:#f0fdf4;border-color:rgba(34,197,94,0.35);color:#16a34a;}

    /* ── Typing ── */
    .cnp-typing-wrap{display:flex;align-items:center;gap:8px;}
    .cnp-typing-dots{display:flex;align-items:center;gap:4px;padding:4px 2px;}
    .cnp-typing-dots span{width:7px;height:7px;border-radius:50%;background:#e879d4;animation:cnp-bounce 1.3s ease-in-out infinite;}
    .cnp-typing-dots span:nth-child(2){animation-delay:.16s}
    .cnp-typing-dots span:nth-child(3){animation-delay:.32s}
    @keyframes cnp-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-7px)}}
    .cnp-typing-status{font-size:11px;color:#b09cc8;font-style:italic;animation:cnp-sfade 1.8s ease-in-out infinite;}
    @keyframes cnp-sfade{0%,100%{opacity:0.5}50%{opacity:1}}

    /* ── Follow-up Suggestions ── */
    .cnp-followup-wrap{display:flex;flex-wrap:wrap;gap:5px;padding:2px 0 0 38px;animation:cnp-msgIn .3s ease;}
    .cnp-followup-btn{background:linear-gradient(135deg,#f3e8ff,#fdf8ff);border:1.5px solid rgba(107,33,168,0.2);border-radius:16px;padding:5px 11px;font-size:11.5px;font-family:'Source Sans 3',sans-serif;cursor:pointer;font-weight:500;color:#6b21a8;transition:all 0.2s;}
    .cnp-followup-btn:hover{background:linear-gradient(135deg,#6b21a8,#c026a0);color:#fff;border-color:transparent;transform:translateY(-1px);}

    /* ── Course Series ── */
    .cnp-series-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;}
    .cnp-series-btn{background:linear-gradient(135deg,#f3e8ff,#fdf8ff);border:1.5px solid rgba(107,33,168,0.25);border-radius:12px;padding:12px 10px;cursor:pointer;font-family:'Source Sans 3',sans-serif;font-size:12px;font-weight:600;color:#4a0e7a;text-align:center;transition:all 0.2s;line-height:1.4;}
    .cnp-series-btn:hover{background:linear-gradient(135deg,#6b21a8,#c026a0);color:#fff;border-color:transparent;transform:translateY(-2px);box-shadow:0 4px 14px rgba(107,33,168,0.3);}
    .cnp-series-label{display:block;font-size:10px;font-weight:400;opacity:0.7;margin-top:3px;}

    /* ── Quick Replies ── */
    .cnp-quick-replies{display:flex;flex-direction:column;gap:5px;padding:4px 14px 10px;position:relative;}
    .cnp-quick-row{display:flex;flex-wrap:wrap;gap:6px;}
    .cnp-quick-row.cnp-row-indent{padding-left:18px;}
    .cnp-quick-header{display:flex;align-items:center;justify-content:flex-end;padding:6px 14px 2px;}
    .cnp-quick-btn{background:#fff;border:1.5px solid rgba(107,33,168,.25);color:#6b21a8;border-radius:20px;padding:5px 12px;font-size:12px;text-align:left;font-family:'Source Sans 3',sans-serif;cursor:pointer;font-weight:500;transition:all .2s;}
    .cnp-quick-btn:hover{background:linear-gradient(135deg,#6b21a8,#c026a0);color:#fff;border-color:transparent;transform:translateY(-2px);box-shadow:0 4px 12px rgba(107,33,168,0.25);}
    .cnp-quick-refresh{width:26px;height:26px;border-radius:50%;background:rgba(107,33,168,0.08);border:1.5px solid rgba(107,33,168,0.2);color:#7c3aed;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all 0.25s;}
    .cnp-quick-refresh:hover{background:linear-gradient(135deg,#6b21a8,#c026a0);color:#fff;border-color:transparent;transform:rotate(180deg) scale(1.1);}

    /* ── Hint Button ── */
    #cnp-hint-btn{display:flex;align-items:center;gap:5px;background:rgba(255,255,255,0.13);border:1.5px solid rgba(245,200,66,0.4);border-radius:20px;padding:5px 11px;font-family:'Source Sans 3',sans-serif;font-size:11px;font-weight:600;color:#fff;cursor:pointer;letter-spacing:0.2px;transition:background 0.2s,border-color 0.2s,transform 0.2s;flex-shrink:0;animation:cnp-hint-wiggle 0.5s ease-in-out 4s 1;}
    #cnp-hint-btn:hover{background:rgba(245,200,66,0.22);border-color:rgba(245,200,66,0.75);transform:translateY(-1px);}
    #cnp-hint-btn.cnp-hint-open{background:rgba(245,200,66,0.2);border-color:rgba(245,200,66,0.8);}
    #cnp-hint-btn .cnp-hint-dot{width:6px;height:6px;border-radius:50%;background:#f5c842;flex-shrink:0;animation:cnp-blink 2.2s ease-in-out infinite;}
    @keyframes cnp-hint-wiggle{0%{transform:rotate(0deg)}20%{transform:rotate(-5deg) scale(1.04)}40%{transform:rotate(5deg) scale(1.04)}60%{transform:rotate(-3deg)}80%{transform:rotate(3deg)}100%{transform:rotate(0deg)}}

    /* ── Input ── */
    .cnp-input-area{padding:10px 14px 14px;background:#fff;border-top:1px solid rgba(107,33,168,.1);flex-shrink:0;}
    .cnp-input-row{display:flex;align-items:flex-end;gap:8px;background:#fdf8ff;border:1.5px solid rgba(107,33,168,.2);border-radius:12px;padding:8px 8px 8px 14px;transition:border-color .2s,box-shadow .2s;}
    .cnp-input-row:focus-within{border-color:#7c3aed;box-shadow:0 0 0 3px rgba(124,58,237,.1);}
    #cnp-input{flex:1;border:none;background:transparent;font-family:'Source Sans 3',sans-serif;font-size:13.5px;color:#1e1033;resize:none;outline:none;max-height:88px;min-height:22px;line-height:1.5;}
    #cnp-input::placeholder{color:#c4a8e0;}
    #cnp-send-btn{width:36px;height:36px;border-radius:9px;background:linear-gradient(135deg,#6b21a8,#c026a0);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .2s,box-shadow .2s,opacity .2s;}
    #cnp-send-btn:hover{transform:scale(1.08);box-shadow:0 4px 14px rgba(192,38,160,.45);}
    #cnp-send-btn:disabled{opacity:.35;cursor:not-allowed;transform:none;}
    .cnp-footer-bar{display:flex;align-items:center;justify-content:center;gap:5px;margin-top:7px;}
    .cnp-powered{font-size:10px;color:#b09cc8;letter-spacing:.3px;}
    .cnp-footer-dot{width:3px;height:3px;border-radius:50%;background:#d8b4fe;}
    @media(max-width:480px){
      #cnp-chat{right:10px;bottom:88px;width:calc(100vw - 20px)}
      #cnp-toggle{right:14px;bottom:14px}
      #cnp-bubble{right:90px;bottom:30px;max-width:180px;}
    }
  `;
  document.head.appendChild(style);

  var LOGO        = 'https://www.nutritional-psychology.org/wp-content/uploads/2022/04/cnp-logo.png';
  var WEBHOOK     = 'https://jahanworkspace.app.n8n.cloud/webhook/185d65c5-4a4d-4b2e-9ce2-3e3282a971b4/chat';
  var HISTORY_KEY = 'cnp_chat_history';
  var unreadCount = 0;

  var TYPING_STATUSES = ['Thinking...','Searching...','Preparing your answer...','Looking that up...','Analyzing your question...'];

  // ── Follow-up map — only for specific topics ──
  var FOLLOWUP_MAP = {
    course:     ['What are the prerequisites?','How much does it cost?'],
    scholarship:['Who is eligible?','When is the next application period?'],
    research:   ['How do I access the research library?','What topics are covered?'],
    gut:        ['How does the microbiome affect mood?','What foods support gut health?'],
    nutrition:  ['How does diet affect mental health?','What are key nutrients for the brain?'],
    membership: ['What are the membership plans?','What do members get access to?'],
    team:       ['Who are the CNP founders?','Who are the contributors?'],
    advocacy:   ['How can I advocate for nutritional psychology?','How do I become a CNP contributor?']
  };

  function getFollowups(text) {
    var t = text.toLowerCase();
    // Only return suggestions for specific matched topics — no default fallback
    if (t.includes('course') || t.includes('certificate') || t.includes('np 1') || t.includes('np 3') || t.includes('np 5')) return FOLLOWUP_MAP.course;
    if (t.includes('scholarship')) return FOLLOWUP_MAP.scholarship;
    if (t.includes('research') || t.includes('library') || t.includes('nprl')) return FOLLOWUP_MAP.research;
    if (t.includes('gut') || t.includes('microbi')) return FOLLOWUP_MAP.gut;
    if (t.includes('diet') || t.includes('food') || t.includes('nutrient') || t.includes('nutrition')) return FOLLOWUP_MAP.nutrition;
    if (t.includes('member')) return FOLLOWUP_MAP.membership;
    if (t.includes('founder') || t.includes('team') || t.includes('ephi') || t.includes('amanda')) return FOLLOWUP_MAP.team;
    if (t.includes('advocate') || t.includes('advocacy') || t.includes('contributor') || t.includes('get involved')) return FOLLOWUP_MAP.advocacy;
    return null; // No suggestions for general/unmatched replies
  }

  var ALL_QUESTIONS = [
    'What is nutritional psychology?','How can I join CNP?',
    'What courses do you offer?','Tell me about CNP research',
    'What is the gut-brain connection?','How does diet affect mood?',
    'Who founded CNP?','What are CNP scholarships?',
    'What is the NP 110 course?','How does nutrition affect mental health?'
  ];
  function getRandomQuestions(n){ return ALL_QUESTIONS.slice().sort(function(){ return Math.random()-0.5; }).slice(0,n); }

  var COURSE_SERIES = {
    'NP 100 Series':{ label:'NP 100 Series',sublabel:'Introductory Certificate',
      courses:[
        {name:'NP 110: Introduction to Nutritional Psychology Methods',url:'https://www.nutritional-psychology.org/education/np-110/'},
        {name:'NP 120 Part I: Microbes in our Gut',url:'https://www.nutritional-psychology.org/np-120/np-120-part-1/'},
        {name:'NP 120 Part II: The Gut Microbiota and Mental Health',url:'https://www.nutritional-psychology.org/np-120/np-120-part-2/'},
        {name:'NP 150 Part I: Mechanisms in the Diet-Mental Health Relationship',url:'https://www.nutritional-psychology.org/education/np-150-part-1/'},
        {name:'NP 150 Part II: Mechanisms in the DMHR (Continued)',url:'https://www.nutritional-psychology.org/np-150/np-150-part-2/'},
      ]},
    'NP 300 Series':{ label:'NP 300 Series',sublabel:'Advanced Certificate',
      courses:[
        {name:'NP 300',url:'https://www.nutritional-psychology.org/np-300/'},
        {name:'NP 310',url:'https://www.nutritional-psychology.org/np-310/'},
        {name:'NP 320',url:'https://www.nutritional-psychology.org/np-320/'},
      ]},
    'NP 500 Series':{ label:'NP 500 Series',sublabel:'Professional Development',
      courses:[
        {name:'NP 500',url:'https://www.nutritional-psychology.org/np-500/'},
        {name:'NP 510',url:'https://www.nutritional-psychology.org/np-510/'},
      ]},
    'Special Programs':{ label:'Special Programs',sublabel:'Micro-Degree & More',
      courses:[
        {name:'NP-FMA Micro-Degree in Nutritional Psychology',url:'https://www.nutritional-psychology.org/micro-degree/'},
      ]}
  };

  // ── History helpers ──
  function saveHistory(h){ try{ localStorage.setItem(HISTORY_KEY,JSON.stringify(h.slice(-30))); }catch(e){} }
  function loadHistory(){ try{ var h=localStorage.getItem(HISTORY_KEY); return h?JSON.parse(h):[]; }catch(e){ return []; } }
  function clearHistory(){ try{ localStorage.removeItem(HISTORY_KEY); }catch(e){} }
  var chatHistory = [];

  // ── Bubble ──
  var bubble = document.createElement('div');
  bubble.id = 'cnp-bubble';
  bubble.innerHTML = `<button id="cnp-bubble-close" onclick="event.stopPropagation();this.parentNode.classList.add('cnp-bubble-hide');setTimeout(function(){document.getElementById('cnp-bubble').style.display='none'},300)">✕</button><div class="cnp-bubble-dot"></div><div class="cnp-bubble-text">💬 Ask CNP Assistant<span>Nutrition & Mental Health AI</span></div>`;
  bubble.onclick = function(){ openChat(); bubble.classList.add('cnp-bubble-hide'); setTimeout(function(){ bubble.style.display='none'; },300); };
  document.body.appendChild(bubble);
  setTimeout(function(){ if(bubble.style.display!=='none'){ bubble.classList.add('cnp-bubble-hide'); setTimeout(function(){ bubble.style.display='none'; },300); } },8000);

  // ── Toggle Button ──
  var btn = document.createElement('button');
  btn.id='cnp-toggle'; btn.setAttribute('aria-label','Open CNP chat');
  btn.innerHTML=`<div id="cnp-unread-badge"></div><svg class="cnp-chat-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><svg class="cnp-close-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  document.body.appendChild(btn);
  var unreadBadge = document.getElementById('cnp-unread-badge');

  // ── Chat Window ──
  var win = document.createElement('div');
  win.id='cnp-chat'; win.setAttribute('role','dialog');
  win.innerHTML=`
    <div class="cnp-header">
      <div class="cnp-header-top">
        <div class="cnp-logo-wrap"><img src="${LOGO}" alt="CNP" onerror="this.parentNode.textContent='🧠'"/></div>
        <div class="cnp-header-info"><h3>CNP AI Assistant</h3><div class="cnp-tagline">Center for Nutritional Psychology</div></div>
      </div>
      <div class="cnp-header-bottom">
        <div class="cnp-status-pill"><div class="cnp-status-dot"></div><span>Online · Ready to help</span></div>
        <button id="cnp-hint-btn" title="Explore topics"><div class="cnp-hint-dot"></div>💡 Explore Topics</button>
      </div>
      <div class="cnp-gold-bar"></div>
    </div>
    <div id="cnp-history-banner">
      <div class="cnp-history-text">👋 Welcome back!<span>Continue where you left off?</span></div>
      <button class="cnp-history-btn" id="cnp-hist-yes">Continue</button>
      <button class="cnp-history-btn" id="cnp-hist-no">Start fresh</button>
    </div>
    <div class="cnp-messages" id="cnp-msgs"></div>
    <div id="cnp-quick-header" style="display:none">
      <div class="cnp-quick-header">
        <button class="cnp-quick-refresh" id="cnp-refresh-btn" title="Refresh questions">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
        </button>
      </div>
    </div>
    <div class="cnp-quick-replies" id="cnp-quick"></div>
    <div class="cnp-input-area">
      <div class="cnp-input-row">
        <textarea id="cnp-input" placeholder="Ask about nutrition & mental health..." rows="1"></textarea>
        <button id="cnp-send-btn" aria-label="Send"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
      </div>
      <div class="cnp-footer-bar"><span class="cnp-powered">Powered by AI</span><div class="cnp-footer-dot"></div><span class="cnp-powered">nutritional-psychology.org</span></div>
    </div>`;
  document.body.appendChild(win);

  var msgs        = document.getElementById('cnp-msgs');
  var input       = document.getElementById('cnp-input');
  var sendBtn     = document.getElementById('cnp-send-btn');
  var quickDiv    = document.getElementById('cnp-quick');
  var quickHeader = document.getElementById('cnp-quick-header');
  var refreshBtn  = document.getElementById('cnp-refresh-btn');
  var hintBtn     = document.getElementById('cnp-hint-btn');
  var histBanner  = document.getElementById('cnp-history-banner');
  var isOpen=false, hintOpen=false;
  quickDiv.style.display='none';

  var sessionId = sessionStorage.getItem('cnp_sid')||(function(){
    var id='cnp_'+Math.random().toString(36).substr(2,10)+'_'+Date.now();
    sessionStorage.setItem('cnp_sid',id); return id;
  })();

  // ── History Banner ──
  var saved = loadHistory();
  if (saved.length > 1) {
    histBanner.classList.add('visible');
    document.getElementById('cnp-hist-yes').addEventListener('click',function(){
      histBanner.classList.remove('visible'); chatHistory=saved; msgs.innerHTML='';
      saved.forEach(function(m){ renderMsg(m.role,m.text,false); });
      msgs.scrollTop=msgs.scrollHeight;
    });
    document.getElementById('cnp-hist-no').addEventListener('click',function(){
      histBanner.classList.remove('visible'); clearHistory(); chatHistory=[];
      addMsg('bot',"Hello! 👋 I'm the **CNP AI Assistant**. I can help you explore nutritional psychology, our courses, research, membership, and more.\n\nWhat would you like to know today?");
    });
  } else {
    addMsg('bot',"Hello! 👋 I'm the **CNP AI Assistant**. I can help you explore nutritional psychology, our courses, research, membership, and more.\n\nWhat would you like to know today?");
  }

  // ── Hint Button Wiggle ──
  setInterval(function(){ hintBtn.style.animation='none'; hintBtn.offsetHeight; hintBtn.style.animation='cnp-hint-wiggle 0.5s ease-in-out 1'; },8000);

  // ── Quick Panel ──
  function loadQuestions(){
    quickDiv.innerHTML='';
    var qs=getRandomQuestions(4);
    var r1=document.createElement('div'); r1.className='cnp-quick-row';
    var r2=document.createElement('div'); r2.className='cnp-quick-row cnp-row-indent';
    qs.forEach(function(q,i){
      var b=document.createElement('button'); b.className='cnp-quick-btn'; b.textContent=q;
      b.onclick=function(){ closeQuickPanel(); input.value=q; sendMessage(); };
      if(i<2) r1.appendChild(b); else r2.appendChild(b);
    });
    quickDiv.appendChild(r1); quickDiv.appendChild(r2);
  }
  function openQuickPanel(){
    // Hide any existing follow-up suggestions
    document.querySelectorAll('.cnp-followup-wrap').forEach(function(el){ el.parentElement.remove(); });
    loadQuestions();
    quickHeader.style.display='block'; quickDiv.style.display='block'; msgs.scrollTop=msgs.scrollHeight;
  }
  function closeQuickPanel(){ quickHeader.style.display='none'; quickDiv.style.display='none'; hintOpen=false; hintBtn.classList.remove('cnp-hint-open'); }

  refreshBtn.addEventListener('click',function(){ refreshBtn.style.transform='rotate(180deg)'; setTimeout(function(){ refreshBtn.style.transform=''; },300); loadQuestions(); });
  hintBtn.addEventListener('click',function(){ hintOpen=!hintOpen; hintBtn.classList.toggle('cnp-hint-open',hintOpen); if(hintOpen) openQuickPanel(); else closeQuickPanel(); });

  // ── Open/Close ──
  function openChat(){
    isOpen=true; win.classList.add('cnp-visible'); btn.classList.add('open'); btn.style.animation='none';
    unreadCount=0; unreadBadge.classList.remove('visible'); unreadBadge.textContent='';
    setTimeout(function(){ input.focus(); },300);
  }
  btn.addEventListener('click',function(){
    isOpen=!isOpen; win.classList.toggle('cnp-visible',isOpen); btn.classList.toggle('open',isOpen);
    if(isOpen){ btn.style.animation='none'; bubble.classList.add('cnp-bubble-hide'); setTimeout(function(){ bubble.style.display='none'; },300);
      unreadCount=0; unreadBadge.classList.remove('visible'); setTimeout(function(){ input.focus(); },300); }
  });

  input.addEventListener('input',function(){ input.style.height='auto'; input.style.height=Math.min(input.scrollHeight,88)+'px'; });
  input.addEventListener('keydown',function(e){ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); sendMessage(); } });

  // Hide quick panel when user starts typing manually
  input.addEventListener('input',function(){
    if(input.value.trim().length>0 && hintOpen){ closeQuickPanel(); }
  });

  sendBtn.addEventListener('click',sendMessage);

  // ── Send Message ──
  async function sendMessage(){
    var text=input.value.trim();
    if(!text||sendBtn.disabled) return;
    closeQuickPanel();
    // Remove any existing follow-up suggestions
    document.querySelectorAll('.cnp-followup-wrap').forEach(function(el){ el.parentElement.remove(); });
    addMsg('user',text);
    input.value=''; input.style.height='auto'; sendBtn.disabled=true;
    var status=TYPING_STATUSES[Math.floor(Math.random()*TYPING_STATUSES.length)];
    var tid=addTyping(status);
    try {
      var res=await fetch(WEBHOOK,{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({action:'sendMessage',sessionId:sessionId,chatInput:text})});
      removeTyping(tid);
      if(!res.ok) throw new Error('HTTP '+res.status);
      var data=await res.json();
      var reply=data.output||data.text||data.message||data.response||
        (Array.isArray(data)&&(data[0]?.output||data[0]?.text))||'I apologize, I could not process your request.';
      if(reply.trim().includes('SHOW_COURSES')){ showCourseSeriesButtons(); }
      else { addMsg('bot',reply); addFollowups(reply); }
      if(!isOpen){
        unreadCount++;
        unreadBadge.textContent=unreadCount>9?'9+':String(unreadCount);
        unreadBadge.classList.add('visible');
      }
    } catch(err){ removeTyping(tid); addMsg('bot','⚠️ Connection issue. Please try again.'); }
    sendBtn.disabled=false; input.focus();
  }

  // ── Follow-up Suggestions ──
  function addFollowups(replyText){
    var sugg=getFollowups(replyText);
    if(!sugg||!sugg.length) return; // No suggestions for general replies
    var wrap=document.createElement('div'); wrap.className='cnp-msg cnp-bot';
    var sp=document.createElement('div'); sp.style.cssText='width:30px;flex-shrink:0;';
    var col=document.createElement('div'); col.className='cnp-msg-col';
    var fw=document.createElement('div'); fw.className='cnp-followup-wrap';
    sugg.slice(0,2).forEach(function(s){
      var b=document.createElement('button'); b.className='cnp-followup-btn'; b.textContent=s;
      b.onclick=function(){ wrap.remove(); input.value=s; sendMessage(); };
      fw.appendChild(b);
    });
    col.appendChild(fw); wrap.appendChild(sp); wrap.appendChild(col);
    msgs.appendChild(wrap); msgs.scrollTop=msgs.scrollHeight;
  }

  // ── Copy Button (top-right on hover) ──
  function addCopyBtn(bubbleEl){
    var copyBtn=document.createElement('button');
    copyBtn.className='cnp-copy-btn';
    copyBtn.innerHTML='<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy';
    copyBtn.onclick=function(){
      navigator.clipboard.writeText(bubbleEl.innerText||bubbleEl.textContent).then(function(){
        copyBtn.innerHTML='✓ Copied'; copyBtn.classList.add('copied');
        setTimeout(function(){ copyBtn.innerHTML='<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy'; copyBtn.classList.remove('copied'); },2000);
      }).catch(function(){});
    };
    return copyBtn;
  }

  // ── Course Series ──
  function showCourseSeriesButtons(){
    var wrap=document.createElement('div'); wrap.className='cnp-msg cnp-bot';
    var av=document.createElement('div'); av.className='cnp-msg-avatar';
    av.innerHTML='<img src="'+LOGO+'" style="width:100%;height:100%;object-fit:contain" onerror="this.parentNode.textContent=\'🧠\'"/>';
    var col=document.createElement('div'); col.className='cnp-msg-col';
    var bub=document.createElement('div'); bub.className='cnp-msg-bubble';
    bub.innerHTML='<strong>CNP Courses</strong><br>CNP offers 10 courses across 3 series plus special programs.<br>Select a series to explore:';
    var grid=document.createElement('div'); grid.className='cnp-series-grid';
    Object.keys(COURSE_SERIES).forEach(function(sName){
      var s=COURSE_SERIES[sName]; var sb=document.createElement('button'); sb.className='cnp-series-btn';
      sb.innerHTML=s.label+'<span class="cnp-series-label">'+s.sublabel+'</span>';
      sb.onclick=function(){ showSeriesCourses(sName); };
      grid.appendChild(sb);
    });
    bub.appendChild(grid);
    var cp=addCopyBtn(bub); bub.appendChild(cp);
    var time=document.createElement('div'); time.className='cnp-msg-time';
    time.textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    col.appendChild(bub); col.appendChild(time); wrap.appendChild(av); wrap.appendChild(col);
    msgs.appendChild(wrap); msgs.scrollTop=msgs.scrollHeight;
  }

  function showSeriesCourses(sName){
    var series=COURSE_SERIES[sName]; addMsg('user',sName);
    var wrap=document.createElement('div'); wrap.className='cnp-msg cnp-bot';
    var av=document.createElement('div'); av.className='cnp-msg-avatar';
    av.innerHTML='<img src="'+LOGO+'" style="width:100%;height:100%;object-fit:contain" onerror="this.parentNode.textContent=\'🧠\'"/>';
    var col=document.createElement('div'); col.className='cnp-msg-col';
    var bub=document.createElement('div'); bub.className='cnp-msg-bubble';
    var h='<strong>'+sName+'</strong><br><ul>';
    series.courses.forEach(function(c){ h+='<li><a href="'+c.url+'" target="_blank">'+c.name+'</a></li>'; });
    h+='</ul><br><a href="https://www.nutritional-psychology.org/courses" target="_blank">View All CNP Courses</a>';
    bub.innerHTML=h;
    var cp=addCopyBtn(bub); bub.appendChild(cp);
    var time=document.createElement('div'); time.className='cnp-msg-time';
    time.textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    col.appendChild(bub); col.appendChild(time); wrap.appendChild(av); wrap.appendChild(col);
    msgs.appendChild(wrap); msgs.scrollTop=msgs.scrollHeight;
  }

  // ── Format Message ──
  function formatMessage(text){
    if(/<[a-z][\s\S]*>/i.test(text)){ return text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\*(.*?)\*/g,'<em>$1</em>').replace(/\n/g,'<br>'); }
    text=text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\*(.*?)\*/g,'<em>$1</em>');
    var lines=text.split('\n'),html=[],inUL=false,inOL=false;
    lines.forEach(function(line){
      var ul=line.match(/^[\-\•]\s+(.+)/),ol=line.match(/^\d+[\.\)]\s+(.+)/);
      if(ul){ if(inOL){html.push('</ol>');inOL=false;} if(!inUL){html.push('<ul>');inUL=true;} html.push('<li>'+ul[1]+'</li>'); }
      else if(ol){ if(inUL){html.push('</ul>');inUL=false;} if(!inOL){html.push('<ol>');inOL=true;} html.push('<li>'+ol[1]+'</li>'); }
      else{ if(inUL){html.push('</ul>');inUL=false;} if(inOL){html.push('</ol>');inOL=false;} html.push(line.trim()===''?'<br>':line+'<br>'); }
    });
    if(inUL)html.push('</ul>'); if(inOL)html.push('</ol>');
    return html.join('');
  }

  // ── Render (without saving — for history restore) ──
  function renderMsg(role,text,withCopy){
    var isBot=role==='bot';
    var wrap=document.createElement('div'); wrap.className='cnp-msg '+(isBot?'cnp-bot':'cnp-user');
    var av=document.createElement('div'); av.className='cnp-msg-avatar';
    if(isBot) av.innerHTML='<img src="'+LOGO+'" style="width:100%;height:100%;object-fit:contain" onerror="this.parentNode.textContent=\'🧠\'"/>'; else av.textContent='You';
    var col=document.createElement('div'); col.className='cnp-msg-col';
    var bub=document.createElement('div'); bub.className='cnp-msg-bubble'; bub.innerHTML=formatMessage(text);
    if(isBot && withCopy!==false){ var cp=addCopyBtn(bub); bub.appendChild(cp); }
    var time=document.createElement('div'); time.className='cnp-msg-time';
    time.textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    col.appendChild(bub); col.appendChild(time); wrap.appendChild(av); wrap.appendChild(col);
    msgs.appendChild(wrap); msgs.scrollTop=msgs.scrollHeight;
  }

  // ── Add Message (saves to history) ──
  function addMsg(role,text){
    renderMsg(role,text,true);
    chatHistory.push({role:role,text:text}); saveHistory(chatHistory);
  }

  // ── Typing Indicator ──
  function addTyping(statusText){
    var id='cnp-typing-'+Date.now();
    var wrap=document.createElement('div'); wrap.className='cnp-msg cnp-bot'; wrap.id=id;
    wrap.innerHTML='<div class="cnp-msg-avatar"><img src="'+LOGO+'" style="width:100%;height:100%;object-fit:contain" onerror="this.parentNode.textContent=\'🧠\'"/></div><div class="cnp-msg-bubble" style="padding:10px 13px;"><div class="cnp-typing-wrap"><div class="cnp-typing-dots"><span></span><span></span><span></span></div><span class="cnp-typing-status">'+(statusText||'Thinking...')+'</span></div></div>';
    msgs.appendChild(wrap); msgs.scrollTop=msgs.scrollHeight; return id;
  }
  function removeTyping(id){ var el=document.getElementById(id); if(el) el.remove(); }

})();
