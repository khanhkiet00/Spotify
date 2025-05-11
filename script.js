const songContainer = document.querySelector(".songList");
const songRecommended = document.querySelector(".recommended");
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
    author: "Thiều Bảo Trâm",
  },
  {
    id: "1",
    songName: "wrong times",
    filePath: "./assets/song/song1.mp3",
    img: "./assets/img/songLogo/song2.jfif",
    author: "Puppy, Dangrangto",
  },
  {
    id: "2",
    songName: "nến và hoa",
    filePath: "./assets/song/song2.mp3",
    img: "./assets/img/songLogo/song3.jfif",
    author: "Rhymatics",
  },
  {
    id: "3",
    songName: "Giá như",
    filePath: "./assets/song/song3.mp3",
    img: "./assets/img/songLogo/song4.jfif",
    author: "Soobin Hoàng Sơn",
  },
];

let songsRecommended = [
  {
    id: "4",
    songName: "24h",
    filePath: "./assets/song/song4.mp3",
    img: "./assets/img/songLogo/song5.jfif",
    author: "Lyly",
  },
  {
    id: "5",
    songName: "sinh ra đã là thứ đối lập nhau",
    filePath: "./assets/song/song5.mp3",
    img: "./assets/img/songLogo/song6.jfif",
    author: "Da LAB",
  },
];

// startApp
function startApp() {
  renderListSong(songs, songContainer);
  renderListSong(songsRecommended, songRecommended);
}

startApp();

let playMusicbtn = document.getElementById("playmusic");
let forWardBtn = document.querySelector(".forward");
let backWardBtn = document.querySelector(".backward");
let songList = document.querySelectorAll(".songItem");
let playInSongItem = document.querySelectorAll(".songList i");
let addSongtoList = document.querySelectorAll(".songItem i.fa-plus");
let divBottom = document.querySelector(".bottom");
let songBanner = document.querySelector(".songBanner");
let nameSongBanner = document.querySelector(".songBanner span");
let currentMinute = document.querySelector(".current-time span:first-child");
let currentSecond = document.querySelector(".current-time span:last-child");
let endTime = document.querySelector(".end-time");
let endMinute = document.querySelector(".end-time span:first-child");
let endSecond = document.querySelector(".end-time span:last-child");

playMusicbtn = document.getElementById("playmusic");
// Listen to document
// Display the bottom
function displayDivBottom() {
  divBottom.style.display = "flex";
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
    // pause all btn in songItem
    pauseBtnSongItem();
    audioElement.pause();
    songBanner.style.opacity = 0;
  }
};

// pause btn songitem
function pauseBtnSongItem() {
  console.log(playInSongItem);
  playInSongItem.forEach((element) => {
    element.classList.replace("fa-circle-pause", "fa-circle-play");
  });
}

// click songitem
playInSongItem.forEach((item) => {
  item.onclick = (e) => {
    playBtnSongList(e);
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
    // handler current and end song time
    handlerSongTime("currentTime", currentSecond, currentMinute);
    handlerSongTime("duration", endSecond, endMinute);

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

addSongtoList.forEach((item) => {
  item.onclick = (e) => {
    e.stopPropagation();
    songsRecommended.forEach((item) => {
      if (item.id == e.target.parentElement.id) {
        // add song from songsRecommended to songs
        songs.push(item);
        // delete song in html
        document.getElementById(`${item.id}`).outerHTML = "";
        // add song in html
        addSong(item, songContainer);
        //delete song in songsRecommended
        songsRecommended.splice(songsRecommended.indexOf(item), 1);
        playInSongItem = document.querySelectorAll(".songList i");
        // click songitem
        playInSongItem.forEach((item) => {
          item.onclick = (e) => {
            playBtnSongList(e);
          };
        });
        songList = document.querySelectorAll(".songItem");
        // onclick songItem
        songList.forEach((item) => {
          item.onclick = (e) => {
            // playBtnSongList(e);
          };
        });
      }
    });
  };
});

function renderListSong(listSong, container) {
  listSong.forEach((song) => {
    addSong(song, container);
  });
}

function addSong(song, container) {
  const div = document.createElement("div");
  div.id = song.id;
  div.classList.add("songItem");

  // Thêm thẻ i nếu là recommended
  if (container === songRecommended) {
    var iconHTML = `<i class="fa-solid fa-play recommended-icon"></i>`;
    var addSongIcon = `<i class="fa-solid fa-plus"></i>`;
    var playIcon = "";
  } else {
    var playIcon = `<span><i class="fa-regular fa-circle-play"></i></span>`;
    var iconHTML = "";
    var addSongIcon = "";
  }
  div.innerHTML = `
      ${iconHTML}
      ${codeRenderHTML(song)}
      ${playIcon}
      ${addSongIcon}
    `;
  container.appendChild(div);
}

function codeRenderHTML(song) {
  return `
    <img src="${song.img}" alt="" />
    <div class="songList-item">
      <p>${song.songName}</p>
      <p class="opacity08">${song.author}</p>
    </div>
  `;
}

function nameSongInSongBanner() {
  nameSongBanner.innerText = songs[songId].songName;
}

// handler song time
function handlerSongTime(timeType, secondElement, minuteElement) {
  if (timeType === "string" || !isNaN(audioElement[timeType])) {
    if (audioElement[timeType] % 60 < 60) {
      if (audioElement[timeType] % 60 < 10) {
        if (audioElement[timeType] % 60 < 1) {
          secondElement.innerText = "00";
        } else {
          secondElement.innerText = (
            parseInt(audioElement[timeType] % 60) / 100
          )
            .toString()
            .split(".")[1];
        }
      } else {
        secondElement.innerText = parseInt(audioElement[timeType] % 60);
      }
      minuteElement.innerText = parseInt(audioElement[timeType] / 60);
    }
  }
}

function playBtnSongList(e) {
  // stop propagation event
  e.stopPropagation();
  // stop old music
  if (!audioElement.paused) {
    audioElement.pause();
  }
  displayDivBottom();
  if (e.target.classList.contains("fa-circle-play")) {
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
      // console.log(songId);
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
}
