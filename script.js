// List of football clubs
const clubs = [
  { name:"Manchester United", logo:"https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" },
  { name:"FC Barcelona", logo:"https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" },
  { name:"Real Madrid", logo:"https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
  { name:"Bayern Munich", logo:"https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg" },
  { name:"Liverpool", logo:"https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" },
  { name:"Manchester City", logo:"https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" },
  { name:"Paris Saint-Germain", logo:"https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg" },
  { name:"Chelsea", logo:"https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" },
  { name:"Juventus", logo:"https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg" },
  { name:"Arsenal", logo:"https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" },
  { name:"Atletico Madrid", logo:"https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg" },
  { name:"Borussia Dortmund", logo:"https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg" },
  { name:"Tottenham Hotspur", logo:"https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg" },
  { name:"Inter Milan", logo:"https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg" },
  { name:"AC Milan", logo:"https://upload.wikimedia.org/wikipedia/commons/f/fa/AC_Milan_2021_logo.svg" },
  { name:"Ajax", logo:"https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg" },
  { name:"Napoli", logo:"https://upload.wikimedia.org/wikipedia/en/9/92/SSC_Napoli_logo.svg" },
  { name:"Benfica", logo:"https://upload.wikimedia.org/wikipedia/en/a/a2/SL_Benfica_logo.svg" },
  { name:"Porto", logo:"https://upload.wikimedia.org/wikipedia/en/f/f1/FC_Porto.svg" },
  { name:"RB Leipzig", logo:"https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg" },
  { name:"Sevilla", logo:"https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg" },
  { name:"Roma", logo:"https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg" },
  { name:"Lyon", logo:"https://upload.wikimedia.org/wikipedia/commons/4/4d/Olympique_Lyonnais.svg" },
  { name:"Sporting CP", logo:"https://upload.wikimedia.org/wikipedia/commons/3/33/Sporting_Clube_de_Portugal_logo.svg" }
];

// Elements
const playersContainer = document.getElementById('players');
const addBtn = document.getElementById('add-player');
const randBtn = document.getElementById('randomize-clubs');
const loadingEl = document.getElementById('loading-animation');
const loadingText = document.getElementById('loading-text');
const resultsEl = document.getElementById('results-section');
const resetBtn = document.getElementById('reset-button');
let teaseInterval;

// Initialize
const init = () => {
  addPlayer(); addPlayer();
  addBtn.onclick = addPlayer;
  randBtn.onclick = randomize;
  resetBtn.onclick = reset;
};

const addPlayer = () => {
  const idx = playersContainer.children.length + 1;
  const div = document.createElement('div');
  div.className = 'flex gap-2';
  div.innerHTML = `<input class="flex-1 px-3 py-2 bg-gray-800 rounded" placeholder="Player ${idx}">`;
  playersContainer.appendChild(div);
};

const getNames = () => [...playersContainer.querySelectorAll('input')].map(i=>i.value||'Unnamed');
const shuffle = a => a.sort(() => Math.random() - 0.5);

function randomize() {
  const names = getNames();
  if (names.length > clubs.length) {
    alert(`Max ${clubs.length} players`);
    return;
  }
  document.getElementById('setup').classList.add('hidden');
  loadingEl.classList.remove('hidden');
  startTease();
  setTimeout(() => {
    const picks = shuffle(clubs).slice(0, names.length);
    showResults(names, picks);
    stopTease();
    loadingEl.classList.add('hidden');
  }, 10000);
}

function startTease() {
  const msgs = ['nungguin yaaa?', 'sabar yee brroo', 'sabar dong pukii'];
  loadingText.textContent = msgs[0];
  let i = 1;
  teaseInterval = setInterval(() => {
    loadingText.textContent = msgs[i % msgs.length];
    i++;
  }, 3000);
}

function stopTease() {
  clearInterval(teaseInterval);
}

function showResults(names, picks) {
  resultsEl.innerHTML = '';
  names.forEach((n, i) => {
    const c = picks[i];
    const d = document.createElement('div');
    d.className = 'bg-gray-800 p-4 rounded flex items-center gap-3';
    d.innerHTML = `<img src="${c.logo}" class="h-12"><div><div class="font-bold">${n}</div><div>${c.name}</div></div>`;
    resultsEl.appendChild(d);
  });
  resultsEl.classList.remove('hidden');
  resetBtn.classList.remove('hidden');
}

function reset() {
  playersContainer.innerHTML = '';
  resultsEl.classList.add('hidden');
  resetBtn.classList.add('hidden');
  document.getElementById('setup').classList.remove('hidden');
  addPlayer(); addPlayer();
}

window.onload = init;
