//Audio on main page & reveal
window.addEventListener("DOMContentLoaded", () => {
  const dragme = document.getElementById("dragme");
  const container = document.getElementById("container");
  const mainAudio = document.getElementById("mainAudio");
  const revealAudio = document.getElementById("revealAudio");

  const containerWidth = container.offsetWidth;
  const threshold = containerWidth * 0.6;

  mainAudio.volume = 0.4;
  revealAudio.volume = 0.6;

  // Wait for first user interaction to play audio
  const enableAudio = () => {
    mainAudio.play().catch((e) => {
      console.log("Autoplay failed:", e);
    });
    window.removeEventListener("click", enableAudio);
    window.removeEventListener("touchstart", enableAudio);
  };

  window.addEventListener("click", enableAudio);
  window.addEventListener("touchstart", enableAudio);

  // Make dragme draggable within the container
  gsap.registerPlugin(Draggable);

  Draggable.create(dragme, {
    type: "x",
    bounds: container,
    onDrag: function () {
      const currentX = this.x;

      if (currentX >= threshold) {
        // Pause mainAudio if playing
        if (!mainAudio.paused) {
          mainAudio.pause();
          mainAudio.currentTime = 0;
        }
        // Play revealAudio
        if (revealAudio.paused) {
          revealAudio.play().catch((e) => {
            console.warn("Reveal audio play failed:", e);
          });
        }
      } else {
        // Pause revealAudio
        if (!revealAudio.paused) {
          revealAudio.pause();
          revealAudio.currentTime = 0;
        }
        // Resume mainAudio if paused
        if (mainAudio.paused) {
          mainAudio.play().catch((e) => {
            console.warn("Main audio resume failed:", e);
          });
        }
      }
    }
  });
});

// Loader and enter button logic
document.addEventListener("DOMContentLoaded", () => {
  const enterBtn = document.getElementById("enterBtn");
  const loader = document.getElementById("loader");
  const mainAudio = document.getElementById("mainAudio");
  const revealAudio = document.getElementById("revealAudio");

  enterBtn.addEventListener("click", () => {
    loader.style.opacity = 0;
    loader.style.pointerEvents = "none";

    // Pause revealAudio if playing
    if (!revealAudio.paused) {
      revealAudio.pause();
      revealAudio.currentTime = 0;
    }

    // Play mainAudio
    mainAudio.play().catch(err => console.warn("Main audio play failed", err));
  });
});


// Button animation after Gooey Text
document.addEventListener("DOMContentLoaded", () => {
  const enterBtn = document.getElementById("enterBtn");
  const loader = document.getElementById("loader");


  enterBtn.addEventListener("click", () => {
      loader.classList.add("fade-out");
      setTimeout(() => {
          document.getElementById("main-content").classList.add("show");
      }, 1000);  // Wait for the loader fade-out before showing content
  });
});


// Gooey Text Loading Page
const texts = ["Luxury", "awaits", "at", "Azure Isles"];
const morphTime = 1;
const cooldownTime = 0.9;

const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const endImage = document.getElementById("endImage");

let textIndex = 0;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

function setMorph(fraction) {
  text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
}

function doCooldown() {
  morph = 0;
  text2.style.filter = "";
  text2.style.opacity = "100%";

  text1.style.filter = "";
  text1.style.opacity = "0%";
}

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }

  setMorph(fraction);
}

function animate() {
  if (textIndex >= texts.length - 1) return;

  requestAnimationFrame(animate);

  let newTime = new Date();
  let dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
    if (cooldown + dt > 0) {
      textIndex++;
      text1.textContent = texts[textIndex];
      text2.textContent = texts[textIndex + 1];
    }

    doMorph();
  } else {
    doCooldown();
  }
}

// Initial setup
text1.textContent = "";
text2.textContent = texts[0];
animate();

// Handle fade transition and show main content
const totalCycleTime = (morphTime + cooldownTime) * (texts.length - 1) * 1000;
setTimeout(() => {
  const enterBtn = document.getElementById("enterBtn");
  enterBtn.classList.remove("hidden");
  enterBtn.classList.add("show");

  // Optional: add fade-in effect
  enterBtn.style.transition = "opacity 0.8s ease";
}, totalCycleTime);
document.getElementById("enterBtn").addEventListener("click", () => {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");

  loader.classList.add("fade-out");

  loader.addEventListener("transitionend", () => {
    loader.style.display = "none";
    mainContent.style.display = "block";
    requestAnimationFrame(() => {
      mainContent.classList.add("show");
    });
  });
});


 // Banner for sponsors
 document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("banner");
  const closeButton = document.getElementById("close-banner");
  const globalKey = "banner-shown";
});


//Slide to Reveal Button (for background change)
var myDraggable = Draggable.create("#dragme",{
    type: 'x',
    bounds: "#container",
});

function checkOverlap() {
    var div1 = document.querySelector(".end");
    var div2 = document.getElementById('dragme');
    var rect1 = div1.getBoundingClientRect();
    var rect2 = div2.getBoundingClientRect();

    if (
      rect1.left < rect2.right
    ) {
    document.querySelector("#video1").style.opacity= 0;
    document.querySelector("i").style.opacity= 0;
    // document.querySelector(".on-cir").style.backgroundColor= "#fff";
    console.log('Divs are overlapping!');
    }
    else{
        document.querySelector("#video1").style.opacity= 1;
        document.querySelector("i").style.opacity= 1;
        // document.querySelector(".on-cir").style.backgroundColor= "orange";
    }
  }
window.addEventListener('mousemove', checkOverlap);

//Drag function on smaller screens
function setupDrag() {
  // Remove any previous draggable instances
  if (Draggable.get("#dragme")) {
    Draggable.get("#dragme").kill();
  }

  // Create new draggable with bounds based on screen size
  Draggable.create("#dragme", {
    type: 'x',
    bounds: "#container",
    inertia: true, // smoother movement
    edgeResistance: 0.65,
  });
}

function checkOverlap() {
  const end = document.querySelector(".end");
  const dragme = document.getElementById('dragme');
  const rect1 = end.getBoundingClientRect();
  const rect2 = dragme.getBoundingClientRect();

  const isOverlapping = rect1.left < rect2.right;

  document.querySelector("#video1").style.opacity = isOverlapping ? 0 : 1;
  document.querySelector("i").style.opacity = isOverlapping ? 0 : 1;

  if (isOverlapping && !textChanged) {
    updateText(newTitle);
    textChanged = true;
  }
  if (!isOverlapping && textChanged) {
    updateText(originalTitle);
    textChanged = false;
  }
}

// Listen to both mouse and touch events
window.addEventListener('mousemove', checkOverlap);
window.addEventListener('touchmove', checkOverlap);


//Text Revealed when slide is activated
const originalTitle = {
  minititle: "Catch the breeze this year at",
  main: "Azure Isles <br/> Charter Yacht Show",
  undertitle: ""
};

const newTitle = {
  minititle: "Relish in luxury at",
  main: "Parker Dockyard <br/> on 23rd November, 2025",
  undertitle:""
};

let textChanged = false;

function updateText(titleObj) {
  const minititleEl = document.getElementById("minititle");
  const mainTitleEl = document.querySelector(".animated-text-container h1");
  const undertitleEl = document.getElementById("undertitle");

  minititleEl.innerHTML = titleObj.minititle;
  mainTitleEl.innerHTML = titleObj.main;
  undertitleEl.innerHTML = titleObj.undertitle;

}

function checkOverlap() {
  const end = document.querySelector(".end");
  const dragme = document.getElementById('dragme');
  const rect1 = end.getBoundingClientRect();
  const rect2 = dragme.getBoundingClientRect();

  const isOverlapping = rect1.left < rect2.right;

  // Video and button style change
  document.querySelector("#video1").style.opacity = isOverlapping ? 0 : 1;
  document.querySelector("i").style.opacity = isOverlapping ? 0 : 1;
  // document.querySelector(".on-cir").style.backgroundColor = isOverlapping ? "#fff" : "orange";

  // Switch text when sliding over
  if (isOverlapping && !textChanged) {
    updateText(newTitle);
    textChanged = true;
  }

  // Revert text when sliding back
  if (!isOverlapping && textChanged) {
    updateText(originalTitle);
    textChanged = false;
  }
}

window.addEventListener('mousemove', checkOverlap);
