function updateTimestamp() {
  const timestampElement = document.getElementById("timestamp");
  timestampElement.textContent = `new Date('${new Date().toISOString()}')`;
}

function animateCounter(elementId, target, duration = 2000) {
  const element = document.getElementById(elementId);
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

setTimeout(() => {
  animateCounter("counter1", 1337);
  animateCounter("counter2", 42);
  animateCounter("counter3", 9);
}, 1000);

function createMatrixEffect() {
  const matrixBg = document.getElementById("matrix-bg");
  const chars =
    "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

  for (let i = 0; i < 50; i++) {
    const char = document.createElement("div");
    char.className = "matrix-char";
    char.textContent = chars[Math.floor(Math.random() * chars.length)];
    char.style.left = Math.random() * 100 + "%";
    char.style.animationDelay = Math.random() * 10 + "s";
    char.style.animationDuration = Math.random() * 10 + 5 + "s";
    matrixBg.appendChild(char);
  }
}

function createParticles() {
  const container = document.getElementById("particles-container");

  setInterval(() => {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.width = particle.style.height = Math.random() * 4 + 2 + "px";
    particle.style.animationDuration = Math.random() * 3 + 2 + "s";
    container.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 5000);
  }, 300);
}

document.addEventListener("DOMContentLoaded", function () {
  const robot = document.getElementById("robot");
  robot?.addEventListener("click", function () {
    this.classList.add("animate-glitch");
    setTimeout(() => {
      this.classList.remove("animate-glitch");
    }, 1000);
  });

  createMatrixEffect();
  createParticles();

  setInterval(updateTimestamp, 1000);
  updateTimestamp();

  const typingText = document.getElementById("typing-text");
  const text = "Oops! Esta página se perdió en el código...";
  typingText.textContent = "";

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      typingText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      typingText.classList.remove("typing-animation");
    }
  };

  setTimeout(typeWriter, 1000);
});

let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener("keydown", function (e) {
  konamiCode.push(e.keyCode);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    document.body.style.filter = "hue-rotate(180deg)";
    setTimeout(() => {
      document.body.style.filter = "none";
    }, 15000);
    konamiCode = [];
  }
});
