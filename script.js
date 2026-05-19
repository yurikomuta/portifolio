/* ── Scroll reveal ───────────────────────────────────── */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // stagger children if any
        const children = e.target.querySelectorAll('.atuacao-card, .project-card, .tl-item, .feedback-card');
        children.forEach((c, i) => {
          c.style.transitionDelay = (i * 0.08) + 's';
        });
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  /* ── Stack filter ────────────────────────────────────── */
  const tabs = document.querySelectorAll('.stack-tab');
  const items = document.querySelectorAll('.stack-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      items.forEach(item => {
        if (cat === 'all' || item.dataset.cat === cat) {
          item.style.display = 'flex';
          item.style.animation = 'none';
          requestAnimationFrame(() => {
            item.style.animation = 'fadeIn .3s ease forwards';
          });
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ── Chat demo ───────────────────────────────────────── */
  const responses = {
    default: [
      "Esse é um portfolio incrível, criado para demonstrar projetos reais e habilidades técnicas avançadas! Tem alguma área específica que quer explorar?",
      "Posso te contar sobre os projetos, a stack técnica, a jornada profissional... o que você prefere?",
      "Ótima pergunta! O desenvolvedor tem 5+ anos de experiência com foco em IA aplicada e automação. Quer saber mais detalhes?",
    ],
    projetos: "Os projetos destacados incluem uma plataforma de automação de WhatsApp, um ERP completo de startup e uma ferramenta de BI com IA. Todos estão em produção! Qual te interessou mais?",
    stack: "A stack principal é Next.js, React, TypeScript, Python, com integração de APIs de IA como OpenAI e Anthropic, e automações via n8n. Uma combinação poderosa!",
    contato: "Para entrar em contato, a forma mais rápida é pelo WhatsApp. Mas você também pode preencher o formulário aqui na página ou enviar um e-mail direto!",
    olá: "Olá! Que bom ter você por aqui! 😊 Posso te contar sobre projetos, habilidades ou experiências. O que você quer explorar?",
    oi: "Oi! 👋 Seja bem-vindo ao portfólio! O que posso te contar hoje?",
    experiência: "Com 5+ anos de experiência, a jornada começa no SENAC, passa por infraestrutura na HPE, desenvolvimento front-end e chega até o foco atual em IA aplicada e automação.",
  };

  function getResponse(msg) {
    const lower = msg.toLowerCase();
    if (lower.includes('projeto')) return responses.projetos;
    if (lower.includes('stack') || lower.includes('tecnologia') || lower.includes('linguagem')) return responses.stack;
    if (lower.includes('contato') || lower.includes('falar') || lower.includes('contratar')) return responses.contato;
    if (lower.includes('olá') || lower.includes('ola')) return responses.olá;
    if (lower.includes('oi') || lower.includes('hey') || lower.includes('hi')) return responses.oi;
    if (lower.includes('experiên') || lower.includes('jornada') || lower.includes('carreira')) return responses.experiência;
    const opts = responses.default;
    return opts[Math.floor(Math.random() * opts.length)];
  }

  function addMsg(text, type) {
    const body = document.getElementById('chatBody');
    const wrapper = document.createElement('div');
    wrapper.className = 'msg ' + type;
    const now = new Date().toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'});
    wrapper.innerHTML = `
      <div class="msg-avatar">${type === 'ai' ? '🤖' : '🧑'}</div>
      <div>
        <div class="msg-bubble">${text}</div>
        <div class="msg-time">${now}</div>
      </div>`;
    body.appendChild(wrapper);
    body.scrollTop = body.scrollHeight;
  }

  function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;
    addMsg(text, 'user');
    input.value = '';
    setTimeout(() => addMsg(getResponse(text), 'ai'), 700 + Math.random() * 400);
  }

  document.getElementById('chatSendBtn').addEventListener('click', sendMessage);
  document.getElementById('chatInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') sendMessage();
  });