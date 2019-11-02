let rainSound;
let makeRain;
let button;
let bees;
let makeBee;
let peeps;
let springPeepers;
let stormy;
let storm;
let spill;
let water;

var wave;

let playing = false;
var slider;

var env;

function preload(){
  soundFormats('mp3', 'ogg');
  rainSound = loadSound('audio/rain.mp3');
  makeBee = loadSound('audio/bees.mp3');
  springPeepers = loadSound('audio/spring_peepers.mp3');
  storm = loadSound('audio/thunderstorm.mp3')
  water = loadSound('audio/water_in_glass_spill.mp3');
}

function setup() {
  noCanvas();

env = new p5.Env();
env.setADSR(0.05, 0.1, 0.5, 1);
env.setRange(1.2, 0);

  makeRain = select('#makeRainSound');
  makeRain.mousePressed(rain);
  spill = select('#makeWaterSpill');
  spill.mousePressed(waters);
  bees = select('#makeBees');
  bees.mousePressed(bee);
  stormy = select('#thunder');
  stormy.mousePressed(storms);

  peeps = select('#makeSpringPeepers');
  peeps.mousePressed(springPeeps);

  wave = new p5.Oscillator();
  wave.setType('sine');
  wave.start();
  wave.freq(1000);
  wave.amp(env);


  button = createButton('play,pause')
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
function bee(){
  makeBee.setVolume(0.1);
  makeBee.play();
}
function springPeeps(){
  springPeepers.setVolume(0.1);
  springPeepers.play();
}
function storms(){
  storm.setVolume(0.1);
  storm.play();
}
function waters(){
  water.setVolume(0.2);
  water.play();
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
