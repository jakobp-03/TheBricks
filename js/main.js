    var x = 150;
    var y = 150;
    var dx = 2;
    var dy = 4;
    var WIDTH;
    var HEIGHT;
    var r=10;
    var ctx;
    var paddlex;
    var paddleh;
    var paddlew;
    var rightDown = false;
    var leftDown = false;
    var pDown=false;
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
    var start=true;
    var temp;
    var gover=true;
    var timerTemp=1;
    var img = document.getElementById("brick");
    var pattern = ctx.createPatttern(img, "repeat");
    function drawIt() {

    //timer
    function timer(){
    
    sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
    minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
    izpisTimer = minuteI + ":" + sekundeI;
    
    $("#cas").html(izpisTimer);
    
    
    if(start==true){
      sekunde++;
      console.log("start true" +sekunde);
    sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
    minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
    izpisTimer = minuteI + ":" + sekundeI;
    
    $("#cas").html(izpisTimer);
    }
    else {
      console.log("start false" +sekunde);
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
      if (evt.keyCode == 39 || evt.keyCode == 68 ) 
    rightDown = true;
      else if (evt.keyCode == 37 || evt.keyCode == 65) leftDown = true;
    }
    
    function onKeyUp(evt) {
      if (evt.keyCode == 39 || evt.keyCode == 68) 
    rightDown = false;
      else if (evt.keyCode == 37 || evt.keyCode == 65) leftDown = false;
    }
    function onKeyPress(evt){
      if(evt.keyCode == 80)
      pDown=true;
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
    //$(document).mousemove(onMouseMove); 
    
    function initbricks() { //inicializacija opek - polnjenje v tabelo
      NROWS = 5;
      NCOLS = 5;
      BRICKWIDTH = (WIDTH/NCOLS) - 1;
      BRICKHEIGHT = 20;
      PADDING = 2;
      bricks = new Array(NROWS);
      for (i=0; i < NROWS; i++) {
        bricks[i] = new Array(NCOLS);
        for (j=0; j < NCOLS; j++) {
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
      ctx = $('#canvas')[0].getContext("2d");
      WIDTH = $("#canvas").width();
      HEIGHT = $("#canvas").height();
      return setInterval(draw, 10);
    }
    
    function circle(x,y,r) {
      ctx.fillStyle=temp;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI*2, true);
      ctx.closePath();
      ctx.fill();
    }
    
    function rect(x,y,w,h) {
      ctx.beginPath();
      ctx.rect(x,y,w,h);
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
    
    if(rightDown){
    if((paddlex+paddlew) < WIDTH){
    paddlex += 5;
    }else{
    paddlex = WIDTH-paddlew;
    }
    }
    else if(leftDown){
    if(paddlex>0){
    paddlex -=5;
    }else{
    paddlex=0;
    }
    }
    
    rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
   
    for (i=0; i < NROWS; i++) {
        if(i==0) ctx.fillStyle="red";
        else if(i==1) ctx.fillStyle="green";
        else if(i==2) ctx.fillStyle="blue";
        else if(i==3) ctx.fillStyle="black";
        else if(i==4) ctx.fillStyle="lime";
        
        for (j=0; j < NCOLS; j++) {
          if (bricks[i][j] == 1) {
            rect((j * (BRICKWIDTH + PADDING)) + PADDING, 
                (i * (BRICKHEIGHT + PADDING)) + PADDING,
                BRICKWIDTH, BRICKHEIGHT);
          }
        }
      }
    
      rowheight = BRICKHEIGHT + PADDING; //Smo zadeli opeko?
      colwidth = BRICKWIDTH + PADDING;
      row = Math.floor(y/rowheight);
      col = Math.floor(x/colwidth);
      //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
    if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
    dy = -dy; bricks[row][col] = 0;
    tocke +=1;
    $("#tocke").html(tocke);
    console.log("hit!");
    temp='hsl(' + 360 * Math.random() + ', 50%, 50%)'
    document.getElementById("info").style.color=temp;
    document.getElementById("tut").style.color=temp;
    }
    
    if (x + dx > WIDTH -r|| x + dx < r)
    {
    dx = -dx;
    }
    if (y + dy < r){
    dy = -dy; 
    }
    else if(y+dy >HEIGHT -r) {
      
        if (x > paddlex && x < paddlex + paddlew){
          dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
          dy = -dy;
          //start=true;
          console.log("bounce!");
          }
        else{start=false;
          //clearInterval(intervalId);
          //console.log("Game Over");
          gover=false;
        }
  }
    
    
    
    x += dx;
    
    y += dy;
    
    }
    
    init();
    init_paddle();
    init_mouse();
    initbricks();
    }