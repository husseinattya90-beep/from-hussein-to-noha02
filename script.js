const screen = document.getElementById("screen");
const music = document.getElementById("music");

let currentPage = "lock";
let pageHistory = [];


/* =====================================================
   YOUR MEMORIES
   كل الصور في نفس فولدر المشروع
===================================================== */

const memories = [

  {
    image: "photo1.jpg",
    caption:
      "Some memories don't need an explanation. They just make you smile."
  },

  {
    image: "photo2.jpg",
    caption:
      "One of those ordinary moments that somehow became one of my favorites."
  },

  {
    image: "photo3.jpg",
    caption:
      "I don't remember everything about that day. I remember how happy you looked."
  },

  {
    image: "photo4.jpg",
    caption:
      "Another place. Another day. Somehow, it became ours."
  },

  {
    image: "photo5.jpg",
    caption:
      "You probably don't know how many times I've looked at this picture."
  },

  {
    image: "photo6.jpg",
    caption:
      "And this one... I think this is one of the smiles I would choose again and again."
  }

];


/* =====================================================
   NOTES
===================================================== */

const notes = [

  {
    title: "Things I Admire About You",

    date: "A NOTE I NEVER SENT",

    text: `I admire the way you can make an ordinary day feel different.

I admire your little reactions.
The way you laugh.
The way you care about people even when you're tired.
The things you do without realizing how beautiful they are.

And I like the fact that somewhere along the way,
you stopped being just someone I knew...

and became someone I started imagining my life around.`
  },


  {
    title: "If You Ever Forget",

    date: "KEEP THIS ONE",

    text: `If you ever have one of those days where you feel like you're not doing enough...

come back here.

You don't have to be perfect for me.
You don't have to have everything figured out.
You don't have to carry everything alone.

I don't need you to make everything easy.

I just need you to be you.`
  },


  {
    title: "The Little Things",

    date: "MY FAVORITE CATEGORY",

    text: `It's not only the big moments.

It's the random conversations.
The stupid jokes.
The way we can talk about absolutely nothing.
The small things you probably don't even remember.

Those are the things I want more of.

A life made out of little moments with you.`
  }

];


/* =====================================================
   CALENDAR
===================================================== */

const events = [

  {
    date: "THEN",

    title: "The beginning",

    text:
      "The part of our story where neither of us knew how much was coming."
  },

  {
    date: "SINCE THEN",

    title: "A lot of little memories",

    text:
      "More conversations, more places, more pictures, more reasons to keep choosing each other."
  },

  {
    date: "NEXT",

    title: "Something we haven't lived yet",

    text:
      "The best part of a story is sometimes the page you haven't reached."
  }

];


/* =====================================================
   PLACES
===================================================== */

const places = [

  {
    icon: "☕",

    name: "That little place we went to",

    text:
      "Some places become special because of what happened there. Not because of the place itself."
  },

  {
    icon: "📍",

    name: "One of our days",

    text:
      "I don't need a perfect destination. I just need another day where you're there."
  },

  {
    icon: "♡",

    name: "Wherever we go next",

    text:
      "This one doesn't have a name yet. Maybe that's the point."
  }

];


/* =====================================================
   LOCK SCREEN
===================================================== */

function showLock() {

  currentPage = "lock";
  pageHistory = [];

  screen.innerHTML = `

    <div class="lock-screen">

      <div class="lock-time">
        10:47
      </div>

      <div class="lock-date">
        Friday, August 28
      </div>

      <div class="lock-bottom">

        <div>🔒</div>

        <div class="unlock">
          Tap anywhere to unlock
        </div>

      </div>

    </div>

  `;

  screen.onclick = unlockPhone;
}


/* =====================================================
   UNLOCK
===================================================== */

function unlockPhone() {

  screen.onclick = null;

  showHome();

  setTimeout(() => {

    showNotification();

  }, 3500);

}


/* =====================================================
   HOME
===================================================== */

function showHome() {

  currentPage = "home";

  screen.innerHTML = `

    <div class="home">

      <div class="home-time">
        10:47 PM
      </div>

      <div class="home-title">
        Memories
      </div>

      <div class="app-grid">

        ${createApp("💬", "Messages", "messages")}

        ${createApp("▣", "Gallery", "gallery")}

        ${createApp("📝", "Notes", "notes")}

        ${createApp("◷", "Calendar", "calendar")}

        ${createApp("📍", "Places", "places")}

        ${createApp("♫", "Music", "music")}

        ${createApp("♡", "Memory", "memory")}

        ${createApp("⚙", "Settings", "settings")}

      </div>

    </div>

  `;

  screen.onclick = null;
}


function createApp(icon, name, page) {

  return `

    <div
      class="app"
      onclick="openPage('${page}')"
    >

      <div class="app-icon">
        ${icon}
      </div>

      <div class="app-name">
        ${name}
      </div>

    </div>

  `;
}


/* =====================================================
   NOTIFICATION
===================================================== */

function showNotification() {

  if (currentPage !== "home") {
    return;
  }

  const notification = document.createElement("div");

  notification.className = "notification";

  notification.innerHTML = `

    <div class="notification-source">
      SYSTEM
    </div>

    <div class="notification-title">
      I need you to do something.
    </div>

    <div class="notification-body">
      Tap to open.
    </div>

  `;

  screen.appendChild(notification);

  notification.onclick = function () {

    notification.remove();

    openPage("messages");

  };

}


/* =====================================================
   OPEN PAGE
   التعديل هنا: بنسجل الصفحة الحالية قبل الانتقال
===================================================== */

function openPage(page) {

  if (currentPage !== page) {
    pageHistory.push(currentPage);
  }

  currentPage = page;

  switch (page) {

    case "messages":
      showMessages();
      break;

    case "gallery":
      showGallery();
      break;

    case "notes":
      showNotes();
      break;

    case "calendar":
      showCalendar();
      break;

    case "places":
      showPlaces();
      break;

    case "music":
      showMusic();
      break;

    case "memory":
      showMemory();
      break;

    case "settings":
      showSettings();
      break;

    case "final":
      showFinal();
      break;

    case "photo":
      showCurrentPhoto();
      break;

    case "note":
      showCurrentNote();
      break;

    default:
      showHome();

  }

}


/* =====================================================
   TOP BAR
===================================================== */

function topbar(title) {

  return `

    <div class="topbar">

      <div
        class="back"
        onclick="goBack()"
      >
        ‹
      </div>

      <div class="topbar-title">
        ${title}
      </div>

    </div>

  `;

}


/* =====================================================
   BACK
   يرجع خطوة واحدة فقط
===================================================== */

function goBack() {

  if (pageHistory.length === 0) {

    currentPage = "home";
    showHome();

    return;
  }

  const previousPage = pageHistory.pop();

  currentPage = previousPage;

  switch (previousPage) {

    case "messages":
      showMessages();
      break;

    case "gallery":
      showGallery();
      break;

    case "notes":
      showNotes();
      break;

    case "calendar":
      showCalendar();
      break;

    case "places":
      showPlaces();
      break;

    case "music":
      showMusic();
      break;

    case "memory":
      showMemory();
      break;

    case "settings":
      showSettings();
      break;

    case "final":
      showFinal();
      break;

    case "photo":
      showCurrentPhoto();
      break;

    case "note":
      showCurrentNote();
      break;

    case "home":
    default:
      showHome();

  }

}


/* =====================================================
   MESSAGES
===================================================== */

function showMessages() {

  screen.innerHTML = `

    ${topbar("Messages")}

    <div class="messages">

      <div class="chat-header">

        <div class="chat-avatar">
          ?
        </div>

        <div class="chat-name">
          UNKNOWN
        </div>

        <div class="chat-status">
          maybe you'll understand
        </div>

      </div>


      <div class="bubble">
        You're going to notice things that don't make sense.
      </div>

      <div class="bubble">
        That's okay.
      </div>

      <div class="bubble">
        I'm not here to scare you.
      </div>

      <div class="bubble">
        I'm here because there are some things I don't want you to forget.
      </div>

      <div class="bubble">
        Start with the Gallery.
      </div>


      <div
        class="action"
        onclick="openPage('gallery')"
      >
        Open Gallery →
      </div>

    </div>

  `;

}


/* =====================================================
   GALLERY
===================================================== */

function showGallery() {

  screen.innerHTML = `

    ${topbar("Gallery")}

    <div class="gallery">

      <div class="gallery-intro">
        Six pictures.<br>
        Six little pieces of something bigger.
      </div>

      <div class="photo-grid">

        ${memories.map((memory, index) => {

          return `

            <div
              class="photo-card"
              onclick="openPhoto(${index})"
            >

              <img
                src="${memory.image}"
                alt="Memory ${index + 1}"
                onerror="imageError(this)"
              >

              <div class="photo-overlay">
                MEMORY ${String(index + 1).padStart(2, "0")}
              </div>

            </div>

          `;

        }).join("")}

      </div>

    </div>

  `;

}


function imageError(image) {

  image.style.display = "none";

}


/* =====================================================
   PHOTO DETAIL
===================================================== */

function openPhoto(index) {

  currentPhotoIndex = index;

  pageHistory.push(currentPage);

  currentPage = "photo";

  showCurrentPhoto();

  if (index === 5) {

    setTimeout(() => {

      showToast("Good. Now open Notes.");

    }, 900);

  }

}


function showCurrentPhoto() {

  const memory = memories[currentPhotoIndex];

  screen.innerHTML = `

    ${topbar("Memory " + String(currentPhotoIndex + 1).padStart(2, "0"))}

    <div class="photo-detail">

      <img
        src="${memory.image}"
        alt="Memory"
      >

      <div class="photo-caption">
        ${memory.caption}
      </div>

    </div>

  `;

}


/* =====================================================
   NOTES
===================================================== */

function showNotes() {

  screen.innerHTML = `

    ${topbar("Notes")}

    <div class="notes">

      ${notes.map((note, index) => {

        return `

          <div
            class="note-card"
            onclick="openNote(${index})"
          >

            <div class="note-date">
              ${note.date}
            </div>

            <div class="note-title">
              ${note.title}
            </div>

            <div class="note-preview">
              ${note.text.substring(0, 105)}...
            </div>

          </div>

        `;

      }).join("")}

    </div>

  `;

}


/* =====================================================
   NOTE DETAIL
===================================================== */

function openNote(index) {

  currentNoteIndex = index;

  pageHistory.push(currentPage);

  currentPage = "note";

  showCurrentNote();

}


function showCurrentNote() {

  const note = notes[currentNoteIndex];

  screen.innerHTML = `

    ${topbar("Notes")}

    <div class="note-detail">

      <h1>
        ${note.title}
      </h1>

      <p>
        ${note.text}
      </p>

    </div>

  `;

}


/* =====================================================
   CALENDAR
===================================================== */

function showCalendar() {

  screen.innerHTML = `

    ${topbar("Calendar")}

    <div class="calendar">

      <div class="calendar-title">
        Our Timeline
      </div>

      ${events.map(event => {

        return `

          <div class="event">

            <div class="event-date">
              ${event.date}
            </div>

            <div class="event-title">
              ${event.title}
            </div>

            <div class="event-text">
              ${event.text}
            </div>

          </div>

        `;

      }).join("")}

    </div>

  `;

}


/* =====================================================
   PLACES
===================================================== */

function showPlaces() {

  screen.innerHTML = `

    ${topbar("Places")}

    <div class="places">

      <div class="gallery-intro">

        Not every place needs to be important.<br>

        Sometimes the person you're with is enough.

      </div>


      ${places.map(place => {

        return `

          <div class="place">

            <div class="place-icon">
              ${place.icon}
            </div>

            <div class="place-name">
              ${place.name}
            </div>

            <div class="place-text">
              ${place.text}
            </div>

          </div>

        `;

      }).join("")}

    </div>

  `;

}


/* =====================================================
   MUSIC
===================================================== */

function showMusic() {

  screen.innerHTML = `

    ${topbar("Music")}

    <div class="music">

      <div class="album">
        ♡
      </div>

      <div class="song-title">
        Our Song
      </div>

      <div class="song-subtitle">
        For the moments words can't explain.
      </div>

      <button
        class="play-button"
        onclick="toggleMusic()"
      >
        ▶
      </button>

    </div>

  `;

}


function toggleMusic() {

  if (music.paused) {

    music.play()
      .then(() => {

        showToast("Playing something that reminds me of you.");

      })
      .catch(() => {

        showToast("Tap the button again to play the song.");

      });

  } else {

    music.pause();

    showToast("Paused.");

  }

}


/* =====================================================
   MEMORY
===================================================== */

function showMemory() {

  screen.innerHTML = `

    ${topbar("Memory")}

    <div class="memory">

      <div class="memory-intro">
        You weren't really looking through a phone.
      </div>


      <div class="memory-card">

        <div class="memory-number">
          01
        </div>

        <div class="memory-text">
          You were looking at moments.
        </div>

      </div>


      <div class="memory-card">

        <div class="memory-number">
          02
        </div>

        <div class="memory-text">
          The ordinary ones.
        </div>

      </div>


      <div class="memory-card">

        <div class="memory-number">
          03
        </div>

        <div class="memory-text">
          The beautiful ones.
        </div>

      </div>


      <div class="memory-card">

        <div class="memory-number">
          04
        </div>

        <div class="memory-text">
          The ones we almost forgot.
        </div>

      </div>


      <div class="memory-card">

        <div class="memory-number">
          05
        </div>

        <div class="memory-text">
          And the ones we haven't made yet.
        </div>

      </div>


      <div
        class="action"
        onclick="openPage('final')"
      >
        One last thing →
      </div>

    </div>

  `;

}


/* =====================================================
   SETTINGS
===================================================== */

function showSettings() {

  screen.innerHTML = `

    ${topbar("Settings")}

    <div class="places">

      <div class="place">

        <div class="place-icon">
          ◉
        </div>

        <div class="place-name">
          About this phone
        </div>

        <div class="place-text">
          Some phones store photos.
          This one stores memories.
        </div>

      </div>


      <div class="place">

        <div class="place-icon">
          ♡
        </div>

        <div class="place-name">
          Owner
        </div>

        <div class="place-text">
          Someone who has way too many reasons to choose you.
        </div>

      </div>

    </div>

  `;

}


/* =====================================================
   FINAL
===================================================== */

function showFinal() {

  screen.innerHTML = `

    <div class="final">

      <img
        class="final-image"
        src="photo6.jpg"
        alt="Memory"
      >


      <h1>
        You thought you were exploring a phone.
      </h1>


      <p>
        But every picture,
        every note,
        every place,
        and every little thing you found here
        was really just another way of saying the same thing.
      </p>


      <p style="margin-top:18px;">

        I don't want our story to be made only of big moments.

        I want the ordinary days too.

        The random conversations.

        The stupid jokes.

        The quiet nights.

        Everything.

      </p>


      <div class="final-sign">

        Because my favorite memories
        are the ones that have you in them.

      </div>

    </div>

  `;

}


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

  const oldToast = document.querySelector(".toast");

  if (oldToast) {
    oldToast.remove();
  }

  const toast = document.createElement("div");

  toast.className = "toast";

  toast.textContent = message;

  screen.appendChild(toast);

  setTimeout(() => {

    if (toast.parentNode) {
      toast.remove();
    }

  }, 3000);

}


/* =====================================================
   START
===================================================== */

showLock();