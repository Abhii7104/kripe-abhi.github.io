/* ----------------------------------------------------
   1. FLOATING HEARTS & ROSE PETALS CANVAS ANIMATION
---------------------------------------------------- */
const canvas = document.getElementById('heartsCanvas');
const ctx = canvas?.getContext('2d');
let particles = [];

function resizeCanvas() {
    if (!canvas || !ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor(x, y, isExplosion = false) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || canvas.height + 20;
        this.size = Math.random() * 14 + 8;
        this.speedY = isExplosion ? (Math.random() - 0.5) * 8 : -Math.random() * 2 - 1;
        this.speedX = isExplosion ? (Math.random() - 0.5) * 8 : Math.sin(this.y * 0.02) * 1.5;
        this.opacity = 1;
        this.color = ['#FCE7F0', '#D98880', '#6B1124', '#FFE5D9'][Math.floor(Math.random() * 4)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.05;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotSpeed;
        this.opacity -= 0.005;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = Math.max(this.opacity, 0);
        ctx.fillStyle = this.color;
        
        // Draw Heart Shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
        ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
        ctx.fill();
        ctx.restore();
    }
}

function animateParticles() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (particles.length < 25 && Math.random() < 0.1) {
        particles.push(new Particle());
    }
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].opacity <= 0 || particles[i].y < -20) {
            particles.splice(i, 1);
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

function triggerHugExplosion() {
    for (let i = 0; i < 40; i++) {
        particles.push(new Particle(window.innerWidth / 2, window.innerHeight / 2, true));
    }
}

/* ----------------------------------------------------
   2. DIARY COVER OPENING LOGIC
---------------------------------------------------- */
document.getElementById('openBookBtn').addEventListener('click', function() {
    const cover = document.getElementById('coverPage');
    const app = document.getElementById('scrapbookApp');

    cover.style.transform = 'scale(1.05)';
    cover.style.opacity = '0';
    setTimeout(() => {
        cover.style.display = 'none';
        app.style.opacity = '1';
        triggerHugExplosion();
    }, 800);
});

function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ----------------------------------------------------
   3. DYNAMIC PHOTO GALLERY GENERATOR
---------------------------------------------------- */
const samplePhotos = [
        { url: 'assets/Snapchat-1994562404.jpg', caption: 'I LOVE U SOOO MUCHH 💗', date: 'LOVE U'},
    { url: 'assets/Screenshot_20260612-004350_Instagram.jpg', caption: 'I LOVE U SOOO MUCHH 💗', date: 'LOVE U'},
    { url: 'assets/Snapchat-1615969848.jpg', caption: 'I LOVE U SOOO MUCHH 💗', date: 'LOVE U'},
    { url: 'assets/Snapchat-501469796.jpg', caption: 'I LOVE U SOOO MUCHH 💗', date: 'LOVE U'},
    { url: 'assets/Screenshot_20260731-233810_Video Player.jpg', caption: 'I LOVE U SOOO MUCHH 💗', date: 'LOVE U'},
    { url: 'assets/Snapchat-292165350.jpg', caption: 'I LOVE U SOOO MUCHH 💗', date: 'LOVE U'},
    { url: 'assets/Snapchat-869332038.jpg', caption: 'I LOVE U SOOO MUCHH 💗', date: 'LOVE U'},
    { url: 'assets/Snapchat-1221146522.jpg', caption: 'I LOVE U SOOO MUCHH 💗', date: 'LOVE U'},
   
];

const galleryContainer = document.getElementById('photoGallery');
for (let i = 0; i < 8; i++) {
    const data = samplePhotos[i % samplePhotos.length];
    const rotation = (Math.random() * 8 - 4).toFixed(1);
    const polaroidHTML = `
        <div class="polaroid" style="transform: rotate(${rotation}deg)" 
             onclick="openLightbox('${data.url}', '${data.caption}', '${data.date}')"
             ondblclick="spawnHeartBurst(event)">
            <div class="washi-tape-peach absolute -top-3 left-6 w-20 h-5"></div>
            <img src="${data.url}" alt="Memory ${i+1}" class="h-48 w-full object-cover rounded">
            <p class="font-caveat text-center text-lg text-[#6B1124] mt-2">${data.caption}</p>
            <span class="block text-right font-poppins text-xs text-gray-400">${data.date}</span>
        </div>
    `;
    galleryContainer.insertAdjacentHTML('beforeend', polaroidHTML);
}

function spawnHeartBurst(e) {
    for (let i = 0; i < 15; i++) {
        particles.push(new Particle(e.clientX, e.clientY, true));
    }
}

/* ----------------------------------------------------
   4. LIGHTBOX & MODAL HANDLERS
---------------------------------------------------- */
function openLightbox(url, caption, date) {
    document.getElementById('lightboxImg').src = url;
    document.getElementById('lightboxCaption').innerText = caption;
    document.getElementById('lightboxDate').innerText = date;
    toggleModal('lightboxModal', true);
}

function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (show) modal.classList.remove('hidden');
    else modal.classList.add('hidden');
}

function toggleFavoriteHeart(btn) {
    btn.classList.toggle('text-red-500');
    btn.classList.toggle('text-gray-400');
}

/* ----------------------------------------------------
   5. LETTERS SECTION GENERATOR
---------------------------------------------------- */
const letterTopics = [
    { title: "Open when you miss me...", letter: "If you are reading this justt know thatt i am ofcc thinking aboutt you right now you never left my mind and my heart since youu came in my lifee" },
    { title: "Open when you're sad...", letter: "babyyy please tell mee about your feelings how you feel how you want me to be cause i care about you and uss veryy muchhh " },
    { title: "Open when you need a hug...", letter: "Baby pleasee aabo dekhi jj huncha ni malai bhana hoie tell  me how you feel whats bothering u your problems huhu aaba  sad vids haru herera ani ruyau bhane tyo problem jadaina ni ta . if youre feeling sad feel free to share things to me im always here to listen to you and understand you and take your side all the time i do really care about you babyy "  }
];

const lettersContainer = document.getElementById('lettersContainer');
letterTopics.forEach(item => {
    const envHTML = `
        <div class="envelope-wrapper">
            <div class="envelope flex items-center justify-center cursor-pointer" onclick="this.classList.toggle('open')">
                <div class="envelope-flap"></div>
                <div class="envelope-letter overflow-y-auto">
                    <p class="font-caveat text-xl text-[#6B1124]">${item.letter}</p>
                </div>
                <div class="wax-seal z-20">A</div>
                <p class="font-caveat text-center text-lg text-[#6B1124] absolute bottom-2 font-bold">${item.title}</p>
            </div>
        </div>
    `;
    lettersContainer.insertAdjacentHTML('beforeend', envHTML);
});

/* ----------------------------------------------------
   5. TIMELINE GENERATOR
---------------------------------------------------- */
const timelineEvents = [
    { date: "Day We First Met", title: "The Sparks Began", desc: "The very moment I saw you, everything changed for the better." },
    { date: "First Official Date", title: "Butterflies & Coffee", desc: "We talked for hours and neither of us wanted the night to end." },
    { date: "First 'I Love You'", title: "A Promise Made", desc: "Three simple words that became my absolute truth forever." }
];

const timelineContainer = document.getElementById('timelineContainer');
timelineEvents.forEach(item => {
    const tHTML = `
        <div class="relative pl-6">
            <div class="absolute -left-3 top-1 w-6 h-6 bg-[#6B1124] rounded-full border-4 border-white shadow"></div>
            <span class="vintage-stamp text-xs">${item.date}</span>
            <h3 class="font-playfair text-2xl text-[#6B1124] font-bold mt-2">${item.title}</h3>
            <p class="font-caveat text-xl text-[#4A3B32] mt-1">${item.desc}</p>
        </div>
    `;
    timelineContainer?.insertAdjacentHTML('beforeend', tHTML);
});

/* ----------------------------------------------------
   6. MUSIC PLAYER LOGIC
---------------------------------------------------- */
const songs = [
    { title: "Perfect", artist: "Ed Sheeran", subtitle: "♡", file: "perfect.mp3" },
    { title: "Love Story", artist: "Taylor Swift", subtitle: "♡", file: "Taylor-Swift-SnapYT.App.mp3" },
    { title: "Brooklyn baby", artist: "Lana Del Rey", subtitle: "♡", file: "brook.mp3" },
    { title: "Cinnamon Girl", artist: "Lana Del Rey", subtitle: "♡", file: "girl.mp3" }
];

let currentSongIdx = 0;
const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const vinylLabel = document.getElementById('vinylLabel');
const audioProgress = document.getElementById('audioProgress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

// Initialize first song source without auto-playing (avoids browser block)
function initPlayer() {
    loadSong(currentSongIdx);
    renderPlaylist();
}

function loadSong(idx) {
    const song = songs[idx];
    audio.src = song.file;
    audio.load(); // Forces the browser to load the new source
    document.getElementById('songTitle').innerText = `${song.title} - ${song.artist}`;
    document.getElementById('songSubtitle').innerText = song.subtitle;
    renderPlaylist();
}

function toggleAudio() {
    if (audio.paused) {
        audio.play().then(() => {
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            vinylLabel.classList.remove('vinyl-paused');
            renderPlaylist();
        }).catch(err => {
            console.log("Playback blocked or file not found:", err);
            alert("Could not play audio. Please check if '" + songs[currentSongIdx].file + "' exists in your folder.");
        });
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        vinylLabel.classList.add('vinyl-paused');
        renderPlaylist();
    }
}

function nextSong() {
    currentSongIdx = (currentSongIdx + 1) % songs.length;
    loadSong(currentSongIdx);
    audio.play().then(() => {
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        vinylLabel.classList.remove('vinyl-paused');
    });
}

function prevSong() {
    currentSongIdx = (currentSongIdx - 1 + songs.length) % songs.length;
    loadSong(currentSongIdx);
    audio.play().then(() => {
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        vinylLabel.classList.remove('vinyl-paused');
    });
}

// Render playlist items dynamically
function renderPlaylist() {
    const playlistContainer = document.getElementById('playlistItems');
    if (!playlistContainer) return;

    playlistContainer.innerHTML = songs.map((song, index) => `
        <div onclick="selectSong(${index})" 
             class="playlist-item flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${index === currentSongIdx ? 'bg-[#6B1124] text-white shadow-md' : 'bg-white/70 hover:bg-[#FFE5D9] text-[#4A3B32]'}">
            <div class="flex items-center space-x-3 overflow-hidden">
                <span class="text-xs font-bold opacity-75">${index + 1}</span>
                <div class="truncate">
                    <p class="font-bold text-sm truncate">${song.title}</p>
                    <p class="text-xs opacity-80 truncate">${song.artist}</p>
                </div>
            </div>
            <i class="fa-solid ${index === currentSongIdx && !audio.paused ? 'fa-volume-high animate-pulse' : 'fa-play'} text-sm ml-2"></i>
        </div>
    `).join('');
}

// Select a song directly from the playlist
function selectSong(index) {
    currentSongIdx = index;
    loadSong(currentSongIdx);
    audio.play().then(() => {
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        vinylLabel.classList.remove('vinyl-paused');
        renderPlaylist();
    }).catch(err => console.log("Playback error:", err));
}

// Update Progress Bar & Time Stamps as Song Plays
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        audioProgress.value = progressPercent;
        currentTimeEl.innerText = formatTime(audio.currentTime);
        durationEl.innerText = formatTime(audio.duration);
    }
});

// Allow user to scrub through the song using the range slider
audioProgress.addEventListener('input', () => {
    if (audio.duration) {
        audio.currentTime = (audioProgress.value / 100) * audio.duration;
    }
});

// Automatically go to next song when current one ends
audio.addEventListener('ended', () => {
    nextSong();
});

// Helper function to format seconds into M:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Run initial setup when page loads
initPlayer();
/* ----------------------------------------------------
   7. SCRATCH CARD CANVAS SCRIPTER
---------------------------------------------------- */
const scratchCanvas = document.getElementById('scratchCanvas');
const sCtx = scratchCanvas?.getContext('2d');

function initScratchCard() {
    if (!scratchCanvas || !sCtx) return;
    const rect = scratchCanvas.getBoundingClientRect();
    const pixelRatio = window.devicePixelRatio || 1;
    scratchCanvas.width = Math.round(rect.width * pixelRatio);
    scratchCanvas.height = Math.round(rect.height * pixelRatio);
    sCtx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    
    sCtx.fillStyle = '#D98880';
    sCtx.fillRect(0, 0, rect.width, rect.height);
    
    sCtx.font = `${Math.min(20, Math.max(14, rect.width / 14))}px Caveat`;
    sCtx.fillStyle = '#FFF';
    sCtx.textAlign = 'center';
    sCtx.fillText('Scratch to reveal! ✨', rect.width / 2, rect.height / 2 + 5);
}
setTimeout(initScratchCard, 500);

let isScratching = false;
function scratch(e) {
    if (!isScratching || !scratchCanvas || !sCtx) return;
    const rect = scratchCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    sCtx.globalCompositeOperation = 'destination-out';
    sCtx.beginPath();
    sCtx.arc(x, y, 16, 0, Math.PI * 2);
    sCtx.fill();
}

if (scratchCanvas) {
    scratchCanvas.addEventListener('pointerdown', (event) => {
        isScratching = true;
        scratchCanvas.setPointerCapture(event.pointerId);
        scratch(event);
    });
    scratchCanvas.addEventListener('pointerup', () => isScratching = false);
    scratchCanvas.addEventListener('pointercancel', () => isScratching = false);
    scratchCanvas.addEventListener('pointermove', scratch);
    if ('ResizeObserver' in window) {
        new ResizeObserver(initScratchCard).observe(scratchCanvas);
    } else {
        window.addEventListener('resize', initScratchCard);
    }
}

/* ----------------------------------------------------
   8. UNIVERSE NIGHT SKY INTERACTIVE STARS
---------------------------------------------------- */
const universeBox = document.getElementById('universeBox');
const starNotesContainer = document.getElementById('starNotesContainer');
const starQuotes = [
    "You are the sunshine to my life ⭐",
    "You are the star of my galaxy ✨",
    "Im sooo luckyy too haveee uuu 🌌",
    "My favorite thingg is yourr smilee your voicee youuu everythingg 💫"
];

function createStarNote(clientX, clientY) {
    const rect = universeBox.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height));

    const star = document.createElement('div');
    star.className = 'absolute text-yellow-300 text-xl font-bold animate-ping';
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.textContent = '⭐';

    const quote = document.createElement('div');
    quote.className = 'absolute bg-white/90 text-[#6B1124] font-caveat text-sm p-2 rounded shadow-lg pointer-events-none z-20';
    quote.style.left = `${Math.max(8, Math.min(x, rect.width - 168))}px`;
    quote.style.top = `${Math.max(10, Math.min(y - 30, rect.height - 52))}px`;
    quote.innerText = starQuotes[Math.floor(Math.random() * starQuotes.length)];

    starNotesContainer.appendChild(star);
    starNotesContainer.appendChild(quote);

    setTimeout(() => {
        star.classList.remove('animate-ping');
    }, 500);
}

universeBox.addEventListener('click', function(e) {
    createStarNote(e.clientX, e.clientY);
});

universeBox.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    const rect = universeBox.getBoundingClientRect();
    createStarNote(rect.left + rect.width / 2, rect.top + rect.height / 2);
});


/* ----------------------------------------------------
   FOREVER QUESTION (runaway "No" button)
---------------------------------------------------- */
(function () {
    const arena = document.getElementById('foreverArena');
    const yesBtn = document.getElementById('foreverYes');
    const noBtn = document.getElementById('foreverNo');
    const hint = document.getElementById('foreverHint');
    const modal = document.getElementById('foreverModal');
    const closeBtn = document.getElementById('foreverClose');
    if (!arena || !yesBtn || !noBtn) return;

    const hints = [
        'Hmm, are you sure about that?',
        'Oops, the button slipped away!',
        'Nice try... 😏',
        'It really does not want to be clicked!',
        'Just say yes already 🥰',
        'There is only one right answer!'
    ];
    let dodges = 0;
    let detached = false;

    function runAway(e) {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        const a = arena.getBoundingClientRect();
        const n = noBtn.getBoundingClientRect();
        const y = yesBtn.getBoundingClientRect();

        if (!detached) {
            noBtn.style.position = 'absolute';
            noBtn.style.left = (n.left - a.left) + 'px';
            noBtn.style.top = (n.top - a.top) + 'px';
            noBtn.style.transition = 'left 0.25s ease, top 0.25s ease';
            detached = true;
        }

        const maxX = Math.max(0, a.width - n.width);
        const maxY = Math.max(0, a.height - n.height);
        let x = 0, yPos = 0;
        for (let i = 0; i < 30; i++) {
            x = Math.random() * maxX;
            yPos = Math.random() * maxY;
            const L = a.left + x, T = a.top + yPos;
            const overlapsYes = L < y.right + 8 && L + n.width > y.left - 8 &&
                                T < y.bottom + 8 && T + n.height > y.top - 8;
            const tooClose = Math.hypot(x - (n.left - a.left), yPos - (n.top - a.top)) < 60;
            if (!overlapsYes && !tooClose) break;
        }
        noBtn.style.left = x + 'px';
        noBtn.style.top = yPos + 'px';

        dodges++;
        hint.textContent = hints[dodges % hints.length];
        yesBtn.style.transform = 'scale(' + Math.min(1 + dodges * 0.06, 1.4) + ')';
    }

    ['mouseenter', 'pointerdown', 'touchstart', 'click', 'focus'].forEach(function (evt) {
        noBtn.addEventListener(evt, runAway, { passive: false });
    });

    function openModal() {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        closeBtn.focus();
        for (let i = 0; i < 3; i++) setTimeout(triggerHugExplosion, i * 250);
    }
    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }

    yesBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
})();

/* ----------------------------------------------------
   OUR LOVE STORY WORD SEARCH PUZZLE LOGIC
---------------------------------------------------- */
const puzzleWords = [
    { word: "ABHI", found: false },
    { word: "KRIPE", found: false },
    { word: "LOVE", found: false },
    { word: "FOREVER", found: false }
];

// 8x8 Matrix representation containing ABHI, KRIPE, LOVE, and FOREVER
const puzzleMatrix = [
    ['A', 'B', 'H', 'I', 'X', 'Y', 'Z', 'W'],
    ['K', 'R', 'I', 'P', 'E', 'X', 'L', 'O'],
    ['F', 'O', 'R', 'E', 'V', 'E', 'R', 'V'],
    ['G', 'H', 'I', 'J', 'K', 'L', 'M', 'E'],
    ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'],
    ['L', 'O', 'V', 'E', 'Y', 'Z', 'A', 'B'],
    ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R']
];

let selectedCells = [];

function initWordSearch() {
    const gridContainer = document.getElementById('wordPuzzleGrid');
    const listContainer = document.getElementById('wordList');
    if (!gridContainer || !listContainer) return;

    // Render Grid
    gridContainer.innerHTML = '';
    puzzleMatrix.forEach((row, rIdx) => {
        row.forEach((letter, cIdx) => {
            const cell = document.createElement('div');
            cell.className = 'w-9 h-9 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center font-playfair font-bold text-lg text-[#6B1124] shadow-sm cursor-pointer hover:bg-[#FFE5D9] transition-colors';
            cell.dataset.row = rIdx;
            cell.dataset.col = cIdx;
            cell.textContent = letter;
            
            cell.addEventListener('click', () => handleCellClick(cell, rIdx, cIdx, letter));
            gridContainer.appendChild(cell);
        });
    });

    renderWordList();
}

function renderWordList() {
    const listContainer = document.getElementById('wordList');
    if (!listContainer) return;
    listContainer.innerHTML = puzzleWords.map(item => `
        <li class="flex items-center justify-between ${item.found ? 'line-through text-gray-400' : ''}">
            <span>${item.word}</span>
            <span>${item.found ? '✨' : '⭕'}</span>
        </li>
    `).join('');
}

function handleCellClick(cell, r, c, letter) {
    if (cell.classList.contains('bg-[#6B1124]')) return; // Already solved/selected

    cell.classList.toggle('bg-[#D98880]');
    cell.classList.toggle('text-white');

    const index = selectedCells.findIndex(item => item.r === r && item.c === c);
    if (index > -1) {
        selectedCells.splice(index, 1);
    } else {
        selectedCells.push({ r, c, letter });
    }

    checkSelectedWord();
}

function checkSelectedWord() {
    const currentString = selectedCells.map(item => item.letter).join('');
    
    puzzleWords.forEach(item => {
        if (!item.found && (currentString === item.word || currentString === item.word.split('').reverse().join(''))) {
            item.found = true;
            // Mark cells permanently as solved
            selectedCells.forEach(item => {
                const el = document.querySelector(`[data-row='${item.r}'][data-col='${item.c}']`);
                if (el) {
                    el.classList.remove('bg-[#D98880]');
                    el.classList.add('bg-[#6B1124]', 'text-white');
                }
            });
            selectedCells = [];
            renderWordList();
            updatePuzzleStatus();
        }
    });
}

function updatePuzzleStatus() {
    const foundCount = puzzleWords.filter(w => w.found).length;
    const statusEl = document.getElementById('puzzleStatus');
    if (statusEl) {
        statusEl.innerText = `Found: ${foundCount} / ${puzzleWords.length} words`;
    }
    if (foundCount === puzzleWords.length) {
        statusEl.innerText = "🎉 You found all our special words!";
        for (let i = 0; i < 25; i++) {
            particles.push(new Particle(window.innerWidth / 2, window.innerHeight / 2, true));
        }
    }
}

// Initialize on load
initWordSearch();