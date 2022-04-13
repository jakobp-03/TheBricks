var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
var WIDTH;
var HEIGHT;
var r = 10;
var ctx;
var spc=1;
var paddlex;
var paddleh;
var paddlew;
var rightDown = false;
var leftDown = false;
var pDown = false;
var canvasMinX;
var canvasMaxX;
var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;
var tocke;
var sekunde;
var sekundeI;
var minuteI;
var intTimer;
var izpisTimer;
var start = true;
var temp;
var gover = true;
var mousemov=false;
var timerTemp = 1;
var gameWin=false;
var isClicked = false;
//make color array
var colors = [
  "#804000",
  "#cc6600",
  "#ff8c1a"];
var snd = new Audio("audio/Break.wav"); 
var snd2 = new Audio("audio/Impact.wav");
var snd3= new Audio("audio/Win.mp3");
var snd4= new Audio("audio/GameOver.mp3");
var snd5=new Audio("audio/thunk2.mp3");
var brick = new Image();
brick.src = "img/brick.png";
var img = document.getElementById("brick");

function onLoad() {
  //write Start on canvas 
  ctx = document.getElementById("canvas").getContext("2d");
  ctx.font = "70px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Press Start", 110,300);
  ctx.fillText("To Play!", 170,400);
}
function mouse() {
  if(isClicked==false){
  isClicked=true;
    document.getElementById("mouse").style.backgroundColor = "lightgreen";
  }else{
    isClicked=false;
    document.getElementById("mouse").style.backgroundColor = "";}
}
function drawIt() {
  document.getElementById("mouse").style.display = "";
  mousemov=false;
  if (start) {
    document.getElementById("start").innerHTML = "Restart";
    document.getElementById("start").style.width ="110px"
    document.getElementById("start").style.fontSize ="30px"
  } else {
    document.getElementById("start").innerHTML = "Start";
    document.getElementById("start").style.width ="220px"
  } 
  
  //timer
  function timer() {
    sekundeI = (sekundeI = sekunde % 60) > 9 ? sekundeI : "0" + sekundeI;
    minuteI =
      (minuteI = Math.floor(sekunde / 60)) > 9 ? minuteI : "0" + minuteI;
    izpisTimer = minuteI + ":" + sekundeI;

    $("#cas").html(izpisTimer);

    if (start == true && gover == true) {
      sekunde++;
      //console.log("start true" + sekunde);
      sekundeI = (sekundeI = sekunde % 60) > 9 ? sekundeI : "0" + sekundeI;
      minuteI =
        (minuteI = Math.floor(sekunde / 60)) > 9 ? minuteI : "0" + minuteI;
      izpisTimer = minuteI + ":" + sekundeI;

      $("#cas").html(izpisTimer);
    } else {
      //console.log("start false" + sekunde);
      //sekunde=0;
      //izpisTimer = "00:00";
      $("#cas").html(izpisTimer);
    }
  }
  function init_mouse() {
    //canvasMinX = $("#canvas").offset().left;
    canvasMinX = $("canvas").offset().left;
    canvasMaxX = canvasMinX + WIDTH;
  }

  function onKeyDown(evt) {
    if (evt.keyCode == 39 || evt.keyCode == 68) rightDown = true;
    else if (evt.keyCode == 37 || evt.keyCode == 65) leftDown = true;
  }

  function onKeyUp(evt) {
    if (evt.keyCode == 39 || evt.keyCode == 68) rightDown = false;
    else if (evt.keyCode == 37 || evt.keyCode == 65) leftDown = false;
  }
  function onKeyPress(evt) {
    if (evt.keyCode == 80) pDown = true;
    console.log(pDown);
  }
  $(document).keypress(onKeyPress);
  $(document).keydown(onKeyDown);
  $(document).keyup(onKeyUp);

  function onMouseMove(evt) {
    if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
      paddlex = evt.pageX - canvasMinX;
    }
  }
  function initbricks() {
    //inicializacija opek - polnjenje v tabelo
    NROWS = 5;
    NCOLS = 5;
    BRICKWIDTH = WIDTH / NCOLS - 1;
    BRICKHEIGHT = 20;
    PADDING = 2;
    bricks = new Array(NROWS);
    for (i = 0; i < NROWS; i++) {
      bricks[i] = new Array(NCOLS);
      for (j = 0; j < NCOLS; j++) {
        bricks[i][j] = 1;
      }
    }
  }

  function init_paddle() {
    paddlex = WIDTH / 2;
    paddleh = 15;
    paddlew = 90;
  }

  function init() {
    sekunde = 0;
    izpisTimer = "00:00";
    intTimer = setInterval(timer, 1000);
    tocke = 0;
    $("#tocke").html(tocke);
    ctx = $("#canvas")[0].getContext("2d");
    WIDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();
    return setInterval(draw, 10);
  }

  function circle(x, y, r) {
    ctx.fillStyle = temp;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }

  function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
  }

  function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }
  //END LIBRARY CODE
  function draw() {
    clear();

    circle(x, y, 12);

    if (rightDown) {
      if (paddlex + paddlew < WIDTH) {
        paddlex += 5;
      } else {
        paddlex = WIDTH - paddlew;
      }
    } else if (leftDown) {
      if (paddlex > 0) {
        paddlex -= 5;
      } else {
        paddlex = 0;
      }
    }

    rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);

    for (i = 0; i < NROWS; i++) {
      

      for (j = 0; j < NCOLS; j++) {
        if (i==0 ||i>0 && j==0 || i>0&& j==4 || i==4&& j>0) ctx.fillStyle = "#804000";
      else if (i == 1&& j>0&&j<4 ||i == 3&& j>0&&j<4 ||j==1&& i
        >1&&i<4|| j==3&& i<4&&i>1) ctx.fillStyle = "#cc6600";
      else if (i ==2&& j==2) ctx.fillStyle = "#ff8c1a";
        if (bricks[i][j] == 1) {
          rect(
            j * (BRICKWIDTH + PADDING) + PADDING,
            i * (BRICKHEIGHT + PADDING) + PADDING,
            BRICKWIDTH,
            BRICKHEIGHT
          );
        }
      }
    }

    rowheight = BRICKHEIGHT + PADDING; //Smo zadeli opeko?
    colwidth = BRICKWIDTH + PADDING;
    row = Math.floor(y / rowheight);
    col = Math.floor(x / colwidth);
    //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
    if (
      y < NROWS * rowheight &&
      row >= 0 &&
      col >= 0 &&
      bricks[row][col] == 1
    ) {
      dy = -dy;
      bricks[row][col] = 0;
      tocke += 1;
      if(tocke>=25){
        gameWin=true;
      }
      $("#tocke").html(tocke);
      snd.play();
      //console.log("hit!");
      temp = colors[Math.floor(Math.random() * colors.length)];
      document.getElementById("info").style.color = temp;
      document.getElementById("tut").style.color = temp;
    }

    if (x + dx > WIDTH - r || x + dx < r) {
      dx = -dx; console.log("wall hit!");snd5.play();
    }
    if (y + dy < r) {
      dy = -dy;
    } else if (y + dy > HEIGHT - r) {
      if (x > paddlex && x < paddlex + paddlew) {
        dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
        dy = -dy;
        //start=true;
        //console.log("bounce!");
        temp = "black";
      document.getElementById("info").style.color = temp;
      document.getElementById("tut").style.color = temp;
        snd2.play();
      } else {
        start = false;
        //clearInterval(IntervalId);
        //console.log("Game Over");
        gover = false;
      }
    }

    x += dx;

    y += dy;
    if(gameWin==true){
      gamewon();
      if(spc==1){
        snd3.play();
        spc++;
      }
    }
    if(start==false){
      gameover();
      $(document).off("keydown");
      $(document).off("keyup");
      $(document).off("keypress");
      $(document).off("mousemove");
      $(document).off("click");
      dx = 0;
      dy = 0;
      if(spc==1){
        snd4.play();
        spc++;
      }
      
    }
      
  }

  function gameover() {
    clear();
    ctx.fillStyle="black";
    ctx.font = "Bold 72px Arial";
    ctx.fillText("Game Over", WIDTH / 2 - 200, HEIGHT / 2);
    ctx.font = "Bold 36px Arial";
    ctx.fillText("Score: " + tocke, WIDTH / 2 - 200, HEIGHT / 2 + 100);
    ctx.fillText("Time: " +izpisTimer, WIDTH / 2 - 200, HEIGHT / 2 + 150);
    start = true;
  }
  function gamewon() {
    clear();
    ctx.fillStyle="black";
    ctx.font = "Bold 72px Arial";
    ctx.fillText("You Won!", WIDTH / 2 - 200, HEIGHT / 2);  
    ctx.font = "Bold 36px Arial";
    ctx.fillText("Score: " + tocke, WIDTH / 2 - 200, HEIGHT / 2 + 100);
    ctx.fillText("Time: " +izpisTimer, WIDTH / 2 - 200, HEIGHT / 2 + 150);
    start = true;
    dx=0;
    dy=0;
    //stop the timer
    clearInterval(intTimer);
    paddlex = -100;
    paddlew = 0;
    paddleh = 0;
  }
  $("#mouse").click(function() {
    if (mousemov == true) {
      //disable mouse movement
      $(document).off("mousemove");
      $(document).off("click");
      mousemov = false; console.log("MouseOFF");
    } else if(mousemov==false){
      mousemov = true; console.log("MouseON");
      $(document).mousemove(onMouseMove);
    }

  });
  $("#start").click(function() {
    location.reload();
  });
  init();
  init_paddle();
  init_mouse();
  initbricks();
}
