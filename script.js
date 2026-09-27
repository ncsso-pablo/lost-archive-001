/* =========================================
   TRACK LIST
========================================= */

const tracks = [

  {
    number: "001",
    title: "surd",
    file: "audio/surd.mp3",
    color: "#e8e3d8"
  },

  {
    number: "002",
    title: "vogt",
    file: "audio/vogt.mp3",
    color: "#ddd9d0"
  },

  {
    number: "003",
    title: "3",
    file: "audio/3.mp3",
    color: "#d5d2ca"
  },

  {
    number: "004",
    title: "drea_2",
    file: "audio/drea_2.mp3",
    color: "#e3ddd0"
  },

  {
    number: "005",
    title: "dreammmu",
    file: "audio/dreammmu.mp3",
    color: "#d9d5cb"
  },

  {
    number: "006",
    title: "Project_12222222222222",
    file: "audio/Project_12222222222222.mp3",
    color: "#cecac2"
  },

  {
    number: "007",
    title: "sardddd",
    file: "audio/sardddd.mp3",
    color: "#e5dfd2"
  },

  {
    number: "008",
    title: "serdddd",
    file: "audio/serdddd.mp3",
    color: "#d8d4ca"
  },

  {
    number: "009",
    title: "ssssd",
    file: "audio/ssssd.mp3",
    color: "#e0dbd1"
  }

];


/* =========================================
   ELEMENTS
========================================= */

const startPage =
  document.getElementById("start-page");

const archivePage =
  document.getElementById("archive-page");

const enterArchive =
  document.getElementById("enter-archive");

const backToStart =
  document.getElementById("back-to-start");


const audio =
  document.getElementById("audio");

const playButton =
  document.getElementById("play-button");

const previousButton =
  document.getElementById("previous-button");

const nextButton =
  document.getElementById("next-button");


const trackNumber =
  document.getElementById("track-number");

const trackName =
  document.getElementById("track-name");


const progressContainer =
  document.getElementById("progress-container");

const progressBar =
  document.querySelector(".progress-bar");

const progressHandle =
  document.querySelector(".progress-handle");


const currentTime =
  document.getElementById("current-time");

const duration =
  document.getElementById("duration");


/* POPUPS */

const aboutButton =
  document.getElementById("about-button");

const contactButton =
  document.getElementById("contact-button");

const aboutOverlay =
  document.getElementById("about-overlay");

const contactOverlay =
  document.getElementById("contact-overlay");


/* COPY */

const copyEmail =
  document.getElementById("copy-email");

const copyStatus =
  document.getElementById("copy-status");


/* =========================================
   STATE
========================================= */

let currentTrack = 0;


/* =========================================
   START → ARCHIVE
========================================= */

enterArchive.addEventListener(
  "click",
  () => {

    startPage.classList.add(
      "hidden"
    );

    archivePage.classList.add(
      "active"
    );

  }
);


/* =========================================
   ARCHIVE → START
========================================= */

backToStart.addEventListener(
  "click",
  () => {

    archivePage.classList.remove(
      "active"
    );

    startPage.classList.remove(
      "hidden"
    );

  }
);


/* =========================================
   LOAD TRACK
========================================= */

function loadTrack(index) {

  currentTrack = index;

  const track =
    tracks[currentTrack];


  trackNumber.textContent =
    track.number;


  trackName.textContent =
    track.title;


  audio.src =
    track.file;


  audio.load();


  /*
    The body has a long CSS transition.
    This creates a very soft colour change.
  */

  document.body.style.backgroundColor =
    track.color;


  playButton.textContent =
    "play";


  currentTime.textContent =
    "00:00";


  duration.textContent =
    "00:00";


  progressBar.style.width =
    "0%";


  progressHandle.style.left =
    "0%";

}


/* =========================================
   PLAY / PAUSE
========================================= */

function togglePlay() {

  if (audio.paused) {

    audio.currentTime = 0;

    audio.play();

    playButton.textContent =
      "pause";

  }

  else {

    audio.pause();

    playButton.textContent =
      "play";

  }

}


playButton.addEventListener(
  "click",
  togglePlay
);


/* =========================================
   SPACEBAR
========================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.code === "Space" &&
      event.target.tagName !== "INPUT" &&
      event.target.tagName !== "TEXTAREA"
    ) {

      event.preventDefault();

      togglePlay();

    }

  }
);


/* =========================================
   AUDIO METADATA
========================================= */

audio.addEventListener(
  "loadedmetadata",
  () => {

    duration.textContent =
      formatTime(audio.duration);

  }
);


/* =========================================
   AUDIO ERROR
========================================= */

audio.addEventListener(
  "error",
  () => {

    playButton.textContent =
      "error";

    console.log(
      "Could not load:",
      audio.src
    );

  }
);


/* =========================================
   PROGRESS
========================================= */

audio.addEventListener(
  "timeupdate",
  () => {

    if (!audio.duration) return;


    const percentage =
      (
        audio.currentTime /
        audio.duration
      ) * 100;


    progressBar.style.width =
      `${percentage}%`;


    progressHandle.style.left =
      `${percentage}%`;


    currentTime.textContent =
      formatTime(
        audio.currentTime
      );

  }
);


/* =========================================
   PROGRESS CLICK
========================================= */

progressContainer.addEventListener(
  "click",
  (event) => {

    const rect =
      progressContainer.getBoundingClientRect();


    const position =
      (
        event.clientX -
        rect.left
      ) / rect.width;


    if (audio.duration) {

      audio.currentTime =
        position *
        audio.duration;

    }

  }
);


/* =========================================
   PREVIOUS
========================================= */

previousButton.addEventListener(
  "click",
  () => {

    currentTrack--;

    if (currentTrack < 0) {

      currentTrack =
        tracks.length - 1;

    }

    loadTrack(
      currentTrack
    );

  }
);


/* =========================================
   NEXT
========================================= */

nextButton.addEventListener(
  "click",
  () => {

    currentTrack++;

    if (
      currentTrack >=
      tracks.length
    ) {

      currentTrack = 0;

    }

    loadTrack(
      currentTrack
    );

  }
);


/* =========================================
   KEYBOARD ARROWS
========================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "ArrowLeft") {

      currentTrack--;

      if (currentTrack < 0) {

        currentTrack =
          tracks.length - 1;

      }

      loadTrack(
        currentTrack
      );

    }


    if (event.key === "ArrowRight") {

      currentTrack++;

      if (
        currentTrack >=
        tracks.length
      ) {

        currentTrack = 0;

      }

      loadTrack(
        currentTrack
      );

    }

  }
);


/* =========================================
   TRACK ENDED
========================================= */

audio.addEventListener(
  "ended",
  () => {

    playButton.textContent =
      "play";

    audio.currentTime = 0;

    progressBar.style.width =
      "0%";

    progressHandle.style.left =
      "0%";

    currentTime.textContent =
      "00:00";

  }
);


/* =========================================
   ABOUT
========================================= */

aboutButton.addEventListener(
  "click",
  () => {

    aboutOverlay.classList.add(
      "active"
    );

  }
);


/* =========================================
   CONTACT
========================================= */

contactButton.addEventListener(
  "click",
  () => {

    contactOverlay.classList.add(
      "active"
    );

  }
);


/* =========================================
   CLOSE POPUPS
========================================= */

document
  .querySelectorAll("[data-close]")
  .forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const overlayId =
            button.dataset.close;


          document
            .getElementById(
              overlayId
            )
            .classList.remove(
              "active"
            );

        }
      );

    }
  );


/* =========================================
   CLICK OUTSIDE POPUP
========================================= */

[
  aboutOverlay,
  contactOverlay
].forEach(
  (overlay) => {

    overlay.addEventListener(
      "click",
      (event) => {

        if (
          event.target ===
          overlay
        ) {

          overlay.classList.remove(
            "active"
          );

        }

      }
    );

  }
);


/* =========================================
   ESCAPE
========================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      aboutOverlay.classList.remove(
        "active"
      );

      contactOverlay.classList.remove(
        "active"
      );

    }

  }
);


/* =========================================
   COPY EMAIL
========================================= */

copyEmail.addEventListener(
  "click",
  async () => {

    const email =
      "kopfnicolai@gmail.com";


    try {

      await navigator.clipboard.writeText(
        email
      );


      copyStatus.textContent =
        "copied";


      setTimeout(
        () => {

          copyStatus.textContent =
            "";

        },
        1500
      );

    }

    catch (error) {

      copyStatus.textContent =
        "error";

    }

  }
);


/* =========================================
   TIME FORMAT
========================================= */

function formatTime(seconds) {

  if (!isFinite(seconds)) {

    return "00:00";

  }


  const minutes =
    Math.floor(
      seconds / 60
    );


  const remainingSeconds =
    Math.floor(
      seconds % 60
    );


  return (
    String(minutes)
      .padStart(2, "0")
    + ":" +
    String(remainingSeconds)
      .padStart(2, "0")
  );

}


/* =========================================
   INITIAL TRACK
========================================= */

loadTrack(0);
