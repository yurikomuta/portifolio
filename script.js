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
      "Esse é um portfólio incrível, criado para demonstrar os projetos reais e habilidades da Yuri em IA, Engenharia de Software e Dados! Tem alguma área específica que quer explorar?",
      "Posso te contar sobre os projetos de IA, a stack técnica, a jornada profissional, formação ou publicações da Yuri... o que você prefere?",
      "Ótima pergunta! A Yuri atua desde 2011 na área de tecnologia,começou com marketing digital quando os primeiros passos do Facebook, e hoje atua com grande foco em IA, Engenharia de Software e Dados. Quer saber mais detalhes?",
    ],
    projetos: "A Yuri tem projetos de ponta, como Sistemas de Detecção de Fraudes usando Redes Neurais e Machine Learning, além de um Sistema de Renegociação com IA usando LangChain e Google Gen AI. Qual te interessou mais?",
    stack: "A stack principal inclui Python, JavaScript, NodeJS, SQL, além de bibliotecas e frameworks de IA/Dados como TensorFlow, Keras, Scikit-Learn, Pandas e LangChain. E ferramentas como Power BI e Looker Studio!",
    contato: "Para entrar em contato, mande um WhatsApp para (11) 93227-0180, um e-mail para yuri.komuta@gmail.com ou acesse o LinkedIn! Tem mais informações na seção de contato da página.",
    olá: "Olá! Que bom ter você por aqui! 😊 Posso te contar sobre os projetos, habilidades, formação, publicações ou experiências da Yuri. O que você quer explorar?",
    oi: "Oi! 👋 Seja bem-vindo ao portfólio da Yuri! O que posso te contar hoje?",
    experiência: "A Yuri tem uma jornada sólida, com início em 2020 em sua própria consultoria (TI e Eng. de Software), docência no SENAI, BYJUS, Happy Code, FAM e PrograMaria.",
    formacao: "A Yuri é Tecnóloga em Informática para Negócios pela FATEC, tem especialização em Big Data e cursa o Mestrado em Engenharia da Informação pela UFABC.",
    publicacoes: "A Yuri já publicou capítulos de livros abordando Engenharia de Prompts e LLMs (Técnicas de Alinhamento/Redução de Alucinações), Aprendizado Federado em Diagnóstico Médico e Execução Local de LLMs em Edge AI. Assuntos bem complexos e interessantes!"
  };

  function getResponse(msg) {
    const lower = msg.toLowerCase();
    if (lower.includes('projeto') || lower.includes('portfolio') || lower.includes('portfólio')) return responses.projetos;
    if (lower.includes('stack') || lower.includes('tecnologia') || lower.includes('linguagem') || lower.includes('ferramenta')) return responses.stack;
    if (lower.includes('contato') || lower.includes('falar') || lower.includes('contratar') || lower.includes('email') || lower.includes('whatsapp') || lower.includes('telefone')) return responses.contato;
    if (lower.includes('olá') || lower.includes('ola')) return responses.olá;
    if (lower.includes('oi') || lower.includes('hey') || lower.includes('hi')) return responses.oi;
    if (lower.includes('experiên') || lower.includes('jornada') || lower.includes('carreira') || lower.includes('trabalho') || lower.includes('empresas')) return responses.experiência;
    if (lower.includes('formaç') || lower.includes('formac') || lower.includes('estudo') || lower.includes('faculdade') || lower.includes('mestrado') || lower.includes('graduaç')) return responses.formacao;
    if (lower.includes('publicaç') || lower.includes('publicac') || lower.includes('livro') || lower.includes('capítulo') || lower.includes('artigo')) return responses.publicacoes;
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