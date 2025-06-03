const topClubs = [
    "Manchester City", "Real Madrid", "Bayern Munich", "Liverpool", "Paris Saint-Germain",
    "Chelsea", "Barcelona", "Manchester United", "Juventus", "Atletico Madrid",
    "Tottenham Hotspur", "Arsenal", "Inter Milan", "AC Milan", "Napoli",
    "Borussia Dortmund", "RB Leipzig", "Sevilla", "Villarreal", "Leicester City",
    "West Ham United", "Wolverhampton Wanderers", "Lyon", "Lille", "Monaco",
    "Bayer Leverkusen", "Eintracht Frankfurt", "Wolfsburg", "Ajax", "PSV Eindhoven",
    "Porto", "Benfica", "Sporting CP", "Celtic", "Rangers",
    "Zenit St. Petersburg", "Lokomotiv Moscow", "Galatasaray", "Fenerbahce", "Besiktas"
];

const funnyAnimalNames = [
    "Babi Ngepet", "Kecoak Terbang", "Tikus Got", "Ular Kawat", "Kadal Gila",
    "Kambing Bau", "Ayam Ayo", "Bebek Gagal", "Cacing Kepanasan", "Kupu-kupu Malam",
    "Kucing Garong", "Anjing Rabies", "Tupai Stress", "Kelinci Gendut", "Landak Botak",
    "Sapi Depresi", "Kuda Lumpuh", "Monyet Botak", "Burung Beo Bisu", "Ikan Lele Gila"
];

let currentMode = null;
let duelScore = { player1: 0, player2: 0 };
let bestOf = 3;
let currentMatch = 1;

const duelModeBtn = document.getElementById('duelModeBtn');
const tournamentModeBtn = document.getElementById('tournamentModeBtn');
const duelContent = document.getElementById('duelContent');
const tournamentContent = document.getElementById('tournamentContent');
const bestOfSelect = document.getElementById('bestOfSelect');
const player1NameInput = document.getElementById('player1NameInput');
const player2NameInput = document.getElementById('player2NameInput');
const player1Club = document.getElementById('player1Club');
const player2Club = document.getElementById('player2Club');
const randomizeBothBtn = document.getElementById('randomizeBothBtn');
const nextMatchBtn = document.getElementById('nextMatchBtn');
const declarePlayer1Winner = document.getElementById('declarePlayer1Winner');
const declarePlayer2Winner = document.getElementById('declarePlayer2Winner');
const player1Score = document.getElementById('player1Score');
const player2Score = document.getElementById('player2Score');
const playerCount = document.getElementById('playerCount');
const playerCountValue = document.getElementById('playerCountValue');
const randomizeAllNamesBtn = document.getElementById('randomizeAllNamesBtn');
const randomizeAllClubsBtn = document.getElementById('randomizeAllClubsBtn');
const tournamentPlayers = document.getElementById('tournamentPlayers');
const loadingModal = document.getElementById('loadingModal');
const loadingText = document.getElementById('loadingText');
const winnerButtons = document.getElementById('winnerButtons');

let playerNames = {
    player1: "Player 1",
    player2: "Player 2"
};

duelModeBtn.addEventListener('click', () => switchMode('duel'));
tournamentModeBtn.addEventListener('click', () => switchMode('tournament'));
bestOfSelect.addEventListener('change', updateBestOf);
randomizeBothBtn.addEventListener('click', randomizeBothClubs);
nextMatchBtn.addEventListener('click', nextMatch);
playerCount.addEventListener('input', updatePlayerCount);
randomizeAllNamesBtn.addEventListener('click', randomizeAllNames);
randomizeAllClubsBtn.addEventListener('click', randomizeAllClubs);
document.getElementById('randomizePlayer1NameBtn').addEventListener('click', () => randomizePlayerName('player1'));
document.getElementById('randomizePlayer2NameBtn').addEventListener('click', () => randomizePlayerName('player2'));
player1NameInput.addEventListener('change', () => updatePlayerName('player1'));
player2NameInput.addEventListener('change', () => updatePlayerName('player2'));
declarePlayer1Winner.addEventListener('click', () => handleWinnerDeclaration(1));
declarePlayer2Winner.addEventListener('click', () => handleWinnerDeclaration(2));

function switchMode(mode) {
    currentMode = mode;
    
    if (mode === 'duel') {
        duelContent.classList.remove('hidden');
        tournamentContent.classList.add('hidden');
        resetDuel();
    } else {
        duelContent.classList.add('hidden');
        tournamentContent.classList.remove('hidden');
        generateTournamentPlayers(parseInt(playerCount.value));
    }
}

function updateBestOf() {
    bestOf = parseInt(bestOfSelect.value);
    resetDuel();
}

const loadingMessages = [
    "Hayo bakal dapet tim goblok nih!",
    "Nih sistem lagi nyari tim cupu buat lo!",
    "Siap-siap mental bro, tim lo bisa jelek banget!",
    "Loading tim random... jangan harap dapet yang bagus!",
    "Tunggu bentar, lagi cari tim yang bikin lo ngeluh!",
    "Sistem lagi milih tim yang bikin lo ketawa ketiwi!",
    "Bentar bro, tim lo kayaknya bakal bikin malu!",
    "Loading coy... tim lo mungkin bikin nangis!",
    "Sabar bro, tim lo lagi dicari di ujung dunia!",
    "Yah, kayaknya lo bakal apes dapet tim ampas!",
    "Tim lo lagi dicocokin, tapi kayaknya ga janji!",
    "Loading bro, tim lo mungkin bikin lo pusing tujuh keliling!",
    "Sistem lagi nge-random, doain aja ga dapet tim kacau!",
    "Bentar lagi lo tau tim lo jelek apa enggak!",
    "Tim random lagi dipilih, jangan ngarep bagus ya!",
    "Loading bro, tim lo kayaknya bakal bikin lo ngamuk!"
];

function randomizeBothClubs() {
    loadingModal.classList.remove('hidden');
    
    let messageIndex = Math.floor(Math.random() * loadingMessages.length);
    loadingText.textContent = loadingMessages[messageIndex];
    
    const messageInterval = setInterval(() => {
        messageIndex = Math.floor(Math.random() * loadingMessages.length);
        loadingText.textContent = loadingMessages[messageIndex];
    }, 2000);
    
    setTimeout(() => {
        clearInterval(messageInterval);
        const randomClub1 = topClubs[Math.floor(Math.random() * topClubs.length)];
        const randomClub2 = topClubs[Math.floor(Math.random() * topClubs.length)];
        player1Club.textContent = randomClub1;
        player2Club.textContent = randomClub2;
        loadingModal.classList.add('hidden');
        winnerButtons.classList.remove('hidden');
    }, 6000);
}

function resetDuel() {
    player1Club.textContent = 'Belum dipilih';
    player2Club.textContent = 'Belum dipilih';
    duelScore = { player1: 0, player2: 0 };
    currentMatch = 1;
    updateScoreboard();
    winnerButtons.classList.add('hidden');
    nextMatchBtn.classList.add('hidden');
}

function updateScoreboard() {
    player1Score.textContent = `${playerNames.player1}: ${duelScore.player1}`;
    player2Score.textContent = `${playerNames.player2}: ${duelScore.player2}`;
}

function handleWinnerDeclaration(winner) {
    const loser = winner === 1 ? playerNames.player2 : playerNames.player1;
    const loserClub = winner === 1 ? player2Club.textContent : player1Club.textContent;
    const loserMessages = [
        `Yaelah ${loser}, main ${loserClub} kok gitu, mending pensiun aja bro dari PS, malu-maluin doang!`,
        `Hadeuh ${loser}, pake ${loserClub} aja lo k.o., pulang aja sana, ga usah main lagi!`,
        `Duh ${loser}, ${loserClub} aja ga nolong, mending lo jadi penutup stick PS aja bro!`,
        `Aduh ${loser}, main ${loserClub} kok ampe babak belur, balik kampung aja sana!`,
        `Haha ${loser}, ${loserClub} lo bikin ketawa, mending lo nonton bola aja ketimbang main!`
    ];
    
    if (winner === 1) {
        duelScore.player1++;
        showResultMessage(`${playerNames.player1} menang dengan ${player1Club.textContent}! Gokil!`, loserMessages[Math.floor(Math.random() * loserMessages.length)]);
    } else {
        duelScore.player2++;
        showResultMessage(`${playerNames.player2} menang dengan ${player2Club.textContent}! Mantap jiwa!`, loserMessages[Math.floor(Math.random() * loserMessages.length)]);
    }
    
    updateScoreboard();
    
    if (duelScore.player1 >= Math.ceil(bestOf / 2)) {
        showResultMessage(`${playerNames.player1} MENANG BEST OF ${bestOf}! SELAMAT BRO!`, `${loser} pake ${loserClub} ampe kalah telak, mending lo jual PS lo bro, ga usah main lagi!`, true);
    } else if (duelScore.player2 >= Math.ceil(bestOf / 2)) {
        showResultMessage(`${playerNames.player2} MENANG BEST OF ${bestOf}! WIH KEREN!`, `${loser} pake ${loserClub} ampe babak belur, pulang aja sana, ga level bro!`, true);
    } else {
        currentMatch++;
        player1Club.textContent = 'Belum dipilih';
        player2Club.textContent = 'Belum dipilih';
        winnerButtons.classList.add('hidden');
        nextMatchBtn.classList.remove('hidden');
    }
}

function showResultMessage(message, loserMessage, isFinal = false) {
    const resultModal = document.createElement('div');
    resultModal.className = 'fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50';
    resultModal.innerHTML = `
        <div class="bg-gray-800 p-8 rounded-xl max-w-md w-full text-center">
            <h3 class="text-2xl font-bold ${isFinal ? 'text-green-500' : 'text-yellow-400'} mb-4">${message}</h3>
            <p class="text-gray-300 mb-4">${isFinal ? 'Permainan selesai! ' + loserMessage : 'Score: ' + duelScore.player1 + '-' + duelScore.player2 + '<br>' + loserMessage}</p>
            <button id="closeResultModal" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition">
                Oke bro!
            </button>
        </div>
    `;
    
    document.body.appendChild(resultModal);
    
    document.getElementById('closeResultModal').addEventListener('click', () => {
        document.body.removeChild(resultModal);
        if (isFinal) resetDuel();
    });
}

function nextMatch() {
    nextMatchBtn.classList.add('hidden');
}

function updatePlayerCount() {
    const count = parseInt(playerCount.value);
    playerCountValue.textContent = count;
    generateTournamentPlayers(count);
}

function generateTournamentPlayers(count) {
    tournamentPlayers.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const playerCard = document.createElement('div');
        playerCard.className = 'club-card bg-gray-700 p-4 rounded-lg';
        playerCard.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <h3 class="text-lg font-bold tournament-player-name">Player ${i + 1}</h3>
                <button class="randomize-name-btn bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded transition" data-index="${i}">
                    Random Nama
                </button>
            </div>
            <div class="bg-gray-800 rounded-lg p-3 h-24 flex items-center justify-center mb-2">
                <p class="tournament-player-club text-center">Belum dipilih</p>
            </div>
            <button class="randomize-club-btn w-full bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-lg transition text-sm" data-index="${i}">
                Random Tim
            </button>
        `;
        
        tournamentPlayers.appendChild(playerCard);
    }
    
    document.querySelectorAll('.randomize-name-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            randomizeSingleName(index);
        });
    });
    
    document.querySelectorAll('.randomize-club-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            randomizeSingleClub(index);
        });
    });
}

function randomizeAllNames() {
    document.querySelectorAll('.tournament-player-name').forEach((nameElement, index) => {
        randomizeSingleName(index);
    });
}

function randomizeSingleName(index) {
    const nameElements = document.querySelectorAll('.tournament-player-name');
    const randomName = funnyAnimalNames[Math.floor(Math.random() * funnyAnimalNames.length)];
    nameElements[index].textContent = randomName;
}

function randomizeAllClubs() {
    document.querySelectorAll('.tournament-player-club').forEach((clubElement, index) => {
        randomizeSingleClub(index);
    });
}

function randomizeSingleClub(index) {
    const clubElements = document.querySelectorAll('.tournament-player-club');
    
    loadingModal.classList.remove('hidden');
    
    let messageIndex = Math.floor(Math.random() * loadingMessages.length);
    loadingText.textContent = loadingMessages[messageIndex];
    
    const messageInterval = setInterval(() => {
        messageIndex = Math.floor(Math.random() * loadingMessages.length);
        loadingText.textContent = loadingMessages[messageIndex];
    }, 2000);
    
    setTimeout(() => {
        clearInterval(messageInterval);
        const randomClub = topClubs[Math.floor(Math.random() * topClubs.length)];
        clubElements[index].textContent = randomClub;
        loadingModal.classList.add('hidden');
    }, 6000);
}

function randomizePlayerName(player) {
    const randomName = funnyAnimalNames[Math.floor(Math.random() * funnyAnimalNames.length)];
    if (player === 'player1') {
        player1NameInput.value = randomName;
        playerNames.player1 = randomName;
    } else {
        player2NameInput.value = randomName;
        playerNames.player2 = randomName;
    }
    updateScoreboard();
}

function updatePlayerName(player) {
    const newName = player === 'player1' ? player1NameInput.value : player2NameInput.value;
    if (newName && newName.trim() !== '') {
        playerNames[player] = newName;
        updateScoreboard();
    }
}

switchMode('duel');