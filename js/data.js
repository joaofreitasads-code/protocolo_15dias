/* =========================================================
   XÔ PAPADA — CONTEÚDO DO PROTOCOLO
   ---------------------------------------------------------
   Este é o ÚNICO arquivo que você (ou sua expert) precisa
   editar para mudar textos, exercícios, vídeos e a rotina.
   - video: link do YouTube/Vimeo OU arquivo próprio em assets/videos/nome.mp4
     (para arquivo, coloque uma imagem de capa com o mesmo nome: nome.jpg)
   - Os textos atuais são PLACEHOLDERS para a expert revisar.
   ========================================================= */

const CONFIG = {
  produto: "Xô Papada",
  subtitulo: "Protocolo de 15 dias",
  expert: {
    nome: "Juliana Saraiva",
    titulo: "Especialista em Saúde Facial",
    foto: "assets/expert.jpg",
    boasVindas:
      "Que alegria ter você aqui! Eu vou te acompanhar nos próximos 15 dias. Vamos trabalhar juntas a musculatura do rosto e do pescoço com exercícios simples, rápidos e feitos em casa. Reserve alguns minutos por dia, siga o treino guiado e marque cada exercício concluído. A constância é o que traz resultado.",
    videoBoasVindas: "", // link do vídeo de boas-vindas (YouTube/Vimeo)
  },
  suporte: {
    whatsapp: "5500000000000", // só números, com DDI
    email: "suporte@xopapada.com",
  },
};

/* ---------- BIBLIOTECA DE EXERCÍCIOS ----------
   Categorias: Postura · Força · Tonificação · Alongamento · Contorno · Drenagem
   nivel: 1 = iniciante, 2 = intermediário, 3 = avançado
   cuidado: aviso de segurança mostrado na tela do exercício
   ------------------------------------------------------- */
const EXERCICIOS = {
  /* ===== POSTURA / BASE ===== */
  "postura": {
    nome: "Recolhimento de Queixo na Parede",
    categoria: "Postura", nivel: 1,
    duracao: "5 repetições de 10 seg",
    musculo: "Flexores profundos do pescoço",
    video: "",
    icone: "🧍‍♀️", tempo: 60, // tempo = segundos no treino guiado
    objetivo: "Treinar a posição neutra da cabeça e corrigir a 'cabeça para frente' que acentua a papada.",
    erros: "Inclinar a cabeça para baixo em vez de recolher para trás; afastar a cabeça da parede.",
    passos: [
      "Fique em pé com costas e parte de trás da cabeça encostadas na parede.",
      "Olhando para a frente, puxe o queixo para trás em linha reta, como se fizesse um 'queixo duplo' de propósito.",
      "Sinta a nuca alongar e segure por 10 segundos.",
      "Relaxe e repita.",
    ],
    dica: "Os olhos ficam na altura do horizonte. Se eles descerem, você está acenando com a cabeça, e não recolhendo o queixo.",
    cuidado: "",
  },
  "lingua-no-ceu": {
    nome: "Língua no Céu da Boca",
    categoria: "Postura", nivel: 1,
    duracao: "3 séries de 15 seg",
    musculo: "Supra-hióideos (abaixo do queixo)",
    video: "",
    icone: "👅", tempo: 45, // tempo = segundos no treino guiado
    objetivo: "Ativar os músculos abaixo do queixo e criar uma postura de língua que firma o perfil.",
    erros: "Pressionar só a ponta da língua; apertar os dentes com força.",
    passos: [
      "Feche a boca com os dentes levemente encostados.",
      "Encoste a língua INTEIRA no céu da boca, não só a ponta.",
      "Pressione para cima e sinta a região abaixo do queixo firmar.",
      "Segure 15 segundos e relaxe.",
    ],
    dica: "Também dá para fazer ao longo do dia: no trânsito, no trabalho ou vendo TV.",
    cuidado: "Se sentir dor na articulação da mandíbula (ATM), diminua a força.",
  },

  /* ===== FORÇA (região abaixo do queixo) ===== */
  "bola-sob-queixo": {
    nome: "Pressão com Bolinha",
    categoria: "Força", nivel: 1,
    duracao: "3 séries de 10 (segurar 5 seg)",
    musculo: "Supra-hióideos (abaixo do queixo)",
    video: "",
    icone: "⚽", tempo: 60, // tempo = segundos no treino guiado
    objetivo: "Fortalecer a musculatura abaixo do queixo usando resistência.",
    erros: "Curvar os ombros e as costas; fazer o movimento rápido demais.",
    passos: [
      "Sentada, coloque uma bolinha (de tênis ou de borracha) entre o queixo e o peito.",
      "Pressione o queixo para baixo, apertando a bolinha.",
      "Segure por 5 segundos.",
      "Solte devagar e repita.",
    ],
    dica: "Sem bolinha? Use uma meia ou toalha de rosto enrolada.",
    cuidado: "",
  },
  "excentrico-bolinha": {
    nome: "Pressão Lenta com Bolinha",
    categoria: "Força", nivel: 2,
    duracao: "3 séries de 10",
    musculo: "Supra-hióideos (abaixo do queixo)",
    video: "",
    icone: "🐢", tempo: 60, // tempo = segundos no treino guiado
    objetivo: "Ganhar força abaixo do queixo com a fase lenta do movimento, a que mais gerou força nos estudos.",
    erros: "Soltar a pressão ao subir; deixar a cabeça voltar rápido.",
    passos: [
      "Posicione a bolinha entre o queixo e o peito.",
      "Aperte a bolinha com força.",
      "SEM soltar a pressão, vá subindo o queixo bem devagar, contando 5 segundos.",
      "Repita o movimento.",
    ],
    dica: "A força está na volta lenta. Não deixe a cabeça subir rápido.",
    cuidado: "",
  },
  "queixo-contra-punho": {
    nome: "Queixo Contra o Punho",
    categoria: "Força", nivel: 2,
    duracao: "3 séries de 10 (segurar 5 seg)",
    musculo: "Supra-hióideos e flexores do pescoço",
    video: "",
    icone: "✊", tempo: 60, // tempo = segundos no treino guiado
    objetivo: "Fortalecer o queixo e o pescoço sem precisar de material.",
    erros: "Deixar a cabeça se mover; prender a respiração.",
    passos: [
      "Feche uma das mãos e apoie o punho embaixo do queixo.",
      "Empurre o queixo para baixo enquanto o punho empurra para cima, sem a cabeça se mexer.",
      "Segure 5 segundos e relaxe.",
    ],
    dica: "Com 50% a 70% da sua força já é suficiente. Não precisa travar o rosto.",
    cuidado: "",
  },
  "elevacao-deitada": {
    nome: "Elevação de Cabeça Deitada",
    categoria: "Força", nivel: 3,
    duracao: "3 séries de 10 (segurar 3 seg)",
    musculo: "Supra-hióideos e flexores do pescoço",
    video: "",
    icone: "🛏️", tempo: 90, // tempo = segundos no treino guiado
    objetivo: "Fortalecer intensamente a frente do pescoço e a região abaixo do queixo.",
    erros: "Tirar os ombros do chão; jogar o queixo para cima em vez de olhar para os pés.",
    passos: [
      "Deite de barriga para cima, sem travesseiro, com os ombros apoiados no chão.",
      "Recolha um pouco o queixo e levante só a cabeça, olhando para os pés.",
      "Segure 3 segundos e desça devagar.",
    ],
    dica: "Os ombros NÃO saem do chão. Só a cabeça sobe.",
    cuidado: "Não faça se tiver hérnia cervical, dor no pescoço ou tontura. Pare se sentir dor.",
  },
  "lingua-no-nariz": {
    nome: "Língua em Direção ao Nariz",
    categoria: "Força", nivel: 1,
    duracao: "2 séries de 10 (segurar 5 seg)",
    musculo: "Língua e supra-hióideos",
    video: "",
    icone: "😛", tempo: 45, // tempo = segundos no treino guiado
    objetivo: "Contrair a musculatura da língua e a região abaixo do queixo.",
    erros: "Jogar a cabeça para trás para alcançar o nariz.",
    passos: [
      "Olhe para a frente, com a coluna ereta.",
      "Coloque a língua para fora e estique-a para cima, tentando alcançar a ponta do nariz.",
      "Segure 5 segundos e relaxe.",
    ],
    dica: "Não precisa encostar no nariz. O que importa é sentir a parte de baixo do queixo trabalhando.",
    cuidado: "",
  },
  "engolir-olhando-teto": {
    nome: "Engolir Olhando para Cima",
    categoria: "Força", nivel: 1,
    duracao: "2 séries de 10",
    musculo: "Supra-hióideos e platisma",
    video: "",
    icone: "🥤", tempo: 45, // tempo = segundos no treino guiado
    objetivo: "Contrair os músculos do pescoço e abaixo do queixo durante a deglutição.",
    erros: "Inclinar demais a cabeça para trás; fazer rápido.",
    passos: [
      "Incline a cabeça para trás com cuidado, olhando para o teto.",
      "Encoste a língua no céu da boca.",
      "Engula, sentindo o pescoço contrair.",
      "Volte a cabeça ao centro e repita.",
    ],
    dica: "Movimento curto e lento. Não precisa jogar a cabeça muito para trás.",
    cuidado: "Evite se tiver problema na cervical ou se sentir tontura.",
  },

  /* ===== TONIFICAÇÃO (platisma / pescoço) ===== */
  "queixo-ao-teto": {
    nome: "Beijo no Teto",
    categoria: "Tonificação", nivel: 1,
    duracao: "3 séries de 10 (segurar 5 seg)",
    musculo: "Platisma e região abaixo do queixo",
    video: "",
    icone: "💋", tempo: 60, // tempo = segundos no treino guiado
    objetivo: "Alongar e tonificar a frente do pescoço (platisma).",
    erros: "Forçar a nuca; levar a cabeça para trás com tranco.",
    passos: [
      "Sente-se com a coluna ereta e os ombros relaxados.",
      "Incline a cabeça para trás com cuidado, olhando para o teto.",
      "Faça um bico como se fosse beijar o teto e segure por 5 segundos.",
      "Volte devagar.",
    ],
    dica: "Sinta a frente do pescoço alongar. Não force a nuca.",
    cuidado: "Movimento suave. Evite se tiver problema na cervical.",
  },
  "projecao-mandibula": {
    nome: "Projeção de Mandíbula",
    categoria: "Tonificação", nivel: 1,
    duracao: "3 séries de 10 (segurar 10 seg)",
    musculo: "Mandíbula e região abaixo do queixo",
    video: "",
    icone: "🎯", tempo: 60, // tempo = segundos no treino guiado
    objetivo: "Tonificar a linha da mandíbula e alongar a região abaixo do queixo.",
    erros: "Subir os ombros; abrir a boca durante o movimento.",
    passos: [
      "Olhe para a frente com a cabeça levemente inclinada para cima.",
      "Empurre a mandíbula de baixo para a frente, até sentir alongar embaixo do queixo.",
      "Segure por 10 segundos e relaxe.",
    ],
    dica: "Os ombros ficam parados durante todo o movimento.",
    cuidado: "Se a mandíbula estalar ou doer (ATM), reduza a amplitude ou pule este exercício.",
  },
  "careta-platisma": {
    nome: "Ativação do Platisma",
    categoria: "Tonificação", nivel: 2,
    duracao: "2 séries de 10 (segurar 5 seg)",
    musculo: "Platisma",
    video: "",
    icone: "😬", tempo: 45, // tempo = segundos no treino guiado
    objetivo: "Ativar diretamente o platisma, o músculo fino que cobre a frente do pescoço.",
    erros: "Contrair a testa e os olhos junto; prender a respiração.",
    passos: [
      "Em frente ao espelho, abra levemente a boca.",
      "Puxe os cantos da boca e o lábio inferior para baixo, como numa 'careta'.",
      "Você vai ver os músculos da frente do pescoço aparecerem.",
      "Segure 5 segundos e relaxe.",
    ],
    dica: "Mantenha a testa e os olhos relaxados. Só a boca e o pescoço trabalham.",
    cuidado: "",
  },
  "rotacao-queixo-alto": {
    nome: "Giro com Queixo Elevado",
    categoria: "Tonificação", nivel: 2,
    duracao: "10 de cada lado (segurar 3 seg)",
    musculo: "Esternocleidomastóideo e platisma",
    video: "",
    icone: "🔄", tempo: 60, // tempo = segundos no treino guiado
    objetivo: "Tonificar as laterais do pescoço e o contorno abaixo da orelha.",
    erros: "Girar o tronco junto com a cabeça.",
    passos: [
      "Gire a cabeça para a direita, como se olhasse por cima do ombro.",
      "Nessa posição, eleve levemente o queixo.",
      "Segure 3 segundos, volte ao centro e repita para a esquerda.",
    ],
    dica: "Sinta a lateral do pescoço alongar.",
    cuidado: "",
  },

  /* ===== ALONGAMENTO / MOBILIDADE ===== */
  "inclinacao-lateral": {
    nome: "Inclinação Lateral",
    categoria: "Alongamento", nivel: 1,
    duracao: "3 de cada lado (segurar 10 seg)",
    musculo: "Laterais do pescoço",
    video: "assets/videos/inclinacao-lateral.mp4",
    icone: "🌿", tempo: 60, // tempo = segundos no treino guiado
    objetivo: "Soltar a tensão das laterais do pescoço e preparar para o treino.",
    erros: "Subir o ombro em direção à orelha; puxar a cabeça com a mão.",
    passos: [
      "Com a coluna ereta, incline a cabeça levando a orelha em direção ao ombro.",
      "Segure por 10 segundos.",
      "Volte ao centro e repita do outro lado.",
    ],
    dica: "Movimento lento e controlado, sem trancos. O ombro não sobe.",
    cuidado: "",
  },
  "rotacao-pescoco": {
    nome: "Meia-Lua com o Pescoço",
    categoria: "Alongamento", nivel: 1,
    duracao: "5 de cada lado",
    musculo: "Pescoço e trapézio",
    video: "",
    icone: "🌙", tempo: 45, // tempo = segundos no treino guiado
    objetivo: "Aquecer e dar mobilidade ao pescoço com segurança.",
    erros: "Levar a cabeça para trás; fazer rápido.",
    passos: [
      "Abaixe o queixo em direção ao peito.",
      "Leve a cabeça devagar até um ombro, desenhando uma meia-lua pela frente.",
      "Volte pelo mesmo caminho até o outro ombro.",
    ],
    dica: "Só a meia-lua da frente. Não precisa levar a cabeça para trás.",
    cuidado: "Se sentir tontura, diminua a velocidade.",
  },
  "alongamento-platisma": {
    nome: "Alongamento do Platisma",
    categoria: "Alongamento", nivel: 1,
    duracao: "3 de cada lado (segurar 15 seg)",
    musculo: "Platisma",
    video: "",
    icone: "🦢", tempo: 60, // tempo = segundos no treino guiado
    objetivo: "Alongar a frente do pescoço e soltar a tensão da musculatura.",
    erros: "Puxar a pele com força; inclinar a cabeça com tranco.",
    passos: [
      "Coloque as mãos cruzadas logo abaixo da clavícula e puxe a pele levemente para baixo.",
      "Incline a cabeça para trás e um pouco para o lado.",
      "Projete o lábio inferior para cima e segure 15 segundos.",
      "Troque de lado.",
    ],
    dica: "É um alongamento. Faça sem pressa, com a respiração calma.",
    cuidado: "",
  },

  /* ===== CONTORNO (mandíbula / rosto) ===== */
  "rosto-de-peixe": {
    nome: "Rosto de Peixe",
    categoria: "Contorno", nivel: 1,
    duracao: "3 séries de 10 (segurar 5 seg)",
    musculo: "Bochechas e contorno do rosto",
    video: "",
    icone: "🐟", tempo: 45, // tempo = segundos no treino guiado
    objetivo: "Trabalhar as bochechas e o contorno do rosto.",
    erros: "Soltar a sucção ao tentar sorrir.",
    passos: [
      "Sugue as bochechas para dentro, fazendo um 'rosto de peixe'.",
      "Tente sorrir mantendo a posição.",
      "Segure por 5 segundos e relaxe.",
    ],
    dica: "Faça em frente ao espelho para conferir a posição.",
    cuidado: "",
  },
  "vogais": {
    nome: "Vogais Exageradas",
    categoria: "Contorno", nivel: 1,
    duracao: "2 rodadas completas",
    musculo: "Músculos da boca e do rosto",
    video: "",
    icone: "🗣️", tempo: 45, // tempo = segundos no treino guiado
    objetivo: "Ativar toda a musculatura da boca e do rosto.",
    erros: "Fazer o movimento pequeno; ter pressa.",
    passos: [
      "Pronuncie A – E – I – O – U de forma bem exagerada.",
      "Abra bem a boca e estique os lábios em cada uma.",
      "Segure cada vogal por 3 segundos.",
    ],
    dica: "Use o espelho para garantir que a boca está abrindo bem.",
    cuidado: "",
  },
  "circulos-mandibula": {
    nome: "Círculos com a Mandíbula",
    categoria: "Contorno", nivel: 1,
    duracao: "10 para cada sentido",
    musculo: "Mandíbula",
    video: "",
    icone: "⭕", tempo: 45, // tempo = segundos no treino guiado
    objetivo: "Dar mobilidade à mandíbula e soltar a tensão do rosto.",
    erros: "Fazer círculos grandes ou rápidos.",
    passos: [
      "Com a boca levemente aberta, desenhe círculos com o queixo.",
      "Faça 10 no sentido horário.",
      "Depois faça 10 no sentido anti-horário.",
    ],
    dica: "Círculos pequenos e lentos.",
    cuidado: "Pule este exercício se tiver dor ou estalo na ATM.",
  },
  "bochecha-ar": {
    nome: "Bochecha de Ar",
    categoria: "Contorno", nivel: 1,
    duracao: "3 séries de 20 seg",
    musculo: "Bochechas e lábios",
    video: "",
    icone: "🎈", tempo: 45, // tempo = segundos no treino guiado
    objetivo: "Tonificar as bochechas e os lábios.",
    erros: "Deixar o ar escapar pelos lábios.",
    passos: [
      "Encha a boca de ar com os lábios bem fechados.",
      "Passe o ar de uma bochecha para a outra.",
      "Depois passe o ar para cima do lábio superior e para baixo do lábio inferior.",
    ],
    dica: "Os lábios ficam firmes para o ar não escapar.",
    cuidado: "",
  },
  "beijo-ar": {
    nome: "Beijo no Ar",
    categoria: "Contorno", nivel: 1,
    duracao: "2 séries de 15",
    musculo: "Lábios e região do queixo",
    video: "",
    icone: "😘", tempo: 45, // tempo = segundos no treino guiado
    objetivo: "Ativar os lábios, o queixo e a frente do pescoço.",
    erros: "Tensionar os ombros.",
    passos: [
      "Olhando para a frente, faça um bico bem projetado.",
      "Mande um 'beijo' para a frente, esticando os lábios ao máximo.",
      "Relaxe e repita.",
    ],
    dica: "Sinta o queixo e o pescoço participarem do movimento.",
    cuidado: "",
  },

  /* ===== DRENAGEM ===== */
  "drenagem": {
    nome: "Automassagem Drenante",
    categoria: "Drenagem", nivel: 1,
    duracao: "3 minutos",
    musculo: "Rosto e pescoço",
    video: "",
    icone: "💆‍♀️", tempo: 180, // tempo = segundos no treino guiado
    objetivo: "Reduzir o inchaço do rosto e do pescoço e fechar o treino com relaxamento.",
    erros: "Fazer muita força; massagear no sentido contrário (para cima no pescoço).",
    passos: [
      "Aplique um hidratante ou óleo nas mãos.",
      "Com movimentos lentos e suaves, deslize os dedos do queixo em direção às orelhas, por baixo da mandíbula.",
      "Das orelhas, desça pelas laterais do pescoço até a clavícula.",
      "Repita com pressão leve, sempre no mesmo sentido.",
    ],
    dica: "Pressão leve, como se estivesse fazendo carinho. Força não ajuda na drenagem.",
    cuidado: "Não faça sobre feridas, acne inflamada ou pele irritada.",
  },
};

/* ---------- FASES ---------- */
const FASES = [
  { id: 1, nome: "Ativação", dias: [1, 5], cor: "#E91E63",
    descricao: "Despertar a musculatura e criar o hábito." },
  { id: 2, nome: "Fortalecimento", dias: [6, 10], cor: "#C2185B",
    descricao: "Aumentar intensidade e tonificar." },
  { id: 3, nome: "Definição", dias: [11, 15], cor: "#880E4F",
    descricao: "Consolidar resultados e definir o contorno." },
];

/* ---------- PROTOCOLO DIA A DIA ----------
   Estrutura de cada dia: aquecimento → força/tonificação → contorno → drenagem
   ------------------------------------------------------- */
const DIAS = [
  /* FASE 1 — ATIVAÇÃO (nível 1) */
  { dia: 1, titulo: "Primeiro passo", foco: "Postura e consciência",
    exercicios: ["inclinacao-lateral", "postura", "lingua-no-ceu", "queixo-ao-teto", "drenagem"],
    dicaDoDia: "Tire uma foto de perfil hoje, com a mesma luz e o mesmo ângulo, para comparar no dia 15!" },
  { dia: 2, titulo: "Despertando", foco: "Mobilidade do pescoço",
    exercicios: ["rotacao-pescoco", "postura", "bola-sob-queixo", "beijo-ar", "drenagem"],
    dicaDoDia: "Beba pelo menos 2 litros de água. Isso ajuda a reduzir o inchaço." },
  { dia: 3, titulo: "Contorno", foco: "Mandíbula",
    exercicios: ["inclinacao-lateral", "lingua-no-ceu", "projecao-mandibula", "rosto-de-peixe", "drenagem"],
    dicaDoDia: "Reduza o sal hoje. Sódio em excesso faz o rosto reter líquido." },
  { dia: 4, titulo: "Expressão", foco: "Músculos do rosto",
    exercicios: ["rotacao-pescoco", "lingua-no-nariz", "vogais", "bochecha-ar", "queixo-ao-teto", "drenagem"],
    dicaDoDia: "No celular, levante a tela até a altura dos olhos." },
  { dia: 5, titulo: "Fechando a fase 1", foco: "Revisão",
    exercicios: ["postura", "bola-sob-queixo", "projecao-mandibula", "engolir-olhando-teto", "alongamento-platisma", "drenagem"],
    dicaDoDia: "Parabéns! Você completou a primeira fase. 💪" },

  /* FASE 2 — FORTALECIMENTO (entra o nível 2) */
  { dia: 6, titulo: "Mais força", foco: "Abaixo do queixo",
    exercicios: ["inclinacao-lateral", "postura", "excentrico-bolinha", "queixo-contra-punho", "queixo-ao-teto", "drenagem"],
    dicaDoDia: "Durma com a cabeça levemente elevada." },
  { dia: 7, titulo: "Uma semana!", foco: "Platisma",
    exercicios: ["rotacao-pescoco", "lingua-no-ceu", "careta-platisma", "rotacao-queixo-alto", "rosto-de-peixe", "drenagem"],
    dicaDoDia: "Uma semana de constância! Repare em como você está se sentindo." },
  { dia: 8, titulo: "Ritmo", foco: "Mandíbula + língua",
    exercicios: ["postura", "lingua-no-nariz", "projecao-mandibula", "circulos-mandibula", "vogais", "drenagem"],
    dicaDoDia: "Mastigue devagar e use os dois lados da boca." },
  { dia: 9, titulo: "Intensidade", foco: "Força completa",
    exercicios: ["inclinacao-lateral", "excentrico-bolinha", "engolir-olhando-teto", "careta-platisma", "beijo-ar", "drenagem"],
    dicaDoDia: "Faça a língua no céu da boca 3 vezes ao longo do dia." },
  { dia: 10, titulo: "Fechando a fase 2", foco: "Revisão",
    exercicios: ["postura", "queixo-contra-punho", "queixo-ao-teto", "rotacao-queixo-alto", "alongamento-platisma", "drenagem"],
    dicaDoDia: "Faltam só 5 dias. Não pare agora!" },

  /* FASE 3 — DEFINIÇÃO (entra o nível 3) */
  { dia: 11, titulo: "Definição", foco: "Circuito completo",
    exercicios: ["rotacao-pescoco", "postura", "elevacao-deitada", "excentrico-bolinha", "projecao-mandibula", "drenagem"],
    dicaDoDia: "Tire outra foto de perfil e compare com a do dia 1." },
  { dia: 12, titulo: "Firmeza", foco: "Platisma",
    exercicios: ["inclinacao-lateral", "lingua-no-ceu", "careta-platisma", "queixo-ao-teto", "rotacao-queixo-alto", "drenagem"],
    dicaDoDia: "Evite alimentos ultraprocessados hoje." },
  { dia: 13, titulo: "Reta final", foco: "Contorno",
    exercicios: ["postura", "queixo-contra-punho", "rosto-de-peixe", "circulos-mandibula", "bochecha-ar", "drenagem"],
    dicaDoDia: "É a constância que traz resultado." },
  { dia: 14, titulo: "Quase lá", foco: "Intensidade máxima",
    exercicios: ["rotacao-pescoco", "elevacao-deitada", "excentrico-bolinha", "engolir-olhando-teto", "projecao-mandibula", "alongamento-platisma", "drenagem"],
    dicaDoDia: "Amanhã é o grande dia!" },
  { dia: 15, titulo: "Conquista!", foco: "Rotina de manutenção",
    exercicios: ["inclinacao-lateral", "postura", "bola-sob-queixo", "queixo-ao-teto", "projecao-mandibula", "drenagem"],
    dicaDoDia: "Tire a foto final! Para manter, repita esta rotina 3 vezes por semana." },
];

/* ---------- ROTINA DIÁRIA (hábitos) ---------- */
const ROTINA = [
  { id: "agua", icone: "💧", texto: "Beber 2L de água" },
  { id: "postura", icone: "🧍‍♀️", texto: "Atenção à postura ao usar o celular" },
  { id: "lingua", icone: "👅", texto: "Língua no céu da boca 3x ao dia" },
  { id: "sal", icone: "🧂", texto: "Evitar excesso de sal" },
  { id: "sono", icone: "😴", texto: "Dormir 7–8 horas" },
];

/* ---------- MATERIAIS BÔNUS ----------
   link: abre um PDF/vídeo externo  |  conteudo: texto lido dentro do app
   (use um OU outro). Cada item de "conteudo" é { t: "título", p: "texto" }
   ------------------------------------------------------- */
const BONUS = [
  { titulo: "Guia de Alimentação Anti-inchaço", tipo: "Guia", icone: "🥗", link: "",
    conteudo: [
      { t: "Por que o rosto incha?", p: "Excesso de sal, pouca água, álcool e noites mal dormidas fazem o corpo reter líquido, e o rosto e o pescoço são os primeiros lugares onde isso aparece." },
      { t: "Beba água", p: "Meta: 30 a 35 ml por quilo de peso. Exemplo: com 60 kg, 2 litros por dia. Deixe uma garrafa sempre por perto." },
      { t: "Diminua o sódio", p: "Atenção a embutidos, temperos prontos, salgadinhos, molhos industrializados e fast food. Prefira ervas, alho, limão e cebola para temperar." },
      { t: "Coma mais potássio", p: "Banana, abacate, feijão, folhas verdes, água de coco e batata-doce ajudam o corpo a equilibrar os líquidos." },
      { t: "Cuidado à noite", p: "Refeições muito salgadas ou bebida alcoólica à noite costumam deixar o rosto mais inchado pela manhã." },
    ] },
  { titulo: "Massagem Facial Avançada", tipo: "Vídeo", icone: "💆‍♀️", link: "", conteudo: [] },
  { titulo: "Rotina de Manutenção pós-15 dias", tipo: "Guia", icone: "📅", link: "",
    conteudo: [
      { t: "Mantenha 3x por semana", p: "Depois dos 15 dias, repita a rotina do dia 15 três vezes por semana (por exemplo: segunda, quarta e sexta)." },
      { t: "Hábitos do dia a dia", p: "Continue com a língua no céu da boca, a atenção à postura no celular e a água. São esses hábitos que mantêm o resultado." },
      { t: "Quer intensificar?", p: "Refaça o protocolo completo a partir do dia 1 sempre que sentir necessidade." },
    ] },
];
