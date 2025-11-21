let game = document.getElementById('game')

//shooter
let shooter = document.getElementById('shooter')
shooter.style.left = '45%'
let shooterLeft = 45
let shooterTop = 83

let switchGun = false;

let bulletCount = 0;
let score = 0;

//enemy
let enemyCount = 0

//key mapping
let keyPressed = {}

// Arrow key movement
document.addEventListener("keydown", function (event) {
  keyPressed[event.key] = true
  if (keyPressed["ArrowLeft"] && parseInt(shooter.style.left.slice(0, -1)) >= 0) {
    moveLeft()
    if (keyPressed["ArrowUp"] && switchGun) {
      bullet2()
    }
    else if (keyPressed["ArrowUp"]) {
      bullet()
    }
  } else if (keyPressed["ArrowRight"] && parseInt(shooter.style.left.slice(0, -1)) <= 85) {
    moveRight()
    if (keyPressed["ArrowUp"] && switchGun) {
      bullet2()
    }
    else if (keyPressed["ArrowUp"]) {
      bullet()
    }
  }
  if (event.key === "Shift") {
    switchGun = !(switchGun)
  }
  if (keyPressed["ArrowUp"] && switchGun) {
    bullet2()
  }
  else if (keyPressed["ArrowUp"]) {
    bullet()
  }
});

document.addEventListener("keyup", function (event) {
  delete keyPressed[event.key]
})

function moveLeft() {
  shooterLeft--;
  shooter.style.left = shooterLeft + "%";
}

function moveRight() {
  shooterLeft++;
  shooter.style.left = shooterLeft + "%";
}

function bullet() {
  // Left bullet
  let bullet = document.createElement('img');
  bullet.setAttribute('src', '/images/air/bullet.png');
  bullet.style.width = '50px';
  bullet.style.position = 'absolute';
  bullet.style.top = shooterTop - 7 + "%";
  bullet.style.left = shooterLeft + 5 + "%";
  bullet.id = "bullet_" + bulletCount++;
  game.appendChild(bullet);

  $("#" + bullet.id).animate({ top: '0%' }, 1000, "linear", () => {
    if (bullet.parentNode) game.removeChild(bullet);
  });
}

function bullet2() {
  // Left bullet
  let bullet = document.createElement('img');
  bullet.setAttribute('src', '/images/air/bullet.png');
  bullet.style.width = '50px';
  bullet.style.position = 'absolute';
  bullet.style.top = shooterTop - 7 + "%";
  bullet.style.left = shooterLeft + 1 + "%";
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
  bullet2.style.left = shooterLeft + 9 + "%";
  bullet2.id = "bullet_" + bulletCount++;
  game.appendChild(bullet2);

  $("#" + bullet2.id).animate({ top: '0%' }, 1000, "linear", () => {
    if (bullet2.parentNode) game.removeChild(bullet2);
  });
}



//obstacle creation
function enemyPlane() {
  let enemyPlane = document.createElement("img");
  enemyPlane.setAttribute('src', '/images/air/img.png');
  enemyPlane.style.width = '50px'
  enemyPlane.style.position = 'absolute'
  enemyPlane.style.top = '0%'
  enemyPlane.style.left = Math.floor(Math.random() * 90) + "%"
  // enemyPlane.style.left = '0%'
  enemyPlane.id = "enemy__" + enemyCount++;
  game.appendChild(enemyPlane)

  // enemies.push(enemyPlane)
  // console.log(enemies.length)
  obstacleDetection()

  $("#" + enemyPlane.id).animate({ top: '100%' }, 5000, "swing", () => {
    if (enemyPlane.parentNode) game.removeChild(enemyPlane);
  });

}

let enemyGenerator = setInterval(enemyPlane, 1000)

//obstacle detection
function obstacleDetection() {
  let enemies = Array.from(document.querySelectorAll('[id^="enemy__"]'))
  enemies.forEach((enemy)=>{
    let enemyRect = enemy.getBoundingClientRect()
    let bullets = Array.from(document.querySelectorAll('[id^="bullet_"]'))
    bullets.forEach((bullett)=>{
      let bulletRect = bullett.getBoundingClientRect()
      if(bulletRect.x == enemyRect.x){
        enemy.parentNode.removeChild(enemy)
      }
    })
  })
}

