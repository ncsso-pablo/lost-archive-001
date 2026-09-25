const audio =
    document.getElementById("audio");

const playButton =
    document.getElementById("play-button");

const currentTime =
    document.getElementById("current-time");

const duration =
    document.getElementById("duration");

const progressContainer =
    document.getElementById("progress-container");

const progressBar =
    document.querySelector(".progress-bar");

const progressHandle =
    document.querySelector(".progress-handle");

const trackNumber =
    document.getElementById("track-number");

const trackName =
    document.getElementById("track-name");

const previousButton =
    document.getElementById("previous-button");

const nextButton =
    document.getElementById("next-button");

const startPage =
    document.getElementById("start-page");

const archivePage =
    document.getElementById("archive-page");

const enterArchive =
    document.getElementById("enter-archive");


/* =========================
   TRACK LIST
========================= */

const tracks = [

    {
        number: "001",
        title: "surd",
        file: "audio/surd.mp3"
    },

    {
        number: "002",
        title: "vogt",
        file: "audio/vogt.mp3"
    },

    {
        number: "003",
        title: "3",
        file: "audio/3.mp3"
    },

    {
        number: "004",
        title: "drea_2",
        file: "audio/drea_2.mp3"
    },

    {
        number: "005",
        title: "dreammmu",
        file: "audio/dreammmu.mp3"
    },

    {
        number: "006",
        title: "Project_1222222222222",
        file: "audio/Project_1222222222222.mp3"
    },

    {
        number: "007",
        title: "sardddd",
        file: "audio/sardddd.mp3"
    },

    {
        number: "008",
        title: "serdddd",
        file: "audio/serdddd.mp3"
    },

    {
        number: "009",
        title: "ssssd",
        file: "audio/ssssd.mp3"
    }

];


let currentTrackIndex = 0;

let isDragging = false;


/* =========================
   START → ARCHIVE
========================= */

enterArchive.addEventListener(
    "click",
    function () {

        startPage.classList.add("hidden");

        archivePage.classList.add("active");

    }
);


/* =========================
   LOAD TRACK
========================= */

function loadTrack(index) {

    currentTrackIndex = index;

    const track =
        tracks[currentTrackIndex];


    audio.src = track.file;


    trackNumber.textContent =
        track.number;


    trackName.textContent =
        track.title;


    currentTime.textContent =
        "00:00";


    duration.textContent =
        "00:00";


    progressBar.style.width =
        "0%";


    progressHandle.style.left =
        "0%";


    playButton.textContent =
        "play";


    audio.load();

}


/* =========================
   PLAY / PAUSE
========================= */

function togglePlay() {

    if (audio.paused) {

        /*
         * PLAY STARTS
         * FROM THE BEGINNING
         */

        audio.currentTime = 0;


        audio.play()
            .then(function () {

                playButton.textContent =
                    "pause";

                updateProgress();

            })
            .catch(function (error) {

                console.error(
                    "Audio konnte nicht abgespielt werden:",
                    error
                );

            });

    }

    else {

        audio.pause();

        playButton.textContent =
            "play";

    }

}


/* =========================
   PLAY BUTTON
========================= */

playButton.addEventListener(
    "click",
    togglePlay
);


/* =========================
   SPACEBAR
========================= */

document.addEventListener(
    "keydown",
    function (event) {

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


/* =========================
   AUDIO LOADED
========================= */

audio.addEventListener(
    "loadedmetadata",
    function () {

        duration.textContent =
            formatTime(audio.duration);

    }
);


/* =========================
   AUDIO ERROR
========================= */

audio.addEventListener(
    "error",
    function () {

        console.error(
            "Audio-Datei konnte nicht geladen werden:",
            audio.src
        );

        playButton.textContent =
            "error";

    }
);


/* =========================
   PROGRESS
========================= */

function updateProgress() {

    if (!audio.duration) {
        return;
    }


    const progress =
        audio.currentTime /
        audio.duration;


    const percentage =
        progress * 100;


    progressBar.style.width =
        percentage + "%";


    progressHandle.style.left =
        percentage + "%";


    currentTime.textContent =
        formatTime(audio.currentTime);


    if (
        !audio.paused &&
        !audio.ended &&
        !isDragging
    ) {

        requestAnimationFrame(
            updateProgress
        );

    }

}


/* =========================
   SET PROGRESS
========================= */

function setProgressFromPointer(event) {

    if (!audio.duration) {
        return;
    }


    const rect =
        progressContainer.getBoundingClientRect();


    let position =
        (event.clientX - rect.left) /
        rect.width;


    position =
        Math.max(
            0,
            Math.min(1, position)
        );


    audio.currentTime =
        position * audio.duration;


    const percentage =
        position * 100;


    progressBar.style.width =
        percentage + "%";


    progressHandle.style.left =
        percentage + "%";


    currentTime.textContent =
        formatTime(audio.currentTime);

}


/* =========================
   PROGRESS DRAG
========================= */

progressContainer.addEventListener(
    "pointerdown",
    function (event) {

        isDragging = true;

        progressContainer.setPointerCapture(
            event.pointerId
        );

        setProgressFromPointer(event);

    }
);


progressContainer.addEventListener(
    "pointermove",
    function (event) {

        if (!isDragging) {
            return;
        }

        setProgressFromPointer(event);

    }
);


progressContainer.addEventListener(
    "pointerup",
    function (event) {

        isDragging = false;

        progressContainer.releasePointerCapture(
            event.pointerId
        );


        if (!audio.paused) {

            updateProgress();

        }

    }
);


progressContainer.addEventListener(
    "pointercancel",
    function () {

        isDragging = false;

    }
);


/* =========================
   PREVIOUS TRACK
========================= */

previousButton.addEventListener(
    "click",
    function () {

        currentTrackIndex--;

        if (currentTrackIndex < 0) {

            currentTrackIndex =
                tracks.length - 1;

        }


        loadTrack(
            currentTrackIndex
        );

    }
);


/* =========================
   NEXT TRACK
========================= */

nextButton.addEventListener(
    "click",
    function () {

        currentTrackIndex++;

        if (
            currentTrackIndex >=
            tracks.length
        ) {

            currentTrackIndex = 0;

        }


        loadTrack(
            currentTrackIndex
        );

    }
);


/* =========================
   KEYBOARD ARROWS
========================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.code === "ArrowLeft") {

            currentTrackIndex--;

            if (currentTrackIndex < 0) {

                currentTrackIndex =
                    tracks.length - 1;

            }

            loadTrack(
                currentTrackIndex
            );

        }


        if (event.code === "ArrowRight") {

            currentTrackIndex++;

            if (
                currentTrackIndex >=
                tracks.length
            ) {

                currentTrackIndex = 0;

            }

            loadTrack(
                currentTrackIndex
            );

        }

    }
);


/* =========================
   SONG ENDED
========================= */

audio.addEventListener(
    "ended",
    function () {

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


/* =========================
   FORMAT TIME
========================= */

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);


    const remainingSeconds =
        Math.floor(seconds % 60);


    return (
        String(minutes).padStart(2, "0")
        +
        ":"
        +
        String(remainingSeconds).padStart(2, "0")
    );

}


/* =========================
   INITIAL TRACK
========================= */

loadTrack(0);