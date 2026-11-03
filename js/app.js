/* =========================================================
   XÔ PAPADA — APLICAÇÃO
   Telas, progresso, treino guiado, diário, instalação (PWA)
   ========================================================= */

/* Libera os dias em sequência (dia N só abre após concluir N-1).
   Coloque true para liberar todos de uma vez. */
const LIBERAR_TODOS_OS_DIAS = true;
const NIVEIS = { 1: "● Iniciante", 2: "●● Intermediário", 3: "●●● Avançado" };
const HUMORES = [
  { v: 1, e: "😣", t: "Difícil" }, { v: 2, e: "😐", t: "Ok" },
  { v: 3, e: "🙂", t: "Bem" }, { v: 4, e: "😍", t: "Ótimo" },
];

/* ---------- Estado / armazenamento ---------- */
const STORE_KEY = "xopapada_v1";
const padrao = () => ({ nome: "", tempo: 10, feitos: {}, concluidos: {}, habitos: {}, notas: {}, bannerFechado: false });
const state = Object.assign(padrao(), carregar());

function carregar() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
}
function salvar() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch {}
}

const hoje = () => new Date().toLocaleDateString("sv"); // AAAA-MM-DD (fuso local)
const fmtData = (iso) => iso ? iso.split("-").reverse().slice(0, 2).join("/") : "";
const getDia = (n) => DIAS.find((d) => d.dia === n);
const faseDoDia = (n) => FASES.find((f) => n >= f.dias[0] && n <= f.dias[1]);

/* Rotina compacta (5 min): 2 exercícios principais + drenagem */
function exerciciosDoDia(n) {
  const d = getDia(n);
  if (state.tempo !== 5) return d.exercicios;
  const sem = d.exercicios.filter((x) => x !== "drenagem");
  return [...sem.slice(1, 3), "drenagem"];
}
const feitosDoDia = (n) => state.feitos[n] || [];
const diaCompleto = (n) => !!state.concluidos[n];
const diasCompletos = () => DIAS.filter((d) => diaCompleto(d.dia)).length;
const diaAtual = () => (DIAS.find((d) => !diaCompleto(d.dia)) || DIAS[DIAS.length - 1]).dia;
const diaLiberado = (n) => LIBERAR_TODOS_OS_DIAS || n === 1 || diaCompleto(n - 1);
const minutosDoDia = (n) => Math.max(1, Math.round(exerciciosDoDia(n).reduce((s, id) => s + (EXERCICIOS[id].tempo || 60), 0) / 60));

function sequencia() {
  const datas = new Set(Object.values(state.concluidos));
  let n = 0;
  const d = new Date();
  if (!datas.has(d.toLocaleDateString("sv"))) d.setDate(d.getDate() - 1);
  while (datas.has(d.toLocaleDateString("sv"))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

/* migração: dias completos de versões antigas */
DIAS.forEach((d) => {
  if (!state.concluidos[d.dia] && d.exercicios.every((id) => feitosDoDia(d.dia).includes(id))) state.concluidos[d.dia] = hoje();
});

/* ---------- Ações de progresso ---------- */
function verificarConclusao(n) {
  const completo = exerciciosDoDia(n).every((id) => feitosDoDia(n).includes(id));
  if (completo && !diaCompleto(n)) {
    state.concluidos[n] = hoje();
    salvar();
    if (n === DIAS.length) setTimeout(modalConclusao, 300);
    else toast(`🎉 Dia ${n} concluído!`);
  } else if (!completo && diaCompleto(n)) {
    delete state.concluidos[n];
    salvar();
  }
}
function toggleExercicio(n, id) {
  const lista = new Set(feitosDoDia(n));
  lista.has(id) ? lista.delete(id) : lista.add(id);
  state.feitos[n] = [...lista];
  salvar();
  verificarConclusao(n);
  render();
}
function marcarFeito(n, id) {
  if (!feitosDoDia(n).includes(id)) { state.feitos[n] = [...feitosDoDia(n), id]; salvar(); }
}
function toggleHabito(id) {
  const k = hoje();
  const lista = new Set(state.habitos[k] || []);
  lista.has(id) ? lista.delete(id) : lista.add(id);
  state.habitos[k] = [...lista];
  salvar();
  render();
}

/* ---------- Helpers de UI ---------- */
const $app = document.getElementById("app");
const $modal = document.getElementById("modal");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 2500);
}

/* Vídeo próprio (arquivo .mp4/.webm dentro de assets/videos) */
const ehArquivoVideo = (url) => /\.(mp4|webm|mov)(\?|$)/i.test(url || "");
const posterDe = (url) => url.replace(/\.(mp4|webm|mov)(\?.*)?$/i, ".jpg");

function videoEmbed(url) {
  if (!url) return `<div class="video"><div class="video__ph"><div>▶️</div><strong>Vídeo em breve</strong></div></div>`;
  if (ehArquivoVideo(url)) return `
    <div class="video video--arquivo">
      <video src="${esc(url)}" poster="${esc(posterDe(url))}" autoplay muted loop playsinline controls preload="metadata"></video>
    </div>`;
  let src = url;
  const yt = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  if (yt) src = `https://www.youtube.com/embed/${yt[1]}?rel=0`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) src = `https://player.vimeo.com/video/${vm[1]}`;
  return `<div class="video"><iframe src="${esc(src)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
}

const ic = (nome, cls = "ic") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${nome}"/></svg>`;

const fotoExpert = (cls) => CONFIG.expert.foto
  ? `<img class="${cls}" src="${esc(CONFIG.expert.foto)}" alt="${esc(CONFIG.expert.nome)}" />`
  : `<div class="${cls} ${cls}--vazia">👩</div>`;

const barra = (pct, light = false) =>
  `<div class="progress ${light ? "progress--light" : ""}"><div class="progress__bar" style="width:${pct}%"></div></div>`;

const avisoSeguranca = () => `
  <div class="alerta">
    <span>⚠️</span>
    <p><strong>Aviso importante:</strong> interrompa o exercício em caso de dor, tontura, formigamento ou desconforto.
    Quem tem problemas na cervical ou na mandíbula (ATM), ou passou por cirurgia recente no rosto ou no pescoço, deve buscar orientação profissional antes de começar.</p>
  </div>`;

/* ---------- Modal genérico ---------- */
function abrirModal(html, classe = "") {
  const box = $modal.querySelector(".modal__box");
  box.className = "modal__box " + classe;
  box.innerHTML = html;
  $modal.hidden = false;
  document.body.style.overflow = "hidden";
}
function fecharModal() {
  pararTimerGuiado();
  $modal.hidden = true;
  document.body.style.overflow = "";
}
$modal.addEventListener("click", (e) => { if (e.target === $modal) fecharModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$modal.hidden) fecharModal(); });

/* =========================================================
   TELAS
   ========================================================= */
let passoOnboard = 1;

function telaOnboarding() {
  if (passoOnboard === 1) return `
  <div class="onboard card">
    <img src="assets/logo-escura.webp" alt="Xô Papada" />
    <div class="onboard__expert">
      ${fotoExpert("onboard__foto")}
      <div><strong>Com ${esc(CONFIG.expert.nome)}</strong><span>${esc(CONFIG.expert.titulo)}</span></div>
    </div>
    <p class="eyebrow">Passo 1 de 2</p>
    <h1>Bem-vinda ao seu protocolo!</h1>
    <p class="muted" style="margin-top:8px">${esc(CONFIG.subtitulo)} para firmar e definir o contorno do rosto e do pescoço.</p>
    <form id="form-nome">
      <input class="input" id="nome" placeholder="Como você gostaria de ser chamada?" required maxlength="40" value="${esc(state.nome)}" />
      <button class="btn btn--block" type="submit">Continuar →</button>
    </form>
  </div>`;
  return `
  <div class="onboard card" style="text-align:left">
    <p class="eyebrow">Passo 2 de 2</p>
    <h1>Quanto tempo você tem por dia?</h1>
    <p class="muted" style="margin:6px 0 18px">Escolha o ritmo que cabe na sua rotina. Dá para mudar depois nas configurações.</p>
    ${opcoesTempo()}
    <p class="nota-privacidade">🔒 Não pedimos senha, foto nem dados médicos. Seu progresso fica salvo neste aparelho.</p>
    <button class="btn btn--block" data-action="finish-onboard">Entrar no meu protocolo 💖</button>
  </div>`;
}

function opcoesTempo() {
  return `<div class="tempo-opcoes">
    <button class="tempo-card ${state.tempo === 5 ? "is-on" : ""}" data-tempo="5">
      <span class="tempo-card__ic">⚡</span><strong>5 minutos / dia</strong>
      <small>Versão compacta: os exercícios principais + drenagem.</small>
    </button>
    <button class="tempo-card ${state.tempo !== 5 ? "is-on" : ""}" data-tempo="10">
      <span class="tempo-card__ic">🌸</span><strong>10 a 15 minutos / dia</strong>
      <small>Rotina completa, com aquecimento. Recomendado.</small>
    </button>
  </div>`;
}

function telaInicio() {
  const feitos = diasCompletos();
  const pct = Math.round((feitos / DIAS.length) * 100);
  const atual = getDia(diaAtual());
  const fase = faseDoDia(atual.dia);
  const terminou = feitos === DIAS.length;
  const habHoje = (state.habitos[hoje()] || []).length;
  const seq = sequencia();
  const textoBotao = terminou ? "Treinar novamente" : feitosDoDia(atual.dia).length ? "Continuar treino guiado" : "Começar treino guiado";

  return `
  <section class="hero">
    <img class="hero__arte" src="assets/rosto-traco.webp" alt="" aria-hidden="true" />
    <div class="hero__body">
      <p class="hero__ola">Olá, ${esc(state.nome)} 👋</p>
      <h1>${terminou ? "Protocolo concluído! 🏆" : `Dia ${atual.dia} de ${DIAS.length}`}</h1>
      <p class="hero__meta">${terminou ? "Continue 3x por semana para manter os resultados." : `Fase ${fase.id} · ${esc(fase.nome)} · ${esc(atual.titulo)} · ~${minutosDoDia(atual.dia)} min`}</p>
      <div class="hero__prog">
        <div class="progress"><div class="progress__bar" style="width:${Math.max(pct, 2)}%"></div></div>
        <strong>${pct}%</strong>
      </div>
      ${seq > 1 ? `<p class="hero__seq">🔥 ${seq} dias seguidos</p>` : ""}
      <div class="hero__acoes">
        <button class="btn" data-guiado="${atual.dia}">${ic("play")} ${textoBotao}</button>
        <a class="hero__link" href="#/dia/${atual.dia}">Ver exercícios do dia</a>
      </div>
    </div>
  </section>

  <nav class="destaques" aria-label="Atalhos">
    <a href="#/protocolo">${ic("calendar", "destaque__ic")}<span>15 Dias<br>de protocolo</span></a>
    <a href="#/exercicios">${ic("dumbbell", "destaque__ic")}<span>Exercícios<br>diários</span></a>
    <a href="#/rotina">${ic("leaf", "destaque__ic")}<span>Rotina de<br>hábitos</span></a>
    <a href="#/progresso">${ic("chart", "destaque__ic")}<span>Acompanhe<br>evolução</span></a>
    <a href="#/bonus">${ic("diamond", "destaque__ic")}<span>Bônus<br>exclusivos</span></a>
  </nav>

  <section class="section expert-card">
    <div class="expert-card__midia">
      ${fotoExpert("expert-card__foto")}
      ${CONFIG.expert.videoBoasVindas ? `<button class="expert-card__play" data-action="video-expert" aria-label="Assistir vídeo de boas-vindas">${ic("play")}</button>` : ""}
    </div>
    <div class="expert-card__info">
      <p class="expert-card__label">Sua especialista</p>
      <h2>${esc(CONFIG.expert.nome)}</h2>
      <span class="chip chip--forte">${esc(CONFIG.expert.titulo)}</span>
      <p class="expert-card__frase">“${esc(CONFIG.expert.frase || CONFIG.expert.boasVindas)}”</p>
    </div>
  </section>

  <section class="section">
    <h2>Seu protocolo completo</h2>
    ${gridDias()}
  </section>

  <section class="section grid-2">
    <div class="card stack">
      <p class="eyebrow">💡 Dica do dia</p>
      <p><strong>${esc(atual.dicaDoDia)}</strong></p>
    </div>
    <a class="card stack" href="#/rotina">
      <p class="eyebrow">✅ Hábitos de hoje</p>
      <p><strong>${habHoje} de ${ROTINA.length} hábitos</strong> concluídos</p>
      ${barra(Math.round((habHoje / ROTINA.length) * 100), true)}
    </a>
  </section>`;
}

function modalVideoExpert() {
  abrirModal(`
    <div class="gd__head"><div><p class="eyebrow">Boas-vindas</p><h2 style="margin:0">${esc(CONFIG.expert.nome)}</h2></div>
      <button class="icon-btn" data-action="close" aria-label="Fechar">✕</button></div>
    <div style="margin-top:14px">${videoEmbed(CONFIG.expert.videoBoasVindas)}</div>
    <p class="muted" style="margin-top:14px">${esc(CONFIG.expert.boasVindas)}</p>`, "modal__box--lg");
}

function gridDias() {
  const atual = diaAtual();
  return FASES.map((f) => `
    <div class="fase">
      <div class="fase__head">
        <span class="fase__tag">Fase ${f.id} · ${esc(f.nome)}</span>
        <span class="muted">${esc(f.descricao)}</span>
      </div>
      <div class="dias">
        ${DIAS.filter((d) => d.dia >= f.dias[0] && d.dia <= f.dias[1]).map((d) => {
          const done = diaCompleto(d.dia);
          const lib = diaLiberado(d.dia);
          const eAtual = d.dia === atual && !done;
          const cls = done ? "dia--done" : !lib ? "dia--locked" : eAtual ? "dia--atual" : "";
          const status = done ? ic("check") : !lib ? ic("lock") : eAtual ? ic("play") : "";
          return `
          <a class="dia ${cls}" href="#/dia/${d.dia}" ${!lib ? 'aria-disabled="true"' : ""}>
            <span class="dia__topo"><small>Dia</small><span class="dia__status">${status}</span></span>
            <span class="dia__num">${String(d.dia).padStart(2, "0")}</span>
            <span class="dia__titulo">${esc(d.titulo)}</span>
            <span class="dia__min">≈ ${minutosDoDia(d.dia)} min</span>
          </a>`;
        }).join("")}
      </div>
    </div>`).join("");
}

function telaProtocolo() {
  const pct = Math.round((diasCompletos() / DIAS.length) * 100);
  return `
  <p class="eyebrow">Meu plano</p>
  <h1>15 dias para um novo contorno</h1>
  <p class="muted" style="margin:6px 0 14px">Um dia por vez. Modo atual: <strong>${state.tempo === 5 ? "5 minutos" : "rotina completa"}</strong> · <button class="link-btn" data-action="settings">alterar</button></p>
  ${barra(pct, true)}
  ${gridDias()}`;
}

function telaDia(n) {
  const d = getDia(n);
  if (!d) return telaNaoEncontrada();
  if (!diaLiberado(n)) {
    const libera = diaAtual();
    return `<a class="back" href="#/protocolo">← Voltar</a>
      <div class="card celebrate">
        <div>🔒</div>
        <h2>Dia ${n} ainda está trancado</h2>
        <p class="muted">Os dias abrem um de cada vez. Conclua o <strong>dia ${libera}</strong> para avançar no protocolo.</p>
        <button class="btn" style="margin-top:16px" data-guiado="${libera}">${ic("play")} Fazer o treino do dia ${libera}</button>
      </div>`;
  }
  const fase = faseDoDia(n);
  const lista = exerciciosDoDia(n);
  const feitos = feitosDoDia(n).filter((id) => lista.includes(id));
  const pct = Math.round((feitos.length / lista.length) * 100);
  const done = diaCompleto(n);

  return `
  <a class="back" href="#/protocolo">← Todos os dias</a>
  <p class="eyebrow" style="color:${fase.cor}">Fase ${fase.id} · ${esc(fase.nome)}</p>
  <h1>Dia ${n} · ${esc(d.titulo)}</h1>
  <p class="muted" style="margin:6px 0 14px">Foco: ${esc(d.foco)} · ⏱️ ~${minutosDoDia(n)} min</p>
  ${barra(pct, true)}
  <p class="muted" style="font-size:13px;margin-top:6px">${feitos.length} de ${lista.length} exercícios</p>

  <button class="btn btn--block section" data-guiado="${n}">▶ ${done ? "Refazer treino guiado" : feitos.length ? "Continuar treino guiado" : "Iniciar treino guiado"}</button>
  <p class="muted" style="text-align:center;font-size:13px;margin-top:8px">ou marque cada exercício abaixo, no seu ritmo</p>

  <div class="ex-list section">
    ${lista.map((id) => {
      const e = EXERCICIOS[id];
      const ok = feitos.includes(id);
      return `
      <div class="ex ${ok ? "ex--done" : ""}">
        <button class="ex__check" data-toggle="${id}" aria-label="Marcar ${esc(e.nome)}">${ok ? "✓" : ""}</button>
        <div class="ex__ic">${e.icone || "💪"}</div>
        <div class="ex__body">
          <div class="ex__nome">${esc(e.nome)}</div>
          <div class="ex__meta">${esc(e.duracao)}</div>
        </div>
        <a class="ex__open" href="#/exercicio/${id}?dia=${n}">Ver</a>
      </div>`;
    }).join("")}
  </div>

  <div class="section dica"><strong>💡 Dica do dia:</strong> ${esc(d.dicaDoDia)}</div>

  ${done ? `
  <div class="section card celebrate">
    <div>${n === 15 ? "🏆" : "🎉"}</div>
    <h2>${n === 15 ? "Protocolo concluído!" : `Dia ${n} concluído!`}</h2>
    <p class="muted">${n === 15 ? "Você chegou até o fim. Orgulho de você!" : "Excelente! Amanhã tem mais."}</p>
    ${n < 15 ? `<a class="btn" style="margin-top:16px" href="#/dia/${n + 1}">Próximo dia →</a>` : ""}
  </div>
  ${cardDiario(n)}` : ""}

  <div class="row section" style="justify-content:space-between">
    ${n > 1 ? `<a class="btn btn--ghost" href="#/dia/${n - 1}">← Dia ${n - 1}</a>` : "<span></span>"}
    ${n < 15 && diaLiberado(n + 1) ? `<a class="btn btn--ghost" href="#/dia/${n + 1}">Dia ${n + 1} →</a>` : ""}
  </div>`;
}

function cardDiario(n) {
  const nota = state.notas[n] || {};
  return `
  <div class="section card stack">
    <p class="eyebrow">📝 Meu diário · Dia ${n}</p>
    <h3>Como você se sentiu hoje?</h3>
    <div class="humores">
      ${HUMORES.map((h) => `<button class="humor ${nota.humor === h.v ? "is-on" : ""}" data-humor="${h.v}" data-dia="${n}"><span>${h.e}</span>${h.t}</button>`).join("")}
    </div>
    <textarea class="input" id="nota-texto" rows="3" maxlength="400" placeholder="Anote o que percebeu: inchaço, postura, como o rosto está...">${esc(nota.texto || "")}</textarea>
    <button class="btn btn--ghost" data-salvar-nota="${n}">Salvar anotação</button>
  </div>`;
}

function telaExercicio(id, dia) {
  const e = EXERCICIOS[id];
  if (!e) return telaNaoEncontrada();
  const noDia = dia && exerciciosDoDia(dia).includes(id);
  const ok = noDia && feitosDoDia(dia).includes(id);
  return `
  <a class="back" href="${noDia ? `#/dia/${dia}` : "#/exercicios"}">← Voltar</a>
  <div class="row"><span class="chip">${esc(e.categoria)}</span><span class="muted" style="font-size:12px">${NIVEIS[e.nivel] || ""}</span></div>
  <h1 style="margin-top:8px">${e.icone || ""} ${esc(e.nome)}</h1>
  <p class="muted" style="margin-bottom:16px">⏱️ ${esc(e.duracao)} · ${esc(e.musculo)}</p>

  <div class="grid-2">
    ${videoEmbed(e.video)}
    <div class="card timer">
      <p class="eyebrow">Cronômetro</p>
      <div class="timer__time" id="timer">00:30</div>
      <div class="timer__btns">
        <button class="btn btn--ghost btn--sm" data-timer="10">10s</button>
        <button class="btn btn--ghost btn--sm" data-timer="30">30s</button>
        <button class="btn btn--ghost btn--sm" data-timer="60">1min</button>
      </div>
      <button class="btn btn--block" style="margin-top:10px" id="timer-go">▶ Iniciar</button>
    </div>
  </div>

  ${e.objetivo ? `<div class="section objetivo"><strong>🎯 Objetivo:</strong> ${esc(e.objetivo)}</div>` : ""}

  <div class="section card">
    <h2>Como fazer</h2>
    <ol class="passos">${e.passos.map((p) => `<li>${esc(p)}</li>`).join("")}</ol>
  </div>
  ${e.erros ? `<div class="section card erros"><h3>❌ Erros comuns</h3><p>${esc(e.erros)}</p></div>` : ""}
  <div class="section dica"><strong>💡 Dica da expert:</strong> ${esc(e.dica)}</div>
  ${e.cuidado ? `<div class="section alerta"><span>⚠️</span><p><strong>Atenção:</strong> ${esc(e.cuidado)}</p></div>` : ""}

  ${noDia ? `
  <button class="btn btn--block section" data-toggle="${id}" data-dia="${dia}" data-back="1">
    ${ok ? "✓ Concluído (desmarcar)" : "Marcar como concluído ✓"}
  </button>` : ""}`;
}

function telaExercicios(cat) {
  const cats = ["Todos", ...new Set(Object.values(EXERCICIOS).map((e) => e.categoria))];
  const ativa = cats.includes(cat) ? cat : "Todos";
  const lista = Object.entries(EXERCICIOS).filter(([, e]) => ativa === "Todos" || e.categoria === ativa);
  return `
  <p class="eyebrow">Biblioteca</p>
  <h1>Biblioteca de Exercícios</h1>
  <p class="muted" style="margin:6px 0 16px">Consulte o passo a passo de cada movimento quando quiser.</p>
  <div class="filtros">
    ${cats.map((c) => `<a class="filtro ${c === ativa ? "is-on" : ""}" href="#/exercicios${c === "Todos" ? "" : "?cat=" + encodeURIComponent(c)}">${esc(c)}</a>`).join("")}
  </div>
  ${avisoSeguranca()}
  <div class="lib section">
    ${lista.map(([id, e]) => `
      <a class="lib-card" href="#/exercicio/${id}">
        <div class="lib-card__ic">${e.icone || "💪"}</div>
        <div class="lib-card__body">
          <span class="lib-card__cat">${esc(e.categoria)} · ${NIVEIS[e.nivel] || ""}</span>
          <h3>${esc(e.nome)}</h3>
          <p class="clamp">${esc(e.objetivo || e.musculo)}</p>
        </div>
        <span class="lib-card__tempo">⏱️ ${esc(e.duracao.split(" (")[0])}</span>
      </a>`).join("")}
  </div>`;
}

function telaRotina() {
  const feitos = state.habitos[hoje()] || [];
  const pct = Math.round((feitos.length / ROTINA.length) * 100);
  return `
  <p class="eyebrow">Hábitos diários</p>
  <h1>Rotina de hoje</h1>
  <p class="muted" style="margin:6px 0 14px">Pequenos hábitos que potencializam os exercícios. A lista recomeça todo dia.</p>
  ${barra(pct, true)}
  <div class="stack section">
    ${ROTINA.map((h) => `
      <button class="habit ${feitos.includes(h.id) ? "habit--done" : ""}" data-habito="${h.id}">
        <span class="habit__icon">${h.icone}</span>
        <span class="habit__txt">${esc(h.texto)}</span>
        <span>${feitos.includes(h.id) ? "✅" : "⬜"}</span>
      </button>`).join("")}
  </div>
  <div class="section card stack">
    <h2>Rotina ideal do treino</h2>
    <p>🕗 <strong>Horário:</strong> escolha um horário fixo (por exemplo, ao acordar ou antes de dormir).</p>
    <p>🪞 <strong>Onde:</strong> em frente ao espelho, sentada com a coluna ereta.</p>
    <p>⏱️ <strong>Duração:</strong> ${state.tempo === 5 ? "cerca de 5 minutos (modo compacto)" : "de 10 a 15 minutos por dia"}.</p>
    <p>🧴 <strong>Finalize</strong> sempre com a automassagem drenante.</p>
  </div>`;
}

function telaProgresso() {
  const feitos = diasCompletos();
  const pct = Math.round((feitos / DIAS.length) * 100);
  const seq = sequencia();
  const totalEx = Object.values(state.feitos).reduce((s, l) => s + l.length, 0);
  const notas = DIAS.filter((d) => state.notas[d.dia] && (state.notas[d.dia].humor || state.notas[d.dia].texto));
  return `
  <p class="eyebrow">Acompanhamento</p>
  <h1>Meu Progresso</h1>
  <div class="stats section">
    <div class="stat"><span class="stat__v">${feitos}<small>/${DIAS.length}</small></span><span class="stat__l">Dias concluídos</span></div>
    <div class="stat"><span class="stat__v">${pct}%</span><span class="stat__l">Do protocolo</span></div>
    <div class="stat"><span class="stat__v">🔥 ${seq}</span><span class="stat__l">Dias seguidos</span></div>
    <div class="stat"><span class="stat__v">${totalEx}</span><span class="stat__l">Exercícios feitos</span></div>
  </div>

  <div class="section card">
    <h2>Linha do tempo</h2>
    <div class="timeline">
      ${DIAS.map((d) => {
        const c = state.concluidos[d.dia];
        const h = state.notas[d.dia]?.humor;
        return `<a href="#/dia/${d.dia}" class="tl ${c ? "tl--ok" : d.dia === diaAtual() ? "tl--atual" : ""}">
          <span class="tl__n">${d.dia}</span>
          <span class="tl__d">${c ? (h ? HUMORES[h - 1].e : "✓") + " " + fmtData(c) : "—"}</span>
        </a>`;
      }).join("")}
    </div>
  </div>

  <div class="section card stack">
    <h2>📸 Fotos de comparação</h2>
    <p class="muted">Tire fotos de perfil sempre com a mesma luz, a mesma distância e a cabeça em posição neutra, nos <strong>dias 1, 8 e 15</strong>. Guarde no seu celular e compare no final.</p>
  </div>

  <div class="section">
    <h2>📝 Meu diário</h2>
    ${notas.length ? `<div class="stack">${notas.map((d) => {
      const nt = state.notas[d.dia];
      return `<a class="card nota" href="#/dia/${d.dia}">
        <div class="row" style="justify-content:space-between"><strong>Dia ${d.dia} · ${esc(d.titulo)}</strong><span>${nt.humor ? HUMORES[nt.humor - 1].e : ""}</span></div>
        ${nt.texto ? `<p class="muted">${esc(nt.texto)}</p>` : ""}
      </a>`;
    }).join("")}</div>`
    : `<div class="card"><p class="muted">Ao concluir um dia, registre como você se sentiu. Suas anotações vão aparecer aqui.</p></div>`}
  </div>`;
}

function telaBonus() {
  return `
  <p class="eyebrow">Presentes para você</p>
  <h1>Meus Bônus</h1>
  <div class="stack section">
    ${BONUS.map((b, i) => {
      const temConteudo = b.conteudo && b.conteudo.length;
      const acao = b.link
        ? `<a class="btn btn--sm" href="${esc(b.link)}" target="_blank" rel="noopener">Acessar</a>`
        : temConteudo ? `<button class="btn btn--sm" data-bonus="${i}">Ler agora</button>`
        : `<span class="muted">Em breve</span>`;
      return `
      <div class="card bonus">
        <div class="bonus__ic">${b.icone || "🎁"}</div>
        <div class="bonus__body"><span class="chip">${esc(b.tipo)}</span><h3 style="margin-top:6px">${esc(b.titulo)}</h3></div>
        ${acao}
      </div>`;
    }).join("")}
  </div>`;
}

function telaNaoEncontrada() {
  return `<div class="card celebrate"><div>🤔</div><h2>Página não encontrada</h2><a class="btn" style="margin-top:16px" href="#/">Ir para o início</a></div>`;
}

/* =========================================================
   MODAIS
   ========================================================= */

/* ---------- Treino guiado ---------- */
const RAIO = 60, CIRC = 2 * Math.PI * RAIO;
let guiado = null;

function abrirGuiado(n) {
  if (!diaLiberado(n)) return;
  const lista = exerciciosDoDia(n);
  const feitos = feitosDoDia(n);
  let i = lista.findIndex((id) => !feitos.includes(id));
  if (i < 0) i = 0;
  guiado = { dia: n, lista, i, rest: 0, total: 0, int: null };
  prepararPasso();
}
function prepararPasso() {
  pararTimerGuiado();
  const e = EXERCICIOS[guiado.lista[guiado.i]];
  guiado.total = guiado.rest = e.tempo || 60;
  renderGuiado();
}
function pararTimerGuiado() {
  if (guiado?.int) { clearInterval(guiado.int); guiado.int = null; }
}
function renderGuiado() {
  const { dia, lista, i } = guiado;
  const id = lista[i];
  const e = EXERCICIOS[id];
  const ultimo = i === lista.length - 1;
  abrirModal(`
    <div class="gd">
      <div class="gd__head">
        <div><p class="eyebrow">Dia ${dia} · Treino guiado</p><h2 style="margin:0">${esc(getDia(dia).titulo)}</h2></div>
        <button class="icon-btn" data-action="close">✕</button>
      </div>
      <div class="gd__steps">${lista.map((_, k) => `<span class="${k < i ? "ok" : k === i ? "on" : ""}"></span>`).join("")}</div>
      <div class="gd__card">
        <p class="gd__etapa">Exercício ${i + 1} de ${lista.length}</p>
        ${ehArquivoVideo(e.video)
          ? `<video class="gd__video" src="${esc(e.video)}" poster="${esc(posterDe(e.video))}" autoplay muted loop playsinline></video>`
          : `<div class="gd__ic">${e.icone || "💪"}</div>`}
        <h3>${esc(e.nome)}</h3>
        <p class="muted" style="font-size:14px">${esc(e.duracao)}</p>
        <div class="ring">
          <svg viewBox="0 0 144 144"><circle cx="72" cy="72" r="${RAIO}" class="ring__bg"/><circle cx="72" cy="72" r="${RAIO}" class="ring__fg" id="ring-fg" stroke-dasharray="${CIRC}" stroke-dashoffset="0"/></svg>
          <div class="ring__txt"><span id="gd-time">${fmtSeg(guiado.rest)}</span><small>tempo</small></div>
        </div>
        <div class="row" style="justify-content:center">
          <button class="btn btn--sm" id="gd-play">▶ Iniciar</button>
          <button class="btn btn--ghost btn--sm" id="gd-reset">↺ Reiniciar</button>
        </div>
      </div>
      <details class="gd__como" ${i === 0 ? "open" : ""}>
        <summary>Como fazer</summary>
        <ol class="passos">${e.passos.map((p) => `<li>${esc(p)}</li>`).join("")}</ol>
        <p class="dica" style="margin-top:10px">💡 ${esc(e.dica)}</p>
      </details>
      ${e.cuidado ? `<div class="alerta"><span>⚠️</span><p>${esc(e.cuidado)}</p></div>` : ""}
      <div class="gd__nav">
        <button class="btn btn--ghost btn--sm" id="gd-prev" ${i === 0 ? "style='visibility:hidden'" : ""}>← Anterior</button>
        <button class="btn" id="gd-next">${ultimo ? "Concluir treino ✓" : "Próximo →"}</button>
      </div>
    </div>`, "modal__box--lg");

  const $time = document.getElementById("gd-time");
  const $ring = document.getElementById("ring-fg");
  const $play = document.getElementById("gd-play");
  const pintar = () => {
    $time.textContent = fmtSeg(guiado.rest);
    $ring.style.strokeDashoffset = CIRC * (1 - guiado.rest / guiado.total);
  };
  pintar();
  $play.onclick = () => {
    if (guiado.int) { pararTimerGuiado(); $play.textContent = "▶ Continuar"; return; }
    if (guiado.rest <= 0) guiado.rest = guiado.total;
    $play.textContent = "⏸ Pausar";
    guiado.int = setInterval(() => {
      guiado.rest--; pintar();
      if (guiado.rest <= 0) { pararTimerGuiado(); $play.textContent = "↺ De novo"; beep(); toast(ultimo ? "⏰ Último exercício feito!" : "⏰ Tempo! Vamos ao próximo"); }
    }, 1000);
  };
  document.getElementById("gd-reset").onclick = () => { pararTimerGuiado(); guiado.rest = guiado.total; $play.textContent = "▶ Iniciar"; pintar(); };
  document.getElementById("gd-prev").onclick = () => { guiado.i--; prepararPasso(); };
  document.getElementById("gd-next").onclick = () => {
    marcarFeito(dia, id);
    if (ultimo) {
      lista.forEach((x) => marcarFeito(dia, x));
      verificarConclusao(dia);
      fecharModal();
      guiado = null;
      location.hash = `#/dia/${dia}`;
      render();
    } else { guiado.i++; prepararPasso(); }
  };
}
const fmtSeg = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
function beep() {
  navigator.vibrate?.(400);
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = 880; o.connect(g); g.connect(ctx.destination);
    g.gain.setValueAtTime(0.2, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    o.start(); o.stop(ctx.currentTime + 0.6);
  } catch {}
}

/* ---------- Conclusão do protocolo ---------- */
function modalConclusao() {
  abrirModal(`
    <div class="celebrate">
      <div class="pulse">🏆</div>
      <h2>Você concluiu o Xô Papada!</h2>
      <p class="muted">Parabéns por dedicar esse tempo a você. Tire a foto final e compare com a do dia 1!</p>
      <div class="stats" style="margin:18px 0">
        <div class="stat"><span class="stat__v">15/15</span><span class="stat__l">Dias</span></div>
        <div class="stat"><span class="stat__v">100%</span><span class="stat__l">Concluído</span></div>
      </div>
      <div class="stack">
        <a class="btn btn--block" href="#/progresso" data-action="close">Ver meu progresso</a>
        <a class="btn btn--ghost btn--block" href="#/bonus" data-action="close">Rotina de manutenção</a>
      </div>
    </div>`);
}

/* ---------- Leitor de bônus ---------- */
function modalBonus(i) {
  const b = BONUS[i];
  abrirModal(`
    <div class="gd__head"><div><span class="chip">${esc(b.tipo)}</span><h2 style="margin:6px 0 0">${b.icone || ""} ${esc(b.titulo)}</h2></div>
      <button class="icon-btn" data-action="close">✕</button></div>
    <div class="stack" style="margin-top:16px">
      ${b.conteudo.map((c) => `<div><h3>${esc(c.t)}</h3><p class="muted">${esc(c.p)}</p></div>`).join("")}
    </div>
    <button class="btn btn--block" style="margin-top:20px" data-action="close">Fechar</button>`, "modal__box--lg");
}

/* ---------- Configurações ---------- */
function modalConfig() {
  abrirModal(`
    <div class="gd__head"><h2 style="margin:0">⚙️ Configurações</h2><button class="icon-btn" data-action="close">✕</button></div>
    <label class="label">Seu nome</label>
    <input class="input" id="cfg-nome" value="${esc(state.nome)}" maxlength="40" style="margin-top:6px" />
    <label class="label">Tempo por dia</label>
    ${opcoesTempo()}
    <button class="btn btn--block" style="margin-top:16px" data-action="save-settings">Salvar</button>
    <hr class="hr" />
    <button class="btn btn--ghost btn--block" data-action="install">📲 Instalar como aplicativo</button>
    <button class="link-btn danger" style="margin:16px auto 0;display:block" data-action="reset">Recomeçar protocolo do zero</button>`);
}

/* ---------- Instalação (PWA) ---------- */
let promptInstalacao = null;
const ehStandalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone;
const ehNavegadorInterno = () => /Instagram|FBAN|FBAV|WhatsApp|Line\//i.test(navigator.userAgent);
const ehIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);

window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); promptInstalacao = e; atualizarBanner(); });
window.addEventListener("appinstalled", () => { state.bannerFechado = true; salvar(); atualizarBanner(); toast("✅ App instalado!"); });

/* Banner de instalação removido: a instalação fica disponível nas Configurações */
function atualizarBanner() {}

async function instalar() {
  if (promptInstalacao) {
    promptInstalacao.prompt();
    await promptInstalacao.userChoice;
    promptInstalacao = null;
    return;
  }
  modalInstalar(ehIOS() ? "ios" : "android");
}

function modalInstalar(plat) {
  const passos = {
    ios: ["Abra este link no <strong>Safari</strong>.", "Toque no botão <strong>Compartilhar</strong> (quadrado com seta ⬆️) na barra de baixo.", "Role e toque em <strong>“Adicionar à Tela de Início”</strong> e depois em <strong>Adicionar</strong>."],
    android: ["Abra este link no <strong>Google Chrome</strong>.", "Toque nos <strong>três pontinhos ⋮</strong> no canto superior direito.", "Toque em <strong>“Instalar app”</strong> ou <strong>“Adicionar à tela inicial”</strong>."],
  };
  abrirModal(`
    <div class="gd__head"><div><h2 style="margin:0">📲 Instalar o aplicativo</h2><p class="muted" style="font-size:13px">Em 3 toques rápidos</p></div>
      <button class="icon-btn" data-action="close">✕</button></div>
    ${ehNavegadorInterno() ? `<div class="alerta" style="margin-top:12px"><span>⚠️</span><p><strong>Você está no navegador do Instagram/WhatsApp.</strong> Toque nos 3 pontinhos e escolha “Abrir no navegador” (Safari ou Chrome) antes de instalar.</p></div>` : ""}
    <div class="seg" style="margin:16px 0">
      <button class="${plat === "ios" ? "is-on" : ""}" data-plat="ios">🍎 iPhone</button>
      <button class="${plat === "android" ? "is-on" : ""}" data-plat="android">🤖 Android</button>
    </div>
    <ol class="passos">${passos[plat].map((p) => `<li><span>${p}</span></li>`).join("")}</ol>
    <button class="btn btn--block" style="margin-top:20px" data-action="close">Entendi</button>`);
}

/* =========================================================
   ROTEADOR
   ========================================================= */
function rota() {
  const [path, query] = location.hash.replace(/^#/, "").split("?");
  return { parts: path.split("/").filter(Boolean), params: new URLSearchParams(query || "") };
}

function render() {
  const { parts, params } = rota();
  let html, nav = parts[0] || "inicio";
  document.body.classList.toggle("is-onboarding", !state.nome || passoOnboard === 2);

  if (!state.nome || passoOnboard === 2) { html = telaOnboarding(); nav = ""; }
  else switch (parts[0]) {
    case undefined: html = telaInicio(); break;
    case "protocolo": html = telaProtocolo(); break;
    case "dia": html = telaDia(+parts[1]); nav = "protocolo"; break;
    case "exercicios": html = telaExercicios(params.get("cat")); break;
    case "exercicio": html = telaExercicio(parts[1], +params.get("dia") || 0); nav = params.get("dia") ? "protocolo" : "exercicios"; break;
    case "rotina": html = telaRotina(); break;
    case "progresso": html = telaProgresso(); break;
    case "bonus": html = telaBonus(); break;
    default: html = telaNaoEncontrada();
  }

  $app.innerHTML = html;
  document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === nav));
  atualizarBanner();
  bindTela();
}

/* ---------- Eventos ---------- */
let timerInt = null, timerSeg = 30;

/* Cliques globais (funcionam em telas e modais) */
document.addEventListener("click", (ev) => {
  const el = ev.target.closest("[data-action],[data-guiado],[data-bonus],[data-tempo],[data-plat],[data-humor]");
  if (!el) return;
  if (el.dataset.guiado) return abrirGuiado(+el.dataset.guiado);
  if (el.dataset.bonus) return modalBonus(+el.dataset.bonus);
  if (el.dataset.plat) return modalInstalar(el.dataset.plat);
  if (el.dataset.tempo) {
    el.parentElement.querySelectorAll(".tempo-card").forEach((c) => c.classList.toggle("is-on", c === el));
    el.parentElement.dataset.escolha = el.dataset.tempo;
    return;
  }
  if (el.dataset.humor) {
    const n = +el.dataset.dia;
    state.notas[n] = { ...(state.notas[n] || {}), humor: +el.dataset.humor };
    salvar();
    el.parentElement.querySelectorAll(".humor").forEach((h) => h.classList.toggle("is-on", h === el));
    return;
  }
  const escolhaTempo = () => +(document.querySelector(".tempo-opcoes")?.dataset.escolha || state.tempo);
  switch (el.dataset.action) {
    case "close": fecharModal(); break;
    case "video-expert": modalVideoExpert(); break;
    case "settings": if (state.nome) modalConfig(); break;
    case "install": instalar(); break;
    case "finish-onboard":
      state.tempo = escolhaTempo(); salvar(); passoOnboard = 0; location.hash = "#/"; render();
      toast(`Bem-vinda, ${state.nome}! 💖`); break;
    case "save-settings": {
      const nome = document.getElementById("cfg-nome").value.trim();
      if (nome) state.nome = nome;
      state.tempo = escolhaTempo();
      salvar(); fecharModal(); render(); toast("Preferências salvas ✓"); break;
    }
    case "reset":
      /* confirmação em dois toques, sem janela do navegador */
      if (!el.dataset.confirmar) {
        el.dataset.confirmar = "1";
        el.textContent = "Toque de novo para apagar todo o progresso e o diário";
        el.classList.add("is-danger");
        return;
      }
      Object.assign(state, { feitos: {}, concluidos: {}, habitos: {}, notas: {} });
      salvar(); fecharModal(); location.hash = "#/"; render(); toast("Protocolo reiniciado");
      break;
  }
});

function bindTela() {
  clearInterval(timerInt);

  document.getElementById("form-nome")?.addEventListener("submit", (ev) => {
    ev.preventDefault();
    state.nome = document.getElementById("nome").value.trim();
    salvar();
    passoOnboard = 2;
    render();
  });

  document.querySelectorAll("#app [data-toggle]").forEach((b) => b.addEventListener("click", () => {
    const dia = +(b.dataset.dia || rota().parts[1]);
    toggleExercicio(dia, b.dataset.toggle);
    if (b.dataset.back && feitosDoDia(dia).includes(b.dataset.toggle)) location.hash = `#/dia/${dia}`;
  }));

  document.querySelectorAll("[data-habito]").forEach((b) => b.addEventListener("click", () => toggleHabito(b.dataset.habito)));

  document.querySelector("[data-salvar-nota]")?.addEventListener("click", (ev) => {
    const n = +ev.currentTarget.dataset.salvarNota;
    state.notas[n] = { ...(state.notas[n] || {}), texto: document.getElementById("nota-texto").value.trim() };
    salvar();
    toast("📝 Anotação salva!");
  });

  /* Cronômetro simples da tela de exercício */
  const $t = document.getElementById("timer");
  if ($t) {
    const $go = document.getElementById("timer-go");
    let rest = timerSeg;
    $t.textContent = fmtSeg(rest);
    document.querySelectorAll("[data-timer]").forEach((b) => b.addEventListener("click", () => {
      clearInterval(timerInt); timerInt = null;
      timerSeg = rest = +b.dataset.timer; $t.textContent = fmtSeg(rest); $go.textContent = "▶ Iniciar";
    }));
    $go.addEventListener("click", () => {
      if (timerInt) { clearInterval(timerInt); timerInt = null; $go.textContent = "▶ Continuar"; return; }
      if (rest <= 0) rest = timerSeg;
      $go.textContent = "⏸ Pausar";
      timerInt = setInterval(() => {
        rest--; $t.textContent = fmtSeg(rest);
        if (rest <= 0) { clearInterval(timerInt); timerInt = null; $go.textContent = "↺ De novo"; beep(); toast("⏰ Tempo!"); }
      }, 1000);
    });
  }
}

window.addEventListener("hashchange", () => { if (!$modal.hidden) fecharModal(); render(); window.scrollTo(0, 0); });

if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

render();
