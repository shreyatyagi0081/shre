console.log("Welcome to Spotify");

// Initialize Variables
let songIndex = 0;
let audioElement = new Audio(); // Use one audio element
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let shuffleBtn = document.getElementById('shuffle');
let repeatBtn = document.getElementById('repeat');
let darkModeToggle = document.getElementById('darkMode');
let volumeControl = document.getElementById("volume");
let currentTimeDisplay = document.getElementById("currentTime");
let totalTimeDisplay = document.getElementById("totalTime");

// Song list
let songs = [
    { name: "Sanam Teri Kasam", src: "/song/Sanam Teri Kasam Title Song _ Harshvardhan, Mawra _ Himesh Reshammiya, Ankit Tiwari.mp3" },
    { name: "Tum Hi Ho", src: "/song/128-Tum Hi Ho - Aashiqui 2 128 Kbps.mp3" },
    { name: "Tu Hai Toh Main Hoon", src: "/song/128-Tu Hain Toh Main Hoon - Sky Force 128 Kbps.mp3" },
    { name: "Boy With Luv", src: "/song/BTS-Boy-with-Luv-(HipHopKit.com).mp3" },
    { name: "Jo Tum Mera Ho", src: "/song/128-Jo Tum Mere Ho - Anuv Jain 128 Kbps.mp3" },
    { name: "Jai Shri Ram", src: "/song/128-Jai Shri Ram Full Song - Adipurush 128 Kbps.mp3" },
    { name: "My Universe", src: "songs/My Universe.mp3" },
    { name: "Perfect", src: "/song/Perfect-(Mr-Jat.in).mp3" },
    { name: "APT.", src: "/song/Apt - PagalHits.mp3" },
    { name: "Die With A Smile", src: "/song/Die With A Smile-(SambalpuriStar.In).mp3" }
];

// Play selected song
function playSong(index) {
    songItems.forEach(item => item.classList.remove("playing"));
    songIndex = index;
    audioElement.src = songs[index].src; // Correct song source
    masterSongName.innerText = songs[index].name; // Update song name
    audioElement.currentTime = 0;
    audioElement.play();
    songItems[index].classList.add("playing");
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
}

// Click event for songs
songItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        playSong(index);
    });
});

// Play/Pause button functionality
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
    } else {
        audioElement.pause();
        masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
    }
});

// Next & Previous Buttons
document.getElementById("next").addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

document.getElementById("previous").addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});

// Auto-play next song when the current song ends
audioElement.addEventListener("ended", () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});



// Update Progress Bar & Time Display
audioElement.addEventListener('timeupdate', () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
    updateSongTime();
});

// Seekbar Control
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
    updateSongTime();
});

// Update Current Time & Total Time Display
function updateSongTime() {
    currentTimeDisplay.innerText = formatTime(audioElement.currentTime);
    totalTimeDisplay.innerText = formatTime(audioElement.duration) || "0:00";
}

// Format Time in MM:SS
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Shuffle Songs
shuffleBtn.addEventListener('click', () => {
    songIndex = Math.floor(Math.random() * songs.length);
    playSong(songIndex);
});

// Repeat Current Song
repeatBtn.addEventListener('click', () => {
    audioElement.currentTime = 0;
    audioElement.play();
});

// Volume Control
volumeControl.addEventListener('input', () => {
    audioElement.volume = volumeControl.value / 100;
});

// Dark Mode Toggle
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector("footer").classList.toggle("dark-mode");
});

// Keyboard Shortcuts
document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case "Space":
            event.preventDefault();
            masterPlay.click(); // Toggle Play/Pause
            break;
        case "ArrowRight":
            document.getElementById('next').click();
            break;
        case "ArrowLeft":
            document.getElementById('previous').click();
            break;
    }
});
