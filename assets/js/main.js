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
    "Loading bro, tim lo kayaknya bakal bikin lo pusing tujuh keliling!",
    "Sistem lagi nge-random, doain aja ga dapet tim kacau!",
    "Bentar lagi lo tau tim lo jelek apa enggak!",
    "Tim random lagi dipilih, jangan ngarep bagus ya!",
    "Loading bro, tim lo kayaknya bakal bikin lo ngamuk!"
];

let currentMode = null;
let duelScore = { player1: 0, player2: 0 };
let bestOf = 3;
let currentMatch = 1;
let playerNames = { player1: "Player 1", player2: "Player 2" };

const elements = {
    duelModeBtn: document.getElementById('duelModeBtn'),
    tournamentModeBtn: document.getElementById('tournamentModeBtn'),
    duelContent: document.getElementById('duelContent'),
    tournamentContent: document.getElementById('tournamentContent'),
    bestOfSelect: document.getElementById('bestOfSelect'),
    player1NameInput: document.getElementById('player1NameInput'),
    player2NameInput: document.getElementById('player2NameInput'),
    player1Club: document.getElementById('player1Club'),
    player2Club: document.getElementById('player2Club'),
    randomizeBothBtn: document.getElementById('randomizeBothBtn'),
    nextMatchBtn: document.getElementById('nextMatchBtn'),
    declarePlayer1Winner: document.getElementById('declarePlayer1Winner'),
    declarePlayer2Winner: document.getElementById('declarePlayer2Winner'),
    player1Score: document.getElementById('player1Score'),
    player2Score: document.getElementById('player2Score'),
    playerCount: document.getElementById('playerCount'),
    playerCountValue: document.getElementById('playerCountValue'),
    randomizeAllNamesBtn: document.getElementById('randomizeAllNamesBtn'),
    randomizeAllClubsBtn: document.getElementById('randomizeAllClubsBtn'),
    tournamentPlayers: document.getElementById('tournamentPlayers'),
    loadingModal: document.getElementById('loadingModal'),
    loadingText: document.getElementById('loadingText'),
    winnerButtons: document.getElementById('winnerButtons'),
    resetDuelBtn: document.getElementById('resetDuelBtn'),
    historySection: document.getElementById('historySection'),
    historyList: document.getElementById('historyList'),
    resetModal: document.getElementById('resetModal'),
    confirmResetBtn: document.getElementById('confirmResetBtn'),
    cancelResetBtn: document.getElementById('cancelResetBtn')
};

elements.duelModeBtn.addEventListener('click', () => switchMode('duel'));
elements.tournamentModeBtn.addEventListener('click', () => switchMode('tournament'));
elements.bestOfSelect.addEventListener('change', updateBestOf);
elements.randomizeBothBtn.addEventListener('click', randomizeBothClubs);
elements.nextMatchBtn.addEventListener('click', nextMatch);
elements.playerCount.addEventListener('input', updatePlayerCount);
elements.randomizeAllNamesBtn.addEventListener('click', randomizeAllNames);
elements.randomizeAllClubsBtn.addEventListener('click', randomizeAllClubs);
document.getElementById('randomizePlayer1NameBtn').addEventListener('click', () => randomizePlayerName('player1'));
document.getElementById('randomizePlayer2NameBtn').addEventListener('click', () => randomizePlayerName('player2'));
elements.player1NameInput.addEventListener('change', () => updatePlayerName('player1'));
elements.player2NameInput.addEventListener('change', () => updatePlayerName('player2'));
elements.declarePlayer1Winner.addEventListener('click', () => handleWinnerDeclaration(1));
elements.declarePlayer2Winner.addEventListener('click', () => handleWinnerDeclaration(2));
elements.resetDuelBtn.addEventListener('click', showResetModal);
elements.cancelResetBtn.addEventListener('click', () => elements.resetModal.classList.add('hidden'));

function showResetModal() {
    elements.resetModal.classList.remove('hidden');
    elements.confirmResetBtn.onclick = () => {
        resetDuel();
        elements.resetModal.classList.add('hidden');
    };
}

function switchMode(mode) {
    currentMode = mode;
    saveToLocalStorage();
    
    elements.duelContent.classList.toggle('hidden', mode !== 'duel');
    elements.tournamentContent.classList.toggle('hidden', mode !== 'tournament');
    
    if (mode === 'duel') {
        loadFromLocalStorage();
    } else {
        generateTournamentPlayers(parseInt(elements.playerCount.value));
    }
}

function updateBestOf() {
    bestOf = parseInt(elements.bestOfSelect.value);
    resetDuel();
    saveToLocalStorage();
}

function randomizeBothClubs() {
    elements.loadingModal.classList.remove('hidden');
    elements.loadingText.textContent = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    
    setTimeout(() => {
        const availableClubs = [...topClubs];
        const randomIndex1 = Math.floor(Math.random() * availableClubs.length);
        const randomClub1 = availableClubs.splice(randomIndex1, 1)[0];
        const randomIndex2 = Math.floor(Math.random() * availableClubs.length);
        const randomClub2 = availableClubs[randomIndex2];
        
        elements.player1Club.textContent = randomClub1;
        elements.player2Club.textContent = randomClub2;
        elements.loadingModal.classList.add('hidden');
        elements.winnerButtons.classList.remove('hidden');
        saveToLocalStorage();
    }, 2000);
}

function resetDuel() {
    elements.player1Club.textContent = 'Belum dipilih';
    elements.player2Club.textContent = 'Belum dipilih';
    duelScore = { player1: 0, player2: 0 };
    currentMatch = 1;
    updateScoreboard();
    elements.winnerButtons.classList.add('hidden');
    elements.nextMatchBtn.classList.add('hidden');
    localStorage.removeItem('footballClubPickerData');
}

function updateScoreboard() {
    elements.player1Score.textContent = `${playerNames.player1}: ${duelScore.player1}`;
    elements.player2Score.textContent = `${playerNames.player2}: ${duelScore.player2}`;
}

function handleWinnerDeclaration(winner) {
    const loser = winner === 1 ? playerNames.player2 : playerNames.player1;
    const loserClub = winner === 1 ? elements.player2Club.textContent : elements.player1Club.textContent;
    const loserMessages = [
        `Yaelah ${loser}, main ${loserClub} kok gitu, mending pensiun aja bro dari PS, malu-maluin doang!`,
        `Hadeuh ${loser}, pake ${loserClub} aja lo k.o., pulang aja sana, ga usah main lagi!`,
        `Duh ${loser}, ${loserClub} aja ga nolong, mending lo jadi penutup stick PS aja bro!`,
        `Aduh ${loser}, main ${loserClub} kok ampe babak belur, balik kampung aja sana!`,
        `Haha ${loser}, ${loserClub} lo bikin ketawa, mending lo nonton bola aja ketimbang main!`
    ];
    
    if (winner === 1) {
        duelScore.player1++;
    } else {
        duelScore.player2++;
    }
    
    updateScoreboard();
    saveToLocalStorage();
    
    if (duelScore.player1 >= Math.ceil(bestOf / 2)) {
        addToHistory(1);
        showResultMessage(`${playerNames.player1} MENANG BEST OF ${bestOf}! SELAMAT BRO!`, `${loser} pake ${loserClub} ampe kalah telak, mending lo jual PS lo bro, ga usah main lagi!`, true);
    } else if (duelScore.player2 >= Math.ceil(bestOf / 2)) {
        addToHistory(2);
        showResultMessage(`${playerNames.player2} MENANG BEST OF ${bestOf}! WIH KEREN!`, `${loser} pake ${loserClub} ampe babak belur, pulang aja sana, ga level bro!`, true);
    } else {
        showResultMessage(
            winner === 1 ? `${playerNames.player1} menang dengan ${elements.player1Club.textContent}! Gokil!` : `${playerNames.player2} menang dengan ${elements.player2Club.textContent}! Mantap jiwa!`, 
            loserMessages[Math.floor(Math.random() * loserMessages.length)]
        );
        currentMatch++;
        elements.player1Club.textContent = 'Belum dipilih';
        elements.player2Club.textContent = 'Belum dipilih';
        elements.winnerButtons.classList.add('hidden');
        elements.nextMatchBtn.classList.remove('hidden');
    }
}

function showResultMessage(message, loserMessage, isFinal = false) {
    const resultModal = document.createElement('div');
    resultModal.className = 'fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50';
    resultModal.innerHTML = `
        <div class="bg-gray-800 p-6 sm:p-8 rounded-xl max-w-md w-full text-center">
            <h3 class="text-xl sm:text-2xl font-bold ${isFinal ? 'text-green-500' : 'text-yellow-400'} mb-4">${message}</h3>
            <p class="text-gray-300 mb-4 text-sm sm:text-base">${isFinal ? 'Permainan selesai! ' + loserMessage : 'Score: ' + duelScore.player1 + '-' + duelScore.player2 + '<br>' + loserMessage}</p>
            <button class="close-result-modal bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 sm:px-6 rounded-lg transition">
                Oke bro!
            </button>
        </div>
    `;
    
    document.body.appendChild(resultModal);
    
    resultModal.addEventListener('click', function(e) {
        if (e.target.classList.contains('close-result-modal')) {
            document.body.removeChild(resultModal);
            if (isFinal) {
                resetDuel();
            }
        }
    });
}

function nextMatch() {
    elements.nextMatchBtn.classList.add('hidden');
}

function updatePlayerCount() {
    const count = parseInt(elements.playerCount.value);
    elements.playerCountValue.textContent = count;
    generateTournamentPlayers(count);
}

function generateTournamentPlayers(count) {
    elements.tournamentPlayers.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const playerCard = document.createElement('div');
        playerCard.className = 'club-card bg-gray-700 p-4 rounded-lg';
        playerCard.innerHTML = `
            <div class="flex items-center mb-2">
                <input type="text" class="tournament-player-name bg-gray-800 text-white p-2 rounded-lg flex-1 mr-2" value="Player ${i + 1}">
                <button class="randomize-name-btn bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded transition" data-index="${i}">
                    Random Nama
                </button>
            </div>
            <div class="bg-gray-800 rounded-lg p-3 h-20 sm:h-24 flex items-center justify-center mb-2">
                <p class="tournament-player-club text-center text-sm sm:text-base">Belum dipilih</p>
            </div>
            <button class="randomize-club-btn w-full bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-lg transition text-sm">Random Tim</button>
        `;
        
        elements.tournamentPlayers.appendChild(playerCard);
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
    nameElements[index].value = funnyAnimalNames[Math.floor(Math.random() * funnyAnimalNames.length)];
}

function randomizeAllClubs() {
    document.querySelectorAll('.tournament-player-club').forEach((_, index) => {
        randomizeSingleClub(index);
    });
}

function randomizeSingleClub(index) {
    const clubElements = document.querySelectorAll('.tournament-player-club');
    elements.loadingModal.classList.remove('hidden');
    elements.loadingText.textContent = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    
    const messageInterval = setInterval(() => {
        elements.loadingText.textContent = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    }, 2000);
    
    setTimeout(() => {
        clearInterval(messageInterval);
        clubElements[index].textContent = topClubs[Math.floor(Math.random() * topClubs.length)];
        elements.loadingModal.classList.add('hidden');
    }, 3500);
}

function randomizePlayerName(player) {
    const randomName = funnyAnimalNames[Math.floor(Math.random() * funnyAnimalNames.length)];
    if (player === 'player1') {
        elements.player1NameInput.value = randomName;
        playerNames.player1 = randomName;
    } else {
        elements.player2NameInput.value = randomName;
        playerNames.player2 = randomName;
    }
    updateScoreboard();
    saveToLocalStorage();
}

function updatePlayerName(player) {
    const newName = player === 'player1' ? elements.player1NameInput.value : elements.player2NameInput.value;
    if (newName && newName.trim() !== '') {
        playerNames[player] = newName;
        updateScoreboard();
        saveToLocalStorage();
    }
}

function saveToLocalStorage() {
    const data = {
        currentMode,
        duelScore,
        bestOf,
        currentMatch,
        playerNames,
        player1Club: elements.player1Club.textContent,
        player2Club: elements.player2Club.textContent
    };
    localStorage.setItem('footballClubPickerData', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem('footballClubPickerData');
    if (savedData) {
        const data = JSON.parse(savedData);
        currentMode = data.currentMode || 'duel';
        duelScore = data.duelScore || { player1: 0, player2: 0 };
        bestOf = data.bestOf || 3;
        currentMatch = data.currentMatch || 1;
        playerNames = data.playerNames || { player1: "Player 1", player2: "Player 2" };
        
        elements.player1NameInput.value = playerNames.player1;
        elements.player2NameInput.value = playerNames.player2;
        elements.player1Club.textContent = data.player1Club || 'Belum dipilih';
        elements.player2Club.textContent = data.player2Club || 'Belum dipilih';
        
        updateScoreboard();
        
        if (data.player1Club !== 'Belum dipilih' && data.player2Club !== 'Belum dipilih') {
            elements.winnerButtons.classList.remove('hidden');
        }
        
        if (duelScore.player1 > 0 || duelScore.player2 > 0) {
            elements.nextMatchBtn.classList.remove('hidden');
        }
    }
    loadHistory();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('footballClubPickerHistory')) || [];
    elements.historyList.innerHTML = history.length === 0 ? '<p class="text-gray-400">Belum ada history pertandingan.</p>' : '';
    history.forEach(match => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-container';
        historyItem.innerHTML = `
            <div class="history-match">
                <div class="history-player ${match.winner === match.player1 ? 'winner-border' : ''}">${match.player1}<br>${match.player1Club}</div>
                <div class="history-score">${match.player1Score}</div>
                <div class="history-score">vs</div>
                <div class="history-score">${match.player2Score}</div>
                <div class="history-player ${match.winner === match.player2 ? 'winner-border' : ''}">${match.player2}<br>${match.player2Club}</div>
                <div class="history-time">${new Date(match.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
        `;
        elements.historyList.appendChild(historyItem);
    });
}

function addToHistory(winner) {
    const history = JSON.parse(localStorage.getItem('footballClubPickerHistory')) || [];
    history.unshift({
        player1: playerNames.player1,
        player2: playerNames.player2,
        player1Club: elements.player1Club.textContent,
        player2Club: elements.player2Club.textContent,
        player1Score: duelScore.player1,
        player2Score: duelScore.player2,
        winner: winner === 1 ? playerNames.player1 : playerNames.player2,
        bestOf,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('footballClubPickerHistory', JSON.stringify(history.slice(0, 20)));
    loadHistory();
}

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    switchMode(currentMode);
});