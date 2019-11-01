let rainSound;
let makeRain;

function preload(){
  soundFormats('mp3', 'ogg');
  rainSound = loadSound('audio/rain.mp3');
}

function setup() {
  noCanvas();

  makeRain = select('#makeRainSound');
  makeRain.mousePressed(rain);
}

function draw() {
  background(220);
}

function rain(){
  rainSound.setVolume(0.1);
  rainSound.play();
}
