let game=document.getElementById('game')

//shooter
let shooter=document.getElementById('shooter')
shooter.style.left='45%'
let shooterLeft=45
let shooterTop=83

let bulletCount = 0;
let score = 0;

// Arrow key movement
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 37) {
    shooterLeft--;
    shooter.style.left = shooterLeft + "%";
  } else if (event.keyCode === 39) {
    shooterLeft++;
    shooter.style.left = shooterLeft + "%";
  } else if (event.keyCode === 38) {
    // Left bullet
    let bullet = document.createElement('img');
    bullet.setAttribute('src', '/images/air/bullet.png');
    bullet.style.width = '50px';
    bullet.style.position = 'absolute';
    bullet.style.top = shooterTop - 7 + "%";
    bullet.style.left = shooterLeft + 3 + "%";
    bullet.id = "bullet_" + bulletCount++;
    game.appendChild(bullet);

    $("#" + bullet.id).animate({ top: '0%' }, 1000, "linear", () => {
      if (bullet.parentNode) game.removeChild(bullet);
    });

    // Right bullet
    let bullet2 = document.createElement('img');
    bullet2.setAttribute('src', '/images/air/bullet.png');
    bullet2.style.width = '50px';
    bullet2.style.position = 'absolute';
    bullet2.style.top = shooterTop - 7 + "%";
    bullet2.style.left = shooterLeft + 5 + "%";
    bullet2.id = "bullet_" + bulletCount++;
    game.appendChild(bullet2);

    $("#" + bullet2.id).animate({ top: '0%' }, 1000, "linear", () => {
      if (bullet2.parentNode) game.removeChild(bullet2);
    });
  }
});

// Enemy generator every 1 second
let enemytimer = setInterval(enemyGenerator, 1000);

function enemyGenerator() {
  let enemy = document.createElement('img');
  enemy.setAttribute('src', '/images/air/img.png');
  enemy.style.width = '60px';
  enemy.style.position = 'absolute';
  enemy.style.top = '0%';
  enemy.style.left = Math.random() * 90 + "%";
  enemy.id = "enemy_" + Date.now();
  game.appendChild(enemy);

  $("#" + enemy.id).animate({ top: '100%' }, 6000, "linear", () => {
    if (enemy.parentNode) game.removeChild(enemy);
  });
}

// Collision check
function checkCollisions() {
  let bullets = document.querySelectorAll("[id^='bullet_']");
  let enemies = document.querySelectorAll("[id^='enemy_']");

  bullets.forEach(bullet => {
    let bRect = bullet.getBoundingClientRect();

    enemies.forEach(enemy => {
      let eRect = enemy.getBoundingClientRect();

      if (
        bRect.left < eRect.right &&
        bRect.right > eRect.left &&
        bRect.top < eRect.bottom &&
        bRect.bottom > eRect.top
      ) {
        // Remove both on collision
        if (bullet.parentNode) bullet.remove();
        if (enemy.parentNode) enemy.remove();

        // Update score
        score++;
        console.log("Score:", score);
      }
    });
  });
}

// Check collisions every 50ms
setInterval(checkCollisions, 50);


// Collision check
function checkCollisions() {
  let bullets = document.querySelectorAll("[id^='bullet_']");
  let enemies = document.querySelectorAll("[id^='enemy_']");
  let shooterRect = shooter.getBoundingClientRect();

  // Bullet vs Enemy collision
  bullets.forEach(bullet => {
    let bRect = bullet.getBoundingClientRect();

    enemies.forEach(enemy => {
      let eRect = enemy.getBoundingClientRect();

      if (
        bRect.left < eRect.right &&
        bRect.right > eRect.left &&
        bRect.top < eRect.bottom &&
        bRect.bottom > eRect.top
      ) {
        if (bullet.parentNode) bullet.remove();
        if (enemy.parentNode) enemy.remove();
        score++;
        console.log("Score:", score);
      }
    });
  });

  // Enemy vs Shooter collision (Game Over)
  enemies.forEach(enemy => {
    let eRect = enemy.getBoundingClientRect();

    if (
      shooterRect.left < eRect.right &&
      shooterRect.right > eRect.left &&
      shooterRect.top < eRect.bottom &&
      shooterRect.bottom > eRect.top
    ) {
      gameOver();
    }
  });
}

// Game Over function
function gameOver() {
  clearInterval(enemytimer); // stop spawning enemies
  alert("💥 Game Over! Final Score: " + score);
  location.reload(); // reload game
}