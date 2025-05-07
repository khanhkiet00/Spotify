const songContainer = document.querySelector(".songList");
const myProgressBar = document.getElementById("myProgressBar");
const volume = document.querySelector("#volume");
const imgVolume = document.querySelector(".volume-container i");
var songId = -1;
var songPath = "";
var audioElement = new Audio();
var currentVolume = 0;
let songs = [
  {
    id: "0",
    songName: "Phía sau lưng anh có ai kia",
    filePath: "./assets/song/song0.mp3",
    img: "./assets/img/songLogo/TBT.jfif",
  },
  {
    id: "1",
    songName: "wrong times",
    filePath: "./assets/song/song1.mp3",
    img: "./assets/img/songLogo/song2.jfif",
  },
  {
    id: "2",
    songName: "nến và hoa",
    filePath: "./assets/song/song2.mp3",
    img: "./assets/img/songLogo/song3.jfif",
  },
  {
    id: "3",
    songName: "Giá như",
    filePath: "./assets/song/song3.mp3",
    img: "./assets/img/songLogo/song4.jfif",
  },
];

// startApp
function startApp() {
  renderListSong();
}

startApp();

const playMusicbtn = document.getElementById("playmusic");
const forWardBtn = document.querySelector(".forward");
const backWardBtn = document.querySelector(".backward");
const songList = document.querySelectorAll(".songItem");
const playInSongItem = document.querySelectorAll(".songList i.fa-circle-play");
const divBottom = document.querySelector(".bottom");
const songBanner = document.querySelector(".songBanner");
const nameSongBanner = document.querySelector(".songBanner span");
// Listen to document
// Display the bottom
function displayDivBottom() {
  divBottom.style.opacity = 1;
}

// Event onclick playmusic
playMusicbtn.onclick = (e) => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    e.target.classList.replace("fa-circle-play", "fa-circle-pause");
    songBanner.style.opacity = 1;
    audioElement.play();

    // play btn in songItem
    document
      .getElementById(`${songId}`)
      .lastElementChild.children[0].classList.replace(
        "fa-circle-play",
        "fa-circle-pause"
      );
  } else {
    e.target.classList.replace("fa-circle-pause", "fa-circle-play");
    pauseBtnSongItem();
    audioElement.pause();
    songBanner.style.opacity = 0;

    // pause btn in songItem
    document
      .getElementById(`${songId}`)
      .lastElementChild.children[0].classList.replace(
        "fa-circle-pause",
        "fa-circle-play"
      );
  }
};

// pause btn songitem
function pauseBtnSongItem() {
  playInSongItem.forEach((element) => {
    element.classList.replace("fa-circle-pause", "fa-circle-play");
  });
}

// click songitem
playInSongItem.forEach((item) => {
  item.onclick = (e) => {
    // stop propagation event
    e.stopPropagation();
    // stop old music
    if (!audioElement.paused) {
      audioElement.pause();
    }
    displayDivBottom();
    if (item.classList.contains("fa-circle-play")) {
      // Change btn
      pauseBtnSongItem(); //btn pause all
      e.target.classList.replace("fa-circle-play", "fa-circle-pause"); // play btn click
      playMusicbtn.classList.replace("fa-circle-play", "fa-circle-pause"); //play main btn

      // take ID when click on the songItem
      if (songId == e.target.parentElement.parentElement.getAttribute("id")) {
        audioElement.play();
        timeUpDate();
      } else {
        // take new id to play new music
        songId = e.target.parentElement.parentElement.getAttribute("id");
        audioElement = new Audio(`./assets/song/song${songId}.mp3`);
        audioElement.volume = volume.value / 100;
        audioElement.play();
        nameSongInSongBanner(); // take song name
        timeUpDate();
      }
      songBanner.style.opacity = 1;
    } else {
      songBanner.style.opacity = 0;
      e.target.classList.replace("fa-circle-pause", "fa-circle-play");
      playMusicbtn.classList.replace("fa-circle-pause", "fa-circle-play");
      audioElement.pause();
    }
  };
});

// listen event forward
forWardBtn.onclick = () => {
  audioElement.currentTime += 5;
};

backWardBtn.onclick = () => {
  audioElement.currentTime -= 5;
};

// Listen to events
function timeUpDate() {
  audioElement.addEventListener("timeupdate", () => {
    myProgressBar.value =
      (audioElement.currentTime / audioElement.duration) * 100;
    if (audioElement.ended) {
      pauseBtnSongItem();
      playMusicbtn.classList.replace("fa-circle-pause", "fa-circle-play");
      songId = parseInt(songId) + 1;
      songBanner.style.opacity = 0;
      if (songId < songs.length) {
        audioElement = new Audio(`./assets/song/song${songId}.mp3`);
        audioElement.play();
        audioElement.volume = volume.value / 100;
        playMusicbtn.classList.replace("fa-circle-play", "fa-circle-pause");
        document
          .getElementById(`${songId}`)
          .lastElementChild.children[0].classList.replace(
            "fa-circle-play",
            "fa-circle-pause"
          );
        timeUpDate();
        nameSongInSongBanner();
        songBanner.style.opacity = 1;
      } else {
        songId = 0;
        audioElement = new Audio(`./assets/song/song${songId}.mp3`);
        audioElement.play();
        audioElement.volume = volume.value / 100;
        timeUpDate();
        nameSongInSongBanner();
        songBanner.style.opacity = 1;
        playMusicbtn.classList.replace("fa-circle-play", "fa-circle-pause");
        document
          .getElementById(`${songId}`)
          .lastElementChild.children[0].classList.replace(
            "fa-circle-play",
            "fa-circle-pause"
          );
      }
    }
  });
}

// onclick songItem
songList.forEach((item) => {
  item.onclick = (e) => {
    if (!audioElement.paused) {
      audioElement.pause();
    }
    displayDivBottom();
    if (e.target.lastChild.lastChild.classList.contains("fa-circle-play")) {
      // Change btn
      pauseBtnSongItem(); //btn pause all
      e.target.lastChild.lastChild.classList.replace(
        "fa-circle-play",
        "fa-circle-pause"
      ); // play btn click
      playMusicbtn.classList.replace("fa-circle-play", "fa-circle-pause"); //play main btn

      // take ID when click on the songItem
      if (songId == e.target.getAttribute("id")) {
        audioElement.play();
        timeUpDate();
      } else {
        // take new id to play new music
        songId = e.target.getAttribute("id");
        audioElement = new Audio(`./assets/song/song${songId}.mp3`);
        audioElement.volume = volume.value / 100;
        audioElement.play();
        nameSongInSongBanner(); // take song name
        timeUpDate();
      }
      songBanner.style.opacity = 1;
    } else {
      songBanner.style.opacity = 0;
      e.target.lastChild.lastChild.classList.replace(
        "fa-circle-pause",
        "fa-circle-play"
      );
      playMusicbtn.classList.replace("fa-circle-pause", "fa-circle-play");
      audioElement.pause();
    }
  };
});

// change input range play music
myProgressBar.onchange = () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
};

// change volume
volume.oninput = () => {
  audioElement.volume = volume.value / 100;
  var Magnitude = audioElement.volume;

  changeVolumeIcon(Magnitude);
};

// mute volume when click i element volume
imgVolume.onclick = () => {
  // volume = 0 if volume > 0
  if (audioElement.volume > 0) {
    currentVolume = audioElement.volume;
    audioElement.volume = 0;
    volume.value = 0;
    if (imgVolume.classList[1] == "fa-volume-low") {
      imgVolume.classList.replace("fa-volume-low", "fa-volume-xmark");
    }
    if (imgVolume.classList[1] == "fa-volume-high") {
      imgVolume.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
  } else {
    audioElement.volume = currentVolume;
    volume.value = currentVolume * 100;
    changeVolumeIcon(currentVolume);
  }
};

// changeVolumeIcon
function changeVolumeIcon(volume) {
  if (volume == 0) {
    if (imgVolume.classList[1] == "fa-volume-low") {
      imgVolume.classList.replace("fa-volume-low", "fa-volume-xmark");
    }
    if (imgVolume.classList[1] == "fa-volume-high") {
      imgVolume.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
  }
  if (volume > 0 && volume <= 0.5) {
    if (imgVolume.classList[1] == "fa-volume-xmark") {
      imgVolume.classList.replace("fa-volume-xmark", "fa-volume-low");
    }
    if (imgVolume.classList[1] == "fa-volume-high") {
      imgVolume.classList.replace("fa-volume-high", "fa-volume-low");
    }
  }
  if (volume > 0.5) {
    if (imgVolume.classList[1] == "fa-volume-xmark") {
      imgVolume.classList.replace("fa-volume-xmark", "fa-volume-high");
    }
    if (imgVolume.classList[1] == "fa-volume-low") {
      imgVolume.classList.replace("fa-volume-low", "fa-volume-high");
    }
  }
}

function renderListSong() {
  for (var i = 0; i < songs.length; i++) {
    var div = document.createElement("div");
    div.setAttribute("id", `${songs[i].id}`);
    div.classList.add("songItem");
    songContainer.appendChild(div);
    document.getElementById(
      `${songs[i].id}`
    ).innerHTML = `<img src="${songs[i].img}" alt="" />
          <span>${songs[i].songName}</span>
          <span> <i class="fa-regular fa-circle-play"></i></span>`;
  }
}

function nameSongInSongBanner() {
  nameSongBanner.innerText = songs[songId].songName;
}
