let rainSound;
let makeRain;
let button;

var wave;

let playing = false;
var slider;

var env;

function preload(){
  soundFormats('mp3', 'ogg');
  rainSound = loadSound('audio/rain.mp3');
}

function setup() {
  noCanvas();

env = new p5.Env();
env.setADSR(0.05, 0.1, 0.5, 1);
env.setRange(1.2, 0);

  makeRain = select('#makeRainSound');
  makeRain.mousePressed(rain);

  wave = new p5.Oscillator();
  wave.setType('sine');
  wave.start();
  wave.freq(1000);
  wave.amp(env);


  button = createButton('play.pause')
  button.mousePressed(toggle);

  slider = createSlider(100, 1200, 440);
}

function draw() {
wave.freq(slider.value());
}

function rain(){
  rainSound.setVolume(0.1);
  rainSound.play();
}

function toggle(){
  env.play();
//if (!playing) {
  //    wave.amp(0.5, 1);
  //playing = true;
//} else {
  //wave.stop();
  //wave.amp(0, 1);
  //playing = false;
//}
}
