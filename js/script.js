const clubsData = {
    premierLeague: ["Manchester City", "Liverpool", "Chelsea", "Manchester United", "Arsenal", "Tottenham Hotspur", "Newcastle United", "West Ham United", "Leicester City", "Aston Villa"],
    laLiga: ["Real Madrid", "Barcelona", "Atletico Madrid", "Sevilla", "Real Sociedad", "Villarreal", "Real Betis", "Athletic Bilbao", "Valencia", "Celta Vigo"],
    serieA: ["AC Milan", "Inter Milan", "Juventus", "Napoli", "Roma", "Lazio", "Atalanta", "Fiorentina", "Torino", "Bologna"],
    bundesliga: ["Bayern Munich", "Borussia Dortmund", "RB Leipzig", "Bayer Leverkusen", "Eintracht Frankfurt", "Wolfsburg", "Borussia Monchengladbach", "Freiburg", "Hoffenheim", "Mainz"],
    ligue1: ["PSG", "Marseille", "Lyon", "Monaco", "Lille", "Nice", "Rennes", "Lens", "Reims", "Nantes"]
};

const allClubs = [...clubsData.premierLeague, ...clubsData.laLiga, ...clubsData.serieA, ...clubsData.bundesliga, ...clubsData.ligue1];

// DOM Elements
const multiplayerTab = document.getElementById("multiplayerTab");
const duelTab = document.getElementById("duelTab");
const multiplayerContent = document.getElementById("multiplayerContent");
const duelContent = document.getElementById("duelContent");
const playersContainer = document.getElementById("playersContainer");
const addPlayerBtn = document.getElementById("addPlayerBtn");
const removePlayerBtn = document.getElementById("removePlayerBtn");
const pickClubsBtn = document.getElementById("pickClubsBtn");
const multiplayerResults = document.getElementById("multiplayerResults");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const duelModeSelect = document.getElementById("duelMode");
const startDuelBtn = document.getElementById("startDuelBtn");
const resetDuelBtn = document.getElementById("resetDuelBtn");
const duelResults = document.getElementById("duelResults");
const historyContainer = document.getElementById("historyContainer");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

// Duel state
let duelState = {
    player1: "",
    player2: "",
    mode: "free",
    player1Score: 0,
    player2Score: 0,
    rounds: [],
    completed: false,
    lastClubs: []
};

// Initialization
document.addEventListener("DOMContentLoaded", () => {
    // Add 4 default player inputs
    for (let i = 1; i <= 4; i++) addPlayerInput();
    loadDuelHistory();

    // Event listeners
    multiplayerTab.addEventListener("click", () => switchTab("multiplayer"));
    duelTab.addEventListener("click", () => switchTab("duel"));
    addPlayerBtn.addEventListener("click", addPlayerInput);
    removePlayerBtn.addEventListener("click", removePlayerInput);
    pickClubsBtn.addEventListener("click", pickRandomClubs);
    startDuelBtn.addEventListener("click", startDuel);
    resetDuelBtn.addEventListener("click", resetDuel);
    clearHistoryBtn.addEventListener("click", clearHistory);

    // Enter key to add player
    playersContainer.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && e.target.classList.contains("player-input")) {
            e.preventDefault();
            addPlayerInput();
        }
    });
});

// Switch tabs
function switchTab(tab) {
    multiplayerTab.classList.toggle("tab-active", tab === "multiplayer");
    duelTab.classList.toggle("tab-active", tab === "duel");
    multiplayerContent.classList.toggle("hidden", tab !== "multiplayer");
    duelContent.classList.toggle("hidden", tab !== "duel");
}

// Add player input
function addPlayerInput() {
    const playerCount = playersContainer.children.length;
    if (playerCount >= 16) {
        alert("Bro, max 16 pemain doang!");
        return;
    }
    const playerDiv = document.createElement("div");
    playerDiv.className = "mb-4";
    playerDiv.innerHTML = `
        <label class="block text-slate-300 mb-2 font-medium">Bro ${playerCount + 1}</label>
        <input type="text" class="player-input w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400" placeholder="Nama bro ke-${playerCount + 1}">
    `;
    playersContainer.appendChild(playerDiv);
    playersContainer.lastElementChild.querySelector("input").focus();
}

// Remove player input
function removePlayerInput() {
    if (playersContainer.children.length > 1) {
        playersContainer.removeChild(playersContainer.lastElementChild);
    } else {
        alert("Minimal 1 bro harus ada!");
    }
}

// Pick random clubs
function pickRandomClubs() {
    const playerInputs = document.querySelectorAll(".player-input");
    const players = Array.from(playerInputs).map(input => input.value.trim()).filter(name => name);
    if (!players.length) {
        alert("Isi nama bro dulu!");
        return;
    }
    multiplayerResults.innerHTML = "";
    const usedClubs = new Set();
    players.forEach(player => {
        let randomClub;
        do {
            randomClub = allClubs[Math.floor(Math.random() * allClubs.length)];
        } while (usedClubs.has(randomClub));
        usedClubs.add(randomClub);
        const resultCard = document.createElement("div");
        resultCard.className = "bg-slate-700/50 p-6 rounded-xl border border-slate-600/50 glow floating";
        let leagueClass = "text-purple-400";
        let leagueText = "";
        let leagueBadge = "";
        if (clubsData.premierLeague.includes(randomClub)) {
            leagueClass = "text-red-400";
            leagueText = "Premier League";
            leagueBadge = "âš½";
        } else if (clubsData.laLiga.includes(randomClub)) {
            leagueClass = "text-yellow-400";
            leagueText = "La Liga";
            leagueBadge = "ðŸ‡ªðŸ‡¸";
        } else if (clubsData.serieA.includes(randomClub)) {
            leagueClass = "text-blue-400";
            leagueText = "Serie A";
            leagueBadge = "ðŸ‡®ðŸ‡¹";
        } else if (clubsData.bundesliga.includes(randomClub)) {
            leagueClass = "text-green-400";
            leagueText = "Bundesliga";
            leagueBadge = "ðŸ‡©ðŸ‡ª";
        } else if (clubsData.ligue1.includes(randomClub)) {
            leagueClass = "text-indigo-400";
            leagueText = "Ligue 1";
            leagueBadge = "ðŸ‡«ðŸ‡·";
        }
        const comments = [
            `${player} dapet ${randomClub}, siap-siap mental goyah!`,
            `Woi ${player}, ${randomClub}? Sabun aja bro!`,
            `${randomClub} buat ${player}, semoga ga ambyar!`,
            `${player} kebagian ${randomClub}, hati-hati anjok!`,
            `Haha ${player}, ${randomClub}? Good luck bro!`,
            `${randomClub} nih ${player}, jangan nangis ya!`,
            `${player} dapet ${randomClub}, gaspol atau nyungsep!`
        ];
        const randomComment = comments[Math.floor(Math.random() * comments.length)];
        resultCard.innerHTML = `
            <h3 class="font-bold text-xl ${leagueClass}">${player}</h3>
            <p class="text-2xl font-extrabold my-2 text-white">${randomClub}</p>
            <p class="text-sm ${leagueClass}">${leagueBadge} ${leagueText}</p>
            <p class="mt-3 text-slate-400 italic">"${randomComment}"</p>
        `;
        multiplayerResults.appendChild(resultCard);
    });
    multiplayerResults.scrollIntoView({ behavior: "smooth" });
}

// Start duel
function startDuel() {
    const player1 = player1Input.value.trim();
    const player2 = player2Input.value.trim();
    const mode = duelModeSelect.value;
    if (!player1 || !player2) {
        alert("Isi nama kedua bro dulu!");
        return;
    }
    duelState = { player1, player2, mode, player1Score: 0, player2Score: 0, rounds: [], completed: false, lastClubs: [] };
    renderDuelUI();
}

// Render duel UI
function renderDuelUI() {
    duelResults.innerHTML = "";
    const duelHeader = document.createElement("div");
    duelHeader.className = "bg-slate-700/50 p-6 rounded-xl border border-slate-600/50 mb-6";
    duelHeader.innerHTML = `
        <div class="flex justify-between items-center">
            <div class="text-center">
                <h3 class="font-bold text-xl text-red-400">${duelState.player1}</h3>
                <p class="text-4xl font-extrabold text-white">${duelState.player1Score}</p>
            </div>
            <div class="text-center">
                <h3 class="font-bold text-2xl text-slate-300">VS</h3>
                <p class="text-sm text-slate-400">${duelState.mode === "free" ? "Gass Bebas" : "Best of " + duelState.mode}</p>
            </div>
            <div class="text-center">
                <h3 class="font-bold text-xl text-purple-400">${duelState.player2}</h3>
                <p class="text-4xl font-extrabold text-white">${duelState.player2Score}</p>
            </div>
        </div>
    `;
    duelResults.appendChild(duelHeader);

    if (!duelState.completed) {
        const actionButtons = document.createElement("div");
        actionButtons.className = "flex flex-wrap gap-4 justify-center mb-8";
        actionButtons.innerHTML = `
            <button id="player1WinBtn" class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg glow font-semibold">
                ${duelState.player1} Juara
            </button>
            <button id="player2WinBtn" class="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg glow font-semibold">
                ${duelState.player2} Juara
            </button>
        `;
        duelResults.appendChild(actionButtons);
        document.getElementById("player1WinBtn").addEventListener("click", () => recordDuelResult(duelState.player1));
        document.getElementById("player2WinBtn").addEventListener("click", () => recordDuelResult(duelState.player2));

        let randomClub1, randomClub2;
        do {
            randomClub1 = allClubs[Math.floor(Math.random() * allClubs.length)];
            randomClub2 = allClubs[Math.floor(Math.random() * allClubs.length)];
        } while (duelState.lastClubs.includes(randomClub1) || duelState.lastClubs.includes(randomClub2) || randomClub1 === randomClub2);
        duelState.lastClubs = [randomClub1, randomClub2];

        const clubsDiv = document.createElement("div");
        clubsDiv.className = "grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8";
        clubsDiv.innerHTML = `
            <div class="bg-slate-700/50 p-6 rounded-xl border border-red-500/20 glow">
                <h3 class="font-bold text-lg text-red-400">${duelState.player1}</h3>
                <p class="text-2xl font-extrabold my-2 text-white">${randomClub1}</p>
            </div>
            <div class="bg-slate-700/50 p-6 rounded-xl border border-purple-500/20 glow">
                <h3 class="font-bold text-lg text-purple-400">${duelState.player2}</h3>
                <p class="text-2xl font-extrabold my-2 text-white">${randomClub2}</p>
            </div>
        `;
        duelResults.appendChild(clubsDiv);
    }

    if (duelState.rounds.length > 0) {
        const roundsDiv = document.createElement("div");
        roundsDiv.className = "space-y-3";
        const roundsTitle = document.createElement("h4");
        roundsTitle.className = "font-bold text-lg text-slate-300";
        roundsTitle.textContent = "Histori Ronde:";
        roundsDiv.appendChild(roundsTitle);
        duelState.rounds.forEach((round, index) => {
            const roundDiv = document.createElement("div");
            roundDiv.className = "bg-slate-700/30 p-4 rounded-lg text-sm text-slate-300";
            roundDiv.textContent = `Ronde ${index + 1}: ${round.winner} juara (${round.club1} vs ${round.club2})`;
            roundsDiv.appendChild(roundDiv);
        });
        duelResults.appendChild(roundsDiv);
    }

    if (duelState.completed) {
        const winner = duelState.player1Score > duelState.player2Score ? duelState.player1 : duelState.player2;
        const winnerDiv = document.createElement("div");
        winnerDiv.className = "mt-8 p-8 bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-2xl text-center border border-slate-600/50 pulse";
        winnerDiv.innerHTML = `
            <h3 class="text-4xl font-extrabold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent mb-4">
                ðŸ”¥ JAGOAN: ${winner} ðŸ”¥
            </h3>
            <p class="text-xl font-semibold text-slate-300">Skor Akhir: ${duelState.player1Score} - ${duelState.player2Score}</p>
            <div class="flex flex-wrap gap-4 justify-center mt-6">
                <button id="saveDuelBtn" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg glow font-semibold">
                    Simpen Duel
                </button>
                <button id="copyDuelBtn" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg glow font-semibold">
                    Copy Hasil
                </button>
                <button id="playAgainBtn" class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg glow font-semibold">
                    Gass Lagi!
                </button>
            </div>
        `;
        duelResults.appendChild(winnerDiv);
        document.getElementById("saveDuelBtn").addEventListener("click", saveDuelResult);
        document.getElementById("copyDuelBtn").addEventListener("click", copyDuelResult);
        document.getElementById("playAgainBtn").addEventListener("click", resetDuel);
    }
}

// Record duel result
function recordDuelResult(winner) {
    let club1, club2;
    do {
        club1 = allClubs[Math.floor(Math.random() * allClubs.length)];
        club2 = allClubs[Math.floor(Math.random() * allClubs.length)];
    } while (duelState.lastClubs.includes(club1) || duelState.lastClubs.includes(club2) || club1 === club2);
    duelState.rounds.push({ winner, club1, club2 });
    if (winner === duelState.player1) {
        duelState.player1Score++;
    } else {
        duelState.player2Score++;
    }
    if (duelState.mode !== "free") {
        const requiredWins = Math.ceil(parseInt(duelState.mode, 10) / 2);
        if (duelState.player1Score >= requiredWins || duelState.player2Score >= requiredWins) {
            duelState.completed = true;
        }
    }
    duelState.lastClubs = [club1, club2];
    renderDuelUI();
}

// Reset duel
function resetDuel() {
    duelState = {
        player1: duelState.player1,
        player2: duelState.player2,
        mode: duelState.mode,
        player1Score: 0,
        player2Score: 0,
        rounds: [],
        completed: false,
        lastClubs: []
    };
    renderDuelUI();
}

// Save duel result
function saveDuelResult() {
    const duels = JSON.parse(localStorage.getItem("footballDuels")) || [];
    const duelResult = {
        player1: duelState.player1,
        player2: duelState.player2,
        player1Score: duelState.player1Score,
        player2Score: duelState.player2Score,
        mode: duelState.mode,
        date: new Date().toLocaleString(),
        rounds: duelState.rounds
    };
    duels.unshift(duelResult);
    localStorage.setItem("footballDuels", JSON.stringify(duels));
    alert("Duel udah disimpen bro!");
    loadDuelHistory();
}

// Copy duel result
function copyDuelResult() {
    const winner = duelState.player1Score > duelState.player2Score ? duelState.player1 : duelState.player2;
    const text = `ðŸ”¥ Duel Epik! ðŸ”¥\n${duelState.player1} vs ${duelState.player2}\nSkor: ${duelState.player1Score} - ${duelState.player2Score}\nJagoan: ${winner}\nMode: ${duelState.mode === "free" ? "Gass Bebas" : "Best of " + duelState.mode}\nTanggal: ${new Date().toLocaleString()}`;
    navigator.clipboard.writeText(text).then(() => alert("Hasil duel udah dicopy! Share ke geng lu!"));
}

// Load duel history
function loadDuelHistory() {
    const duels = JSON.parse(localStorage.getItem("footballDuels")) || [];
    if (!duels.length) {
        historyContainer.innerHTML = `<p class="text-slate-400 text-center py-6">Belum ada histori duel bro, gaskan sekarang!</p>`;
        return;
    }
    historyContainer.innerHTML = "";
    duels.forEach((duel, index) => {
        const duelCard = document.createElement("div");
        duelCard.className = "bg-slate-700/50 p-6 rounded-xl border border-slate-600/50 mb-6 glow";
        const winner = duel.player1Score > duel.player2Score ? duel.player1 : duel.player2;
        const winnerClass = duel.player1Score > duel.player2Score ? "text-red-400" : "text-purple-400";
        duelCard.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="font-bold text-xl ${winnerClass}">${winner} JAGOAN!</h3>
                    <p class="text-sm text-slate-400">${duel.date}</p>
                </div>
                <div class="text-right">
                    <p class="text-2xl font-bold text-white">${duel.player1Score} - ${duel.player2Score}</p>
                    <p class="text-sm text-slate-400">${duel.mode === "free" ? "Gass Bebas" : "Best of " + duel.mode}</p>
                </div>
            </div>
            <div class="mt-4 flex justify-between text-sm text-slate-300">
                <span>${duel.player1}</span>
                <span>vs</span>
                <span>${duel.player2}</span>
            </div>
            <button class="mt-4 text-sm bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg glow view-detail-btn" data-index="${index}">
                Cek Detail
            </button>
            <div class="duel-details mt-4 hidden text-sm text-slate-300 border-t border-slate-600/50 pt-4"></div>
        `;
        historyContainer.appendChild(duelCard);
        duelCard.querySelector(".view-detail-btn").addEventListener("click", (e) => {
            const detailsDiv = duelCard.querySelector(".duel-details");
            const isHidden = detailsDiv.classList.contains("hidden");
            if (isHidden) {
                let detailsHTML = `<p class="font-bold mb-2">Histori Ronde:</p>`;
                duel.rounds.forEach((round, i) => {
                    detailsHTML += `<p class="mb-2">Ronde ${i + 1}: ${round.winner} juara (${round.club1} vs ${round.club2})</p>`;
                });
                detailsDiv.innerHTML = detailsHTML;
                detailsDiv.classList.remove("hidden");
                e.target.textContent = "Sembunyiin";
            } else {
                detailsDiv.classList.add("hidden");
                e.target.textContent = "Cek Detail";
            }
        });
    });
}

// Clear history
function clearHistory() {
    if (confirm("Yakin bro, mau hapus semua histori? Ga bisa balik!")) {
        localStorage.removeItem("footballDuels");
        loadDuelHistory();
    }
}