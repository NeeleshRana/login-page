// Bubble burst on hover
document.querySelectorAll(".circles li").forEach((bubble) => {
  bubble.addEventListener("mouseover", () => {
    bubble.style.transform = "scale(0)";
    bubble.style.opacity = "0";
    setTimeout(() => bubble.remove(), 300);
  });
});

// Sparkle trail effect
const canvas = document.getElementById("sparkleCanvas");
const ctx = canvas.getContext("2d");

let sparkles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createSparkle(x, y) {
  for (let i = 0; i < 3; i++) {
    sparkles.push({
      x,
      y,
      radius: Math.random() * 2 + 1,
      alpha: 1,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
    });
  }
}

function animateSparkles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sparkles.forEach((sparkle, index) => {
    ctx.beginPath();
    ctx.arc(sparkle.x, sparkle.y, sparkle.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${sparkle.alpha})`;
    ctx.fill();

    sparkle.x += sparkle.dx;
    sparkle.y += sparkle.dy;
    sparkle.alpha -= 0.02;

    if (sparkle.alpha <= 0) {
      sparkles.splice(index, 1);
    }
  });

  requestAnimationFrame(animateSparkles);
}
animateSparkles();

window.addEventListener("mousemove", (e) => {
  createSparkle(e.clientX, e.clientY);
});

window.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  if (touch) createSparkle(touch.clientX, touch.clientY);
});

// Login validation
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  errorMsg.textContent = "";

  if (!username || !password) {
    errorMsg.textContent = "Please enter both username and password.";
    return;
  }

  if (username === "admin" && password === "admin123") {
    errorMsg.style.color = "#00ff99";
    errorMsg.textContent = "Login successful!";
    setTimeout(() => {
      window.location.href = "dashboard.html"; // or your actual page
    }, 1000);
  } else {
    errorMsg.textContent = "Incorrect username or password.";
  }
});
